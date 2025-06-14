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
package io.vertigo.stella.impl.master.listener;

/**
 * Interface de réception des événements produits par l'exécution des taches.
 *
 * @author pchretien
 */
public interface WorkListener {
	/**
	 * Enregistre le début d'exécution d'une tache.
	 * @param workName Nom de la tache
	 */
	void onStart(String workName);

	/**
	 * Enregistre la fin  d'exécution d'une tache avec le temps d'exécution en ms et son statut (OK/KO).
	 * @param workName Nom de la tache exécutée
	 * @param elapsedTime Temps d'exécution en ms
	 * @param success Si la tache a été correctement executée
	 */
	void onFinish(String workName, long elapsedTime, boolean success);
}
