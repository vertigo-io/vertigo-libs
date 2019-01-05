package io.vertigo.app.config.json;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.inject.Named;

import com.google.gson.Gson;

import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.app.config.BootConfigBuilder;
import io.vertigo.app.config.Features;
import io.vertigo.app.config.LogConfig;
import io.vertigo.app.config.json.JsonAppConfig.JsonModuleConfig;
import io.vertigo.app.config.json.JsonAppConfig.JsonParamsConfig;
import io.vertigo.core.component.Plugin;
import io.vertigo.core.param.Param;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;
import io.vertigo.lang.WrappedException;
import io.vertigo.util.ClassUtil;
import io.vertigo.util.Selector;
import io.vertigo.util.Selector.MethodConditions;

public final class JsonAppConfigBuilder implements Builder<AppConfig> {

	private final AppConfigBuilder appConfigBuilder = AppConfig.builder();

	private final Gson gson = new Gson();

	/**
	 * Begin the boot config of the app.
	 * @return the bootConfig builder
	 */
	public BootConfigBuilder beginBoot() {
		return appConfigBuilder.beginBoot();
	}

	/**
	* Append Config of a set of modules.
	 * @param relativeRootClass Class used to access files in a relative way.
	* @param params properties used to configure the app
	* @param jsonFileNames fileNames of the different json files
	*
	* @return this builder
	*/
	public JsonAppConfigBuilder withFiles(final Class relativeRootClass, final Properties params, final String... jsonFileNames) {
		Assertion.checkNotNull(relativeRootClass);
		Assertion.checkNotNull(params);
		Assertion.checkNotNull(jsonFileNames);
		//-----
		Stream.of(jsonFileNames)
				.map(xmlModulesFileName -> createURL(xmlModulesFileName, relativeRootClass))
				.forEach(jsonConfigUrl -> handleJsonFileConfig(jsonConfigUrl));
		return this;
	}

	private void handleJsonFileConfig(final URL jsonConfigURL) {
		final JsonAppConfig jsonAppConfig = gson.fromJson(parseFile(jsonConfigURL), JsonAppConfig.class);
		jsonAppConfig.entrySet().stream()
				.forEach(entry -> handleJsonModuleConfig(entry.getKey(), entry.getValue()));
	}

	private void handleJsonModuleConfig(final String featuresClassName, final JsonModuleConfig jsonModuleConfig) {
		final Features moduleConfigByFeatures = ClassUtil.newInstance(featuresClassName, Features.class);
		final Map<String, Method> featureMethods = new Selector().from(moduleConfigByFeatures.getClass())
				.filterMethods(MethodConditions.annotatedWith(Feature.class))
				.findMethods()
				.stream()
				.map(classAndMethod -> classAndMethod.getVal2())
				.collect(Collectors.toMap(method -> method.getAnnotation(Feature.class).value(), method -> method));

		jsonModuleConfig.features.entrySet()
				.forEach(entry -> {
					final Method methodForFeature = featureMethods.get(entry.getKey());
					Assertion.checkNotNull(methodForFeature);
					ClassUtil.invoke(moduleConfigByFeatures, methodForFeature, findmethodParameters(entry.getValue(), methodForFeature, entry.getKey(), featuresClassName));
				});

		jsonModuleConfig.plugins.forEach(
				plugin -> moduleConfigByFeatures.getModuleConfigBuilder()
						.addPlugin(
								ClassUtil.classForName(plugin.className, Plugin.class),
								plugin.params.entrySet().stream()
										.map(entry -> Param.of(entry.getKey(), entry.getValue()))
										.toArray(Param[]::new)));
		appConfigBuilder.addModule(moduleConfigByFeatures.build());
	}

	private static Object[] findmethodParameters(final JsonParamsConfig jsonParamsConfig, final Method method, final String featureName, final String featuresClassName) {
		return Stream.of(method.getParameters())
				.map(parameter -> {
					Assertion.checkState(parameter.isAnnotationPresent(Named.class), "Params of a feature must be annotated with @Named");
					// ---
					final String paramName = parameter.getAnnotation(Named.class).value();
					final Class paramType = parameter.getType();
					Assertion.checkState(paramType.isAssignableFrom(String.class), "Param '{0}' of a feature '{1}' must be Strings", paramName, featureName);
					// ---
					final String paramValue = jsonParamsConfig.get(paramName);
					Assertion.checkNotNull(paramValue, "No value provided for param '{0}' on feature '{1}' in the module '{2}'", paramName, featureName, featuresClassName);
					return paramValue;
				})
				.toArray();
	}

	/**
	 * @param logConfig Config of logs
	 * @return  this builder
	 */
	public JsonAppConfigBuilder withLogConfig(final LogConfig logConfig) {
		Assertion.checkNotNull(logConfig);
		//-----
		appConfigBuilder.beginBoot().withLogConfig(logConfig).endBoot();
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public AppConfig build() {
		return appConfigBuilder.build();
	}

	/**
	 * Retourne l'URL correspondant au nom du fichier dans le classPath.
	 *
	 * @param fileName Nom du fichier
	 * @return URL non null
	 */
	private static URL createURL(final String fileName, final Class<?> relativeRootClass) {
		Assertion.checkArgNotEmpty(fileName);
		//-----
		try {
			return new URL(fileName);
		} catch (final MalformedURLException e) {
			//Si fileName non trouvé, on recherche dans le classPath
			final URL url = relativeRootClass.getResource(fileName);
			Assertion.checkNotNull(url, "Impossible de récupérer le fichier [" + fileName + "]");
			return url;
		}
	}

	private static String parseFile(final URL url) {
		try (final BufferedReader reader = new BufferedReader(
				new InputStreamReader(url.openStream(), StandardCharsets.UTF_8))) {
			final StringBuilder buff = new StringBuilder();
			String line = reader.readLine();
			while (line != null) {
				buff.append(line);
				line = reader.readLine();
				buff.append("\r\n");
			}
			return buff.toString();
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error reading json file : '{0}'", url);
		}
	}

}
