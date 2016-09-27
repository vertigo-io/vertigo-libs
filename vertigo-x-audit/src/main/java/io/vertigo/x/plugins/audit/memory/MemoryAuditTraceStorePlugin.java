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
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import io.vertigo.lang.Assertion;
import io.vertigo.util.StringUtil;
import io.vertigo.x.audit.AuditTrace;
import io.vertigo.x.audit.AuditTraceCriteria;
import io.vertigo.x.impl.audit.AuditTraceStorePlugin;

/**
 *
 * @author xdurand
 *
 */
public final class MemoryAuditTraceStorePlugin implements AuditTraceStorePlugin {

	private final Map<Long, AuditTrace> inMemoryStore = new ConcurrentHashMap<>();
	private final AtomicLong memorySequenceGenerator = new AtomicLong(0);

	@Override
	public AuditTrace readTrace(final Long idAuditTrace) {
		return inMemoryStore.get(idAuditTrace);
	}

	@Override
	public void createTrace(final AuditTrace auditTrace) {
		Assertion.checkNotNull(auditTrace);
		Assertion.checkState(auditTrace.getId() == null, "A new audit trail must not have an id");
		//---
		final long generatedId = memorySequenceGenerator.addAndGet(1);
		auditTrace.setId(generatedId);
		inMemoryStore.put(generatedId, auditTrace);
	}

	@Override
	public List<AuditTrace> findTraceByCriteria(final AuditTraceCriteria auditTraceCriteria) {

		final List<AuditTrace> ret = new ArrayList<>();

		for (final AuditTrace audit : inMemoryStore.values()) {
			if (!StringUtil.isEmpty(auditTraceCriteria.getCategory()) && auditTraceCriteria.getCategory().equals(audit.getCategory())) {
				ret.add(audit);
				continue;
			}

			if (!StringUtil.isEmpty(auditTraceCriteria.getUser()) && auditTraceCriteria.getUser().equals(audit.getUser())) {
				ret.add(audit);
				continue;
			}

			if (audit.getBusinessDate() != null && auditTraceCriteria.getStartBusinessDate() != null && auditTraceCriteria.getStartBusinessDate().before(audit.getBusinessDate())) {
				if (auditTraceCriteria.getEndBusinessDate() == null) {
					ret.add(audit);
					continue;
				} else if (auditTraceCriteria.getEndBusinessDate().after(audit.getBusinessDate())) {
					ret.add(audit);
					continue;
				}
			}

			if (audit.getExecutionDate() != null && auditTraceCriteria.getStartExecutionDate() != null && auditTraceCriteria.getStartExecutionDate().before(audit.getExecutionDate())) {
				if (auditTraceCriteria.getEndExecutionDate() == null) {
					ret.add(audit);
					continue;
				} else if (auditTraceCriteria.getEndExecutionDate().after(audit.getExecutionDate())) {
					ret.add(audit);
					continue;
				}
			}

			if (auditTraceCriteria.getItem() != null && auditTraceCriteria.getItem().equals(audit.getItem())) {
				ret.add(audit);
			}

		}

		return ret;
	}

}
