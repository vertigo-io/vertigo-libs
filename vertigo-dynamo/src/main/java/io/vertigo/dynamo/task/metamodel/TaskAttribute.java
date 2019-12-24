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
package io.vertigo.dynamo.task.metamodel;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.util.StringUtil;
import io.vertigo.dynamo.domain.metamodel.ConstraintException;
import io.vertigo.dynamo.domain.metamodel.Domain;

/**
 * Attribut d'une tache.
 * Il s'agit soit :
 *  - d'un type primitif
 *  - d'un type complexe : DTO ou DTC
 * Dans tous les cas il s'agit d'un {@link io.vertigo.dynamo.domain.metamodel.Domain}.
 *
 * Le paramètre peut être :
 *
 *  - obligatoire ou facultatif
 *
 * @author  fconstantin, pchretien
 */
public final class TaskAttribute {
	/** Name of the attribute. */
	private final String name;

	private final Domain domain;

	/** if the attribute cardinality. */
	private final Cardinality cardinality;

	/**
	 * Constructor.
	 *
	 * @param attributeName the name of the attribute
	 * @param domain the domain of the attribute
	 * @param required if the attribute is required
	 */
	TaskAttribute(final String attributeName, final Domain domain, final Cardinality cardinality) {
		Assertion.checkNotNull(attributeName);
		Assertion.checkNotNull(cardinality);
		Assertion.checkArgument(StringUtil.isLowerCamelCase(attributeName), "the name of the attribute {0} must be in lowerCamelCase", attributeName);
		Assertion.checkNotNull(domain);
		//-----
		name = attributeName;
		this.domain = domain;
		this.cardinality = cardinality;
	}

	/**
	 * @return the name of the attribute.
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return Domain the domain
	 */
	public Domain getDomain() {
		return domain;
	}

	/**
	 * @return if the attribute cardinality
	 */
	public Cardinality getCardinality() {
		return cardinality;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return "{ name : " + name + ", domain :" + domain + ", cardinality :" + cardinality + "]";
	}

	/**
	 * Vérifie la cohérence des arguments d'un Attribute
	 * Vérifie que l'objet est cohérent avec le type défini sur l'attribut.
	 * @param value Valeur (Object primitif ou DtObject ou bien DtList)
	 */
	public void checkAttribute(final Object value) {
		if (cardinality.hasOne()) {
			Assertion.checkNotNull(value, "Attribut task {0} ne doit pas etre null (cf. paramétrage task)", getName());
		}
		try {
			getDomain().checkConstraints(value);
		} catch (final ConstraintException e) {
			//On retransforme en Runtime pour conserver une API sur les getters et setters.
			throw WrappedException.wrap(e);
		}
	}
}
