package io.vertigo.ledger;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.ledger.services.LedgerAddress;
import io.vertigo.ledger.services.LedgerManager;

public class LedgerManagerEthereumTest {

	private static final Logger LOGGER = LogManager.getLogger(Listener.class);

	private static AutoCloseableApp app;

	@Inject
	private LedgerManager ledgerManager;

	@BeforeClass
	public static void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
	}

	@Before
	public void doBefore() {
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	@AfterClass
	public static void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void writeDataTest() {

		final String messageToAlice = "Bonjour";
		final LedgerAddress bobLedgerAddress = new LedgerAddress("Bob", "0x9a48b59e301794298fdc0f945da3fbd58cff5beb");

		LOGGER.info("My ETH Balance before : " + ledgerManager.getMyBalance());
		LOGGER.info("Bob ETH Balance before : " + ledgerManager.getBalance(bobLedgerAddress));

		ledgerManager.sendData(messageToAlice);
		ledgerManager.flush();
		//Thread.sleep(120_000);

		LOGGER.info("My ETH Balance after: " + ledgerManager.getMyBalance());
		LOGGER.info("Bob ETH Balance after: " + ledgerManager.getBalance(bobLedgerAddress));
	}

}
