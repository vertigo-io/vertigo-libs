package io.vertigo.geo.geosearch;

import java.util.Optional;

import io.vertigo.core.node.component.Manager;
import io.vertigo.datamodel.structure.metamodel.DtFieldName;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.geo.geocoder.GeoLocation;

public interface GeoSearchManager extends Manager {

	<D extends DtObject> DtList<D> searchInBoundingBox(
			final GeoLocation topLeft,
			final GeoLocation bottomRight,
			final String indexName,
			final Class<D> dtIndexClass,
			final DtFieldName<D> fieldName,
			final Optional<Integer> maxRowsOpt);

}
