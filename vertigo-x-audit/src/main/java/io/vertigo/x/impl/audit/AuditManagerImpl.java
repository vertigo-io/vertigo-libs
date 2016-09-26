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

package io.vertigo.x.impl.audit;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.lang.Assertion;
import io.vertigo.x.audit.AuditManager;
import io.vertigo.x.audit.AuditTrace;
import io.vertigo.x.audit.AuditTraceCriteria;

/**
 * @author xdurand
 */
public final class AuditManagerImpl implements AuditManager {
	private final AuditTraceStorePlugin auditTraceStorePlugin;

	/**
	 * Constructor.
	 * @param auditTraceStorePlugin
	 */
	@Inject
	public AuditManagerImpl(final AuditTraceStorePlugin auditTraceStorePlugin) {
		Assertion.checkNotNull(auditTraceStorePlugin);
		//---
		this.auditTraceStorePlugin = auditTraceStorePlugin;
	}

	@Override
	public void addTrace(final AuditTrace auditTrace) {
		auditTraceStorePlugin.createTrace(auditTrace);
	}

	@Override
	public List<AuditTrace> findTrace(final AuditTraceCriteria auditTraceCriteria) {
		return auditTraceStorePlugin.findTraceByCriteria(auditTraceCriteria);
	}

	@Override
	public AuditTrace getTrace(final Long idAuditTrace) {
		return auditTraceStorePlugin.readTrace(idAuditTrace);
	}

}
