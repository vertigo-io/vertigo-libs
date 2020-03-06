/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.commons.plugins.app.registry.redis;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import io.vertigo.commons.app.Node;
import io.vertigo.commons.impl.app.AppNodeRegistryPlugin;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.JsonExclude;
import io.vertigo.core.node.definition.DefinitionReference;
import io.vertigo.core.param.ParamValue;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

/**
 * Memory implementation for a single node app.
 * @author mlaroche
 *
 */
public final class RedisAppNodeRegistryPlugin implements AppNodeRegistryPlugin {

	private static final String VERTIGO_NODE = "vertigo:node:";
	private static final String VERTIGO_NODES = "vertigo:nodes";
	private final RedisConnector redisConnector;
	private final Gson gson;

	/**
	 * Constructor
	 * @param redisConnector the redisConnector
	 */
	@Inject
	public RedisAppNodeRegistryPlugin(
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<RedisConnector> redisConnectors) {
		Assertion.checkNotNull(redisConnectors);
		//---
		final String connectorName = connectorNameOpt.orElse("main");
		redisConnector = redisConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().get();
		gson = createGson();
	}

	@Override
	public void register(final Node node) {
		try (final Jedis jedis = redisConnector.getClient()) {
			final Boolean isIdUsed = jedis.sismember(VERTIGO_NODES, node.getId());
			Assertion.checkState(!isIdUsed, "A node id must be unique : Id '{0}' is already used ", node.getId());
			// ---
			try (final Transaction tx = jedis.multi()) {
				tx.hset(VERTIGO_NODE + node.getId(), "json", gson.toJson(node));
				tx.sadd(VERTIGO_NODES, node.getId());
				tx.exec();
			}
		}
	}

	@Override
	public void unregister(final Node node) {
		try (final Jedis jedis = redisConnector.getClient()) {
			try (final Transaction tx = jedis.multi()) {
				tx.del(VERTIGO_NODE + node.getId());
				tx.srem(VERTIGO_NODES, node.getId());
				tx.exec();
			}
		}
	}

	@Override
	public Optional<Node> find(final String nodeId) {
		try (final Jedis jedis = redisConnector.getClient()) {
			final String result = jedis.hget(VERTIGO_NODE + nodeId, "json");
			if (result != null) {
				return Optional.of(gson.fromJson(result, Node.class));
			}
			return Optional.empty();
		}
	}

	@Override
	public void updateStatus(final Node node) {
		try (final Jedis jedis = redisConnector.getClient()) {
			jedis.hset(VERTIGO_NODE + node.getId(), "json", gson.toJson(node));
		}
	}

	@Override
	public List<Node> getTopology() {
		try (final Jedis jedis = redisConnector.getClient()) {
			return jedis.smembers(VERTIGO_NODES)
					.stream()
					.map(nodeId -> jedis.hget(VERTIGO_NODE + nodeId, "json"))
					.map(nodeJson -> gson.fromJson(nodeJson, Node.class))
					.collect(Collectors.toList());

		}

	}

	private static Gson createGson() {
		return new GsonBuilder()
				.setPrettyPrinting()
				.registerTypeAdapter(DefinitionReference.class, new DefinitionReferenceJsonSerializer())
				.registerTypeAdapter(Optional.class, new OptionJsonSerializer())
				.addSerializationExclusionStrategy(new JsonExclusionStrategy())
				.create();
	}

	private static final class DefinitionReferenceJsonSerializer implements JsonSerializer<DefinitionReference> {
		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final DefinitionReference src, final Type typeOfSrc, final JsonSerializationContext context) {
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
