package io.vertigo.ledger;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;

import io.vertigo.AbstractTestCaseJU5;
import io.vertigo.app.config.NodeConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.ledger.services.LedgerAddress;
import io.vertigo.ledger.services.LedgerManager;

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
				.addModule(new LedgerFeatures()
						.withFakeBlockChain()
						.build())
				.build();
	}

}