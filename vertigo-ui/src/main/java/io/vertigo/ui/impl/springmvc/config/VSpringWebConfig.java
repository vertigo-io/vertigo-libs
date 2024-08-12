/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.ui.impl.springmvc.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.CacheControl;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.RequestToViewNameTranslator;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring6.view.ThymeleafViewResolver;

import io.vertigo.connectors.spring.EnableVertigoSpringBridge;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.ui.controllers.ListAutocompleteController;
import io.vertigo.ui.impl.springmvc.argumentresolvers.DtListStateMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.FileInfoURIConverter;
import io.vertigo.ui.impl.springmvc.argumentresolvers.FileInfoURIConverterValueHandler;
import io.vertigo.ui.impl.springmvc.argumentresolvers.UiFileInfoReturnValueHandler;
import io.vertigo.ui.impl.springmvc.argumentresolvers.UiMessageStackMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.UserSessionMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.VFileMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.VFileReturnValueHandler;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttributeMethodArgumentResolver;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewContextReturnValueAndArgumentResolver;
import io.vertigo.ui.impl.springmvc.authorization.VSpringMvcAuthorizationInterceptor;
import io.vertigo.ui.impl.springmvc.config.interceptors.VAnnotationHandlerInterceptorImpl;
import io.vertigo.ui.impl.springmvc.config.interceptors.VControllerInterceptorEngine;
import io.vertigo.ui.impl.springmvc.config.interceptors.VSpringMvcViewContextInterceptor;
import io.vertigo.ui.impl.springmvc.controller.VSpringMvcControllerAdvice;
import io.vertigo.ui.impl.springmvc.controller.VSpringMvcExceptionHandler;
import io.vertigo.ui.impl.thymeleaf.VUiStandardDialect;
import io.vertigo.ui.impl.thymeleaf.components.NamedComponentDefinition;
import io.vertigo.ui.impl.thymeleaf.components.NamedComponentParser;
import io.vertigo.ui.impl.thymeleaf.components.VuiResourceTemplateResolver;
import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;

@Configuration
@EnableVertigoSpringBridge
@EnableWebMvc
public class VSpringWebConfig implements WebMvcConfigurer, ApplicationContextAware {

	@Autowired
	private ApplicationContext applicationContext;

	private static final String COMPONENT_PATH_PREFIX = "io/vertigo/ui/components/quasar/";
	private static final String DSFR_COMPONENT_PATH_PREFIX = "io/vertigo/ui/components/dsfr/";

	/*
	* STEP 1 - Create SpringResourceTemplateResolver
	* */
	@Bean
	public SpringResourceTemplateResolver templateResolver() {
		final SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
		templateResolver.setApplicationContext(applicationContext);
		templateResolver.setPrefix("/WEB-INF/views/");
		templateResolver.setSuffix(".html");
		templateResolver.setCharacterEncoding("UTF-8");
		// for dev purpose
		templateResolver.setCacheable(!isDevMode());
		return templateResolver;
	}

	/*
	* STEP 2 - Create SpringTemplateEngine
	* */
	@Bean
	public SpringTemplateEngine templateEngine() {
		final List<VModuleUiComponent> moduleUiComponents = getModuleUiComponents();
		final var componentTemplateResolvers = moduleUiComponents.stream()
				.flatMap(m -> m.getTemplateResolvers().stream())
				.toList();

		final SpringTemplateEngine templateEngine = new VSpringTemplateEngine();

		// add view resolver
		final SpringResourceTemplateResolver viewsResolvers = templateResolver();
		viewsResolvers.setOrder(componentTemplateResolvers.size() + 1); // order last
		templateEngine.setTemplateResolver(viewsResolvers);
		templateEngine.setEnableSpringELCompiler(true);

		// add component resolvers
		var order = componentTemplateResolvers.size();
		for (final var templateResolver : componentTemplateResolvers) {
			templateResolver.setOrder(order);
			templateEngine.addTemplateResolver(templateResolver);

			order--; // latest declaration has priority
		}

		// register components to be resolved inside html (ex vu: components)
		final var uiComponents = moduleUiComponents.stream()
				.flatMap(m -> m.getUiComponents().stream())
				.collect(Collectors.toUnmodifiableSet());
		templateEngine.addDialect("vu", new VUiStandardDialect(uiComponents));

		// dsfr components
		// TODO: Faire mieux
		final var moduleDsfrUiComponents = new VModuleUiComponent("vui-dsfr", List.of(DSFR_COMPONENT_PATH_PREFIX));
		templateEngine.addTemplateResolver(moduleDsfrUiComponents.templateResolvers.get(0));
		templateEngine.addDialect("vui-dsfr", new VUiStandardDialect("vui-dsfr", moduleDsfrUiComponents.getUiComponents()));

		templateEngine.addDialect(new LayoutDialect());

		return templateEngine;
	}

