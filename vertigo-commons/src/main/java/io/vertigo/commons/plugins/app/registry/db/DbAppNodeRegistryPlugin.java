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
package io.vertigo.commons.plugins.app.registry.db;

import java.beans.PropertyVetoException;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.mchange.v2.c3p0.ComboPooledDataSource;

import io.vertigo.commons.app.AppNode;
import io.vertigo.commons.impl.app.AppNodeRegistryPlugin;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.lang.json.JsonExclude;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.param.ParamValue;

/**
 * Db implementation for multi node management
 * @author mlaroche
 *
 */
public final class DbAppNodeRegistryPlugin implements AppNodeRegistryPlugin {

	private final ComboPooledDataSource pooledDataSource = new ComboPooledDataSource();
	private final Gson gson;

	/**
	 * Constructor
	 * @param driverClassName the driver to use with the db
	 * @param jdbcUrl the jdbc url connection
	 */
	@Inject
	public DbAppNodeRegistryPlugin(
			@ParamValue("driverClassName") final String driverClassName,
			@ParamValue("jdbcUrl") final String jdbcUrl) {
		Assertion.check()
				.isNotBlank(driverClassName)
				.isNotBlank(jdbcUrl);
		// ---
		gson = createGson();
		// ---
		//we configure the connection pool
		try {
			//loads the jdbc driver
			pooledDataSource.setDriverClass(driverClassName);
		} catch (final PropertyVetoException e) {
			throw WrappedException.wrap(e, "Can't defined JdbcDriver {0}", driverClassName);
		}
		pooledDataSource.setJdbcUrl(jdbcUrl);

		// we work with only one connection to the db
		pooledDataSource.setInitialPoolSize(1);
		pooledDataSource.setMaxPoolSize(1);
		pooledDataSource.setMinPoolSize(1);

		final String request = "CREATE TABLE IF NOT EXISTS V_NODE(NODE_ID VARCHAR(255) PRIMARY KEY, JSON TEXT)";
		executeCallableSql(request);
	}

	@Override
	public void register(final AppNode appNode) {
		Assertion.check().isNotNull(appNode);
		//---
		final String request = "insert into V_NODE(NODE_ID,JSON) values (?,?)";
		executeCallableSql(request, appNode.getId(), gson.toJson(appNode));

	}

	@Override
	public void unregister(final AppNode appNode) {
		Assertion.check().isNotNull(appNode);
		// ---
		final String request = "delete from V_NODE where NODE_ID = ?";
		executeCallableSql(request, appNode.getId());
	}

	@Override
	public List<AppNode> getTopology() {
		final String request = "select NODE_ID, JSON from V_NODE";
		return retrieveNodes(request);

	}

	@Override
	public Optional<AppNode> find(final String nodeId) {
		Assertion.check().isNotBlank(nodeId);
		// ---
		final String request = "select NODE_ID, JSON from V_NODE where NODE_ID = ?";
		final List<AppNode> result = retrieveNodes(request, nodeId);
		Assertion.check().isTrue(result.size() <= 1, "Loaded two many rows when retrieving node with id : '{0}'", nodeId);

		if (result.size() == 1) {
			return Optional.of(result.get(0));

		}
		return Optional.empty();

	}

	@Override
	public void updateStatus(final AppNode appNode) {
		Assertion.check().isNotNull(appNode);
		// ---
		final String request = "update V_NODE set JSON = ? where NODE_ID = ?";
		executeCallableSql(request, gson.toJson(appNode), appNode.getId());
	}

	private void executeCallableSql(final String sql, final String... params) {
		try (final Connection connection = obtainConnection()) {
			try (final PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
				for (int i = 0; i < params.length; i++) {
					preparedStatement.setObject(i + 1, params[i]);
				}
				preparedStatement.executeUpdate();
			}
			connection.commit();
		} catch (final SQLException e) {
			throw WrappedException.wrap(e);
		}
	}

	private List<AppNode> retrieveNodes(final String sql, final String... params) {
		try (final Connection connection = obtainConnection()) {
			try (final PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
				for (int i = 0; i < params.length; i++) {
					preparedStatement.setObject(i + 1, params[i]);
				}
				try (final ResultSet result = preparedStatement.executeQuery()) {
					final List<AppNode> appNodes = new ArrayList<>();
					while (result.next()) {
						final String json = result.getString(2);
						appNodes.add(gson.fromJson(json, AppNode.class));
					}
					return appNodes;
				}
			}
		} catch (final SQLException e) {
			throw WrappedException.wrap(e);
		}
	}

	private Connection obtainConnection() {
		try {
			return pooledDataSource.getConnection();
		} catch (final SQLException e) {
			throw WrappedException.wrap(e, "Can't open connection");
		}
	}

	private static Gson createGson() {
		return new GsonBuilder()
				.setPrettyPrinting()
				.registerTypeAdapter(DefinitionId.class, new DefinitionReferenceJsonSerializer())
				.registerTypeAdapter(Optional.class, new OptionJsonSerializer())
				.registerTypeAdapter(Instant.class, new InstantJsonAdapter())
				.addSerializationExclusionStrategy(new JsonExclusionStrategy())
				.create();
	}

	private static final class DefinitionReferenceJsonSerializer implements JsonSerializer<DefinitionId> {
		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final DefinitionId src, final Type typeOfSrc, final JsonSerializationContext context) {
			return context.serialize(src.fullName());
		}
	}

	private static final class OptionJsonSerializer implements JsonSerializer<Optional<?>> {
		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final Optional<?> srcOpt, final Type typeOfSrc, final JsonSerializationContext context) {
			return srcOpt
					.map(context::serialize)
					.orElse(null);
		}
	}

	private static final class InstantJsonAdapter implements JsonSerializer<Instant>, JsonDeserializer<Instant> {
		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final Instant instant, final Type typeOfSrc, final JsonSerializationContext context) {
			return new JsonPrimitive(DateTimeFormatter.ISO_INSTANT.format(instant)); //ISO8601
		}

		/** {@inheritDoc} */
		@Override
		public Instant deserialize(final JsonElement jsonElement, final Type type, final JsonDeserializationContext jsonDeserializationContext) {
			final String instantStr = jsonElement.getAsString();
			return DateTimeFormatter.ISO_INSTANT.parse(instantStr, Instant::from);
		}
	}

	private static final class JsonExclusionStrategy implements ExclusionStrategy {
		/** {@inheritDoc} */
		@Override
		public boolean shouldSkipField(final FieldAttributes arg0) {
			return arg0.getAnnotation(JsonExclude.class) != null;
		}

		@Override
		public boolean shouldSkipClass(final Class<?> arg0) {
			return false;
		}
	}

}
