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
package io.vertigo.datamodel.data.definitions;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.ConstraintException;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * This class defines the structure of a node in a composite structure.
 * This node can be a field, an attribute...
 *
 * @author pchretien
 * @param name the name
 * @param smartTypeDefinition the smartType
 * @param cardinality the cardinality (one, optional, many)
 */
public abstract class DataDescriptor {
	private final String name;
	private final SmartTypeDefinition smartTypeDefinition;
	private final Cardinality cardinality;

	private static final int NAME_MAX_LENGTH = 60;

	protected DataDescriptor(
			final String name,
			final SmartTypeDefinition smartTypeDefinition,
			final Cardinality cardinality) {
		Assertion.check()
				.isNotBlank(name)
				.isNotNull(smartTypeDefinition)
				.isNotNull(cardinality)
				.isTrue(name.length() <= NAME_MAX_LENGTH, "the name of the descriptor {0} has a limit size of {1}", name, NAME_MAX_LENGTH)
				.isTrue(StringUtil.isLowerCamelCase(name),
						"the name of the descriptor {0} must be in lowerCamelCase", name);
		//---
		this.name = name;
		this.cardinality = cardinality;
		this.smartTypeDefinition = smartTypeDefinition;
	}

	public final String name() {
		return name;
	}

	public final Cardinality cardinality() {
		return cardinality;
	}

	public final SmartTypeDefinition smartTypeDefinition() {
		return smartTypeDefinition;
	}

	/**
	 * Returns the class of the value defined by this node
	 * If cardinality is many it's either a list or a dtList,
	 * if not then it's the base type of the smartType.
	 *
	 * @return the java Class of the value defined by this node
	 */
	public final Class<?> getTargetJavaClass() {
		return smartTypeDefinition().getJavaClass(cardinality());
	}

	/**
	 * Checks the type of the value
	 *
	 * @param value the value
	 */
	public final void checkType(final Object value) {
		final var smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		smartTypeManager.checkType(smartTypeDefinition(), cardinality(), value);
	}

	/**
	 * Validates the value (the value type is also automatically checked before)
	 *
	 * @param value the value
	 * @throws ConstraintException
	 */
	public final void validate(final Object value) throws ConstraintException {
		final var smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		smartTypeManager.validate(smartTypeDefinition(), cardinality(), value);
	}
}
