/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import java.lang.reflect.Method;

import io.vertigo.dynamo.criteria.Criteria;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation;
import io.vertigo.dynamo.domain.metamodel.association.DtListURIForSimpleAssociation;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListURIForCriteria;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.impl.store.datastore.DataStorePlugin;
import io.vertigo.lang.Assertion;
import io.vertigo.util.ClassUtil;

/**
 * Impl�mentation du MasterDataStore qui permet l'impl�mentation manuel des m�thodes de chargement.
 * Ce Store appel un getteur dynamique pour les listes et les objets.
 * Les m�thodes doivent etre sur le prototype suivant :
 * public Famille getFamilleMDObject(final Object key) throws KSystemException;
 * public DtList<Famille> getFamilleMDList(final DtListURIForMasterData uri) throws KSystemException;
 *
 * @author npiedeloup
 * @version $Id: AbstractStaticDataStorePlugin.java,v 1.7 2014/08/04 16:57:50 npiedeloup Exp $
 */
public class AbstractStaticMDDataStorePlugin implements DataStorePlugin {

	private static final String DEFAULT_CONNECTION_NAME = "main";
	private final String dataSpace;

	protected AbstractStaticMDDataStorePlugin(final String dataSpace) {
		Assertion.checkArgNotEmpty(dataSpace);
		//-----
		this.dataSpace = dataSpace;
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
		Assertion.checkNotNull(dtDefinition);
		Assertion.checkNotNull(uri);
		//-----
		final String methodName = "get" + dtDefinition.getClassSimpleName() + "MDObject";
		return (E) invokeMethod(methodName, uri.getId());
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DtDefinition dtDefinition, final DtListURIForCriteria<E> uri) {
		Assertion.checkNotNull(dtDefinition);
		Assertion.checkNotNull(uri);
		Assertion.checkArgument(uri.getCriteria() == null, "This store could only load all data, not {0}", uri.getCriteria());
		//-----
		final String methodName = "get" + uri.getDtDefinition().getClassSimpleName() + "MDList";
		final DtList<E> dtList = (DtList<E>) invokeMethod(methodName, null);
		return dtList;
	}

	/** {@inheritDoc} */
	@Override
	public <D extends Entity> DtList<D> findAll(final DtDefinition dtDefinition, final DtListURIForNNAssociation uri) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <D extends Entity> DtList<D> findAll(final DtDefinition dtDefinition, final DtListURIForSimpleAssociation uri) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findByCriteria(final DtDefinition dtDefinition, final Criteria<E> criteria, final Integer maxRows) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullableForUpdate(final DtDefinition dtDefinition, final URI<?> uri) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public int count(final DtDefinition dtDefinition) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E create(final DtDefinition dtDefinition, final E dto) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public void update(final DtDefinition dtDefinition, final Entity dto) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final DtDefinition dtDefinition, final URI uri) {
		throw new UnsupportedOperationException();
	}

	private Object invokeMethod(final String methodName, final Object uri) {
		final Class<?>[] parameterTypes = uri == null ? new Class[0] : new Class[] { uri.getClass() };
		final Method method = ClassUtil.findMethod(this.getClass(), methodName, parameterTypes);

		//2. On "invoke" dynamiquement la méthode
		try {
			if (uri == null) {
				return ClassUtil.invoke(this, method);
			}
			return ClassUtil.invoke(this, method, uri);
		} catch (final Exception e) {
			throw new RuntimeException(this.getClass().getSimpleName(), e);
		}
	}

}
