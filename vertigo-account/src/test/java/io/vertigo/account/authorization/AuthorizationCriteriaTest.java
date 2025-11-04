/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.authorization;

import java.io.Serializable;
import java.util.Map;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.account.authorization.SecurityNames.RecordAuthorizations;
import io.vertigo.account.authorization.SecurityNames.RecordOperations;
import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.OperationName;
import io.vertigo.account.data.model.Record;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.definition.DefinitionSpace;

/**
 * @author skerdudou
 */
public final class AuthorizationCriteriaTest {

	private static final String SELECT_NO_ACCESS = "select * from record where 0=1";
	private static final String ELASTIC_NO_ACCESS = "";

	//	private static final long DEFAULT_REG_ID = 1L;
	//	private static final long DEFAULT_DEP_ID = 2L;
	//	private static final long DEFAULT_COM_ID = 3L;
	private static final long DEFAULT_UTI_ID = 1000L;
	private static final long DEFAULT_TYPE_ID = 10L;
	private static final double DEFAULT_MONTANT_MAX = 100d;

	@Inject
	private VSecurityManager securityManager;

	@Inject
	private AuthorizationManager authorizationManager;

	private AutoCloseableNode node;

	@BeforeEach
	public void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return MyNodeConfig.config();
	}

	@Test
	public void testAsSqlFrom() {
		// Test with no authorizations
		assertSqlCriteria(RecordOperations.read, SELECT_NO_ACCESS);
		assertSqlCriteria(RecordOperations.write, SELECT_NO_ACCESS);
		assertSqlCriteria(RecordOperations.create, SELECT_NO_ACCESS);
		assertSqlCriteria(RecordOperations.delete, SELECT_NO_ACCESS);

		// Test with some authorizations
		final Authorization recRead = getAuthorization(RecordAuthorizations.AtzRecord$read);
		final Authorization recReadHp = getAuthorization(RecordAuthorizations.AtzRecord$readHp);
		final Authorization recWrite = getAuthorization(RecordAuthorizations.AtzRecord$write);
		final Authorization recCreate = getAuthorization(RecordAuthorizations.AtzRecord$create);

		withUserAuthorizations(DEFAULT_UTI_ID, new Authorization[] { recRead, recWrite, recCreate }, () -> {
			assertSqlCriteria(RecordOperations.read, "select * from record where (AMOUNT <= 100.0 OR UTI_ID_OWNER = 1000)");
			assertSqlCriteria(RecordOperations.write,
					"select * from record where ((UTI_ID_OWNER = 1000 AND ETA_CD in ('CRE', 'VAL', 'PUB', 'NOT', 'REA')) OR (TYP_ID = 10 AND AMOUNT > 0.0 AND AMOUNT <= 100.0 AND ETA_CD in ('CRE', 'VAL', 'PUB', 'NOT', 'REA')))");
			assertSqlCriteria(RecordOperations.create, "select * from record where (TYP_ID = 10 AND AMOUNT <= 100.0)");
			assertSqlCriteria(RecordOperations.delete, SELECT_NO_ACCESS);
		});
		withUserAuthorizations(DEFAULT_UTI_ID, new Authorization[] { recReadHp, recWrite, recCreate }, () -> {
			assertSqlCriteria(RecordOperations.read, "select * from record where 1=1");
			assertSqlCriteria(RecordOperations.write,
					"select * from record where ((UTI_ID_OWNER = 1000 AND ETA_CD in ('CRE', 'VAL', 'PUB', 'NOT', 'REA')) OR (TYP_ID = 10 AND AMOUNT > 0.0 AND AMOUNT <= 100.0 AND ETA_CD in ('CRE', 'VAL', 'PUB', 'NOT', 'REA')))");
			assertSqlCriteria(RecordOperations.create, "select * from record where (TYP_ID = 10 AND AMOUNT <= 100.0)");
			assertSqlCriteria(RecordOperations.delete, SELECT_NO_ACCESS);
		});
	}

	@Test
	public void testAsElasticQuery() {
		// Test with no authorizations
		assertSearchCriteria(RecordOperations.read, ELASTIC_NO_ACCESS);
		assertSearchCriteria(RecordOperations.write, ELASTIC_NO_ACCESS);
		assertSearchCriteria(RecordOperations.create, ELASTIC_NO_ACCESS);
		assertSearchCriteria(RecordOperations.delete, ELASTIC_NO_ACCESS);

		// Test with some authorizations
		final Authorization recRead = getAuthorization(RecordAuthorizations.AtzRecord$read);
		final Authorization recReadHp = getAuthorization(RecordAuthorizations.AtzRecord$readHp);
		final Authorization recWrite = getAuthorization(RecordAuthorizations.AtzRecord$write);
		final Authorization recCreate = getAuthorization(RecordAuthorizations.AtzRecord$create);

		withUserAuthorizations(DEFAULT_UTI_ID, new Authorization[] { recRead, recWrite, recCreate }, () -> {
			assertSearchCriteria(RecordOperations.read, "(+amount:<=100.0) (+utiIdOwner:1000)");
			assertSearchCriteria(RecordOperations.write,
					"(+utiIdOwner:1000 +etaCd:('CRE' 'VAL' 'PUB' 'NOT' 'REA')) (+typId:10 +amount:>0 +amount:<=100.0 +etaCd:('CRE' 'VAL' 'PUB' 'NOT' 'REA'))");
			assertSearchCriteria(RecordOperations.create, "(+typId:10 +amount:<=100.0)");
			assertSearchCriteria(RecordOperations.delete, ELASTIC_NO_ACCESS);
		});
		withUserAuthorizations(DEFAULT_UTI_ID, new Authorization[] { recReadHp, recWrite, recCreate }, () -> {
			assertSearchCriteria(RecordOperations.read, "(*:*)");
			assertSearchCriteria(RecordOperations.write,
					"(+utiIdOwner:1000 +etaCd:('CRE' 'VAL' 'PUB' 'NOT' 'REA')) (+typId:10 +amount:>0 +amount:<=100.0 +etaCd:('CRE' 'VAL' 'PUB' 'NOT' 'REA'))");
			assertSearchCriteria(RecordOperations.create, "(+typId:10 +amount:<=100.0)");
			assertSearchCriteria(RecordOperations.delete, ELASTIC_NO_ACCESS);
		});
	}

	@Test
	public void testWildcardAuthorization() {
		// Test with wildcard authorization
		final Authorization recWrite = getAuthorization(RecordAuthorizations.AtzRecord$write);

		withUserAuthorizations(UserAuthorizations.SECURITY_KEY_ALL_VALUES, new Authorization[] { recWrite }, () -> {
			assertSqlCriteria(RecordOperations.write,
					"select * from record where ((1=1 AND ETA_CD in ('CRE', 'VAL', 'PUB', 'NOT', 'REA')) OR (TYP_ID = 10 AND AMOUNT > 0.0 AND AMOUNT <= 100.0 AND ETA_CD in ('CRE', 'VAL', 'PUB', 'NOT', 'REA')))");
			assertSearchCriteria(RecordOperations.write, "(+*:* +etaCd:('CRE' 'VAL' 'PUB' 'NOT' 'REA')) (+typId:10 +amount:>0 +amount:<=100.0 +etaCd:('CRE' 'VAL' 'PUB' 'NOT' 'REA'))");
		});
	}

	private void withUserAuthorizations(final Serializable utiId, final Authorization[] authorizations, final Runnable testLogic) {
		final UserSession userSession = securityManager.createUserSession();
		try {
			securityManager.startCurrentUserSession(userSession);
			authorizationManager.obtainUserAuthorizations()
					.withSecurityKeys("utiId", utiId)
					.withSecurityKeys("typId", DEFAULT_TYPE_ID)
					.withSecurityKeys("montantMax", DEFAULT_MONTANT_MAX);
			for (final Authorization authorization : authorizations) {
				authorizationManager.obtainUserAuthorizations().addAuthorization(authorization);
			}
			testLogic.run();
		} finally {
			securityManager.stopCurrentUserSession();
		}
	}

	private void assertSqlCriteria(final OperationName<Record> operation, final String expectedSql) {
		final var sqlCriteria = AuthorizationUtil.authorizationCriteria(Record.class, operation);
		Assertions.assertEquals(expectedSql, sqlCriteria.asSqlFrom("record", Map.of()));
	}

	private void assertSearchCriteria(final OperationName<Record> operation, final String elasticStringQuery) {
		final var queryString = AuthorizationUtil.getSearchSecurity(Record.class, operation);
		Assertions.assertEquals(elasticStringQuery, queryString);
	}

	private Authorization getAuthorization(final AuthorizationName authorizationName) {
		final DefinitionSpace definitionSpace = node.getDefinitionSpace();
		return definitionSpace.resolve(authorizationName.name(), Authorization.class);
	}

}
