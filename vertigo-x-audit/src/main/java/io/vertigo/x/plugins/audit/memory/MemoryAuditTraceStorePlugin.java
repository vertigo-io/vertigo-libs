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

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import io.vertigo.lang.Assertion;
import io.vertigo.util.ListBuilder;
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
	public AuditTrace read(final Long idAuditTrace) {
		return inMemoryStore.get(idAuditTrace);
	}

	@Override
	public void create(final AuditTrace auditTrace) {
		Assertion.checkNotNull(auditTrace);
		Assertion.checkState(auditTrace.getId() == null, "A new audit trail must not have an id");
		//---
		final long generatedId = memorySequenceGenerator.addAndGet(1);
		auditTrace.setId(generatedId);
		inMemoryStore.put(generatedId, auditTrace);
	}

	@Override
	public List<AuditTrace> findByCriteria(final AuditTraceCriteria auditTraceCriteria) {
		final ListBuilder<AuditTrace> auditTracesBuilder = new ListBuilder<>();

		for (final AuditTrace auditTrace : inMemoryStore.values()) {
			final boolean categoryMatched = matchCategory(auditTraceCriteria, auditTrace);
			final boolean userMatched = matchUser(auditTraceCriteria, auditTrace);
			final boolean businessDateMatched = matchBusinessDate(auditTraceCriteria, auditTrace);
			final boolean executionDateMatched = matchExecutionDate(auditTraceCriteria, auditTrace);
			final boolean itemMatched = matchItem(auditTraceCriteria, auditTrace);
			if (categoryMatched || userMatched || businessDateMatched || executionDateMatched || itemMatched) {
				auditTracesBuilder.add(auditTrace);
			}
		}

		return auditTracesBuilder
				.unmodifiable()
				.build();
	}

	private static boolean matchItem(final AuditTraceCriteria auditTraceCriteria, final AuditTrace auditTrace) {
		return auditTraceCriteria.getItem() != null
				&& auditTraceCriteria.getItem().equals(auditTrace.getItem());
	}

	private static boolean matchExecutionDate(final AuditTraceCriteria auditTraceCriteria, final AuditTrace auditTrace) {
		return auditTrace.getExecutionDate() != null
				&& auditTraceCriteria.getStartExecutionDate() != null
				&& auditTraceCriteria.getStartExecutionDate().before(auditTrace.getExecutionDate())
				&& (auditTraceCriteria.getEndExecutionDate() == null || auditTraceCriteria.getEndExecutionDate().after(auditTrace.getExecutionDate()));
	}

	private static boolean matchBusinessDate(final AuditTraceCriteria auditTraceCriteria, final AuditTrace auditTrace) {
		return auditTrace.getBusinessDate() != null
				&& auditTraceCriteria.getStartBusinessDate() != null
				&& auditTraceCriteria.getStartBusinessDate().before(auditTrace.getBusinessDate())
				&& (auditTraceCriteria.getEndBusinessDate() == null || auditTraceCriteria.getEndBusinessDate().after(auditTrace.getBusinessDate()));
	}

	private static boolean matchUser(final AuditTraceCriteria auditTraceCriteria, final AuditTrace auditTrace) {
		return !StringUtil.isEmpty(auditTraceCriteria.getUsername())
				&& auditTraceCriteria.getUsername().equals(auditTrace.getUsername());
	}

	private static boolean matchCategory(final AuditTraceCriteria auditTraceCriteria, final AuditTrace auditTrace) {
		return !StringUtil.isEmpty(auditTraceCriteria.getCategory())
				&& auditTraceCriteria.getCategory().equals(auditTrace.getCategory());
	}
}
