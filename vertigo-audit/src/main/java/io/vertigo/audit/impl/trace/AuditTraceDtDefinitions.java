/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.audit.impl.trace;

import java.util.Arrays;
import java.util.Iterator;

import io.vertigo.datamodel.structure.definitions.DtFieldName;

public final class AuditTraceDtDefinitions implements Iterable<Class<?>> {

	/**
	 * Enumération des DtDefinitions.
	 */
	public enum Definitions {
		/** Objet de données OActivity. */
		Trace(io.vertigo.audit.trace.Trace.class);

		private final Class<?> clazz;

		Definitions(final Class<?> clazz) {
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
	 * Enumération des champs de OActivity.
	 */
	public enum TraceFields implements DtFieldName<io.vertigo.audit.trace.Trace> {
		/** Propriété 'Id Trace'. */
		traId,
		/** Propriété 'category'. */
		category,
		/** Propriété 'username'. */
		username,
		/** Propriété 'businessDate'. */
		businessDate,
		/** Propriété 'executionDate'. */
		executionDate,
		/** Propriété 'itemUrn'. */
		itemUrn,
		/** Propriété 'message'. */
		message,
		/** Propriété 'context'. */
		context
	}

	/** {@inheritDoc} */
	@Override
	public Iterator<Class<?>> iterator() {
		return new Iterator<>() {
			private final Iterator<Definitions> it = Arrays.asList(Definitions.values()).iterator();

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
		};
	}
}
