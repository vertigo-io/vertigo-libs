/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.plugins.app.infos.http;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import io.vertigo.commons.app.AppNode;
import io.vertigo.commons.impl.app.AppNodeInfosPlugin;
import io.vertigo.core.analytics.health.HealthCheck;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.lang.json.CoreJsonAdapters;

/**
 * Plugin to retrieve infos of a node with the http protocol (Rest Webservices)
 * @author mlaroche
 *
 */
public final class HttpAppNodeInfosPlugin implements AppNodeInfosPlugin {

	private static final int TIMEOUT_MS = 500;

	private static final Gson GSON = CoreJsonAdapters.V_CORE_GSON;

	@Override
	public String getConfig(final AppNode node) {
		return callRestWS(node.getEndPoint().get() + "/vertigo/components", JsonObject.class).toString();
	}

	@Override
	public List<HealthCheck> getStatus(final AppNode node) {
		return callRestWS(node.getEndPoint().get() + "/vertigo/healthcheck", new TypeToken<List<HealthCheck>>() {
			/**/}.getType());
	}

	@Override
	public Map<String, Object> getStats(final AppNode node) {
		return Collections.emptyMap();
	}

	@Override
	public String getProtocol() {
		return "http";
	}

	private static <R> R callRestWS(final String wsUrl, final Type returnType) {
		Assertion.check().isNotBlank(wsUrl);
		// ---
		try {
			final URL url = new URL(wsUrl);
			final HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setConnectTimeout(TIMEOUT_MS);
			httpURLConnection.setRequestProperty("Content-Type", "application/json");

			final ByteArrayOutputStream result = new ByteArrayOutputStream();
			final byte[] buffer = new byte[1024];
			try (InputStream inputStream = httpURLConnection.getInputStream()) {
				int length;
				while ((length = inputStream.read(buffer)) != -1) {
					result.write(buffer, 0, length);
				}
			}
			return GSON.fromJson(result.toString(StandardCharsets.UTF_8), returnType);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

	}

}
