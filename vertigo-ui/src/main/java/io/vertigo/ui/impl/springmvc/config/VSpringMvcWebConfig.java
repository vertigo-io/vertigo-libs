package io.vertigo.ui.impl.springmvc.config;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.RequestToViewNameTranslator;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

import io.vertigo.app.Home;
import io.vertigo.core.component.Component;
import io.vertigo.ui.impl.springmvc.argumentresolvers.DtListStateMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.UiMessageStackMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttributeMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewContextMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.controller.VSpringMvcControllerAdvice;
import io.vertigo.ui.impl.thymeleaf.VUiStandardDialect;
import io.vertigo.ui.impl.thymeleaf.components.ThymeleafComponent;
import io.vertigo.ui.impl.thymeleaf.components.ThymeleafComponentParser;
import io.vertigo.ui.impl.thymeleaf.components.VuiResourceTemplateResolver;

@Configuration
@EnableWebMvc
@ComponentScan("${springMvcControllerRootPackage}")
public class VSpringMvcWebConfig implements WebMvcConfigurer, ApplicationContextAware {

	@Autowired
	private ApplicationContext applicationContext;

	private final static String[] STANDARD_UI_COMPONENTS_NAME = {
			"vue-data", "include-data", //technical components
			"page", "head", "form", //layout components
			"label", "text-field", "select" //standard controls components 
	};

	/*
	* STEP 1 - Create SpringResourceTemplateResolver
	* */
	@Bean
	public SpringResourceTemplateResolver templateResolver() {
		final SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
		templateResolver.setApplicationContext(applicationContext);
		templateResolver.setPrefix("/WEB-INF/views/");
		templateResolver.setSuffix(".html");
		// for dev purpose
		templateResolver.setCacheable(false);
		return templateResolver;
	}

	private VuiResourceTemplateResolver componentsResolver() {
		final VuiResourceTemplateResolver templateResolver = new VuiResourceTemplateResolver();
		templateResolver.setApplicationContext(applicationContext);
		templateResolver.setPrefix("/WEB-INF/");
		templateResolver.setSuffix(".html");
		templateResolver.setResolvablePatterns(Collections.singleton("components/*"));
		// for dev purpose
		templateResolver.setCacheable(false);
		return templateResolver;
	}

	/*
	* STEP 2 - Create SpringTemplateEngine
	* */
	@Bean
	public SpringTemplateEngine templateEngine() {
		final SpringTemplateEngine templateEngine = new SpringTemplateEngine();
		final SpringResourceTemplateResolver viewsResolvers = templateResolver();
		viewsResolvers.setOrder(2);
		templateEngine.setTemplateResolver(viewsResolvers);
		templateEngine.setEnableSpringELCompiler(true);
		//---
		// add components
		final VuiResourceTemplateResolver componentResolvers = componentsResolver();
		componentResolvers.setOrder(1);
		templateEngine.addTemplateResolver(componentResolvers);
		//---
		final VUiStandardDialect dialect = new VUiStandardDialect(getStandardUiComponents(componentResolvers));
		templateEngine.addDialect("vu", dialect);
		return templateEngine;
	}

	private final Set<ThymeleafComponent> getStandardUiComponents(final VuiResourceTemplateResolver componentResolvers) {
		final ThymeleafComponentParser parser = new ThymeleafComponentParser("vu", componentResolvers);

		final Set<ThymeleafComponent> standardUiComponents = new HashSet<>();
		for (final String componentName : STANDARD_UI_COMPONENTS_NAME) {
			standardUiComponents.addAll(parser.parseComponent(componentName));
		}
		return standardUiComponents;
	}

	@Bean(DispatcherServlet.REQUEST_TO_VIEW_NAME_TRANSLATOR_BEAN_NAME)
	public RequestToViewNameTranslator customRequestToViewNameTranslator() {
		return new VRequestToViewNameTranslator();
	}

	/**
	 * STEP 3 - Register ThymeleafViewResolver
	 */
	@Override
	public void configureViewResolvers(final ViewResolverRegistry registry) {
		final ThymeleafViewResolver resolver = new ThymeleafViewResolver();
		resolver.setTemplateEngine(templateEngine());
		registry.viewResolver(resolver);
	}

	@Override
	public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(new ViewAttributeMethodArgumentResolver());
		resolvers.add(new ViewContextMethodArgumentResolver());
		resolvers.add(new UiMessageStackMethodArgumentResolver());
		resolvers.add(new DtListStateMethodArgumentResolver());
	}

	@Override
	public void setApplicationContext(final ApplicationContext applicationContext) throws BeansException {
		if (applicationContext instanceof ConfigurableApplicationContext) {
			Home.getApp().getComponentSpace().keySet()
					.stream()
					.forEach(key -> ((ConfigurableApplicationContext) applicationContext).getBeanFactory().registerSingleton(key, Home.getApp().getComponentSpace().resolve(key, Component.class)));

			final VSpringMvcControllerAdvice controllerAdvice = ((ConfigurableApplicationContext) applicationContext).getBeanFactory().createBean(VSpringMvcControllerAdvice.class);
			((ConfigurableApplicationContext) applicationContext).getBeanFactory().registerSingleton("viewContextControllerAdvice", controllerAdvice);
		}
	}

	@Override
	public void addInterceptors(final InterceptorRegistry registry) {
		registry.addInterceptor(new VSpringMvcViewContextInterceptor());
	}

}
