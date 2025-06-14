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
package io.vertigo.datamodel.task.model;

import java.util.Map;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.datamodel.smarttype.definitions.ConstraintException;
import io.vertigo.datamodel.task.definitions.TaskAttribute;
import io.vertigo.datamodel.task.definitions.TaskDefinition;

/**
 * Gestion des taches.
 * Les taches sont implémentés par les classes dérivées de {@link io.vertigo.datamodel.task.model.TaskEngine}
 * Une tache peut être perçue comme une instance d'une {@link io.vertigo.datamodel.task.definitions.TaskDefinition} ;
 * celle-ci doit être préalablement déclarée.
 * L'utilisation d'une tache se fait en 4 étapes :
 * - Etape 1 : récupération de la tache.
 * - Etape 2 : définition des attributs (ou paramètres) d'entrées. <code>srv.setXXX(...);</code>
 * - Etape 3 : exécution de la tache <code>srv.execute();</code>
 * - Etape 4 : récupération des paramètres de sorties. <code>srv.getXXX(...);</code>
 * Notes :
 * - Une tache s'exécute dans le cadre de la transaction courante.
 * - Une tache n'est pas sérializable ; elle doit en effet posséder une durée de vie la plus courte possible.
 *
 * @author fconstantin, pchretien
 */
public final class Task {
	/**
	 * Map conservant les paramètres d'entrée et de sortie de la tache.
	 */
	private final Map<TaskAttribute, Object> inTaskAttributes;
	/**
	 * Définition de la tache.
	 */
	private final TaskDefinition taskDefinition;

	/**
	 * Définition de la tache.
	 */
	private final Map<String, String> context;

	/**
	 * Constructor.
	 * Le constructeur est protégé, il est nécessaire de passer par le Builder.
	 */
	Task(final TaskDefinition taskDefinition, final Map<TaskAttribute, Object> inTaskAttributes, final Map<String, String> context) {
		Assertion.check()
				.isNotNull(taskDefinition)
				.isNotNull(inTaskAttributes)
				.isNotNull(context);
		//-----
		this.taskDefinition = taskDefinition;
		this.inTaskAttributes = inTaskAttributes;
		this.context = context;
		validate();
	}

	/**
	 * Static method factory for TaskBuilder
	 *
	 * @param taskDefinition the definition of the task
	 * @return TaskBuilder
	 */
	public static TaskBuilder builder(final TaskDefinition taskDefinition) {
		return new TaskBuilder(taskDefinition);
	}

	private void validate() {
		for (final TaskAttribute taskAttribute : taskDefinition.getInAttributes()) {
			//on ne prend que les attributes correspondant au mode.
			//We check all attributes
			final Object value = inTaskAttributes.get(taskAttribute);
			try {
				taskAttribute.validate(value);
			} catch (final ConstraintException e) {
				throw WrappedException.wrap(e);
			}
		}
	}

	/**
	 * Getter générique.
	 * Retourne la valeur d'un paramètre conforme au contrat de l'attribut du service.
	 *
	 * @param attributeName Nom du paramètre
	 * @param <V> Type de la valeur
	 * @return Valeur
	 */
	public <V> V getValue(final String attributeName) {
		// on préfère centraliser le cast ici plutot que dans les classes générées.
		final TaskAttribute inTaskAttribute = taskDefinition.getInAttribute(attributeName);
		return (V) inTaskAttributes.get(inTaskAttribute);
	}

	/**
	 * Return the value of a property in the excecution context of the task
	 *
	 * @param contextParam name of the context param
	 * @return Valeur
	 */
	public String getContextProperty(final String contextParam) {
		return context.get(contextParam);
	}

	/**
	 * Return the properties in the execution context of the task
	 *
	 * @return context properties
	 */
	public Map<String, String> getContextProperties() {
		return context; //context already unmodifiable by builder
	}

	/**
	 * @return Définition de la task.
	 */
	public TaskDefinition getDefinition() {
		return taskDefinition;
	}
}
