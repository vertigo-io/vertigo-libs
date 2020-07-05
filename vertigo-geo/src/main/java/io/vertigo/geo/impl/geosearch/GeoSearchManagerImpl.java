package io.vertigo.geo.impl.geosearch;

import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.structure.metamodel.DtFieldName;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.geo.geocoder.GeoLocation;
import io.vertigo.geo.geosearch.GeoSearchManager;

public class GeoSearchManagerImpl implements GeoSearchManager {

	private static final int DEFAULT_MAX_ROWS = 1000;
	private static final int MAX_MAX_ROWS = 5000;

	private final GeoSearchPlugin geoSearchPlugin;

	@Inject
	public GeoSearchManagerImpl(
			final GeoSearchPlugin geoSearchPlugin) {
		Assertion.check().isNotNull(geoSearchPlugin);
		//---
		this.geoSearchPlugin = geoSearchPlugin;
	}

	@Override
	public <D extends DtObject> DtList<D> searchInBoundingBox(
			final GeoLocation topLeft,
			final GeoLocation bottomRight,
			final String indexName,
			final Class<D> dtIndexClass,
			final DtFieldName<D> fieldName,
			final Optional<Integer> maxRowsOpt) {
		Assertion.check()
				.when(maxRowsOpt.isPresent(), () -> Assertion.test()
						.isTrue(maxRowsOpt.get() < DEFAULT_MAX_ROWS, "Max rows must be lower than ", MAX_MAX_ROWS));
		//---
		return geoSearchPlugin.searchInBoundingBox(topLeft, bottomRight, indexName, dtIndexClass, fieldName, maxRowsOpt.orElse(DEFAULT_MAX_ROWS));
	}

}
