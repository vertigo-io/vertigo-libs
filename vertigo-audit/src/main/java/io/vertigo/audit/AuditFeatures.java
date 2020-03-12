/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.audit;

import io.vertigo.audit.impl.ledger.LedgerManagerImpl;
import io.vertigo.audit.impl.trace.TraceDefinitionProvider;
import io.vertigo.audit.impl.trace.TraceManagerImpl;
import io.vertigo.audit.ledger.LedgerManager;
import io.vertigo.audit.plugins.ledger.ethereum.EthereumLedgerPlugin;
import io.vertigo.audit.plugins.ledger.fake.FakeLedgerPlugin;
import io.vertigo.audit.plugins.trace.memory.MemoryTraceStorePlugin;
import io.vertigo.audit.trace.TraceManager;
import io.vertigo.core.node.config.Feature;
import io.vertigo.core.node.config.Features;
import io.vertigo.core.param.Param;

public class AuditFeatures extends Features<AuditFeatures> {

	public AuditFeatures() {
		super("vertigo-audit");
	}

	@Feature("memoryTrace")
	public AuditFeatures withMemoryTrace() {
		getModuleConfigBuilder().addPlugin(MemoryTraceStorePlugin.class);
		return this;
	}

	/**
	 * Add Ethereum BlockChain Ledger
	 * @return  the feature
	 */
	@Feature("ledger.ethereum")
	public AuditFeatures withEthereumBlockChain(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(EthereumLedgerPlugin.class, params);
		return this;
	}

	/**
	 * Add Ethereum BlockChain Ledger
	 * @return  the feature
	 */
	@Feature("ledger.fake")
	public AuditFeatures withFakeBlockChain() {
		getModuleConfigBuilder()
				.addPlugin(FakeLedgerPlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(TraceDefinitionProvider.class)
				.addComponent(TraceManager.class, TraceManagerImpl.class)
				.addComponent(LedgerManager.class, LedgerManagerImpl.class);

	}

}
