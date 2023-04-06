/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.springmvc.argumentresolvers;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.Part;

import org.springframework.web.multipart.MultipartFile;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.Param;
import io.vertigo.core.param.ParamManager;

/**
 * @author skerdudou
 */
public final class MimeTypeUtil {

	private static final String USE_TIKA_PARAM_NAME = "file.tikaMimeType";
	private static final boolean USE_TIKA = isUseTika();

	private MimeTypeUtil() {
		//nothing
	}

	public static String resolveMimetype(final String fileName, final MultipartFile file) {
		return doResolveMimetype(fileName, file::getInputStream, file.getContentType());
	}

	public static String resolveMimetype(final String filename, final Part filePart) {
		return doResolveMimetype(filename, filePart::getInputStream, filePart.getContentType());
	}

	private static String doResolveMimetype(final String filename, final IsSupplier isFct, final String providedContentType) {
		String mimeType = USE_TIKA ? TikaUtil.resolveMimeType(filename, isFct) : providedContentType;
		if (mimeType == null) {
			mimeType = "application/octet-stream";
		}
		return mimeType;
	}

	private static boolean isUseTika() {
		final ParamManager paramManager = Node.getNode().getComponentSpace().resolve(ParamManager.class);
		final boolean useTikaParam = paramManager.getOptionalParam(USE_TIKA_PARAM_NAME)
				.map(Param::getValueAsBoolean)
				.orElse(false);

		Assertion.check().isFalse(useTikaParam && !isTikaPresent(), "Tika dependency is optional on Vertigo-ui, please add it to your dependencies to use it.");
		return useTikaParam;
	}

	private static boolean isTikaPresent() {
		try {
			Class.forName("org.apache.tika.config.TikaConfig");
			return true;
		} catch (final Throwable ex) {
			// Class or one of its dependencies is not present...
			return false;
		}
	}

	public interface IsSupplier {

		InputStream get() throws IOException;
	}
}
