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
package io.vertigo.datafactory.impl.search.dsl.model;

import io.vertigo.core.lang.Assertion;

/**
 * One user criteria.
 * A user query is many DslUserCriteria.
 * @author npiedeloup
 */
public final class DslUserCriteria {
	private final String preMissingPart;
	private final String overridedFieldName;
	private final String overridedPreModifier;
	private final String criteriaWord;
	private final String overridedPostModifier;
	private final String postMissingPart;

	/**
	 * @param preMissingPart Optional pre missing part
	 * @param overridedFieldName Optional overrided fieldName
	 * @param overridedPreModifier Optional overrided word pre modifier
	 * @param criteriaWord Criteria word
	 * @param overridedPostModifier Optional overrided word post modifier
	 * @param postMissingPart Optional post missing part
	 */
	public DslUserCriteria(
			final String preMissingPart,
			final String overridedFieldName,
			final String overridedPreModifier,
			final String criteriaWord,
			final String overridedPostModifier,
			final String postMissingPart) {
		Assertion.check()
				.isNotNull(preMissingPart)
				.isNotNull(overridedFieldName)
				.isNotNull(overridedPreModifier)
				.isNotBlank(criteriaWord)
				.isNotNull(overridedPostModifier)
				.isNotNull(postMissingPart);
		//-----
		this.preMissingPart = preMissingPart;
		this.overridedFieldName = overridedFieldName;
		this.overridedPreModifier = overridedPreModifier;
		this.criteriaWord = criteriaWord;
		this.overridedPostModifier = overridedPostModifier;
		this.postMissingPart = postMissingPart;
	}

	/**
	 * @return preMissingPart
	 */
	public String getPreMissingPart() {
		return preMissingPart;
	}

	/**
	 * @return overridedFieldName
	 */
	public String getOverridedFieldName() {
		return overridedFieldName;
	}

	/**
	 * @return overridedPreModifier
	 */
	public String getOverridedPreModifier() {
		return overridedPreModifier;
	}

	/**
	 * @return criteriaWord
	 */
	public String getCriteriaWord() {
		return criteriaWord;
	}

	/**
	 * @return overridedPostModifier
	 */
	public String getOverridedPostModifier() {
		return overridedPostModifier;
	}

	/**
	 * @return postMissingPart
	 */
	public String getPostMissingPart() {
		return postMissingPart;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return preMissingPart +
                overridedFieldName +
                overridedPreModifier +
                criteriaWord +
                overridedPostModifier +
                postMissingPart;
	}
}
