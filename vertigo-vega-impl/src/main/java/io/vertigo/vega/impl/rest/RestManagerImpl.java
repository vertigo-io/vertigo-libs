/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.vega.impl.rest;

import io.vertigo.core.AppListener;
import io.vertigo.core.Home;
import io.vertigo.core.spaces.component.ComponentSpace;
import io.vertigo.core.spaces.definiton.DefinitionSpace;
import io.vertigo.lang.Assertion;
import io.vertigo.vega.plugins.rest.handler.AccessTokenRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.CorsAllowerRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.ExceptionRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.HandlerChain;
import io.vertigo.vega.plugins.rest.handler.JsonConverterRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.PaginatorAndSortRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.RateLimitingRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.RestfulServiceRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.SecurityRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.SessionInvalidateRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.SessionRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.ValidatorRestHandlerPlugin;
import io.vertigo.vega.rest.RestManager;
import io.vertigo.vega.rest.WebServices;
import io.vertigo.vega.rest.metamodel.EndPointDefinition;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.inject.Inject;

/**
 * Restful webservice manager.
 * Use some plugins :
 * - EndPointIntrospectorPlugin : introspect WebService and register EndPointDefinitions
 * - RoutesRegisterPlugin : Register EndPointDefinitions to Routing engine (Jersey, Spark or other)
 * - List<RestHandlerPlugin> : Ordered handlers list to managed : request to WebService impl and callback response
 *
 * @author npiedeloup
 */
public final class RestManagerImpl implements RestManager {

	private static final String STANDARD_REST_HANDLER_PLUGINS_SETTINGS_MSG = "Standard configuration (order is important) :\n"
			+ "- " + ExceptionRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + CorsAllowerRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + SessionInvalidateRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + SessionRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + RateLimitingRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + SecurityRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + AccessTokenRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + JsonConverterRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + PaginatorAndSortRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + ValidatorRestHandlerPlugin.class.getSimpleName() + "\n"
			+ "- " + RestfulServiceRestHandlerPlugin.class.getSimpleName() + "\n";

	private final EndPointIntrospectorPlugin endPointIntrospectorPlugin;
	private final WebServerPlugin webServerPlugin;
	private final HandlerChain handlerChain;

	/**
	 * Constructor.
	 * @param endPointIntrospectorPlugin EndPointIntrospector Plugin
	 * @param webServerPlugin WebServer use to serve routes
	 * @param restHandlerPlugins RestHandler plugins
	 */
	@Inject
	public RestManagerImpl(
			final EndPointIntrospectorPlugin endPointIntrospectorPlugin,
			final WebServerPlugin webServerPlugin,
			final List<RestHandlerPlugin> restHandlerPlugins) {
		Assertion.checkNotNull(endPointIntrospectorPlugin);
		Assertion.checkNotNull(webServerPlugin);
		Assertion.checkArgument(!restHandlerPlugins.isEmpty(), "No RestHandlerPlugins found, check you have declared your RestHandlerPlugins in RestManagerImpl.\n{0}", STANDARD_REST_HANDLER_PLUGINS_SETTINGS_MSG);
		Assertion.checkNotNull(webServerPlugin);
		//-----
		final List<RestHandlerPlugin> sortedRestHandlerPlugins = sortRestHandlerPlugins(restHandlerPlugins);
		//-----
		Assertion.checkArgument(sortedRestHandlerPlugins.get(sortedRestHandlerPlugins.size() - 1) instanceof RestfulServiceRestHandlerPlugin,
				"RestHandlerPlugins must end with a RestfulServiceHandler in order to dispatch request to WebService, check your RestHandlerPlugins in RestManagerImpl.\n{0}", STANDARD_REST_HANDLER_PLUGINS_SETTINGS_MSG);
		//-----
		this.endPointIntrospectorPlugin = endPointIntrospectorPlugin;
		this.webServerPlugin = webServerPlugin;
		handlerChain = new HandlerChain(sortedRestHandlerPlugins);
		//we do nothing with webServerPlugin
		Home.getApp().registerAppListener(new AppListener() {
			/** {@inheritDoc} */
			@Override
			public void onPostStart() {
				final List<EndPointDefinition> endPointDefinitions = RestManagerImpl.this.scanComponents(Home.getComponentSpace());
				RestManagerImpl.this.registerEndPointDefinitions(Home.getDefinitionSpace(), endPointDefinitions);
			}
		});
	}

	private static List<RestHandlerPlugin> sortRestHandlerPlugins(final List<RestHandlerPlugin> restHandlerPlugins) {
		final List<RestHandlerPlugin> sortedRestHandlerPlugins = new ArrayList<>();
		RestHandlerPlugin restfulServiceRestHandlerPlugin = null;
		for (final RestHandlerPlugin restHandlerPlugin : restHandlerPlugins) {
			if (restHandlerPlugin instanceof RestfulServiceRestHandlerPlugin) {
				restfulServiceRestHandlerPlugin = restHandlerPlugin;
			} else {
				sortedRestHandlerPlugins.add(restHandlerPlugin);
			}
		}
		//Rule : RestfulServiceRestHandlerPlugin is at the end 
		if (restfulServiceRestHandlerPlugin != null) {
			sortedRestHandlerPlugins.add(restfulServiceRestHandlerPlugin);
		}
		return sortedRestHandlerPlugins;
	}

	/**
	 * Scan WebServices as EndPointDefinitions on all the components.
	 * @param componentSpace ComponentSpace
	 * @return Scanned endPointDefinitions
	 */
	List<EndPointDefinition> scanComponents(final ComponentSpace componentSpace) {
		final List<EndPointDefinition> allEndPointDefinitions = new ArrayList<>();

		//1- We introspect all RestfulService class
		for (final String componentId : componentSpace.keySet()) {
			final Object component = componentSpace.resolve(componentId, Object.class);
			if (component instanceof WebServices) {
				final List<EndPointDefinition> endPointDefinitions = endPointIntrospectorPlugin.instrospectEndPoint(((WebServices) component).getClass());
				allEndPointDefinitions.addAll(endPointDefinitions);
			}
		}

		//2- We sort by path, parameterized path should be after strict path
		Collections.sort(allEndPointDefinitions, new EndPointComparator());
		return allEndPointDefinitions;
	}

	/**
	 * Register EndPointDefinitions to DefinitionSpace.
	 * @param definitionSpace DefinitionSpace
	 * @param endPointDefinitions EndPointDefinitions
	 */
	void registerEndPointDefinitions(final DefinitionSpace definitionSpace, final List<EndPointDefinition> endPointDefinitions) {
		// We register EndPoint Definition in this order
		for (final EndPointDefinition endPointDefinition : endPointDefinitions) {
			definitionSpace.put(endPointDefinition);
		}
		webServerPlugin.registerWsRoute(handlerChain, endPointDefinitions);
	}

	private static final class EndPointComparator implements Comparator<EndPointDefinition>, Serializable {
		private static final long serialVersionUID = -3628192753809615711L;

		EndPointComparator() {
			//rien
		}

		/** {@inheritDoc} */
		@Override
		public int compare(final EndPointDefinition endPointDefinition1, final EndPointDefinition endPointDefinition2) {
			return endPointDefinition1.getPath().compareTo(endPointDefinition2.getPath());
		}
	}
}
