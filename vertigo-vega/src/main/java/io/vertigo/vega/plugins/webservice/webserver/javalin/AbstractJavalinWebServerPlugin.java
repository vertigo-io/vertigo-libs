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
package io.vertigo.vega.plugins.webservice.webserver.javalin;

import java.util.Collection;
import java.util.Optional;

import io.javalin.Javalin;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.vega.impl.webservice.WebServerPlugin;
import io.vertigo.vega.plugins.webservice.handler.HandlerChain;
import io.vertigo.vega.webservice.metamodel.WebServiceDefinition;

/**
 * RoutesRegisterPlugin use to register Spark-java route.
 * @author npiedeloup
 */
abstract class AbstractJavalinWebServerPlugin implements WebServerPlugin, Activeable {
	private final Optional<String> apiPrefix;
	private Javalin javalinApp;

	public AbstractJavalinWebServerPlugin(final Optional<String> apiPrefix) {
		Assertion.check()
				.isNotNull(apiPrefix)
				.when(apiPrefix.isPresent(), () -> Assertion.check()
						.isTrue(apiPrefix.get().startsWith("/"), "Global route apiPrefix must starts with /"));
		//-----
		this.apiPrefix = apiPrefix;
	}

	@Override
	public void start() {
		javalinApp = startJavalin();
	}

	protected abstract Javalin startJavalin();

	protected abstract void stopJavalin(Javalin javalin);

	@Override
	public void stop() {
		stopJavalin(javalinApp);
		// we need to sleep because spark starts a new thread to stop the server
		try {
			Thread.sleep(100L);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt();
			throw WrappedException.wrap(e);
		}
	}

	/** {@inheritDoc} */
	@Override
	public final void registerWebServiceRoute(final HandlerChain handlerChain, final Collection<WebServiceDefinition> webServiceDefinitions) {
		Assertion.check()
				.isNotNull(handlerChain)
				.isNotNull(webServiceDefinitions);
		//-----
		boolean corsProtected = false;
		for (final WebServiceDefinition webServiceDefinition : webServiceDefinitions) {
			final String routePath = convertJaxRsPathToJavalin(apiPrefix.orElse("") + webServiceDefinition.getPath());
			final JavalinRouteHandler javalinRouteHandler = new JavalinRouteHandler(webServiceDefinition, handlerChain);
			switch (webServiceDefinition.getVerb()) {
				case Get:
					javalinApp.get(routePath, javalinRouteHandler);
					break;
				case Post:
					javalinApp.post(routePath, javalinRouteHandler);
					break;
				case Put:
					javalinApp.put(routePath, javalinRouteHandler);
					break;
				case Patch:
					javalinApp.patch(routePath, javalinRouteHandler);
					break;
				case Delete:
					javalinApp.delete(routePath, javalinRouteHandler);
					break;
				default:
					throw new UnsupportedOperationException();
			}
			corsProtected = corsProtected || webServiceDefinition.isCorsProtected();
		}
		if (corsProtected) {
			final JavalinOptionsRouteHandler javalinOptionsRouteHandler = new JavalinOptionsRouteHandler(handlerChain);
			javalinApp.options("*", javalinOptionsRouteHandler);
		}
	}

	private static String convertJaxRsPathToJavalin(final String path) {
		return path.replaceAll("\\(", "%28")
				.replaceAll("\\)", "%29")
				.replaceAll("\\{(.+?)\\}", ":$1"); //.+? : Reluctant regexp
	}
}
