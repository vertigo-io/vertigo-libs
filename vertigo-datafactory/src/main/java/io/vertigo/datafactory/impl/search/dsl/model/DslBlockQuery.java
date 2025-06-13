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

import java.util.List;

import io.vertigo.core.lang.Assertion;

/**
 * Block queries definition.
 * (preBody)\((query|rangeQuery|multiQuery|fixedQuery)+\)(postBody)
 * @author npiedeloup
 */
public final class DslBlockQuery implements DslQuery {
	private final String preBody;
	private final List<DslQuery> queries;
	private final String postBody;

	/**
	 * @param preBody String before body
	 * @param queries List of queries
	 * @param postBody String after body
	 */
	public DslBlockQuery(final String preBody, final List<DslQuery> queries, final String postBody) {
		Assertion.check()
				.isNotNull(preBody)
				.isNotNull(queries)
				.isNotNull(postBody);
		//-----
		this.preBody = preBody;
		this.queries = queries;
		this.postBody = postBody;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder()
				.append(preBody).append('(');
		for (final DslQuery query : queries) {
			sb.append(query);
		}
		sb.append(')').append(postBody);
		return sb.toString();
	}

	/**
	 * @return preBody
	 */
	public String getPreBody() {
		return preBody;
	}

	/**
	 * @return queries
	 */
	public List<DslQuery> getQueries() {
		return queries;
	}

	/**
	 * @return postBody
	 */
	public String getPostBody() {
		return postBody;
	}
}
