/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.boot.initializer;

import javax.inject.Inject;

import io.vertigo.core.component.ComponentInitializer;
import io.vertigo.core.locale.LocaleManager;

/**
 * Initializer de LocaleManager.
 * @author dchallas
 * @version $Id: LocaleManagerInitializer.java,v 1.4 2014/02/07 16:48:27 npiedeloup Exp $
 */
public final class LocaleManagerInitializer implements ComponentInitializer {

	@Inject
	private LocaleManager localeManager;

	/** {@inheritDoc} */
	@Override
	public void init() {
		localeManager.add("io.vertigo.dynamox.domain.constraint.Constraint", io.vertigo.dynamox.domain.constraint.Resources.values());
		localeManager.add("io.vertigo.dynamox.domain.formatter.Formatter", io.vertigo.dynamox.domain.formatter.Resources.values());

		// Messages Ui vertigo
		localeManager.add("io.vertigo.struts2.resources.Resources", io.vertigo.struts2.resources.Resources.values());

		// Messages Demo
		//localeManager.add(io.vertigo.struts2.ui.util.Resources.class.getName(), io.vertigo.struts2.ui.util.Resources.values());
	}
}
