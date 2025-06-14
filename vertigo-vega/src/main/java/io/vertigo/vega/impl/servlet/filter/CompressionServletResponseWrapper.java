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
package io.vertigo.vega.impl.servlet.filter;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Implémentation de HttpServletResponseWrapper qui fonctionne avec le CompressionServletResponseStream.
 * @author Amy Roh, Dmitri Valdin (Apache Software Foundation)
 */
class CompressionServletResponseWrapper extends AbstractHttpServletResponseWrapper {
	private final int compressionThreshold;

	/**
	 * Constructeur qui crée un adapteur de ServletResponse wrappant la response spécifiée.
	 * @param response javax.servlet.HttpServletResponse
	 * @param compressionThreshold int
	 */
	CompressionServletResponseWrapper(final HttpServletResponse response, final int compressionThreshold) {
		super(response);
		this.compressionThreshold = compressionThreshold;
	}

	/**
	 * Crée et retourne un ServletOutputStream pour �crire le contenu dans la response associée.
	 * @return javax.servlet.ServletOutputStream
	 */
	@Override
	public ServletOutputStream createOutputStream() {
		return new CompressionResponseStream((HttpServletResponse) getResponse(), compressionThreshold);
	}

	/**
	 * Ne fait rien
	 * @param length int
	 */
	@Override
	public void setContentLength(final int length) {
		// ne fait rien
	}
}
