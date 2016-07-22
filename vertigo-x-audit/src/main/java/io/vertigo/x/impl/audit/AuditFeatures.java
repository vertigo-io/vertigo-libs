package io.vertigo.x.impl.audit;


import io.vertigo.app.config.Features;
import io.vertigo.x.audit.AuditManager;

/**
 * Defines the 'audit' extension
 * @author xdurand
 */
public final class AuditFeatures extends Features {

	/**
	 * Constructor.
	 */
	public AuditFeatures() {
		super("x-audit");
	}

	/** {@inheritDoc} */
	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addDefinitionProvider(AuditTraceDefinitionProvider.class)
				.addComponent(AuditManager.class, AuditManagerImpl.class);
	}

}