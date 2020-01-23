package io.vertigo.dynamo.criteria.data;

import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;

public enum CriteriaTestSmartTypes {
	@SmartTypeDefinition(String.class)
	String,

	@SmartTypeDefinition(Integer.class)
	Integer,

	@SmartTypeDefinition(Long.class)
	Id;
}
