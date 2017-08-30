package io.vertigo.dashboard.ui;

import java.util.Map;

import io.vertigo.app.App;

public interface DashboardModuleControler {

	Map<String, Object> buildModel(final App app, final String moduleName);
}
