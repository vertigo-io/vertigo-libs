package io.vertigo.ui.impl.thymeleaf.composite.parser;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.thymeleaf.IEngineConfiguration;
import org.thymeleaf.spring5.templateresource.SpringResourceTemplateResource;
import org.thymeleaf.templateresolver.AbstractConfigurableTemplateResolver;
import org.thymeleaf.templateresource.ITemplateResource;

public class VuiResourceTemplateResolver
		extends AbstractConfigurableTemplateResolver
		implements ApplicationContextAware {

	private ApplicationContext applicationContext = null;

	public VuiResourceTemplateResolver() {
		super();
	}

	@Override
	public void setApplicationContext(final ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}

	@Override
	protected ITemplateResource computeTemplateResource(
			final IEngineConfiguration configuration, final String ownerTemplate, final String template, final String resourceName, final String characterEncoding, final Map<String, Object> templateResolutionAttributes) {
		return new SpringResourceTemplateResource(applicationContext, resourceName, characterEncoding);
	}

	public ITemplateResource resolveResource(final String resourceName) {
		return computeTemplateResource(null, null, resourceName, Collections.emptyMap());
	}

}
