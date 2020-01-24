package io.vertigo.datamodel.criteria;

import java.io.Serializable;

import io.vertigo.datamodel.structure.metamodel.DtFieldName;

public interface CriteriaEncoder {

	String encodeOperator(CriteriaCtx ctx, CriterionOperator criterionOperator, DtFieldName dtFieldName, Serializable[] values);

	String encodeLogicalOperator(CriteriaLogicalOperator logicalOperator);

	String getExpressionStartDelimiter();

	String getExpressionEndDelimiter();

}
