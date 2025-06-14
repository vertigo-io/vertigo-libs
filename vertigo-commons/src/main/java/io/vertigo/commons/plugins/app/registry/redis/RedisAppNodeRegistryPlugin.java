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
package io.vertigo.commons.plugins.app.registry.redis;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
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

import io.vertigo.commons.app.AppNode;
import io.vertigo.commons.impl.app.AppNodeRegistryPlugin;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.json.JsonExclude;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.param.ParamValue;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;
import redis.clients.jedis.UnifiedJedis;

/**
 * Memory implementation for a single node node.
 * @author mlaroche, npiedeloup
 *
 */
public final class RedisAppNodeRegistryPlugin implements AppNodeRegistryPlugin {

	private static final String VERTIGO_NODE = "{vertigo:node:}";
	private static final String VERTIGO_NODES = VERTIGO_NODE + "list:";
	private final RedisConnector redisConnector;
	private final Gson gson;

	/**
	 * Constructor
	 * @param connectorNameOpt the optional redisConnector
	 */
	@Inject
	public RedisAppNodeRegistryPlugin(
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<RedisConnector> redisConnectors) {
		Assertion.check().isNotNull(redisConnectors);
		//---
		final String connectorName = connectorNameOpt.orElse("main");
		redisConnector = redisConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().get();
		gson = createGson();
	}

	@Override
	public void register(final AppNode appNode) {
		try (final Jedis jedis = redisConnector.getClient(VERTIGO_NODE)) {
			final Boolean isIdUsed = jedis.sismember(VERTIGO_NODES, appNode.getId());
			Assertion.check().isFalse(isIdUsed, "A node id must be unique : Id '{0}' is already used ", appNode.getId());
			// ---
			try (final Transaction tx = jedis.multi()) {
				tx.hset(VERTIGO_NODE + appNode.getId(), "json", gson.toJson(appNode));
				tx.sadd(VERTIGO_NODES, appNode.getId());
				tx.exec();
			}
		}
	}

	@Override
	public void unregister(final AppNode appNode) {
		try (final Jedis jedis = redisConnector.getClient(VERTIGO_NODE)) {
			try (final Transaction tx = jedis.multi()) {
				tx.del(VERTIGO_NODE + appNode.getId());
				tx.srem(VERTIGO_NODES, appNode.getId());
				tx.exec();
			}
		}
	}

	@Override
	public Optional<AppNode> find(final String nodeId) {
		final UnifiedJedis jedis = redisConnector.getClient();
		final String result = jedis.hget(VERTIGO_NODE + nodeId, "json");
		if (result != null) {
			return Optional.of(gson.fromJson(result, AppNode.class));
		}
		return Optional.empty();
	}

	@Override
	public void updateStatus(final AppNode appNode) {
		final UnifiedJedis jedis = redisConnector.getClient();
		jedis.hset(VERTIGO_NODE + appNode.getId(), "json", gson.toJson(appNode));
	}

	@Override
	public List<AppNode> getTopology() {
		final UnifiedJedis jedis = redisConnector.getClient();
		return jedis.smembers(VERTIGO_NODES)
				.stream()
				.map(nodeId -> jedis.hget(VERTIGO_NODE + nodeId, "json"))
				.map(nodeJson -> gson.fromJson(nodeJson, AppNode.class))
				.toList();
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
			return context.serialize(src.get().getName());
		}
	}

	private static final class OptionJsonSerializer implements JsonSerializer<Optional> {
		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final Optional src, final Type typeOfSrc, final JsonSerializationContext context) {
			if (src.isPresent()) {
				return context.serialize(src.get());
			}
			return null; //rien
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
