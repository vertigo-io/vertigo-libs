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
package io.vertigo.x.audit;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.util.DateBuilder;

/**
 * Junit for audit manager
 * @author xdurand
 *
 */
public class AuditManagerTest {

	private AutoCloseableApp app;

	@Inject
	private AuditManager auditManager;

	/**
	 * Setup
	 */
	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	/**
	 * Teardown
	 */
	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	/**
	 * Add/Get Test for audit trace
	 */
	@Test
	public void testAddAuditTrace() {
		final AuditTrace auditTrace = new AuditTraceBuilder("CAT1", "USER1", 1L, "My message 1").build();

		auditManager.addTrace(auditTrace);
		final AuditTrace auditFetch = auditManager.getTrace(auditTrace.getId());

		assertThat(auditFetch).isEqualToIgnoringGivenFields(auditTrace, "id");
	}

	/**
	 * Find Test for audit trace
	 */
	@Test
	public void testFindAuditTrace() {
		final AuditTrace auditTrace1 = new AuditTraceBuilder("CAT2", "USER2", 2L, "My message 2").build();
		auditManager.addTrace(auditTrace1);

		final AuditTrace auditTrace2 = new AuditTraceBuilder("CAT3", "USER3", 3L, "My message 3")
				.withDateBusiness(new Date())
				.withContext(Arrays.asList("Context 3"))
				.build();

		auditManager.addTrace(auditTrace2);

		//Criteria Category
		final AuditTraceCriteria atc1 = new AuditTraceCriteriaBuilder().withCategory("CAT2").build();
		final List<AuditTrace> auditTraceFetch1 = auditManager.findTrace(atc1);

		assertThat(auditTraceFetch1).hasSize(1);
		assertThat(auditTraceFetch1).usingFieldByFieldElementComparator().contains(auditTrace1);

		final Date dateJMinus1 = new DateBuilder(new Date()).addDays(-1).build();
		final Date dateJPlus1 = new DateBuilder(new Date()).addDays(1).build();

		//Criteria Business Date
		final AuditTraceCriteria auditTraceCriteria2 = new AuditTraceCriteriaBuilder()
				.withDateBusinessStart(dateJMinus1)
				.withDateBusinessEnd(dateJPlus1)
				.build();

		final List<AuditTrace> auditTraceFetch2 = auditManager.findTrace(auditTraceCriteria2);

		assertThat(auditTraceFetch2).hasSize(1);
		assertThat(auditTraceFetch2).usingFieldByFieldElementComparator().contains(auditTrace2);

		//Criteria Exec Date
		final AuditTraceCriteria auditTraceCriteria3 = new AuditTraceCriteriaBuilder()
				.withDateExecutionStart(dateJMinus1)
				.withDateExecutionEnd(dateJPlus1)
				.build();
		final List<AuditTrace> auditTraceFetch3 = auditManager.findTrace(auditTraceCriteria3);

		assertThat(auditTraceFetch3).hasSize(2);
		assertThat(auditTraceFetch3).usingFieldByFieldElementComparator().contains(auditTrace1, auditTrace2);

		//Criteria Item
		final AuditTraceCriteria auditTraceCriteria4 = new AuditTraceCriteriaBuilder().withItem(2L).build();
		final List<AuditTrace> auditTraceFetch4 = auditManager.findTrace(auditTraceCriteria4);

		assertThat(auditTraceFetch4).hasSize(1);
		assertThat(auditTraceFetch4).usingFieldByFieldElementComparator().contains(auditTrace1);

		//Criteria User
		final AuditTraceCriteria auditTraceCriteria5 = new AuditTraceCriteriaBuilder().withUsername("USER3").build();
		final List<AuditTrace> auditTraceFetch5 = auditManager.findTrace(auditTraceCriteria5);

		assertThat(auditTraceFetch5).hasSize(1);
		assertThat(auditTraceFetch5).usingFieldByFieldElementComparator().contains(auditTrace2);
	}

}