	private List<VModuleUiComponent> getModuleUiComponents() {
		final List<VModuleUiComponent> moduleUiComponents = new ArrayList<>();

		// built in components
		moduleUiComponents.add(new VModuleUiComponent("vu", List.of(COMPONENT_PATH_PREFIX)));

		// legacy project component registering. Deprecated, to be removed
		if (getCustomComponentsPathPrefix() != null) {
			moduleUiComponents.add(new VModuleUiComponent("vu", getCustomComponentsPathPrefix() + "components/", getCustomComponentNames()));
		}
		// ---

		// add ui components by definition (and DefaultUiModuleFeatures)
		final var vSpringMvcConfigDefinitions = Node.getNode().getDefinitionSpace().getAll(VSpringMvcConfigDefinition.class);
		vSpringMvcConfigDefinitions.forEach(mvcConfigDefinition -> {
			moduleUiComponents.add(new VModuleUiComponent("vu", mvcConfigDefinition.getComponentDirs()));
		});

		return moduleUiComponents;
	}

	private class VModuleUiComponent {
		private final Set<NamedComponentDefinition> uiComponents = new HashSet<>(); // used to resolve components into pages (dialect = vu: namespace)
		private final List<VuiResourceTemplateResolver> templateResolvers = new ArrayList<>(); // used to resolve component files when found in page

		public VModuleUiComponent(final String dialectPrefix, final List<String> componentDirs) {
			for (final var dir : componentDirs) {
				final var componentNames = getComponentNames(dir);
				resolveComponents(dir, dialectPrefix, componentNames);
			}
		}

		public VModuleUiComponent(final String pathPrefix, final String dialectPrefix, final Set<String> componentNames) {
			resolveComponents(pathPrefix, dialectPrefix, componentNames);
		}

		private void resolveComponents(final String pathPrefix, final String dialectPrefix, final Set<String> componentNames) {
			if (!componentNames.isEmpty()) {
				final VuiResourceTemplateResolver resolver = getComponentsResolver(pathPrefix);

				final NamedComponentParser parser = new NamedComponentParser(dialectPrefix, resolver);
				for (final String componentName : componentNames) {
					uiComponents.addAll(parser.parseComponent(componentName));
				}

				if (!uiComponents.isEmpty()) {
					templateResolvers.add(resolver);
				}
			}
		}

		private VuiResourceTemplateResolver getComponentsResolver(final String componentPath) {
			final VuiResourceTemplateResolver templateResolver = new VuiResourceTemplateResolver();
			templateResolver.setApplicationContext(applicationContext);
			templateResolver.setPrefix("classpath://" + componentPath);
			templateResolver.setSuffix(".html");
			templateResolver.setCheckExistence(true); // go to next resolver if not found
			// for dev purpose
			templateResolver.setCacheable(!isDevMode());
			return templateResolver;
		}

		private Set<String> getComponentNames(final String dir) {
			final Resource[] resources;
			try {
				resources = applicationContext.getResources("classpath*:" + dir + "**/*.html");
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			}
			return Arrays.stream(resources)
					.map(r -> getComponentName(r, dir))
					.collect(Collectors.toUnmodifiableSet());
		}

		private static String getComponentName(final Resource resource, final String dir) {
			String filePath;
			try {
				filePath = resource.getURL().getPath();
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			}
			return filePath.substring(filePath.lastIndexOf(dir) + dir.length(), filePath.length() - 5); // strip dir and extension
		}

		public Set<NamedComponentDefinition> getUiComponents() {
			return uiComponents;
		}

		public List<VuiResourceTemplateResolver> getTemplateResolvers() {
			return templateResolvers;
		}

	}

	/**
	 * Deprecated, UI components can be defined through VSpringMvcConfigDefinition.
	 * For simplicity of declaration, use a module feature extending DefaultUiModuleFeatures and put your components in the "components" directory of your module.
	 */
	@Deprecated
	protected Set<String> getCustomComponentNames() {
		return Collections.emptySet();
	}

