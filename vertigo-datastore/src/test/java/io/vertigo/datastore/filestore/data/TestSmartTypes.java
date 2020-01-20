package io.vertigo.datastore.filestore.data;

import java.time.Instant;

import io.vertigo.core.lang.DataStream;
import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeProperty;

public enum TestSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	String,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Long,

	@SmartTypeDefinition(Instant.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "TIMESTAMP")
	Instant,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Id,

	@SmartTypeDefinition(DataStream.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "BLOB")
	Stream,

}
