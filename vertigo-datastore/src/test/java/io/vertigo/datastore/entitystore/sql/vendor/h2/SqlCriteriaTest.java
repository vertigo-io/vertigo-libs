/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.datastore.entitystore.sql.vendor.h2;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import org.h2.Driver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.AbstractTestCaseJU5;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.util.ListBuilder;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.entitystore.data.domain.car.Car;
import io.vertigo.datastore.entitystore.data.domain.car.CarDataBase;
import io.vertigo.datastore.entitystore.data.domain.famille.Famille.CarFields;
import io.vertigo.datastore.entitystore.sql.SqlDataStoreNodeConfig;
import io.vertigo.datastore.entitystore.sql.SqlUtil;

/**
 *
 */
public final class SqlCriteriaTest extends AbstractTestCaseJU5 {

	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private EntityStoreManager entityStoreManager;
	@Inject
	private TaskManager taskManager;

	@Override
	protected NodeConfig buildNodeConfig() {
		return SqlDataStoreNodeConfig.build(
				H2DataBase.class.getCanonicalName(),
				Driver.class.getCanonicalName(),
				"jdbc:h2:mem:database");
	}

	@Override
	protected void doSetUp() throws Exception {
		//A chaque test on recrée la table famille
		SqlUtil.execRequests(
				transactionManager,
				taskManager,
				getCreateCarRequests(),
				"TkInitMain",
				Optional.empty());
		final CarDataBase carDataBase = new CarDataBase();
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			for (final Car car : carDataBase.getAllCars()) {
				car.setId(null);
				entityStoreManager.create(car);
			}
			transaction.commit();
		}
	}

	protected List<String> getCreateCarRequests() {
		return new ListBuilder<String>()
				.add(" create table motor_type(MTY_CD varchar(50) , LABEL varchar(255))")
				.add("insert into motor_type(MTY_CD, LABEL) values ('ESSENCE', 'Essence')")
				.add("insert into motor_type(MTY_CD, LABEL) values ('DIESEL', 'Diesel')")
				.add(" create table car(ID BIGINT, FAM_ID BIGINT, MANUFACTURER varchar(50), MODEL varchar(255), DESCRIPTION varchar(512), YEAR INT, KILO INT, PRICE INT, CONSOMMATION NUMERIC(8,2), MTY_CD varchar(50) )")
				.add(" create sequence SEQ_CAR start with 10001 increment by 1")
				.build();
	}

	@Test
	public void assertCriteria() {
		try (VTransactionWritable tx = transactionManager.createCurrentTransaction()) {
			final DtDefinition dtDefinitionCar = DtObjectUtil.findDtDefinition(Car.class);
			final long count = entityStoreManager.find(dtDefinitionCar, Criterions.isEqualTo(CarFields.model, "passat"), DtListState.of(null)).size();
			Assertions.assertEquals(1, count);
		}
	}

}
