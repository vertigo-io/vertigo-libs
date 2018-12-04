package io.vertigo.ledger;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;

import io.vertigo.AbstractTestCaseJU5;
import io.vertigo.app.config.AppConfig;
import io.vertigo.ledger.services.LedgerAddress;
import io.vertigo.ledger.services.LedgerManager;

public class LedgerManagerEthereumTest extends AbstractTestCaseJU5 {

	private static final Logger LOGGER = LogManager.getLogger(Listener.class);

	@Inject
	private LedgerManager ledgerManager;

	@Override
	protected AppConfig buildAppConfig() {
		return MyAppConfig.config();
	}

	@Test
	public void writeDataTest() {

		final String messageToAlice = "Bonjour";
		final LedgerAddress bobLedgerAddress = new LedgerAddress("Bob", "0x9a48b59e301794298fdc0f945da3fbd58cff5beb");

		LOGGER.info("My ETH Balance before : " + ledgerManager.getMyBalance());
		LOGGER.info("Bob ETH Balance before : " + ledgerManager.getBalance(bobLedgerAddress));

		ledgerManager.sendData(messageToAlice);
		//Thread.sleep(120_000);

		LOGGER.info("My ETH Balance after: " + ledgerManager.getMyBalance());
		LOGGER.info("Bob ETH Balance after: " + ledgerManager.getBalance(bobLedgerAddress));
	}

}
