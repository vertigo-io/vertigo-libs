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
package io.vertigo.x.workflow.dao.model;

import javax.inject.Inject;
import java.util.Optional;
import io.vertigo.app.Home;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfWorkflowDefinitionDAO
 */
public final class WfWorkflowDefinitionDAO extends DAO<WfWorkflowDefinition, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfWorkflowDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfWorkflowDefinition.class, storeManager, taskManager);
	}


	/**
	 * Creates a taskBuilder.
	 * @param name  the name of the task
	 * @return the builder 
	 */
	private static TaskBuilder createTaskBuilder(final String name) {
		final TaskDefinition taskDefinition = Home.getApp().getDefinitionSpace().resolve(name, TaskDefinition.class);
		return new TaskBuilder(taskDefinition);
	}

	/**
	 * Execute la tache TK_HAS_WORKFLOW_DEFINITION_BY_NAME.
	 * @param name String 
	 * @return Option de io.vertigo.x.workflow.domain.model.WfWorkflowDefinition wfWorkflowDefinition
	*/
	public Optional<io.vertigo.x.workflow.domain.model.WfWorkflowDefinition> hasWorkflowDefinitionByName(final String name) {
		final Task task = createTaskBuilder("TK_HAS_WORKFLOW_DEFINITION_BY_NAME")
				.addValue("NAME", name)
				.build();
		return Optional.ofNullable((io.vertigo.x.workflow.domain.model.WfWorkflowDefinition) getTaskManager()
				.execute(task)
				.getResult());
	}

}
