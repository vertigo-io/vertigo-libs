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
package io.vertigo.vega.impl.webservice;

import java.util.Collection;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.vega.plugins.webservice.handler.HandlerChain;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;

/**
 * Register an handlerchain as a route for this webService.
 * @author npiedeloup
 */
public interface WebServerPlugin extends Plugin {

	/**
	 * @param handlerChain HandlerChain of this route
	 * @param webServiceDefinitions WebServiceDefinitions to register
	 */
	void registerWebServiceRoute(HandlerChain handlerChain, Collection<WebServiceDefinition> webServiceDefinitions);

}
