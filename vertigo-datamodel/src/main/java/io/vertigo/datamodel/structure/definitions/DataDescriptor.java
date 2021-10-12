/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.structure.definitions;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * This class defines the structure of a node in a composite structure.
 * This node can be a field, an attribute...
 *
 * @author pchretien
 */
public interface DataDescriptor {

	/**
	 * @return the name of the field
	 */
	String name();

	/**
	 * @return the cardinality (one, optional, many)
	 */
	Cardinality cardinality();

	/**
	 * @return the smartTypeDefinition
	 */
	SmartTypeDefinition smartTypeDefinition();

	//	/**
	//	 * Returns the way to access the data.
	//	 * @return the data accessor.
	//	 */
	//	DataAccessor getDataAccessor() {
	//		return dataAccessor;
	//	}

	/**
	 * Returns the class that holds the value .
	 * If cardinality is many it's either a list or a dtList, if not then it's the base type of the domain.
	 * @return the data accessor.
	 */
	default Class getTargetJavaClass() {
		return smartTypeDefinition().getJavaClass(cardinality());
	}
}
