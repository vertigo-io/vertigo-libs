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
package io.vertigo.ui.impl.springmvc.config;

import java.util.ArrayList;
import java.util.List;

import org.thymeleaf.messageresolver.IMessageResolver;
import org.thymeleaf.spring6.SpringTemplateEngine;

/**
 * Extension of SpringTemplateEngine to fix addMessageResolver which is lately erased by Spring in his initializeSpecific method, use addCustomMessageResolver instead.
 * Also add Vertigo message resolver to permit Vertigo localization mechanism in Thymeleaf templates.
 */
public class VSpringTemplateEngine extends SpringTemplateEngine {

	private final List<IMessageResolver> customMessageResolverList = new ArrayList<>();

	public void addCustomMessageResolver(final IMessageResolver messageResolver) {
		customMessageResolverList.add(messageResolver);
	}

	@Override
	protected void initializeSpringSpecific() {
		// add Vertigo LocalManager as secondary message resolver
		super.addMessageResolver(new VSpringMessageResolver());
		customMessageResolverList.forEach(super::addMessageResolver);
	}

}
