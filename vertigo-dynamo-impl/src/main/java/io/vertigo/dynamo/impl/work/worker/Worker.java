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
package io.vertigo.dynamo.impl.work.worker;

import io.vertigo.dynamo.impl.work.WorkItem;

/**
 * Interface d'un Worker threadsafe.
 * Permet d'exécuter un travail de façona * - synchrone
 * - asynchrone
 * 
 * @author pchretien, npiedeloup
 */
public interface Worker {
	/**
	 * Exécution d'un travail de façon synchrone.
	 * @param <W> Type de Work (Travail)
	 * @param <WR> Produit d'un work à l'issu de son exécution
	 * @param work Travail à exécuter
	 * @return resultat
	 */
	<WR, W> void process(final WorkItem<WR, W> workItem);

	/**
	 * Exécution asynchrone d'un Work.
	 * - Si le traitement déclenche une exception le status est porté par WorkItem.
	 * - Si l'exécution asynchrone déclenche une exception, cela signifie qu'il est impossible de programmer le Work pour son exécution.
	 * @param <W> Type de Work (Travail)
	 * @param <WR> Produit d'un work à l'issu de son exécution
	 * @param work Tache, Work à exécuter
	 * @param  workResultHandler Handler permettant un callback après exécution
	 */
	<WR, W> void schedule(final WorkItem<WR, W> workItem);
}
