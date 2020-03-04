package io.vertigo.geo.impl.services.geosearch;

import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.structure.metamodel.DtFieldName;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.geo.services.geocoder.GeoLocation;
import io.vertigo.geo.services.geosearch.GeoSearchServices;

public class GeoSearchServicesImpl implements GeoSearchServices {

	private static final int DEFAULT_MAX_ROWS = 1000;
	private static final int MAX_MAX_ROWS = 5000;

	private final GeoSearchPlugin geoSearchPlugin;

	@Inject
	public GeoSearchServicesImpl(
			final GeoSearchPlugin geoSearchPlugin) {
		Assertion.checkNotNull(geoSearchPlugin);
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
		Assertion.when(maxRowsOpt.isPresent()).check(() -> maxRowsOpt.get() < DEFAULT_MAX_ROWS, "Max rows must be lower than ", MAX_MAX_ROWS);
		return geoSearchPlugin.searchInBoundingBox(topLeft, bottomRight, indexName, dtIndexClass, fieldName, maxRowsOpt.orElse(DEFAULT_MAX_ROWS));
	}

}
