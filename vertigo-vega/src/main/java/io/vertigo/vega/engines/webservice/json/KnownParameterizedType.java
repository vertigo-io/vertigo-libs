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
package io.vertigo.vega.engines.webservice.json;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * ParameterizedType use for JsonDeserializer.
 * @author npiedeloup
 */
final class KnownParameterizedType implements ParameterizedType {
	private final Class<?> rawClass;
	private final Type[] typeArguments;

	KnownParameterizedType(final Class<?> rawClass, final Type paramType) {
		this(rawClass, new Type[] { paramType });
	}

	KnownParameterizedType(final Class<?> rawClass, final Type[] typeArguments) {
		this.rawClass = rawClass;
		this.typeArguments = typeArguments;
	}

	/** {@inheritDoc} */
	@Override
	public Type[] getActualTypeArguments() {
		return typeArguments;
	}

	/** {@inheritDoc} */
	@Override
	public Type getOwnerType() {
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public Type getRawType() {
		return rawClass;
	}
}
