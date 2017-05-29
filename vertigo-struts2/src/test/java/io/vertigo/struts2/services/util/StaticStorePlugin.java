/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.struts2.services.util;

import javax.inject.Inject;
import javax.inject.Named;

import io.vertigo.app.Home;
import io.vertigo.core.component.Activeable;
import io.vertigo.dynamo.criteria.Criteria;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListURIForCriteria;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.plugins.store.datastore.AbstractStaticDataStorePlugin;
import io.vertigo.lang.Assertion;

/**
 * MasterDataStore for the static lists.
 * @author npiedeloup
 * @version $Id: TutoMasterDataStoreStatic.java,v 1.3 2014/06/27 12:21:39 pchretien Exp $
 */
public final class StaticStorePlugin extends AbstractStaticDataStorePlugin implements Activeable {
	private static final String DEFAULT_CONNECTION_NAME = "main";

	private final String values;
	private final String dtDefinitionName;

	private String dataSpace;
	private DtDefinition staticDtDefinition;
	private DtField idField;
	private DtField displayField;
	private DtList<Entity> dtc;

	/**
	 * A simpler storePlugin for static list.
	 * @param values comma separated list of key=value
	 * @param dtDefinitionName Definition of element
	 */
	@Inject
	public StaticStorePlugin(@Named("values") final String values, @Named("dtDefinitionName") final String dtDefinitionName) {
		super();
		Assertion.checkNotNull(dtDefinitionName);
		Assertion.checkArgNotEmpty(values);
		Assertion.checkArgument(values.contains("="), "StaticStorePlugin takes a list of key value like : key1=Label1;key2=Label2;...");
		//----
		this.dtDefinitionName = dtDefinitionName;
		this.values = values;
	}

	@Override
	public void start() {
		staticDtDefinition = Home.getApp().getDefinitionSpace().resolve(dtDefinitionName, DtDefinition.class);
		Assertion.checkArgument(staticDtDefinition.getIdField().isPresent(), "The Static MasterDataList {0} must have a IdField", staticDtDefinition.getClassSimpleName());
		Assertion.checkArgument(staticDtDefinition.getDisplayField().isPresent(), "The Static MasterDataList {0} must have a DisplayField", staticDtDefinition.getClassSimpleName());
		idField = staticDtDefinition.getIdField().get();
		displayField = staticDtDefinition.getDisplayField().get();
		dataSpace = staticDtDefinition.getDataSpace();
		//----
		dtc = new DtList<>(staticDtDefinition);
		final DataType keyDataType = staticDtDefinition.getIdField().get().getDomain().getDataType();
		final String[] splittedValues = values.split("\\s*[,;|]\\s*");
		for (final String splittedValue : splittedValues) {
			final String[] keyLabel = splittedValue.split("\\s*=\\s*");
			final Entity dto = createDtObject(castToType(keyLabel[0], keyDataType), keyLabel[1]);
			dtc.add(dto);
		}

	}

	@Override
	public void stop() {
		//nothing

	}

	private static Object castToType(final String key, final DataType keyDataType) {
		switch (keyDataType) {
			case Boolean:
				return Boolean.parseBoolean(key);
			case Integer:
				return Integer.valueOf(key);
			case Long:
				return Long.valueOf(key);
			case String:
				return key;
			default:
				throw new IllegalArgumentException("Not supported type : " + keyDataType.name());
		}
	}

	private Entity createDtObject(final Object key, final String display) {
		final Entity dto = Entity.class.cast(DtObjectUtil.createDtObject(staticDtDefinition));
		staticDtDefinition.getDisplayField().get();
		idField.getDataAccessor().setValue(dto, key);
		displayField.getDataAccessor().setValue(dto, display);
		return dto;
	}

	/** {@inheritDoc} */
	@Override
	public String getDataSpace() {
		return dataSpace;
	}

	/** {@inheritDoc} */
	@Override
	public String getConnectionName() {
		return DEFAULT_CONNECTION_NAME;
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullable(final DtDefinition dtDefinition, final URI<E> uri) {
		Assertion.checkArgument(dtDefinition.equals(staticDtDefinition), "This store should be use for {0} only, not {1}", staticDtDefinition.getClassSimpleName(), dtDefinition.getClassSimpleName());
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullableForUpdate(final DtDefinition dtDefinition, final URI<?> uri) {
		Assertion.checkArgument(dtDefinition.equals(staticDtDefinition), "This store should be use for {0} only, not {1}", staticDtDefinition.getClassSimpleName(), dtDefinition.getClassSimpleName());
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findByCriteria(final DtDefinition dtDefinition, final Criteria<E> criteria, final Integer maxRows) {
		Assertion.checkArgument(dtDefinition.equals(staticDtDefinition), "This store should be use for {0} only, not {1}", staticDtDefinition.getClassSimpleName(), dtDefinition.getClassSimpleName());
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DtDefinition dtDefinition, final DtListURIForCriteria<E> uri) {
		Assertion.checkNotNull(dtDefinition);
		Assertion.checkNotNull(uri);
		Assertion.checkArgument(dtDefinition.equals(staticDtDefinition), "This store should be use for {0} only, not {1}", staticDtDefinition.getClassSimpleName(), dtDefinition.getClassSimpleName());
		Assertion.checkArgument(uri.getCriteria() == null, "This store could only load all data, not {0}", uri.getCriteria());
		//----
		return (DtList<E>) dtc;
	}

}
