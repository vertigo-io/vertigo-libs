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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;
import io.vertigo.orchestra.services.execution.ActivityEngine;
import io.vertigo.util.ListBuilder;
import io.vertigo.util.MapBuilder;

/**
 * Builder d'une définition de processus Orchestra.
 *
 * @author mlaroche.
 * @version $Id$
 */
public final class ProcessDefinitionBuilder implements Builder<ProcessDefinition> {
	private final String name;
	private final String label;
	private final ProcessType type;
	private boolean myActive;
	private Optional<String> myCronExpression = Optional.empty();
	private final MapBuilder<String, String> myInitialParams = new MapBuilder<>();
	private boolean multiExecution;
	private boolean needUpdate;
	private int myRescuePeriod;
	private final ListBuilder<ActivityDefinition> activitiesBuilder = new ListBuilder<>();

	private final Map<String, String> myMetadatas = new HashMap<>();

	/**
	 * Constructor.
	 * @param processName le nom du processus
	 * @param processLabel le libellé du processus
	 */
	public ProcessDefinitionBuilder(final String processName, final String processLabel) {
		this(processName, processLabel, ProcessType.SUPERVISED);
	}

	/**
	 * Constructor.
	 * @param processName le nom du processus
	 * @param processLabel le libellé du processus
	 * @param processType le type de processus
	 */
	public ProcessDefinitionBuilder(final String processName, final String processLabel, final ProcessType processType) {
		Assertion.checkArgNotEmpty(processName);
		Assertion.checkNotNull(processType);
		//-----
		name = processName;
		label = processLabel;
		type = processType;
		// active by default
		myActive = true;
	}

	/**
	 * Processus actif.
	 * @return this
	 */
	public ProcessDefinitionBuilder inactive() {
		myActive = false;
		return this;
	}

	/**
	 * Processus autorisant la multi-execution.
	 * @return this
	 */
	public ProcessDefinitionBuilder withMultiExecution() {
		multiExecution = true;
		return this;
	}

	/**
	 * Durée pendant laquelle une planification peut être restaurée (durée de validité).
	 * @param rescuePeriod la durée en secondes
	 * @return this
	 */
	public ProcessDefinitionBuilder withRescuePeriod(final int rescuePeriod) {
		myRescuePeriod = rescuePeriod;
		return this;
	}

	/**
	 * Adds params used to start the first activity.
	 * @param initialParams the params definened as a map of key-value
	 * @return this
	 */
	public ProcessDefinitionBuilder addInitialParams(final Map<String, String> initialParams) {
		myInitialParams.putAll(initialParams);
		return this;
	}

	/**
	 * Adds param used to start the first activity.
	 * @param paramName the name of the param
	 * @param paramValue the value of the param
	 * @return this
	 */
	public ProcessDefinitionBuilder addInitialParam(final String paramName, final String paramValue) {
		myInitialParams.put(paramName, paramValue);
		return this;
	}

	/**
	 * Définit l'expression cron du process.
	 * @param cronExpression l'expression cron de recurrence
	 * @return this
	 */
	public ProcessDefinitionBuilder withCronExpression(final String cronExpression) {
		Assertion.checkNotNull(cronExpression);
		// ---
		myCronExpression = Optional.of(cronExpression);
		return this;
	}

	/**
	 * Ajoute une activité à un processus.
	 * @param activityName le nom de l'activité (Code)
	 * @param activityLabel Le libelle de l'activité (Ihm)
	 * @param engineClass Le moteur d'exécution de l'activité
	 * @return this
	 */
	public ProcessDefinitionBuilder addActivity(final String activityName, final String activityLabel, final Class<? extends ActivityEngine> engineClass) {
		final ActivityDefinition activity = new ActivityDefinition(activityName, activityLabel, engineClass);
		activitiesBuilder.add(activity);
		return this;
	}

	/**
	 * Définit le informations du process.
	 * @param metadatas les métadonnées sous format JSON
	 * @return this
	 */
	public ProcessDefinitionBuilder withMetadatas(final Map<String, String> metadatas) {
		Assertion.checkNotNull(metadatas);
		// ---
		myMetadatas.putAll(metadatas);
		return this;
	}

	/**
	 * Définit si au prochain démarrage de l'application la définition doit être mise à jour.
	 * @return this
	 */
	public ProcessDefinitionBuilder withNeedUpdate() {
		needUpdate = true;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public ProcessDefinition build() {
		return new ProcessDefinition(
				name,
				label,
				myActive,
				type,
				myMetadatas,
				needUpdate,
				new ProcessTriggeringStrategy(
						myCronExpression,
						myInitialParams.unmodifiable().build(),
						multiExecution,
						myRescuePeriod),
				activitiesBuilder.unmodifiable().build());
	}

}
