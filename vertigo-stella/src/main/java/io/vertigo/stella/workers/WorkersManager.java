/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.stella.workers;

import io.vertigo.core.node.component.Manager;
import io.vertigo.stella.work.WorkEngine;

/**
 * Gestion synchrone, asynchrone des taches à effectuer.
 * Chaque réalisation est effectuée par un {@link WorkEngine}.
 *
 * Les exécutions peuvent être
 *  - locales ou distribuées (par configuration)
 *  - synchrones ou asynchrones (selon la méthode appelée)
 *
 * Toutes les exécutions distribuées sont techniquement réalisées de façon asynchrones.
 * Dans le cas des appels synchrones de méthodes distribuées, un mécanisme resynchronise le résultat
 *
 * @author pchretien
 */
public interface WorkersManager extends Manager {
	// nothing
}
