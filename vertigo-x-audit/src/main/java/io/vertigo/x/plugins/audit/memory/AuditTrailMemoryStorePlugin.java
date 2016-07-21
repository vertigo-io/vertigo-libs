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

package io.vertigo.x.plugins.audit.memory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;
import io.vertigo.util.StringUtil;
import io.vertigo.x.audit.AuditTrail;
import io.vertigo.x.audit.AuditTrailCriteria;
import io.vertigo.x.impl.audit.AuditTrailStorePlugin;

public class AuditTrailMemoryStorePlugin implements AuditTrailStorePlugin {

	private Map<URI<AuditTrail>, AuditTrail> inMemoryStore = new HashMap<>();
	
	private AtomicLong memorySequenceGenerator = new AtomicLong(0);
	
	@Override
	public AuditTrail getAuditTrail(URI<AuditTrail> auditTrailURI) {
		return inMemoryStore.get(auditTrailURI);
	}

	@Override
	public URI<AuditTrail> createAuditTrail(AuditTrail auditTrail) {
		Assertion.checkNotNull(auditTrail);
		Assertion.checkState(auditTrail.getId() == null, "A new audit trail must not have an id");
		
		DtDefinition defAudit = DtObjectUtil.findDtDefinition(auditTrail);
		URI<AuditTrail> uriAuditTrail = new URI<>(defAudit, memorySequenceGenerator.addAndGet(1));
		
		inMemoryStore.put(uriAuditTrail, auditTrail);
		return uriAuditTrail;
	}

	@Override
	public List<AuditTrail> getAuditTrailByCriteria(AuditTrailCriteria atc) {
		
		List<AuditTrail> ret = new ArrayList<>();
		
		for (AuditTrail audit : inMemoryStore.values()) {
			if (!StringUtil.isEmpty(atc.getCategory()) && atc.getCategory().equals(audit.getCategory())) {
				ret.add(audit);
				continue;
			}
			
			if (!StringUtil.isEmpty(atc.getUser()) && atc.getUser().equals(audit.getUser())) {
				ret.add(audit);
				continue;
			}

			if (audit.getDateBusiness() != null && atc.getDateBusinessDebut() != null && atc.getDateBusinessDebut().before(audit.getDateBusiness())) {
				if (atc.getDateBusinessFin() == null) {
					ret.add(audit);
				} else if (atc.getDateBusinessFin().after(audit.getDateBusiness())) {
					ret.add(audit);
				}
				continue;
			}

			if (audit.getDateExecution() != null && atc.getDateExecutionDebut() != null && atc.getDateExecutionDebut().before(audit.getDateExecution())) {
				if (atc.getDateExecutionFin() == null) {
					ret.add(audit);
				} else if (atc.getDateExecutionFin().after(audit.getDateExecution())) {
					ret.add(audit);
				}
				continue;
			}
			
			if (atc.getItem() != null && atc.getItem().equals(audit.getItem())) {
				ret.add(audit);
			}
			
		}
		
		return ret;
	}
	
}