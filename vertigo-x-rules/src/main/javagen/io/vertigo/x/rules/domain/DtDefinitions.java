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
package io.vertigo.x.rules.domain;

import java.util.Arrays;
import java.util.Iterator;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;

/**
 * Attention cette classe est générée automatiquement !
 */
public final class DtDefinitions implements Iterable<Class<?>> {

	/**
	 * Enumération des DtDefinitions.
	 */
	public enum Definitions {
		/** Objet de données ItemId. */
		ItemId(io.vertigo.x.rules.ItemId.class),
		/** Objet de données RuleConditionCriteria. */
		RuleConditionCriteria(io.vertigo.x.rules.RuleConditionCriteria.class),
		/** Objet de données RuleConditionDefinition. */
		RuleConditionDefinition(io.vertigo.x.rules.domain.RuleConditionDefinition.class),
		/** Objet de données RuleCriteria. */
		RuleCriteria(io.vertigo.x.rules.RuleCriteria.class),
		/** Objet de données RuleDefinition. */
		RuleDefinition(io.vertigo.x.rules.domain.RuleDefinition.class),
		/** Objet de données RuleFilterDefinition. */
		RuleFilterDefinition(io.vertigo.x.rules.domain.RuleFilterDefinition.class),
		/** Objet de données SelectorDefinition. */
		SelectorDefinition(io.vertigo.x.rules.domain.SelectorDefinition.class),
		;

		private final Class<?> clazz;

		private Definitions(final Class<?> clazz) {
			this.clazz = clazz;
		}

		/** 
		 * Classe associée.
		 * @return Class d'implémentation de l'objet 
		 */
		public Class<?> getDtClass() {
			return clazz;
		}
	}

	/**
	 * Enumération des champs de ItemId.
	 */
	public enum ItemIdFields implements DtFieldName {
		/** Propriété 'itemId'. */
		ITEM_ID,
	}

	/**
	 * Enumération des champs de RuleConditionCriteria.
	 */
	public enum RuleConditionCriteriaFields implements DtFieldName {
		/** Propriété 'Field'. */
		FIELD,
		/** Propriété 'Value'. */
		VALUE,
	}

	/**
	 * Enumération des champs de RuleConditionDefinition.
	 */
	public enum RuleConditionDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'field'. */
		FIELD,
		/** Propriété 'operator'. */
		OPERATOR,
		/** Propriété 'expression'. */
		EXPRESSION,
		/** Propriété 'RuleDefinition'. */
		RUD_ID,
	}

	/**
	 * Enumération des champs de RuleCriteria.
	 */
	public enum RuleCriteriaFields implements DtFieldName {
		/** Propriété 'id'. */
		WFWD_ID,
		/** Propriété 'Field 1'. */
		CONDITION_CRITERIA_1,
		/** Propriété 'Field 2'. */
		CONDITION_CRITERIA_2,
	}

	/**
	 * Enumération des champs de RuleDefinition.
	 */
	public enum RuleDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'creationDate'. */
		CREATION_DATE,
		/** Propriété 'itemId'. */
		ITEM_ID,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de RuleFilterDefinition.
	 */
	public enum RuleFilterDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'field'. */
		FIELD,
		/** Propriété 'operator'. */
		OPERATOR,
		/** Propriété 'expression'. */
		EXPRESSION,
		/** Propriété 'SelectorDefinition'. */
		SEL_ID,
	}

	/**
	 * Enumération des champs de SelectorDefinition.
	 */
	public enum SelectorDefinitionFields implements DtFieldName {
		/** Propriété 'id'. */
		ID,
		/** Propriété 'creationDate'. */
		CREATION_DATE,
		/** Propriété 'itemId'. */
		ITEM_ID,
		/** Propriété 'groupId'. */
		GROUP_ID,
	}

	/** {@inheritDoc} */
	@Override
	public Iterator<Class<?>> iterator() {
		return new Iterator<Class<?>>() {
			private Iterator<Definitions> it = Arrays.asList(Definitions.values()).iterator();

			/** {@inheritDoc} */
			@Override
			public boolean hasNext() {
				return it.hasNext();
			}

			/** {@inheritDoc} */
			@Override
			public Class<?> next() {
				return it.next().getDtClass();
			}

			/** {@inheritDoc} */
			@Override
			public void remove() {
				//unsupported
			}
		};
	}
}
