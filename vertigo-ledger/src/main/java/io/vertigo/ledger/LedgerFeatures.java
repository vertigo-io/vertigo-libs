/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.ledger;

import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.ledger.impl.services.LedgerManagerImpl;
import io.vertigo.ledger.plugins.ethereum.EthereumLedgerPlugin;
import io.vertigo.ledger.services.LedgerManager;

/**
 * Defines Ledger features.
 *
 * @author xdurand
 */
public final class LedgerFeatures extends Features<LedgerFeatures> {

	/**
	 * Constructor.
	 */
	public LedgerFeatures() {
		super("x-ledger");
	}

	/**
	 * Add Ethereum BlockChain Ledger
	 * @return  the feature
	 */
	public LedgerFeatures withEthereumBlockChain(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(EthereumLedgerPlugin.class, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(LedgerManager.class, LedgerManagerImpl.class);
	}

}
