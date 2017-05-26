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
package io.vertigo.orchestra.definitions;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.services.execution.ActivityEngine;

/**
 * Définition d'une activité d'un processus Orchestra.
 * Une activity est caractérisé par son nom et son "engine" qui represente son execution.
 * @author mlaroche
 * @version $Id$
 */
public final class ActivityDefinition {
	private final String name;
	private final String label;
	private final Class<? extends ActivityEngine> engineClass;

	/**
	 * Constructor only used by its builder.
	 */
	ActivityDefinition(final String name, final String label, final Class<? extends ActivityEngine> engineClass) {
		Assertion.checkArgNotEmpty(name);
		Assertion.checkArgNotEmpty(label);
		Assertion.checkNotNull(engineClass);
		//-----
		this.name = name;
		this.label = label;
		this.engineClass = engineClass;
	}

	public String getName() {
		return name;
	}

	public String getLabel() {
		return label;
	}

	public Class<? extends ActivityEngine> getEngineClass() {
		return engineClass;
	}

}