	/**
	 * Deprecated, UI components can be defined through VSpringMvcConfigDefinition.
	 * For simplicity of declaration, use a module feature extending DefaultUiModuleFeatures and put your components in the "components" directory of your module.
	 * Define prefix for custom components.
	 * Should be the module name : don't starts with /, ends with /
	 * Components must be put in : prefix+"/components/"+componentName
	 *
	 * @return path prefix for custom components
	 */
	@Deprecated
	protected String getCustomComponentsPathPrefix() {
		return null;
	}

	@Bean(DispatcherServlet.REQUEST_TO_VIEW_NAME_TRANSLATOR_BEAN_NAME)
	public RequestToViewNameTranslator customRequestToViewNameTranslator() {
		return new VRequestToViewNameTranslator();
	}

	@Bean
	public StandardServletMultipartResolver multipartResolver() {
		return new StandardServletMultipartResolver();
	}

	/**
	 * STEP 3 - Register ThymeleafViewResolver
	 */
	@Override
	public void configureViewResolvers(final ViewResolverRegistry registry) {
		final ThymeleafViewResolver resolver = new ThymeleafViewResolver();
		resolver.setCharacterEncoding("UTF-8");
		resolver.setTemplateEngine(templateEngine());
		// partial output is true by default, in case of error while writing vueData on view, start of page could have been already rendered/sent and error page is written after all this
		// with this parameter to false, only the error page is sent to the client
		resolver.setProducePartialOutputWhileProcessing(false);
		registry.viewResolver(resolver);
	}

	@Override
	public void addFormatters(final FormatterRegistry registry) {
		registry.addConverter(new FileInfoURIConverter());
	}

	@Override
	public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(new ViewAttributeMethodArgumentResolver());
		resolvers.add(new ViewContextReturnValueAndArgumentResolver());
		resolvers.add(new UiMessageStackMethodArgumentResolver());
		resolvers.add(new UserSessionMethodArgumentResolver());
		resolvers.add(new DtListStateMethodArgumentResolver());
		resolvers.add(new VFileMethodArgumentResolver());
		resolvers.add(new FileInfoURIConverterValueHandler());
	}

	@Override
	public void addReturnValueHandlers(final List<HandlerMethodReturnValueHandler> handlers) {
		handlers.add(new ViewContextReturnValueAndArgumentResolver());
		handlers.add(new VFileReturnValueHandler());
		handlers.add(new FileInfoURIConverterValueHandler());
		handlers.add(new UiFileInfoReturnValueHandler());
	}

	@Override
	public void setApplicationContext(final ApplicationContext applicationContext) throws BeansException {
		if (applicationContext instanceof final ConfigurableApplicationContext configurableApplicationContext) {
			final VSpringMvcControllerAdvice controllerAdvice = configurableApplicationContext.getBeanFactory().createBean(VSpringMvcControllerAdvice.class);
			configurableApplicationContext.getBeanFactory().registerSingleton("viewContextControllerAdvice", controllerAdvice);

			final VSpringMvcExceptionHandler vExceptionHandler = configurableApplicationContext.getBeanFactory().createBean(VSpringMvcExceptionHandler.class);
			configurableApplicationContext.getBeanFactory().registerSingleton("vExceptionHandler", vExceptionHandler);

			final ListAutocompleteController listAutocompleteController = configurableApplicationContext.getBeanFactory().createBean(ListAutocompleteController.class);
			configurableApplicationContext.getBeanFactory().registerSingleton("listAutocompleteController", listAutocompleteController);
		}
	}

	@Override
	public void addInterceptors(final InterceptorRegistry registry) {
		registry.addInterceptor(new VSpringMvcAuthorizationInterceptor());
		registry.addInterceptor(new VSpringMvcViewContextInterceptor());
		registry.addInterceptor(new VAnnotationHandlerInterceptorImpl(getVControllerInterceptorEngines()));
	}

	protected List<Class<? extends VControllerInterceptorEngine>> getVControllerInterceptorEngines() {
		return Collections.emptyList();
	}

	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/vertigo-ui/static/**")
				.addResourceLocations("classpath:/io/vertigo/ui/static/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());

	}

	protected boolean isDevMode() {
		return true;
	}

}
