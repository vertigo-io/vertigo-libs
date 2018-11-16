package io.vertigo.ledger;

import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.param.Param;

/**
 * Config for Junit
 *
 * @author xdurand
 *
 */
public class MyAppConfig {

	/**
	 * Configuration de l'application pour Junit
	 *
	 * @return AppConfig for Junit
	 */
	public static AppConfig config() {
		final AppConfigBuilder appConfigBuilder = AppConfig.builder()
				.beginBoot()
				.withLocales("fr")
				.endBoot()
				.addModule(new CommonsFeatures().build())
				.addModule(new LedgerFeatures()
						.withEthereumBlockChain(
								Param.of("urlRpcEthNode", "http://docker-vertigo:8545"),
								Param.of("myAccountName", "Bob"),
								Param.of("myPublicAddr", "0x9a48b59e301794298fdc0f945da3fbd58cff5beb"),
								Param.of("defaultDestAccountName", "Bob"),
								Param.of("defaultDestPublicAddr", "0x9a48b59e301794298fdc0f945da3fbd58cff5beb"),
								Param.of("walletPassword", "mypassword"),
								Param.of("walletPath", "UTC--2018-08-31T12-39-11.923861245Z--2e61cf9f966d4e66a0912d3116008cf8e47cb32e"))
						.build());

		return appConfigBuilder.build();
	}
}
