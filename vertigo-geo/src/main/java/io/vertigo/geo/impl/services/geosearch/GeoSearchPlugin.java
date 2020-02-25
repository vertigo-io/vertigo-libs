package io.vertigo.geo.impl.services.geosearch;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.datamodel.structure.metamodel.DtFieldName;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.geo.services.geocoder.GeoLocation;

public interface GeoSearchPlugin extends Plugin {

	<D extends DtObject> DtList<D> searchInBoundingBox(final GeoLocation topLeft, final GeoLocation bottomRight, final String indexName, final Class<D> dtIndexClass, final DtFieldName<D> fieldName);
}
