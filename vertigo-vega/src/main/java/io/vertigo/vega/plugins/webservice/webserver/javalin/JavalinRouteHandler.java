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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.vertigo.vega.plugins.webservice.handler.HandlerChain;
import io.vertigo.vega.plugins.webservice.handler.WebServiceCallContext;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;

/**
 * Webservice Route for Javalin.
 * @author npiedeloup
 */
final class JavalinRouteHandler implements Handler {

	private static final Logger LOGGER = LogManager.getLogger(JavalinRouteHandler.class);
	private final WebServiceDefinition webServiceDefinition;
	private final HandlerChain handlerChain;

	/**
	 * @param webServiceDefinition webServiceDefinition
	 * @param handlerChain handlerChain
	 * @param defaultContentCharset DefaultContentCharset
	 */
	JavalinRouteHandler(final WebServiceDefinition webServiceDefinition, final HandlerChain handlerChain) {
		this.webServiceDefinition = webServiceDefinition;
		this.handlerChain = handlerChain;
	}

	/** {@inheritDoc} */
	@Override
	public void handle(final Context ctx) {
		try {
			final Object result = handlerChain.handle(ctx.req, ctx.res, new WebServiceCallContext(new JavalinWebServiceContext(ctx), webServiceDefinition));

			if (result instanceof String) {
				ctx.result((String) result);
			} else {
				//TODO usefull ?
				ctx.json(result);
			}

		} catch (final Throwable th) {
			LOGGER.error(th.getMessage(), th);
			ctx.result(th.getMessage());
		}
	}
}
