/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.struts2.impl.multipartrequest;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemHeaders;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.ParameterParser;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.apache.struts2.dispatcher.multipart.JakartaMultiPartRequest;

import io.vertigo.lang.VSystemException;
import io.vertigo.util.StringUtil;

/**
 * Gestion du multipart dans le cas ou sa gestion est déléguée au moteur de Servlet dans la norme Servlet 3.
 * Elle répond aux besoin de Struts pour lire les champs ainsi que les fichiers transmis.
 * Supporte les configurations standard struts.multipart.maxSize et struts.multipart.saveDir.
 * Sous Tomcat, nécessite d'ajouter la configuration allowCasualMultipartParsing="true" dans le contexte.<br>
 * <br>
 * Pour activer cette classe, ajouter la configuration suivante dans le struts.xml :
 *
 * <pre>
 * {@code
 * <bean type="org.apache.struts2.dispatcher.multipart.MultiPartRequest"
 *       class="io.vertigo.struts2.impl.multipartrequest.Servlet3MultiPartRequest"
 *       name="S3MultipartParser" scope="prototype"/>
 * <constant name="struts.multipart.parser" value="S3MultipartParser"/>
 * }
 * </pre>
 *
 * @author skerdudou
 */
public final class Servlet3MultiPartRequest extends JakartaMultiPartRequest {

	@Override
	protected List<FileItem> parseRequest(final HttpServletRequest servletRequest, final String saveDir) throws FileUploadException {
		// gestion de la configuration struts.multipart.maxSize
		if (maxSize >= 0) {
			final int requestSize = servletRequest.getContentLength();
			if (requestSize != -1 && requestSize > maxSize) {
				throw new FileUploadBase.SizeLimitExceededException(
						String.format("the request was rejected because its size (%s) exceeds the configured maximum (%s)",
								Long.valueOf(requestSize), Long.valueOf(maxSize)),
						requestSize, maxSize);
			}
		}
		// gestion du contenu de la requete
		try {
			final Collection<Part> parts = servletRequest.getParts();
			final List<FileItem> ret = new ArrayList<>(parts.size());
			for (final Part part : parts) {
				ret.add(new PartFileItem(part, saveDir));
			}
			return ret;
		} catch (IOException | ServletException e) {
			throw new FileUploadException("Impossible de récupérer les fichiers de la requête en mode Servlet 3", e);
		}
	}

	/**
	 * Cette classe interne doit hériter de DiskFileItem car Struts va le caster dans ce type ensuite.
	 *
	 * @author skerdudou
	 */
	private static final class PartFileItem extends DiskFileItem {

		private final transient Part part;
		private final File storeLocation;

		/**
		 * serialVersionUID.
		 */
		private static final long serialVersionUID = -2535633405526276127L;

		public PartFileItem(final Part part, final String saveDir) {
			super(part.getName(), part.getContentType(), getFilename(part) == null, getFilename(part), -1, new File(saveDir));

			this.part = part;

			if (isFormField() || StringUtil.isEmpty(getName())) {
				// si on est sur un champ (et donc pas sur un fichier uploadé) ou si on est sur une entrée de fichier vide
				// => on a pas besoin d'un File, on reste donc juste avec l'inputStream du Part sans créer le fichier temporaire
				storeLocation = null;
			} else {
				// si c'est un fichier uploadé on le persiste à un endroit connu pour qu'il soit pris en charge par Struts
				// car il est impossible de récupérer le chemin du fichier pris en charge par le moteur de servlet
				// en passant par la méthode write de l'objet Part, on s'assure de la performance car le fichier sera déplacé si possible et non recopié
				try {
					storeLocation = getTempFile();
					part.write(storeLocation.getAbsolutePath());
				} catch (final IOException e) {
					throw new VSystemException("Impossible de copier sur disque le fichier uploadé", e);
				}
			}

			// ajout des headers du Part
			setHeaders(new PartFileItemHeaders(part));
		}

		@Override
		public File getStoreLocation() {
			return storeLocation;
		}

		@Override
		public boolean isInMemory() {
			return storeLocation == null;
		}

		@Override
		public long getSize() {
			return part.getSize();
		}

		@Override
		public OutputStream getOutputStream() throws IOException {
			// Inutile dans le cas où l'on utilise cette classe de gestion du multipart
			// utilisé à la base par le FileItemFactory que l'on utilise pas
			throw new UnsupportedOperationException("Objet en lecture seule");
		}

		@Override
		public InputStream getInputStream() throws IOException {
			return part.getInputStream();
		}

		@Override
		public byte[] get() {
			try {
				return IOUtils.toByteArray(getInputStream());
			} catch (final IOException e) {
				throw new VSystemException("Impossible de lire le fichier", e);
			}
		}

		@Override
		public void delete() {
			try {
				if (storeLocation != null) {
					Files.delete(storeLocation.toPath());
				}
				part.delete();
			} catch (final IOException e) {
				throw new VSystemException("Impossible de supprimer le fichier", e);
			}
		}

		// A partir de Tomcat8, on peux passer en servlet 3.1 et utiliser la méthode getSubmittedFileName() de l'objet Part
		// en attendant, il faut parser le Content-Disposition à la main, code copié de librairies existantes (mais méthodes privées)
		private static String getFilename(final Part part) {
			String fileName = null;
			final String cd = part.getHeader("Content-Disposition");
			if (cd != null) {
				final String cdl = cd.toLowerCase(Locale.ENGLISH);
				if (cdl.startsWith("form-data") || cdl.startsWith("attachment")) {
					final ParameterParser paramParser = new ParameterParser();
					paramParser.setLowerCaseNames(true);
					// Parameter parser can handle null input
					final Map<String, String> params = paramParser.parse(cd, ';');
					if (params.containsKey("filename")) {
						fileName = params.get("filename");
						if (fileName != null) {
							fileName = fileName.trim();
						} else {
							// Even if there is no value, the parameter is present,
							// so we return an empty file name rather than no file
							// name.
							fileName = "";
						}
					}
				}
			}
			return fileName;
		}
	}

	/**
	 * Mise en conformité des accèss aux headers du Part sur l'interface FileItemHeaders.
	 *
	 * @author skerdudou
	 */
	private static final class PartFileItemHeaders implements FileItemHeaders {

		private final Part part;

		private PartFileItemHeaders(final Part part) {
			this.part = part;
		}

		@Override
		public Iterator<String> getHeaders(final String name) {
			return part.getHeaders(name).iterator();
		}

		@Override
		public Iterator<String> getHeaderNames() {
			return part.getHeaderNames().iterator();
		}

		@Override
		public String getHeader(final String name) {
			return part.getHeader(name);
		}
	}
}
