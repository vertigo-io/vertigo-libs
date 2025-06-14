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
/**
 *
 */
package io.vertigo.account.plugins.authorization.loaders;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.account.authorization.definitions.SecuredEntity;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.config.DefinitionResourceConfig;
import io.vertigo.core.node.definition.DefinitionProvider;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.FileUtil;

/**
 * Loader du fichier de configuration de la sécurité avancée.
 *
 * @author jgarnier
 */
public final class JsonSecurityDefinitionProvider implements DefinitionProvider {

	private final ResourceManager resourceManager;
	private final List<DefinitionSupplier> definitionSuppliers;

	/**
	 * Constructor.
	 *
	 * @param resourceManager the resourceManager
	 */
	@Inject
	public JsonSecurityDefinitionProvider(final ResourceManager resourceManager) {
		Assertion.check().isNotNull(resourceManager);
		// -----
		this.resourceManager = resourceManager;
		definitionSuppliers = new ArrayList<>();
	}

	/** {@inheritDoc} */
	@Override
	public List<DefinitionSupplier> get(final DefinitionSpace definitionSpace) {
		return definitionSuppliers;
	}

	/** {@inheritDoc} */
	@Override
	public void addDefinitionResourceConfig(final DefinitionResourceConfig definitionResourceConfig) {
		Assertion.check().isTrue("security".equals(definitionResourceConfig.type()), "Type {0} not supported",
				definitionResourceConfig.type());
		// -----
		final URL authConfURL = resourceManager.resolve(definitionResourceConfig.path());
		final Gson gson = createGson();
		final String confJson = FileUtil.read(authConfURL);
		final AdvancedSecurityConfiguration config = gson.fromJson(confJson, AdvancedSecurityConfiguration.class);
		registerDefinitions(config);
	}

	private static Gson createGson() {
		return new GsonBuilder()
				.setPrettyPrinting()
				//TODO  registerTypeAdapter(String.class, new EmptyStringAsNull<>())// add "" <=> null
				.registerTypeAdapter(SecuredEntity.class, new SecuredEntityDeserializer())
				.registerTypeAdapter(Authorization.class, new AuthorizationDeserializer())
				.create();
	}

	private void registerDefinitions(final AdvancedSecurityConfiguration config) {
		registerGlobalAuthorizations(config.getGlobalAuthorizations());
		registerSecurityEntities(config.getSecuredEntities());
	}

	private void registerGlobalAuthorizations(final List<Authorization> authorizations) {
		//on register les authorizations globales
		authorizations
				.forEach(atz -> definitionSuppliers.add(ds -> atz));
	}

	private void registerSecurityEntities(final List<SecuredEntity> securityEntities) {
		//on register les SecuredEntities
		securityEntities
				.forEach(sec -> definitionSuppliers.add(ds -> sec));

		//on register les authorizations associées aux opérations
		securityEntities.stream()
				.flatMap(securityEntity -> securityEntity.getOperations().stream())
				.forEach(atz -> definitionSuppliers.add(ds -> atz));
	}

}
