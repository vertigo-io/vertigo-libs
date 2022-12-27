package io.vertigo.ui.impl.springmvc.config.definitions;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;

/**
 * Définition d'un Scan SpringMvc de controller.
 * Permet de paramétrer le scan dans les Features.
 * @author npiedeloup.
 */
@DefinitionPrefix(SpringMvcControllerScanDefinition.PREFIX)
public final class SpringMvcControllerScanDefinition extends AbstractDefinition {

	public static final String PREFIX = "Cos";

	private final String scanPath;

	/**
	 * Constructor only used by its builder.
	 * @param name
	 * @param cronExpression
	 * @param initialParams
	 * @param multiExecution
	 * @param activities
	 */
	SpringMvcControllerScanDefinition(
			final String name,
			final String scanPath) {
		super(name);
		//---
		Assertion.check()
				.isNotBlank(name)
				.isNotBlank(scanPath);
		//---
		this.scanPath = scanPath;
	}

	public String getScanPath() {
		return scanPath;
	}

}
