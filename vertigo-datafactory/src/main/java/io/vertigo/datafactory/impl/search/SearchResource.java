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
package io.vertigo.datafactory.impl.search;

import io.vertigo.core.locale.LocaleMessageKey;

/**
 * Dictionnaire des ressources.
 *
 * @author  npiedeloup
 */
public enum SearchResource implements LocaleMessageKey {
	/**
	 * Search syntax error.\nDon't use ( ) [ ] or check you closed them. OR and AND are supported but must be between two keywords.
	 */
	DATAFACTORY_SEARCH_QUERY_SYNTAX_ERROR,

	/**
	 * Search index struct error.\nSorted or aggregated fields must be declared as keyword, sortable or facetable in your SmartType.
	 */
	DATAFACTORY_SEARCH_INDEX_FIELDDATA_ERROR,

}
