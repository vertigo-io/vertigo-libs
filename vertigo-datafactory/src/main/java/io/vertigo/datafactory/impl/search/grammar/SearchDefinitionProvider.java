package io.vertigo.datafactory.impl.search.grammar;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.config.DefinitionResourceConfig;
import io.vertigo.core.node.definition.DefinitionProvider;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.dynamo.plugins.environment.dsl.dynamic.DslDefinition;
import io.vertigo.dynamo.plugins.environment.dsl.dynamic.DslDefinitionRepository;
import io.vertigo.dynamo.plugins.environment.dsl.dynamic.DynamicRegistry;
import io.vertigo.dynamo.plugins.environment.loaders.Loader;
import io.vertigo.dynamo.plugins.environment.loaders.kpr.KprLoader;

/**

 * Environnement permettant de charger le Modèle.
 * Le Modèle peut être chargé de multiples façon :
 * - par lecture d'un fichier oom (poweramc),
 * - par lecture des annotations java présentes sur les beans,
 * - par lecture de fichiers ksp regoupés dans un projet kpr,
 * - ....
 *  Ces modes de chargement sont extensibles.
 *
 * @author pchretien
 */
public class SearchDefinitionProvider implements DefinitionProvider {

	private final Loader kprLoader;
	private final List<DefinitionResourceConfig> definitionResourceConfigs = new ArrayList<>();

	/**
	 * Constructeur injectable.
	 * @param resourceManager the component for finding resources
	 * @param encoding the encoding to use for reading ksp files
	 */
	@Inject
	public SearchDefinitionProvider(final ResourceManager resourceManager, @ParamValue("encoding") final Optional<String> encoding) {
		kprLoader = new KprLoader(resourceManager, encoding);
	}

	@Override
	public void addDefinitionResourceConfig(final DefinitionResourceConfig definitionResourceConfig) {
		Assertion.checkNotNull(definitionResourceConfig);
		Assertion.checkState("kpr".equals(definitionResourceConfig.getType()), "Only kpr files are allowed in SearchDefinitionProvider");
		//
		definitionResourceConfigs.add(definitionResourceConfig);
	}

	@Override
	public List<DefinitionSupplier> get(final DefinitionSpace definitionSpace) {
		return parse(definitionSpace);
	}

	/**
	 * @param definitionResourceConfigs List of resources (must be in a type managed by this loader)
	 */
	private List<DefinitionSupplier> parse(final DefinitionSpace definitionSpace) {

		//Création du repositoy des instances le la grammaire (=> model)
		final DynamicRegistry searchDynamicRegistry = new SearchDynamicRegistry();
		final DslDefinitionRepository dslDefinitionRepository = new DslDefinitionRepository(searchDynamicRegistry);

		//--Enregistrement des types primitifs
		for (final DslDefinition dslDefinition : searchDynamicRegistry.getGrammar().getRootDefinitions()) {
			dslDefinitionRepository.addDefinition(dslDefinition);
		}
		for (final DefinitionResourceConfig definitionResourceConfig : definitionResourceConfigs) {
			kprLoader.load(definitionResourceConfig.getPath(), dslDefinitionRepository);
		}

		return dslDefinitionRepository.solve(definitionSpace);
	}

}
