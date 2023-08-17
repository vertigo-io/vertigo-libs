/*
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
package io.vertigo.vega.impl.servlet.filter;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import org.apache.logging.log4j.LogManager;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Implémentation de HttpServletResponseWrapper pour éviter warnings à la compilation.
 * @author Matthieu Laroche, Nicolas Piedeloup
 */
public abstract class AbstractHttpServletResponseWrapper extends jakarta.servlet.http.HttpServletResponseWrapper implements AutoCloseable {
	private ServletOutputStream stream;
	private PrintWriter writer;

	/**
	 * Constructeur.
	 * @param response javax.servlet.HttpServletResponse
	 */
	protected AbstractHttpServletResponseWrapper(final HttpServletResponse response) {
		super(response);
	}

	protected final ServletOutputStream getStream() {
		return stream;
	}

	/** {@inheritDoc} */
	@Override
	public final void close() throws IOException {
		try {
			if (writer != null) {
				writer.close();
			} else if (stream != null) {
				stream.close();
			}
		} catch (final IOException e) {
			LogManager.getRootLogger().trace(e.getMessage(), e);
			//ignore IOException : streams are already send
		}
	}

	/**
	 * Surcharge de addHeader pour fixer le header même si la réponse est incluse (contrairement à tomcat).
	 * @param name String
	 * @param value String
	 */
	@Override
	public final void addHeader(final String name, final String value) {
		// nécessaire pour header gzip du filtre de compression
		if ("Content-Length".equals(name)) {
			setContentLength(Integer.parseInt(value));
			return;
		}
		super.addHeader(name, value);
	}

	/**
	 * Surcharge de setHeader pour fixer le header même si la réponse est incluse (contrairement à tomcat).
	 * @param name String
	 * @param value String
	 */
	@Override
	public final void setHeader(final String name, final String value) {
		if ("Content-Length".equals(name)) {
			setContentLength(Integer.parseInt(value));
			return;
		}
		super.setHeader(name, value);
	}

	/**
	 * Crée et retourne un ServletOutputStream pour �crire le contenu dans la response associée.
	 * @return javax.servlet.ServletOutputStream
	 * @throws java.io.IOException   Erreur d'entrée/sortie
	 */
	public abstract ServletOutputStream createOutputStream() throws IOException;

	/**
	 * Retourne le servlet output stream associé avec cette response.
	 * @return javax.servlet.ServletOutputStream
	 * @throws java.io.IOException   Erreur d'entrée/sortie
	 */
	@Override
	public final ServletOutputStream getOutputStream() throws IOException {
		if (writer != null) {
			throw new IllegalStateException("getWriter() has already been called for this response");
		}

		if (stream == null) {
			stream = createOutputStream();
		}
		return stream;
	}

	/**
	 * Retourne le writer associé avec cette response.
	 * @return java.io.PrintWriter
	 * @throws java.io.IOException   Erreur d'entrée/sortie
	 */
	@Override
	public final PrintWriter getWriter() throws IOException {
		if (writer == null) {
			if (stream != null) {
				throw new IllegalStateException("getOutputStream() has already been called for this response");
			}

			final ServletOutputStream outputStream = getOutputStream();
			final String charEnc = getResponse().getCharacterEncoding();
			// HttpServletResponse.getCharacterEncoding() shouldn't return null
			// according the spec, so feel free to remove that "if"
			final PrintWriter result;
			if (charEnc != null) {
				result = new PrintWriter(new OutputStreamWriter(outputStream, charEnc));
			} else {
				result = new PrintWriter(outputStream);
			}
			writer = result;
		}
		return writer;
	}

	/**
	 * Flushe le buffer et commite la response.
	 * @throws java.io.IOException   Erreur d'entrée/sortie
	 */
	@Override
	public final void flushBuffer() throws IOException {
		if (writer != null) { //NOPMD
			writer.flush();
		} else if (stream != null) {
			stream.flush();
		} else {
			super.flushBuffer();
		}
	}

}
