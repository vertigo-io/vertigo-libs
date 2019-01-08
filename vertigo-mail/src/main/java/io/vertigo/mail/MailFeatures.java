package io.vertigo.mail;

import io.vertigo.app.config.Features;
import io.vertigo.app.config.json.Feature;
import io.vertigo.core.param.Param;
import io.vertigo.mail.impl.MailManagerImpl;
import io.vertigo.mail.plugins.javax.JavaxSendMailPlugin;

public class MailFeatures extends Features<MailFeatures> {

	public MailFeatures() {
		super("mail");
	}

	@Feature("javax")
	public MailFeatures withJavax(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(JavaxSendMailPlugin.class, params);

		return this;

	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(MailManager.class, MailManagerImpl.class);

	}

}
