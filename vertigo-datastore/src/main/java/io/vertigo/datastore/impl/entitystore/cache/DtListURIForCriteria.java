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
package io.vertigo.datastore.impl.entitystore.cache;

import java.io.Serializable;
import java.util.Arrays;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.CriteriaCtx;
import io.vertigo.datamodel.criteria.CriteriaEncoder;
import io.vertigo.datamodel.criteria.CriteriaLogicalOperator;
import io.vertigo.datamodel.criteria.CriterionOperator;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.DtListURI;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * Implementation d'une liste filtré par un Criteria.
 * @author dchallas
 * @param <E> the type of entity
 */
final class DtListURIForCriteria<E extends Entity> extends DtListURI {
	private static final long serialVersionUID = 7926630153187124165L;

	private static final String CRITERIA_PREFIX = "CRITERIA";

	private final String sortFieldName;
	private final Boolean sortDesc;
	private final int skipRows;
	private final Integer maxRows;

	private final Criteria<E> criteria;

	/**
	 * Constructor.
	 *  @param dataDefinition Id de la Définition de DT
	 * @param criteria critere
	 * @param dtListState Etat de la liste : Sort, Top, Offset
	 */
	DtListURIForCriteria(final DataDefinition dataDefinition, final Criteria<E> criteria, final DtListState dtListState) {
		super(dataDefinition);
		Assertion.check()
				.isNotNull(criteria)
				.isNotNull(dtListState);
		this.criteria = criteria;
		this.sortFieldName = dtListState.getSortFieldName().orElse(null);
		this.sortDesc = dtListState.isSortDesc().orElse(null);
		this.skipRows = dtListState.getSkipRows();
		this.maxRows = dtListState.getMaxRows().orElse(null);
	}

	/**
	 * @return Criteres de la liste
	 */
	public Criteria<E> getCriteria() {
		return criteria;
	}

	/**
	 * @return Nombre de lignes max
	 */
	public DtListState getDtListState() {
		return DtListState.of(maxRows, skipRows, sortFieldName, sortDesc);
	}

	/**
	* Construit automatiquement un Criteria à partir d'un DtObject de critère.
	* Les noms des champs dans l'objet de critère doivent correspondre à ceux de l'objet métier.
	* @param dtoCriteria Objet de critère
	* @return Criteria resultant
	*/
	public static <E extends Entity> Criteria<E> createCriteria(final DataObject dtoCriteria) {
		Assertion.check().isNotNull(dtoCriteria);
		//-----
		final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(dtoCriteria);

		Criteria<E> criteria = Criterions.alwaysTrue();
		for (final DataField field : dataDefinition.getFields()) {
			final String fieldName = field.name();
			if (field.getType() != DataField.FieldType.COMPUTED) {
				final Object value = field.getDataAccessor().getValue(dtoCriteria);
				if (value instanceof String && field.getType() != DataField.FieldType.FOREIGN_KEY) {
					//si String et pas une FK : on met en préfix
					criteria = criteria.and(Criterions.startsWith(() -> fieldName, (String) value));
				} else if (value != null) {
					criteria = criteria.and(Criterions.isEqualTo(() -> fieldName, (Serializable) value));
				}
			}
			//si null, alors on ne filtre pas
		}
		return criteria;
	}

	@Override
	public String buildUrn() {
		final String sizeUrn = D2A_SEPARATOR + (skipRows != 0 ? skipRows + "-" : "") + (maxRows != null ? String.valueOf(maxRows) : "ALL");
		final String sortUrn = sortFieldName != null ? D2A_SEPARATOR + sortFieldName + (sortDesc != null ? sortDesc ? "-Desc" : "-Asc" : "") : "";
		return CRITERIA_PREFIX + sizeUrn + sortUrn + D2A_SEPARATOR + getCriteriaHashCode();
	}

	private int getCriteriaHashCode() {
		return getCriteria().toStringAnCtx(new CriteriaEncoder() {
			@Override
			public String encodeOperator(final CriteriaCtx ctx, final CriterionOperator criterionOperator, final DataFieldName dataFieldName, final Serializable[] values) {
				return criterionOperator.name() + "-" + dataFieldName.name() + "@" + Arrays.hashCode(values);
			}

			@Override
			public String encodeLogicalOperator(final CriteriaLogicalOperator logicalOperator) {
				return logicalOperator.name();
			}

			@Override
			public String getExpressionStartDelimiter() {
				return "(";
			}

			@Override
			public String getExpressionEndDelimiter() {
				return ")";
			}
		}).val1().hashCode();
	}
}
