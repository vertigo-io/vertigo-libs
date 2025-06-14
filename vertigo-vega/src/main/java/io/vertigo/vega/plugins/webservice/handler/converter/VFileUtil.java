/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.plugins.webservice.handler.converter;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.StreamFile;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

/**
 * @author npiedeloup
 */
final class VFileUtil {

	private static final Logger LOG = LogManager.getLogger(VFileUtil.class);
	private static final String NOT_ALLOWED_IN_FILENAME = "\\/:*?\"<>|;";

	private VFileUtil() {
		//nothing
	}

	/**
	 * @param request Request
	 * @return If this request is multipart
	 */
	static boolean isMultipartRequest(final HttpServletRequest request) {
		final String contentType = request.getContentType();
		return contentType != null && "POST".equalsIgnoreCase(request.getMethod()) && contentType.startsWith("multipart/form-data");
	}

	/**
	 * @param webServiceParam WebService param
	 * @return If this is a VFile param
	 */
	static boolean isVFileParam(final WebServiceParam webServiceParam) {
		return VFile.class.isAssignableFrom(webServiceParam.getType());
	}

	/**
	 * @param request Request
	 * @param webServiceParam WebService param
	 * @return All VFile informations
	 */
	static VFile readVFileParam(final HttpServletRequest request, final WebServiceParam webServiceParam) {
		switch (webServiceParam.getParamType()) {
			case Query:
				return readQueryFile(request, webServiceParam);
			case Body:
			case Header:
			case InnerBody:
			case Path:
			case Implicit:
			default:
				throw new IllegalArgumentException("Files are only read from a Multipart Form parameter (use @QueryParam) : " + webServiceParam.getFullName());
		}
	}

	/**
	 * @param result WebService result
	 * @return if result is a VFile
	 */
	static boolean isVFileResult(final Object result) {
		return result instanceof VFile;
	}

	/**
	 * @param result WebService result
	 * @param response Response
	 */
	static void sendVFile(final Object result, final boolean attachment, final HttpServletResponse response) {
		sendVFile((VFile) result, attachment, response);
	}

	private static void sendVFile(final VFile result, final boolean attachment, final HttpServletResponse response) {
		try {
			send(result, attachment, response);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error while sending file. <!-- {0} -->", e.getMessage());
		}
		// response already send
	}

	private static VFile readQueryFile(final HttpServletRequest request, final WebServiceParam webServiceParam) {
		try {
			Assertion.check()
					.isTrue(request.getContentType().contains("multipart/form-data"), "File {0} not found. Request contentType isn't \"multipart/form-data\"", webServiceParam.getName())
					.isFalse(request.getParts().isEmpty(),
							"File {0} not found. Request is multipart but there is no Parts. : Check you have defined MultipartConfig (example for Tomcat set allowCasualMultipartParsing=\"true\" on context tag in your context definition, for Jetty use JettyMultipartConfig)",
							webServiceParam.getName());
			final Part file = request.getPart(webServiceParam.getName());
			if (file == null) {
				final String sentParts = request.getParts()
						.stream()
						.map(Part::getName)
						.collect(Collectors.joining(", "));
				throw new IllegalArgumentException("File " + webServiceParam.getName() + " not found. Parts sent : " + sentParts);
			}
			return createVFile(file);
		} catch (IOException | ServletException e) {
			throw WrappedException.wrap(e);
		}
	}

	private static void send(final VFile vFile, final boolean isAttachment, final HttpServletResponse response)
			throws IOException {
		final Long length = vFile.getLength();
		Assertion.check().isTrue(length < Integer.MAX_VALUE, "Too big file to be send. It's "
				+ length / 1024 + " Ko long, but maximum was " + Integer.MAX_VALUE / 1024
				+ " Ko.");
		response.addHeader("Content-Length", String.valueOf(length.intValue()));
		response.addHeader("Content-Disposition",
				encodeFileNameToContentDisposition(vFile.getFileName(), isAttachment));
		response.addDateHeader("Last-Modified", vFile.getLastModified().toEpochMilli());
		response.setContentType(vFile.getMimeType());
		response.addHeader("Cache-Control", "private");

		try (final InputStream input = vFile.createInputStream()) {
			try (final OutputStream output = response.getOutputStream()) {
				copy(input, output);
			}
		}
	}

	/**
	 * Encode fileName according to RFC 5987.
	 * @param fileName String
	 * @param isAttachment boolean is Content an attachment
	 * @return String
	 */
	private static String encodeFileNameToContentDisposition(final String fileName, final boolean isAttachment) {
		if (fileName == null) {
			return "";
		}
		// on remplace par des espaces les caractères interdits dans les noms de fichiers : \ / : * ? " < > | ;
		final int notAllowedLength = NOT_ALLOWED_IN_FILENAME.length();
		String cleanFileName = fileName; //only accepted char
		for (int i = 0; i < notAllowedLength; i++) {
			cleanFileName = cleanFileName.replace(NOT_ALLOWED_IN_FILENAME.charAt(i), '_');
		}

		final int length = cleanFileName.length();
		final StringBuilder sb = new StringBuilder(length + length / 4);
		if (isAttachment) {
			sb.append("attachment;");
		}
		final String cleanestFileName = cleanFileName.replace(" ", "%20"); //cleanest for default fileName
		sb.append("filename=\"").append(cleanestFileName).append('\"');
		byte[] utf8FileName;
		try {
			utf8FileName = cleanFileName.getBytes("utf8"); //Utf8 fileName
			sb.append(";filename*=UTF-8''");
			for (final byte c : utf8FileName) {
				if (c == '.' || c == '-' || c == '_' || isSimpleLetterOrDigit(c)) {
					sb.append((char) c);
				} else {
					sb.append('%');
					sb.append(Integer.toHexString(c & 0xff)); // we want byte as a char on one byte
				}
			}
		} catch (final UnsupportedEncodingException e) {
			LOG.warn("UnsupportedEncodingException UTF-8", e);
			//utf-8 unsupported we only use the filename= header
		}
		return sb.toString();
	}

	/**
	 * Copie le contenu d'un flux d'entrée vers un flux de sortie.
	 * @param in flux d'entrée
	 * @param out flux de sortie
	 * @throws IOException Erreur d'entrée/sortie
	 */
	private static void copy(final InputStream in, final OutputStream out) throws IOException {
		final int bufferSize = 10 * 1024;
		final byte[] bytes = new byte[bufferSize];
		int read = in.read(bytes);
		while (read != -1) {
			out.write(bytes, 0, read);
			read = in.read(bytes);
		}
	}

	private static boolean isSimpleLetterOrDigit(final byte c) {
		return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9';
	}

	private static VFile createVFile(final Part file) {
		final String fileName = getSubmittedFileName(file);
		String mimeType = file.getContentType();
		if (mimeType == null) {
			mimeType = "application/octet-stream";
		}
		return StreamFile.of(fileName, mimeType, Instant.now(), file.getSize(), () -> file.getInputStream());
	}

	private static String getSubmittedFileName(final Part filePart) {
		final String header = filePart.getHeader("content-disposition");
		if (header == null) {
			return null;
		}
		for (final String headerPart : header.split(";")) {
			if (headerPart.trim().startsWith("filename")) {
				return headerPart.substring(headerPart.indexOf('=') + 1).trim().replace("\"", "");
			}
		}
		return null;
	}

}
