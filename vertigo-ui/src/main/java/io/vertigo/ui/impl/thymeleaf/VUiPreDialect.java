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
package io.vertigo.ui.impl.thymeleaf;

import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;

import io.vertigo.ui.impl.thymeleaf.components.AuthzAttributeTagProcessor;

/**
 * Dialect to add some processor as same precedence as th standard processors.
 * Needed for attributs which must be supported on th:block (th:block removed the tag AND all attributs)
 */
public final class VUiPreDialect extends AbstractProcessorDialect {

	public static final String NAME = "VertigoPre";
	public static final String PREFIX = "vu";
	public static final int PROCESSOR_PRECEDENCE = 1000;

	public VUiPreDialect() {
		super(NAME, PREFIX, PROCESSOR_PRECEDENCE);
	}

	public VUiPreDialect(final String prefix) {
		super(NAME, prefix, PROCESSOR_PRECEDENCE);
	}

	@Override
	public Set<IProcessor> getProcessors(final String dialectPrefix) {
		return Set.of(new AuthzAttributeTagProcessor(dialectPrefix));
	}
}
