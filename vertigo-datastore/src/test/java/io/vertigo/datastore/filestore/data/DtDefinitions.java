package io.vertigo.datastore.filestore.data;

import java.util.Iterator;

import io.vertigo.core.util.ListBuilder;
import io.vertigo.datastore.filestore.data.domain.VxFileInfo;

public final class DtDefinitions implements Iterable<Class<?>> {

	@Override
	public Iterator<Class<?>> iterator() {
		return new ListBuilder<Class<?>>()
				.add(VxFileInfo.class)
				.build()
				.iterator();
	}

}
