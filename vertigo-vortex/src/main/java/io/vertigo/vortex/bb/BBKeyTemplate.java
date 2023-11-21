/*
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
package io.vertigo.vortex.bb;

import io.vertigo.core.lang.Assertion;

public final class BBKeyTemplate {

	private final String keyTemplate;

	private BBKeyTemplate(final String keyTemplate) {
		Assertion.check()
				.isNotNull(keyTemplate);
		//---
		this.keyTemplate = keyTemplate;
	}

	public String keyTemplate() {
		return keyTemplate;
	}

	public BBKeyTemplate indent(final String prefix) {
		Assertion.check().isNotBlank(prefix);
		//---
		return BBKeyTemplate.of(prefix + keyTemplate);
	}

	public BBKeyTemplate outdent(final String prefix) {
		Assertion.check()
				.isNotBlank(prefix)
				.isTrue(keyTemplate.startsWith(prefix), "To outdent the keyTemplate '{0}' it must starts with the provided prefix '{1}' ", keyTemplate, prefix);
		//---
		return BBKeyTemplate.of(keyTemplate.substring(0, prefix.length() - 1));
	}

	public static BBKeyTemplate of(final String keyTemplate) {
		return new BBKeyTemplate(keyTemplate);
	}

	@Override
	public boolean equals(final Object obj) {
		return obj instanceof BBKeyTemplate && keyTemplate.equals(((BBKeyTemplate) obj).keyTemplate);
	}

	@Override
	public int hashCode() {
		return keyTemplate.hashCode();
	}

}
