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
package io.vertigo.vega.impl.webservice;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.vega.plugins.webservice.handler.HandlerChain;
import io.vertigo.vega.plugins.webservice.handler.RestfulServiceWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.WebServiceCallContext;
import io.vertigo.vega.webservice.exception.SessionException;
import io.vertigo.vega.webservice.metamodel.WebServiceDefinition;
import spark.Request;
import spark.Response;

/**
 * Handler of WebService Route, are defined as plugins of WebServiceManager.
 * @author npiedeloup
 */
public interface WebServiceHandlerPlugin extends Plugin {

	/**
	 * @param webServiceDefinition WebServiceDefinition
	 * @return If this handler should be use for this webService
	 */
	boolean accept(WebServiceDefinition webServiceDefinition);

	/**
	 * Do handle of this route.
	 *
	 * @param request spark.Request
	 * @param response spark.Response
	 * @param webServiceCallContext Context of this request
	 * @param chain current HandlerChain.
	 * @return Response body
	 * @throws SessionException Session expired exception
	 */
	Object handle(
			final Request request,
			final Response response,
			final WebServiceCallContext webServiceCallContext,
			final HandlerChain chain) throws SessionException;

	/**
	 * Return an index to compute the order of the handlers stack.
	 * Please check the index of the provided handlers by vertigo and choose the index for yours accordingly.
	 * Vertigo's handlers start à 10 and leave a space of 10 between each.
	 * The last handler must be {@link RestfulServiceWebServiceHandlerPlugin} which has the index 120.
	 * Therefore the provided index must be between 0 and 119
	 * @return the index (between 0 and 119)
	 */
	int getStackIndex();

}
