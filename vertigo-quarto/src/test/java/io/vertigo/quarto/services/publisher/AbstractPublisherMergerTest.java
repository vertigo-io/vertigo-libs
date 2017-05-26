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
package io.vertigo.quarto.services.publisher;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import io.vertigo.app.App;
import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.Home;
import io.vertigo.app.config.AppConfig;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.dynamo.file.util.FileUtil;
import io.vertigo.lang.WrappedException;
import io.vertigo.quarto.impl.services.publisher.PublisherDataUtil;
import io.vertigo.quarto.services.publisher.data.domain.Address;
import io.vertigo.quarto.services.publisher.data.domain.Enquete;
import io.vertigo.quarto.services.publisher.data.domain.Enqueteur;
import io.vertigo.quarto.services.publisher.data.domain.MisEnCause;
import io.vertigo.quarto.services.publisher.data.domain.PublisherMock;
import io.vertigo.quarto.services.publisher.data.domain.Ville;
import io.vertigo.quarto.services.publisher.metamodel.PublisherDataDefinition;
import io.vertigo.quarto.services.publisher.model.PublisherData;
import io.vertigo.quarto.services.publisher.model.PublisherNode;

/**
 * Test de l'implémentation standard.
 *
 * @author npiedeloup
 */
public abstract class AbstractPublisherMergerTest {
	private static final boolean KEEP_OUTPUT_FILE = false;
	//Répertoire de test
	private static String OUTPUT_PATH = "c:/tmp/";

	private static final String DATA_PACKAGE = "io/vertigo/quarto/services/publisher/data/documents/";

	@Inject
	private PublisherManager publisherManager;
	@Inject
	private ResourceManager resourceManager;

	private AutoCloseableApp app;

