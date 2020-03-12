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
package io.vertigo.audit.ledger;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;

import io.vertigo.audit.AuditFeatures;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.AbstractTestCaseJU5;
import io.vertigo.core.node.config.NodeConfig;

public class LedgerManagerTest extends AbstractTestCaseJU5 {

	private static final Logger LOGGER = LogManager.getLogger(LedgerManagerTest.class);

	@Inject
	private LedgerManager ledgerManager;

	// cannot run on pic: wallets are not public !!
	//	@Override
	//	protected NodeConfig buildNodeConfig() {
	//		return MyNodeConfig.config();
	//	}

	@Test
	public void writeDataTest() {
		final String messageToAlice = "Bonjour";
		final LedgerAddress bobLedgerAddress = new LedgerAddress("Bob", "0x9a48b59e301794298fdc0f945da3fbd58cff5beb");

		LOGGER.info("My ETH Balance before : " + ledgerManager.getMyWalletBalance());
		LOGGER.info("Bob ETH Balance before : " + ledgerManager.getWalletBalance(bobLedgerAddress));

		ledgerManager.sendData(messageToAlice);
		//Thread.sleep(120_000);

		LOGGER.info("My ETH Balance after: " + ledgerManager.getMyWalletBalance());
		LOGGER.info("Bob ETH Balance after: " + ledgerManager.getWalletBalance(bobLedgerAddress));
	}

	@Override
	protected NodeConfig buildNodeConfig() {
		// dummy config for no false failing test in pic
		return NodeConfig.builder()
				.beginBoot()
				.endBoot()
				.addModule(new CommonsFeatures()
						.build())
				.addModule(new AuditFeatures()
						.withFakeBlockChain()
						.build())
				.build();
	}

}
