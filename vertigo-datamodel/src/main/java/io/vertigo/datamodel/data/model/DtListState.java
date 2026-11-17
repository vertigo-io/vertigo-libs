/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.data.model;

import java.util.Optional;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.Param;
import io.vertigo.core.param.ParamManager;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * DtList state : sorting and paging informations
 *
 * @author npiedeloup
 */
public final class DtListState {
	private static final int ABSOLUTE_MAX_ROWS = 5000;
	/** Default max rows, when the param DT_LIST_DEFAULT_MAX_ROWS is not set : use getDefaultMaxRows() to get the applied value. */
	public static final int DEFAULT_MAX_ROWS = 250;
	private static final String DEFAULT_MAX_ROWS_PARAM_NAME = "DT_LIST_DEFAULT_MAX_ROWS";
	private static volatile int defaultMaxRows; //0 : not read yet ; read once, all nodes share the same configuration

	private final Optional<String> sortFieldName;
	private final Optional<Boolean> sortDesc;
	private final int skipRows;
	private final Optional<Integer> maxRows;

	/**
	 * @param entityClass entity class : gives the default sort field and direction
	 * @return the default state of the entity lists : default max rows (see getDefaultMaxRows), default sort
	 */
	public static DtListState defaultOf(final Class<? extends Entity> entityClass) {
		final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(entityClass);
		return new DtListState(getDefaultMaxRows(), 0, dataDefinition.getSortField().map(DataField::name).orElse(null), dataDefinition.getSortDesc().orElse(false));
	}

	/**
	 * Default max rows of the lists : the param DT_LIST_DEFAULT_MAX_ROWS (from the ParamManager), DEFAULT_MAX_ROWS if not set.
	 * The param is read once.
	 * @return the default max rows
	 */
	public static int getDefaultMaxRows() {
		int maxRowsValue = defaultMaxRows;
		if (maxRowsValue == 0) {
			//no lock : at worst, several threads read the same param on the first calls
			maxRowsValue = Node.getNode().getComponentSpace().resolve(ParamManager.class)
					.getOptionalParam(DEFAULT_MAX_ROWS_PARAM_NAME)
					.map(Param::getValueAsInt)
					.orElse(DEFAULT_MAX_ROWS);
			Assertion.check().isTrue(maxRowsValue > 0 && maxRowsValue <= ABSOLUTE_MAX_ROWS,
					"Param {0} must be between 1 and {1} ({2})", DEFAULT_MAX_ROWS_PARAM_NAME, ABSOLUTE_MAX_ROWS, maxRowsValue);
			defaultMaxRows = maxRowsValue;
		}
		return maxRowsValue;
	}

	/**
	 * @param maxRows max returning elements (null if not use)
	 * skipRows elements to skip (mandatory, 0 by default)
	 */
	public static DtListState of(final Integer maxRows) {
		return new DtListState(maxRows, 0, null, null);
	}

	/**
	 * @param maxRows max returning elements (null if not use)
	 * @param skipRows elements to skip (mandatory, 0 by default)
	 * @param sortFieldName sort fieldName (null if not use)
	 * @param sortDesc desc or asc order (null if not use)
	 */
	public static DtListState of(
			final Integer maxRows,
			final int skipRows,
			final String sortFieldName,
			final Boolean sortDesc) {
		return new DtListState(maxRows, skipRows, sortFieldName, sortDesc);
	}

	/**
	 * Added default properties to another DtListState.
	 * @param maxRows max returning elements (null if not use)
	 * @param sortFieldName sort fieldName (null if not use)
	 * @param sortDesc desc or asc order (null if not use)
	 */
	public DtListState withDefault(
			final Integer defaultMaxRows,
			final DataFieldName defaultSortFieldName,
			final Boolean defaultSortDesc) {
		if ((maxRows.isPresent() || defaultMaxRows == null)
				&& (sortFieldName.isPresent() || defaultSortFieldName == null)
				&& (sortDesc.isPresent() || defaultSortDesc == null)) {
			return this; //optim to avoid new DtListState if obvious unnecessary
		}
		final String defaultSortFieldNameAsString = defaultSortFieldName != null ? defaultSortFieldName.name() : null;
		return new DtListState(maxRows.orElse(defaultMaxRows), skipRows, sortFieldName.orElse(defaultSortFieldNameAsString), sortDesc.orElse(defaultSortDesc));
	}

	public DtListState withLimit(final Integer limitMaxRows) {
		if (limitMaxRows == null
				|| maxRows.isPresent() && maxRows.get() <= limitMaxRows) {
			return this; //optim to avoid new DtListState if obvious unnecessary
		}
		return new DtListState(limitMaxRows, skipRows, sortFieldName.orElse(null), sortDesc.orElse(null));
	}

	/**
	 * @param maxRows max returning elements (null if not use)
	 * @param skipRows elements to skip (mandatory, 0 by default)
	 * @param sortFieldName sort fieldName (null if not use)
	 * @param sortDesc desc or asc order (null if not use)
	 */
	private DtListState(
			final Integer maxRows,
			final int skipRows,
			final String sortFieldName,
			final Boolean sortDesc) {
		Assertion.check()
				.when(maxRows != null, () -> Assertion.check()
						.isTrue(maxRows != Integer.MAX_VALUE, " maxRows should be null")
						.isTrue(maxRows > 0, "maxRows must be positive ({0})", maxRows)
						.isTrue(maxRows <= ABSOLUTE_MAX_ROWS, "maxRows must be less than {0}", ABSOLUTE_MAX_ROWS))
				.isTrue(skipRows >= 0, "skipRows must be positive ({0})", skipRows)
				.when(sortFieldName != null, () -> Assertion.check()
						.isTrue(sortDesc != null, "When sorting, sortFieldName and sortDesc are both mandatory."));
		//-----
		this.maxRows = Optional.ofNullable(maxRows);
		this.skipRows = skipRows;
		this.sortFieldName = Optional.ofNullable(sortFieldName);
		this.sortDesc = Optional.ofNullable(sortDesc);
	}

	/**
	 * @return max returning elements
	 */
	public Optional<Integer> getMaxRows() {
		return maxRows;
	}

	/**
	 * @return elements to skip
	 */
	public int getSkipRows() {
		return skipRows;
	}

	/**
	 * @return sort fieldName
	 */
	public Optional<String> getSortFieldName() {
		return sortFieldName;
	}

	/**
	 * @return  desc or asc order
	 */
	public Optional<Boolean> isSortDesc() {
		return sortDesc;
	}
}
