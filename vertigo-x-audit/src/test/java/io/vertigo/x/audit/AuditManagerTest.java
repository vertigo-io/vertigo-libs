/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
import java.util.Collection;
import java.util.Date;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.util.DateBuilder;



public class AuditManagerTest {

	private AutoCloseableApp app;
	
	@Inject
	private AuditManager auditManager;
	
	@Before
	public void setUp() {
		app = new AutoCloseableApp(JunitAppConfig.config());
		Injector.injectMembers(this, app.getComponentSpace());
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}
	
	@Test
	public void testAddAuditTrail() {
		AuditTrail auditTrail = new AuditTrailBuilder("CAT1", "USER1", 1L).build();
		
		auditManager.addAuditTrail(auditTrail);
		AuditTrail auditFetch = auditManager.getAuditTrail(1L);
		
		assertThat(auditFetch).isEqualToIgnoringGivenFields(auditTrail, "id");
	}
		
	@Test
	public void testRechercherAuditTrail() {
		AuditTrailBuilder atb = new AuditTrailBuilder("CAT2", "USER2", 2L);
		AuditTrail audit1 = atb.build();
		auditManager.addAuditTrail(audit1);
		
		AuditTrail audit2 = new AuditTrailBuilder("CAT3", "USER3", 3L)
				.withDateBusiness(new Date())
				.withContext(Arrays.asList("Context 3"))
				.build();
		
		auditManager.addAuditTrail(audit2);

		//Criteria Catgerory
		AuditTrailCriteria atc1 = new AuditTrailCriteriaBuilder().withCategory("CAT2").build();
		Collection<AuditTrail> auditFetch1 = auditManager.searchAuditTrail(atc1);
		
		assertThat(auditFetch1).hasSize(1);
		assertThat(auditFetch1).usingFieldByFieldElementComparator().contains(audit1);
		
		Date dateJMinus1 = new DateBuilder(new Date()).addDays(-1).build();
		Date dateJPlus1 = new DateBuilder(new Date()).addDays(1).build();
		
		//Criteria Date Business
		AuditTrailCriteria atc2 = new AuditTrailCriteriaBuilder()
				.withDateBusinessStart(dateJMinus1)
				.withDateBusinessEnd(dateJPlus1)
				.build();
		
		Collection<AuditTrail> auditFetch2 = auditManager.searchAuditTrail(atc2);
		
		assertThat(auditFetch2).hasSize(1);
		assertThat(auditFetch2).usingFieldByFieldElementComparator().contains(audit2);
		
		//Criteria Date Exec
		AuditTrailCriteria atc3 = new AuditTrailCriteriaBuilder()
				.withDateExecutionStart(dateJMinus1)
				.withDateExecutionEnd(dateJPlus1)
				.build();
		Collection<AuditTrail> auditFetch3 = auditManager.searchAuditTrail(atc3);
		
		assertThat(auditFetch3).hasSize(2);
		assertThat(auditFetch3).usingFieldByFieldElementComparator().contains(audit1, audit2);

		//Criteria Item
		AuditTrailCriteria atc4 = new AuditTrailCriteriaBuilder().withItem(2L).build();
		Collection<AuditTrail> auditFetch4 = auditManager.searchAuditTrail(atc4);
		
		assertThat(auditFetch4).hasSize(1);
		assertThat(auditFetch4).usingFieldByFieldElementComparator().contains(audit1);

		//Criteria Item
		AuditTrailCriteria atc5 = new AuditTrailCriteriaBuilder().withUser("USER3").build();
		Collection<AuditTrail> auditFetch5 = auditManager.searchAuditTrail(atc5);
		
		assertThat(auditFetch5).hasSize(1);
		assertThat(auditFetch5).usingFieldByFieldElementComparator().contains(audit2);
	}
	
}