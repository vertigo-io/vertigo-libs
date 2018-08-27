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
package io.vertigo.ui.services.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import io.vertigo.dynamo.criteria.Criteria;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListURIForCriteria;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.plugins.store.datastore.AbstractStaticDataStorePlugin;
import io.vertigo.lang.Assertion;
import io.vertigo.ui.domain.DtDefinitions;
import io.vertigo.ui.domain.reference.Commune;

/**
 * Loader of Commune masterdata file.
 * @author npiedeloup (6 févr. 2015 10:38:17)
 */
public final class CommuneStorePlugin extends AbstractStaticDataStorePlugin {
	private static final String DEFAULT_CONNECTION_NAME = "main";

	/** {@inheritDoc} */
	@Override
	public String getDataSpace() {
		return "inseeCsv";
	}

	/** {@inheritDoc} */
	@Override
	public String getConnectionName() {
		return DEFAULT_CONNECTION_NAME;
	}

	@Override
	public <E extends Entity> E readNullable(final DtDefinition dtDefinition, final URI<E> uri) {
		//La liste est grande, donc configurée pour être chargée par morceau.
		//Mais cette implé de POC, ne le fait pas et utilise la liste complète
		for (final Commune commune : loadAllCommunes()) {
			if (uri.equals(commune.getURI())) {
				return (E) commune;
			}
		}
		return null; //comme le contrat : nullable

	}

	@Override
	public <E extends Entity> E readNullableForUpdate(final DtDefinition dtDefinition, final URI<?> uri) {
		throw new UnsupportedOperationException();
	}

	@Override
	public <E extends Entity> DtList<E> findByCriteria(final DtDefinition dtDefinition, final Criteria<E> criteria, final Integer maxRows) {
		throw new UnsupportedOperationException();
	}

	/** {@inheritDoc} */
	@Override
	public <D extends Entity> DtList<D> findAll(final DtDefinition dtDefinition, final DtListURIForCriteria<D> uri) {
		Assertion.checkNotNull(dtDefinition);
		Assertion.checkNotNull(uri);
		Assertion.checkArgument(DtDefinitions.Definitions.Commune.name().equals(dtDefinition.getClassSimpleName()), "This store should be use for Commune only, not {0}",
				dtDefinition.getClassSimpleName());
		Assertion.checkArgument(uri.getCriteria() == null, "This store could only load all data, not {0}", uri.getCriteria());
		//----
		return (DtList<D>) loadAllCommunes();
	}

	private DtList<Commune> loadAllCommunes() {
		final String fileName = "/data/insee.csv";
		try (final InputStream inputStream = getClass().getResourceAsStream(fileName)) {
			Assertion.checkNotNull(inputStream, "fichier non trouvé : {0}", fileName);
			try (final BufferedReader rd = new BufferedReader(new InputStreamReader(inputStream))) {
				final DtList<Commune> dtc = new DtList<>(Commune.class);
				String line;
				while ((line = rd.readLine()) != null) {
					dtc.add(readCommune(line));
					//if (dtc.size() > 1000) {
					//break;
					//}
				}
				return dtc;
			}
		} catch (final IOException e) {
			throw new RuntimeException(e);
		}
	}

	private Commune readCommune(final String line) {
		final Commune commune = new Commune();
		final String[] params = line.split(";");
		// System.out.println(params[0]);
		// On complete le code commune à 5 caractères quand il existe (exception : Lajoux)
		commune.setCommune(params[0]);
		if (params[1].length() > 0) {
			if (params[1].length() == 4) {
				params[1] = "0" + params[1];
			}

			commune.setCodePostal(params[1]);
		}
		commune.setDepartement(params[2]);
		commune.setIdInsee(Long.valueOf(params[3]));
		return commune;
	}

}
