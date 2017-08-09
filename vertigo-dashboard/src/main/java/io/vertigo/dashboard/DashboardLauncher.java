package io.vertigo.dashboard;

import java.util.Optional;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.config.AppConfig;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.component.di.injector.DIInjector;

public class DashboardLauncher {

	private static AppConfig getAppConfig() {
		return AppConfig.builder()
				.addModule(new CommonsFeatures()
						.withRedisConnector("redis-pic.part.klee.lan.net", 6379, 0, Optional.empty())
						.build())
				.build();

	}

	public static void main(final String[] args) {
		try (final AutoCloseableApp app = new AutoCloseableApp(getAppConfig())) {
			final Dashboard dashboard = new Dashboard(app, 8080);
			DIInjector.injectMembers(dashboard, app.getComponentSpace());
			dashboard.start();
			while (!Thread.currentThread().isInterrupted()) {
				//
			}
		}

	}

}
