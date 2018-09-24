package io.vertigo.ui.impl;

import javax.inject.Inject;
import javax.inject.Named;

import io.vertigo.lang.Assertion;
import io.vertigo.ui.UiManager;

public class UiManagerImpl implements UiManager {

	@Inject
	public UiManagerImpl(
			@Named("controllerRootPackage") final String controllerRootPackage) {
		Assertion.checkArgNotEmpty(controllerRootPackage);
		//---
		System.setProperty("springMvcControllerRootPackage", controllerRootPackage);

	}

}
