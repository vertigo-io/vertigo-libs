package io.vertigo.dynamo.domain.data;

import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;

public enum TestSmartTypes {

	@SmartTypeDefinition(String.class)
	String,

	@SmartTypeDefinition(Long.class)
	Id;
}
