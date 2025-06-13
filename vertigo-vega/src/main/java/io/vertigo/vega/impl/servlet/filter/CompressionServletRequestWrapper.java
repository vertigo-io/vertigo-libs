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

import java.io.IOException;

import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

/**
 * Implémentation de HttpServletRequestWrapper qui fonctionne avec le CompressionServletRequestStream.
 * @author Emeric Vernat
 */
class CompressionServletRequestWrapper extends HttpServletRequestWrapper {
	private ServletInputStream stream;

	/**
	 * Constructeur qui crée un adapteur de ServletRequest wrappant la request sp�cifi�e.
	 * @param request javax.servlet.HttpServletRequest
	 */
	CompressionServletRequestWrapper(final HttpServletRequest request) {
		super(request);
	}

	/**
	 * Crée et retourne un ServletInputStream pour lire le flux associé avec cette request.
	 * @return javax.servlet.ServletInputStream
	 * @throws java.io.IOException   Erreur d'entrée/sortie
	 */
	public ServletInputStream createInputStream() throws IOException {
		return new CompressionRequestStream((HttpServletRequest) getRequest());
	}

	/**
	 * Retourne le servlet input stream associé avec cette request.
	 * @return javax.servlet.ServletInputStream
	 * @throws java.io.IOException   Erreur d'entrée/sortie
	 */
	@Override
	public ServletInputStream getInputStream() throws IOException {
		if (stream == null) {
			stream = createInputStream();
		}

		return stream;
	}
}
