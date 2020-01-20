package io.vertigo.dynamo.domain.util;

import io.vertigo.core.util.ClassUtil;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.ngdomain.DataTypeMapper;

public class JsonMapper implements DataTypeMapper<DtObject, String> {

	@Override
	public DtObject from(final String destination, final Class<DtObject> type) {
		return ClassUtil.newInstance(type);
	}

	@Override
	public String to(final DtObject source, final Class<DtObject> type) {
		return "";
	}

}
