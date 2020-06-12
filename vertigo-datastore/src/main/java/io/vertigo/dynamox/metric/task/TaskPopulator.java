/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.dynamox.metric.task;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.task.metamodel.TaskAttribute;
import io.vertigo.datamodel.task.metamodel.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datamodel.task.model.TaskBuilder;

/**
 * Classe de bouchon pour mettre des données fictives dans les requêtes.
 *
 * @author tchassagnette
 */
final class TaskPopulator {
	private final TaskDefinition taskDefinition;
	private final TaskBuilder taskBuilder;

	/**
	 * Constructeur.
	 * @param taskDefinition Definition de la tache
	 */
	public TaskPopulator(final TaskDefinition taskDefinition) {
		Assertion.check().notNull(taskDefinition);
		//-----
		this.taskDefinition = taskDefinition;
		taskBuilder = Task.builder(taskDefinition);
	}

	/**
	 * Rempli la task avec les données fictives.
	 * @return Tache préparé à l'exécution
	 */
	public Task populateTask() {
		for (final TaskAttribute attribute : taskDefinition.getInAttributes()) {
			populateTaskAttribute(attribute);
		}
		return taskBuilder.build();
	}

	private void populateTaskAttribute(final TaskAttribute attribute) {
		final String attributeName = attribute.getName();
		final Object value;
		switch (attribute.getSmartTypeDefinition().getScope()) {
			case PRIMITIVE:
				final Object item = getDefaultPrimitiveValue(attribute);
				if (attribute.getCardinality().hasMany()) {
					final List list = new ArrayList();
					list.add(item);
					value = list;
				} else {
					value = item;
				}
				break;
			case DATA_OBJECT:
				if (attribute.getCardinality().hasMany()) {
					value = new DtList(attribute.getSmartTypeDefinition().getJavaClass());
				} else {
					value = ClassUtil.newInstance(attribute.getSmartTypeDefinition().getJavaClass());
				}
				break;
			case VALUE_OBJECT:
				final Object valueObject = ClassUtil.newInstance(attribute.getSmartTypeDefinition().getJavaClass());
				if (attribute.getCardinality().hasMany()) {
					final List list = new ArrayList();
					list.add(valueObject);
					value = list;
				} else {
					value = valueObject;
				}
				break;
			default:
				throw new IllegalStateException();
		}
		taskBuilder.addValue(attributeName, value);
	}

	private Object getDefaultPrimitiveValue(final TaskAttribute attribute) {
		Object item;
		//we are primitives only
		switch (BasicType.of(attribute.getSmartTypeDefinition().getJavaClass()).get()) {
			case Boolean:
				item = Boolean.TRUE;
				break;
			case String:
				item = "Test";
				break;
			case LocalDate:
				item = LocalDate.now();
				break;
			case Instant:
				item = Instant.now();
				break;
			case Double:
				item = Double.valueOf(1);
				break;
			case Integer:
				item = Integer.valueOf(1);
				break;
			case BigDecimal:
				item = BigDecimal.valueOf(1);
				break;
			case Long:
				item = Long.valueOf(1);
				break;
			case DataStream:
			default:
				//we do nothing
				item = null;
		}
		return item;
	}
}
