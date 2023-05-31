/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.audit.plugins.trace.datastore;

import java.util.List;
import java.util.function.Supplier;

import javax.inject.Inject;

import io.vertigo.audit.impl.trace.TraceStorePlugin;
import io.vertigo.audit.trace.Trace;
import io.vertigo.audit.trace.TraceCriteria;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.definitions.DtDefinition;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datastore.entitystore.EntityStoreManager;

/**
 * Plugin : transactional => reuse transaction if exists, create if missed
 * @author npiedeloup
 */
public final class StoreTraceStorePlugin implements TraceStorePlugin, Activeable {

	private DtDefinition traceDtDefinition;
	private final EntityStoreManager entityStoreManager;
	private final VTransactionManager transactionManager;

	/**
	 * Constructor.
	 * @param entityStoreManager Store Manager
	 */
	@Inject
	public StoreTraceStorePlugin(
			final EntityStoreManager entityStoreManager,
			final VTransactionManager transactionManager) {
		Assertion.check()
				.isNotNull(entityStoreManager)
				.isNotNull(transactionManager);

		this.entityStoreManager = entityStoreManager;
		this.transactionManager = transactionManager;
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		traceDtDefinition = DtObjectUtil.findDtDefinition(Trace.class);
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		//nothing
	}

	@Override
	public Trace read(final Long idAuditTrace) {
		return executeInTransaction(() -> entityStoreManager.readOne(UID.of(Trace.class, idAuditTrace)));
	}

	@Override
	public void create(final Trace auditTrace) {
		Assertion.check()
				.isNotNull(auditTrace)
				.isNull(auditTrace.getTraId(), "A new audit trail must not have an id");
		//---
		executeInTransactionAndCommit(() -> entityStoreManager.create(auditTrace));
	}

	@Override
	public List<Trace> findByCriteria(final TraceCriteria auditTraceCriteria) {
		return executeInTransaction(() -> {
			Criteria<Trace> criteria = Criterions.alwaysTrue();
			if (!StringUtil.isBlank(auditTraceCriteria.getCategory())) {
				criteria = criteria.and(Criterions.isEqualTo(() -> "category", auditTraceCriteria.getCategory()));
			}
			if (!StringUtil.isBlank(auditTraceCriteria.getUsername())) {
				criteria = criteria.and(Criterions.isEqualTo(() -> "username", auditTraceCriteria.getUsername()));
			}
			if (!StringUtil.isBlank(auditTraceCriteria.getItemUrn())) {
				criteria = criteria.and(Criterions.isEqualTo(() -> "itemUrn", auditTraceCriteria.getItemUrn()));
			}

			if (auditTraceCriteria.getStartExecutionDate() != null) {
				criteria = criteria.and(Criterions.isGreaterThanOrEqualTo(() -> "executionDate", auditTraceCriteria.getStartExecutionDate()));
			}
			if (auditTraceCriteria.getEndExecutionDate() != null) {
				criteria = criteria.and(Criterions.isLessThanOrEqualTo(() -> "executionDate", auditTraceCriteria.getEndExecutionDate()));
			}

			if (auditTraceCriteria.getStartBusinessDate() != null) {
				criteria = criteria.and(Criterions.isGreaterThanOrEqualTo(() -> "businessDate", auditTraceCriteria.getStartBusinessDate()));
			}
			if (auditTraceCriteria.getEndBusinessDate() != null) {
				criteria = criteria.and(Criterions.isLessThanOrEqualTo(() -> "businessDate", auditTraceCriteria.getEndBusinessDate()));
			}
			return entityStoreManager.find(traceDtDefinition, criteria, DtListState.defaultOf(Trace.class));
		});
	}

	private <O> O executeInTransaction(final Supplier<O> supplier) {
		if (transactionManager.hasCurrentTransaction()) {
			return supplier.get();
		}
		//Dans le cas ou il n'existe pas de transaction on en crée une.
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			return supplier.get();
		}
	}

	private <O> O executeInTransactionAndCommit(final Supplier<O> supplier) {
		if (transactionManager.hasCurrentTransaction()) {
			return supplier.get();
		}
		//Dans le cas ou il n'existe pas de transaction on en crée une.
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final O result = supplier.get();
			transaction.commit();
			return result;
		}
	}
}
