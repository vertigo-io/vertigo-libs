package io.vertigo.audit;

import io.vertigo.app.config.Feature;
import io.vertigo.app.config.Features;
import io.vertigo.audit.impl.services.trace.AuditTraceDefinitionProvider;
import io.vertigo.audit.impl.services.trace.AuditTraceManagerImpl;
import io.vertigo.audit.plugins.trace.memory.MemoryAuditTraceStorePlugin;
import io.vertigo.audit.services.trace.AuditTraceManager;

public class AuditFeatures extends Features<AuditFeatures> {

	public AuditFeatures() {
		super("vertigo-audit");
	}

	@Feature("memoryTrace")
	public AuditFeatures withMemoryTrace() {
		getModuleConfigBuilder().addPlugin(MemoryAuditTraceStorePlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(AuditTraceDefinitionProvider.class)
				.addComponent(AuditTraceManager.class, AuditTraceManagerImpl.class);

	}

}
