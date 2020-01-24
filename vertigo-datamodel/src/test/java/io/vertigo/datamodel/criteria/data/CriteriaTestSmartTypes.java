package io.vertigo.datamodel.criteria.data;

import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;

public enum CriteriaTestSmartTypes {
	@SmartTypeDefinition(String.class)
	String,

	@SmartTypeDefinition(Integer.class)
	Integer,

	@SmartTypeDefinition(Long.class)
	Id;
}
