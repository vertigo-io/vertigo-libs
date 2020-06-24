/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.core;

import java.io.File;
import java.io.IOException;

import org.apache.struts2.dispatcher.multipart.UploadedFile;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;

/**
 * Liste des couples (clé, object) enregistrés.
 * @author npiedeloup
 */
public final class ContextVFile {
	private static final String VFILE_SUFFIX = "VFile";
	private static final String FILE_NAME_SUFFIX = "FileName";
	private static final String CONTENT_TYPE_SUFFIX = "ContentType";

	private final AbstractActionSupport action;

	private final String contextKeyFile;
	private final String contextKeyVFile;
	private final String contextKeyFileName;
	private final String contextKeyContentType;

	/**
	 * Constructeur.
	 * @param contextKey Clé dans le context
	 * @param action Action struts
	 */
	public ContextVFile(final String contextKey, final AbstractActionSupport action) {
		Assertion.check()
				.isNotBlank(contextKey)
				.notNull(action);
		//-----
		contextKeyVFile = contextKey + VFILE_SUFFIX;
		contextKeyFile = contextKey;
		contextKeyFileName = contextKey + FILE_NAME_SUFFIX;
		contextKeyContentType = contextKey + CONTENT_TYPE_SUFFIX;
		this.action = action;

	}

	/**
	 * @return Object du context
	 */
	public VFile get() {
		Assertion.check().state(action.getModel().containsKey(contextKeyFile) //when file arrived by struts fileUpload (usefull, if context is reused)
				|| !action.getModel().containsKey(contextKeyVFile), //when VFile already extracted
				"File {0} already extracted. Extract it once and keep it, think about store it", contextKeyFile);
		final UploadedFile[] filesRef = UploadedFile[].class.cast(action.getModel().get(contextKeyFile));
		if (filesRef == null || filesRef.length == 0) {
			throw new VUserException("Le fichier attendu ({0}) n'a pas été envoyé", contextKeyFile);
		}
		final String[] filesName = String[].class.cast(action.getModel().get(contextKeyFileName));
		final String[] filesContentType = String[].class.cast(action.getModel().get(contextKeyContentType));
		final UploadedFile fileRef = filesRef[0];
		VFile vFile;
		try {
			vFile = new FSFile(filesName[0], filesContentType[0], ((File) fileRef.getContent()).toPath());
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Le fichier attendu ({0}) n'a pas été receptionné", contextKeyFile);
		}
		action.getModel().put(contextKeyVFile, vFile);

		//on vide les éléments de struts (non serializable et peuvent entrainner un mauvais usage)
		action.getModel().remove(contextKeyFile);
		action.getModel().remove(contextKeyFileName);
		action.getModel().remove(contextKeyContentType);
		return vFile;
	}

	/**
	 * @return Si cet élément est dans le context.
	 */
	public boolean exists() {
		return action.getModel().containsKey(contextKeyFile) || action.getModel().containsKey(contextKeyVFile);
	}
}
