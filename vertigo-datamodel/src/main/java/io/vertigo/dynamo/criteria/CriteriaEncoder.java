package io.vertigo.dynamo.criteria;

import java.io.Serializable;

import io.vertigo.dynamo.domain.metamodel.DtFieldName;

public interface CriteriaEncoder {

	String encodeOperator(CriteriaCtx ctx, CriterionOperator criterionOperator, DtFieldName dtFieldName, Serializable[] values);

	String encodeLogicalOperator(CriteriaLogicalOperator logicalOperator);

	String getExpressionStartDelimiter();

	String getExpressionEndDelimiter();

}
