package io.vertigo.iot;

import io.vertigo.app.config.Features;
import io.vertigo.iot.impl.services.IotServicesImpl;
import io.vertigo.iot.services.IotServices;

public class IotFeatures extends Features {

	protected IotFeatures() {
		super("vertigo-iot");
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder().addComponent(IotServices.class, IotServicesImpl.class);

	}

}
