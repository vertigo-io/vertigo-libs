package io.vertigo.datamodel.structure.util;

import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.smarttype.DataTypeMapper;
import io.vertigo.datamodel.structure.model.DtObject;

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