	/**
	 * Set up de l'environnement de test.
	 *
	 * @throws Exception exception
	 */
	@BeforeEach
	@Before
	public final void setUp() throws Exception {
		app = new AutoCloseableApp(getAppConfig());
		// On injecte les comosants sur la classe de test.
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	protected final App getApp() {
		return app;
	}

	/**
	 * Tear down de l'environnement de test.
	 *
	 * @throws Exception Exception
	 */
	@AfterEach
	@After
	public final void tearDown() throws Exception {
		if (app != null) {
			app.close();
		}
	}

	protected abstract AppConfig getAppConfig();

	/**
	 * @return Extension du model utilisé
	 */
	protected abstract String getExtension();

	@Test
	public void testMergerSimple() {
		final PublisherMock reportData = createTestPublisher();

		final PublisherData publisherData = createPublisherData("PU_PUBLISHER_MOCK");
		PublisherDataUtil.populateData(reportData, publisherData.getRootNode());

		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModel." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusion." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	@Test
	public void testMergerSpecialsCharacters() {
		final PublisherMock reportData = createTestPublisher();

		final PublisherData publisherData = createPublisherData("PU_PUBLISHER_MOCK");
		PublisherDataUtil.populateData(reportData, publisherData.getRootNode());
		publisherData.getRootNode().setString("COMMENTAIRE", " euro:" + (char) 128 + "\n gt:>\n lt:<\n tab:>\t<\n cr:>\n<\n  amp:&\n dquote:\"\n squote:\'\n");

		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModel." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionSpecialsCharacters." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	@Test(expected = IllegalStateException.class)
	public void testMergerErrorModel() {
		final PublisherMock reportData = createTestPublisher();
		final PublisherData publisherData = createPublisherData("PU_PUBLISHER_MOCK");
		PublisherDataUtil.populateData(reportData, publisherData.getRootNode());
		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModelError." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionError." + getExtension(), modelFileURL, publisherData);
		nop(result);
		Assert.fail("La fusion ne doit pas être possible quand le modèle contient une erreur");
	}

	@Test
	public void testMergerModelIfEquals() {
		final PublisherMock reportData = createTestPublisher();
		final PublisherData publisherData = createPublisherData("PU_PUBLISHER_MOCK");
		PublisherDataUtil.populateData(reportData, publisherData.getRootNode());
		publisherData.getRootNode().setString("TITRE", "NOM");
		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModelIfEquals." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionIfEquals." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	@Test
	public void testMergerModelIfNotEquals() {
		final PublisherMock reportData = createTestPublisher();
		final PublisherData publisherData = createPublisherData("PU_PUBLISHER_MOCK");
		PublisherDataUtil.populateData(reportData, publisherData.getRootNode());
		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModelIfEquals." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionIfNotEquals." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	@Test
	public void testMergerEnquete() {
		final Enquete dtoEnquete = DataHelper.createEnquete();
		final Enqueteur dtoEnqueteur = DataHelper.createEnqueteur();
		final Address dtoAdresse = DataHelper.createAdresse();
		final Ville dtoVille = DataHelper.createVille();
		final DtList<? extends MisEnCause> dtcMisEnCause = DataHelper.createMisEnCauseList();

		final PublisherData publisherData = createPublisherData("PU_ENQUETE");
		final PublisherNode pnEnquete = publisherData.getRootNode();
		PublisherDataUtil.populateData(dtoEnquete, pnEnquete);

		final PublisherNode pnEnqueteur = pnEnquete.createNode("ENQUETEUR");
		PublisherDataUtil.populateData(dtoEnqueteur, pnEnqueteur);
		pnEnquete.setNode("ENQUETEUR", pnEnqueteur);

		final PublisherNode pnAdresse = pnEnqueteur.createNode("ADRESSE_RATACHEMENT");
		PublisherDataUtil.populateData(dtoAdresse, pnAdresse);
		pnEnqueteur.setNode("ADRESSE_RATACHEMENT", pnAdresse);

		final PublisherNode pnVille = pnAdresse.createNode("VILLE");
		PublisherDataUtil.populateData(dtoVille, pnVille);
		pnAdresse.setNode("VILLE", pnVille);

		final List<PublisherNode> publisherNodes = new ArrayList<>();
		for (final MisEnCause dtoMisEnCause : dtcMisEnCause) {
			final PublisherNode pnMisEnCause = pnEnquete.createNode("MIS_EN_CAUSE");
			PublisherDataUtil.populateData(dtoMisEnCause, pnMisEnCause);
			publisherNodes.add(pnMisEnCause);
		}
		pnEnquete.setNodes("MIS_EN_CAUSE", publisherNodes);

		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModelEnquete." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionEnquete." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	@Test
	public void testMergerEnquetePerField() {
		final Enquete dtoEnquete = DataHelper.createEnquete();
		final Enqueteur dtoEnqueteur = DataHelper.createEnqueteur();
		final Address dtoAdresse = DataHelper.createAdresse();
		final Ville dtoVille = DataHelper.createVille();
		final DtList<? extends MisEnCause> dtcMisEnCause = DataHelper.createMisEnCauseList();

		final PublisherData publisherData = createPublisherData("PU_ENQUETE");
		final PublisherNode pnEnquete = publisherData.getRootNode();
		PublisherDataUtil.populateData(dtoEnquete, pnEnquete);

		final PublisherNode pnEnqueteur = PublisherDataUtil.populateField(pnEnquete, "ENQUETEUR", dtoEnqueteur);
		final PublisherNode pnAdresse = PublisherDataUtil.populateField(pnEnqueteur, "ADRESSE_RATACHEMENT", dtoAdresse);
		PublisherDataUtil.populateField(pnAdresse, "VILLE", dtoVille);
		PublisherDataUtil.populateField(pnEnquete, "MIS_EN_CAUSE", dtcMisEnCause);

		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModelEnquete." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionEnquetePerField." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	@Test
	public void testMergerBlock() {
		final PublisherMock reportData = createTestPublisher();

		final PublisherData publisherData = createPublisherData("PU_PUBLISHER_MOCK");
		PublisherDataUtil.populateData(reportData, publisherData.getRootNode());

		final URL modelFileURL = resourceManager.resolve(DATA_PACKAGE + "ExempleModel2." + getExtension());
		final VFile result = publisherManager.publish(OUTPUT_PATH + "testFusionBlock." + getExtension(), modelFileURL, publisherData);
		if (KEEP_OUTPUT_FILE) {
			save(result);
		}
		Assert.assertNotNull(result);
	}

	//	/**
	//	 */
	//	public void testMergerImageJpg() {
	//		final DtObject reportData = createTestPublisher();
	//		final PublisherDataDtoExtractor dataExtractor = new PublisherDataDtoExtractor(reportData);
	//
	//		final VFile image = TestUtil.createVFile("data/logo.jpg", getClass());
	//		final PublisherData publisherData = dataExtractor.getPublisherData();
	//		publisherData.getRoot().addImage("LOGO", image);
	//		final PublisherWork publisherWork = publisherManager.createWork("c:/xxx/testFusionImage."+getExtension(), PACKAGE + "/data/ExempleModelImage."+getExtension(), "report", publisherData);
	//
	//		final VFile result = workManager.process(publisherWork);
	//		log.trace("testMergerImageJpg result : " + result);
	//		assertTrue(true);
	//	}
	//
	//	/**
	//	 */
	//	public void testMergerImageRatio() {
	//		final DtObject reportData = createTestPublisher();
	//		final PublisherDataDtoExtractor dataExtractor = new PublisherDataDtoExtractor(reportData);
	//
	//		final VFile image = TestUtil.createVFile("data/logoMasque.gif", getClass());
	//		final PublisherData publisherData = dataExtractor.getPublisherData();
	//		publisherData.getRoot().addImage("LOGO", image);
	//		final PublisherWork publisherWork = publisherManager.createWork("c:/xxx/testFusionImage2."+getExtension(), PACKAGE + "/data/ExempleModelImage2."+getExtension(), "report", publisherData);
	//
	//		final VFile result = workManager.process(publisherWork);
	//		log.trace("testMergerImageRatio result : " + result);
	//		assertTrue(true);
	//	}

	private static PublisherMock createTestPublisher() {
		final PublisherMock reportData = new PublisherMock();
		reportData.setTitre("Mon titre");
		reportData.setNom("BITUM");
		reportData.setPrenom("John");
		reportData.setAddress("38, rue de la corniche\n01345 - rivera");
		reportData
				.setCommentaire(
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium urna pulvinar massa placerat imperdiet. Curabitur vestibulum dui eget nibh consequat eget ultrices velit iaculis. Ut justo ipsum, euismod nec pulvinar sit amet, consectetur in dui. Ut sed ligula ligula. Phasellus libero enim, congue nec volutpat dignissim, pulvinar luctus urna.\n\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium urna pulvinar massa placerat imperdiet. Curabitur vestibulum dui eget nibh consequat eget ultrices velit iaculis. Ut justo ipsum, euismod nec pulvinar sit amet, consectetur in dui. Ut sed ligula ligula. Phasellus libero enim, congue nec volutpat dignissim, pulvinar luctus urna.\n\t1-\tLorem ipsum dolor\n\t2-\tLorem ipsum dolor\n\t3-\tLorem ipsum dolor");
		reportData.setBoolean1(true);
		reportData.setBoolean2(false);
		reportData.setBoolean3(true);
		reportData.setTestDummy(
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium urna pulvinar massa placerat imperdiet. Curabitur vestibulum dui eget nibh consequat eget ultrices velit iaculis. Ut justo ipsum, euismod nec pulvinar sit amet, consectetur in dui. Ut sed ligula ligula. Phasellus libero enim, congue nec volutpat dignissim, pulvinar luctus urna.");
		reportData.setTestLong(45676L);
		reportData.setTestDouble(79613D);
		reportData.setTestInteger(79413);
		reportData.setTestDate(new Date());

		//		final DtList<DtObject> testList = TestHelper.createDtList(AbstractPublisherMock.DEFINITION_URN);
		//		for (int i = 0; i < 50; i++) {
		//			testList.add(createTestPublisherRandom(String.valueOf(i)));
		//		}
		//		setFieldValue(reportData, "DTC_TEST", testList);

		return reportData;
	}

	//	private DtObject createTestPublisherRandom(final String name) {
	//		final DtObject reportData = TestHelper.createDtObject(AbstractPublisherMock.DEFINITION_URN);
	//		setFieldValue(reportData, "TITRE", "Obj dyn " + name);
	//		setFieldValue(reportData, "NOM", "BITUM");
	//		setFieldValue(reportData, "PRENOM", "John");
	//		setFieldValue(reportData, "ADDRESS", "38, rue de la corniche\n01345 - rivera");
	//		setFieldValue(reportData, "COMMENTAIRE", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium urna pulvinar massa placerat imperdiet. Curabitur vestibulum dui eget nibh consequat eget ultrices velit iaculis. Ut justo ipsum, euismod nec pulvinar sit amet, consectetur in dui. Ut sed ligula ligula. Phasellus libero enim, congue nec volutpat dignissim, pulvinar luctus urna.\n\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium urna pulvinar massa placerat imperdiet. Curabitur vestibulum dui eget nibh consequat eget ultrices velit iaculis. Ut justo ipsum, euismod nec pulvinar sit amet, consectetur in dui. Ut sed ligula ligula. Phasellus libero enim, congue nec volutpat dignissim, pulvinar luctus urna.\n\t1-\tLorem ipsum dolor\n\t2-\tLorem ipsum dolor\n\t3-\tLorem ipsum dolor");
	//		setFieldValue(reportData, "TEST_LONG", Math.round(Math.random() * 1000));
	//		setFieldValue(reportData, "TEST_DOUBLE", Math.random() * 1000);
	//		setFieldValue(reportData, "TEST_INTEGER", (int) Math.round(Math.random() * 100));
	//		setFieldValue(reportData, "TEST_DATE", new Date());
	//		return reportData;
	//	}

	private static PublisherData createPublisherData(final String definitionName) {
		final PublisherDataDefinition publisherDataDefinition = Home.getApp().getDefinitionSpace().resolve(definitionName, PublisherDataDefinition.class);
		Assert.assertNotNull(publisherDataDefinition);

		final PublisherData publisherData = new PublisherData(publisherDataDefinition);
		Assert.assertNotNull(publisherData);

		return publisherData;
	}

	private static void save(final VFile result) {
		try {
			FileUtil.copy(result.createInputStream(), new File(result.getFileName()));
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	private static final void nop(final Object o) {
		// rien
	}
}
