/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.orchestra.ui;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.core.component.ComponentInitializer;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessDefinitionBuilder;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessType;

/**
 * Initialisation des processus gérés par Orchestra
 *
 * @author mlaroche.
 * @version $Id$
 */
public class OrchestraProcessInitializer implements ComponentInitializer {

	@Inject
	private OrchestraDefinitionManager orchestraDefinitionManager;

	/** {@inheritDoc} */
	@Override
	public void init() {

		final Map<String, String> initialParams = new HashMap<>();
		initialParams.put("filePath", "toto/titi");

		final Map<String, String> metaDatas = new HashMap<>();
		metaDatas.put("functionalDomain", "Référentiels");

		final ProcessDefinition processDefinition = new ProcessDefinitionBuilder("CHORUS_CENTRE_FIN", "CHORUS - Centre financiers")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);

		final ProcessDefinition processDefinition2 = new ProcessDefinitionBuilder("CHORUS_DOMAINES_FONC", "CHORUS - Domaines fonctionnels")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition2);

		final ProcessDefinition processDefinition3 = new ProcessDefinitionBuilder("CHORUS_CENTRE_COUT", "CHORUS - Centres de couts")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition3);

		final ProcessDefinition processDefinition4 = new ProcessDefinitionBuilder("CHORUS_REF_ACT", "CHORUS - Référentiels d'activités")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition4);

		final ProcessDefinition processDefinition5 = new ProcessDefinitionBuilder("CHORUS_EOTP", "CHORUS - éOTP")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition5);

		final ProcessDefinition processDefinition6 = new ProcessDefinitionBuilder("CHORUS_TRANCHES_FONC", "CHORUS - Tranches fonctionnelles")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition6);

		final ProcessDefinition processDefinition7 = new ProcessDefinitionBuilder("CHORUS_OPERATEURS_ECO", "CHORUS - Opérateurs économiques")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition7);

		final ProcessDefinition processDefinition8 = new ProcessDefinitionBuilder("INFODAF_SERVICES", "INFODAF - Service fait")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition8);

		final ProcessDefinition processDefinition9 = new ProcessDefinitionBuilder("INFODAF_BDC", "INFODAF - Bons de commande")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition9);

		final ProcessDefinition processDefinition10 = new ProcessDefinitionBuilder("PLACE_CREATION", "PLACE - Création des consultations")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition10);

		final ProcessDefinition processDefinition11 = new ProcessDefinitionBuilder("PLACE_DCE", "PLACE - Récupération du DCE")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition11);

		final ProcessDefinition processDefinition12 = new ProcessDefinitionBuilder("DECLIC_PPAA", "DECLIC - Plans de charge")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition12);

		final ProcessDefinition processDefinition13 = new ProcessDefinitionBuilder("DECLIC_FEB", "DECLIC - Fiche d'expression de besoins")
				.withCronExpression("0 */1 * * * ?")
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Récupération du fichier", EmptyActivityEngine.class)
				.addActivity("ACT_2", "Intégration des données", EmptyActivityEngine.class)
				.addActivity("ACT_3", "Traitement sur les données", EmptyActivityEngine.class)
				.addActivity("ACT_4", "Envoi à ALPHA", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition13);

		final ProcessDefinition processDefinition14 = new ProcessDefinitionBuilder("PRO_IN_MEMORY", "En mémoire", ProcessType.UNSUPERVISED)
				.addInitialParams(initialParams)
				.withMetadatas(metaDatas)
				.addActivity("ACT_1", "Complet", EmptyActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition14);
	}

}
