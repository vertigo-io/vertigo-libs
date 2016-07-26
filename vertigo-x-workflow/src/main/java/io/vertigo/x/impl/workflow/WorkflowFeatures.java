package io.vertigo.x.impl.workflow;

import io.vertigo.app.config.Features;
import io.vertigo.x.workflow.WorkflowManager;

/**
 * Defines the 'workflow' extension
 * @author xdurand
 */
public final class WorkflowFeatures extends Features {

	/**
	 * Constructor.
	 */
	public WorkflowFeatures() {
		super("x-workflow");
	}

	/** {@inheritDoc} */
	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addDefinitionProvider(WorkflowProvider.class)
				.addComponent(WorkflowManager.class, WorkflowManagerImpl.class);
	}

}

