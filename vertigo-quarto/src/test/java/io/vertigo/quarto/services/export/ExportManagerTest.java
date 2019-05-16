/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.quarto.services.export;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;

import io.vertigo.AbstractTestCaseJU5;
import io.vertigo.app.config.DefinitionProviderConfig;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.app.config.NodeConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.locale.MessageText;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dynamo.DynamoFeatures;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.dynamo.plugins.environment.DynamoDefinitionProvider;
import io.vertigo.quarto.QuartoFeatures;
import io.vertigo.quarto.services.export.data.DtDefinitions.ContinentFields;
import io.vertigo.quarto.services.export.data.DtDefinitions.CountryFields;
import io.vertigo.quarto.services.export.data.domain.Continent;
import io.vertigo.quarto.services.export.data.domain.Country;
import io.vertigo.quarto.services.export.model.Export;
import io.vertigo.quarto.services.export.model.ExportBuilder;
import io.vertigo.quarto.services.export.model.ExportFormat;

/**
 * Test de l'implémentation standard.
 *
 * @author dchallas
 */
public final class ExportManagerTest extends AbstractTestCaseJU5 {
	// Répertoire de test
	private static String OUTPUT_PATH = "c:/tmp/";

	@Inject
	private ExportManager exportManager;

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withCache()
						.withMemoryCache()
						.build())
				.addModule(new DynamoFeatures()
						.withStore()
						.build())
				.addModule(new QuartoFeatures()
						.withExport()
						.withCSVExporter()
						.withPDFExporter()
						.withRTFExporter()
						.withXLSExporter()
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(DynamoDefinitionProvider.class)
								.addDefinitionResource("kpr", "io/vertigo/quarto/services/export/data/execution.kpr")
								.addDefinitionResource("classes", "io.vertigo.quarto.services.export.data.DtDefinitions")
								.build())
						.build())
				.build();
	}

	/**
	 * Test l'export CSV.
	 */
	@Test
	public void testExportHandlerCSV() {
		final DtList<Country> dtc = buildCountries();

		final Export export = new ExportBuilder(ExportFormat.CSV, OUTPUT_PATH + "test.csv")
				.beginSheet(dtc, "famille")
				.endSheet()
				.build();
		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export CSV d'un objet.
	 */
	@Test
	public void testExportObject() {
		final Country china = new Country().setName("china");

		final Export export = new ExportBuilder(ExportFormat.CSV, OUTPUT_PATH + "test2.csv")
				.beginSheet(china, "china")
				.endSheet()
				.build();
		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export CSV d'un champs donnée.
	 */
	@Test
	public void testExportField() {
		final Country china = new Country().setName("china");

		final Export export = new ExportBuilder(ExportFormat.CSV, OUTPUT_PATH + "test3.csv")
				.beginSheet(china, "china")
				.addField(CountryFields.name)
				.endSheet()
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export CSV d'un champs avec label surchargé.
	 */
	@Test
	public void testExportFieldOverrideLabel() {
		final Country china = new Country().setName("china");

		final Export export = new ExportBuilder(ExportFormat.CSV, OUTPUT_PATH + "test3.csv")
				.beginSheet(china, "china")
				.addField(CountryFields.name, MessageText.of("test"))
				.endSheet()
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export CSV d'un champs avec une dénormalisation de sa valeur.
	 */
	@Test
	public void testExportFieldDenorm() {
		final DtList<Continent> dtc = buildContinents();
		final Country germany = new Country()
				.setId(1L)
				.setConId(10L)
				.setName("germany");

		final Export export = new ExportBuilder(ExportFormat.CSV, OUTPUT_PATH + "test4.csv")
				.beginSheet(germany, "germany")
				.addField(CountryFields.conId, dtc, ContinentFields.name)
				.endSheet()
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export CSV d'un champs avec une dénormalisation de sa valeur, et
	 * surcharge du label.
	 */
	@Test
	public void testExportFieldDenormOverrideLabel() {
		final DtList<Country> dtc = buildCountries();
		final Country germany = new Country()
				.setId(1L)
				.setName("germany");

		final Export export = new ExportBuilder(ExportFormat.CSV, OUTPUT_PATH + "test5.csv")
				.beginSheet(germany, "country")
				.addField(CountryFields.id, dtc, CountryFields.name, MessageText.of("test"))
				.endSheet()
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export Excel.
	 */
	@Test
	public void testExportHandlerExcel() {
		final DtList<Country> countries = buildCountries();
		final DtList<Continent> contients = buildContinents();

		final Export export = new ExportBuilder(ExportFormat.XLS, OUTPUT_PATH + "test.xls")
				.beginSheet(countries, "countries")
				.addField(CountryFields.conId, contients, ContinentFields.name)
				.addField(CountryFields.active)
				.endSheet()
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export RTF.
	 */
	@Test
	public void testExportHandlerRTF() {
		final DtList<Country> dtc = buildCountries();

		final Export export = new ExportBuilder(ExportFormat.RTF, OUTPUT_PATH + "test.rtf")
				.withAuthor("test")
				.withTitle("test title")
				.beginSheet(dtc, "famille")
				.endSheet()
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	/**
	 * Test l'export PDF.
	 */
	@Test
	public void testExportHandlerPDF() {
		final DtList<Country> dtc = buildCountries();

		final Export export = new ExportBuilder(ExportFormat.PDF, OUTPUT_PATH + "test.pdf")
				.beginSheet(dtc, "famille")
				.endSheet()
				.withAuthor("test")
				.build();

		final VFile result = exportManager.createExportFile(export);
		nop(result);
	}

	private static DtList<Continent> buildContinents() {
		final Continent europe = new Continent().setId(10L).setName("Europe");
		final Continent america = new Continent().setId(20L).setName("America");
		final Continent unknownContinent = new Continent().setId(30L); //no name
		final Continent asie = new Continent().setId(40L).setName("Asie");

		final DtList<Continent> dtc = new DtList<>(Continent.class);
		// les index sont données par ordre alpha > null à la fin >
		dtc.add(america);
		dtc.add(asie);
		dtc.add(europe);
		dtc.add(unknownContinent);
		return dtc;
	}

	private static DtList<Country> buildCountries() {
		final Country france = new Country().setId(1L).setConId(10L).setName("France").setActive(true);
		final Country usa = new Country().setId(2L).setConId(20L).setName("usa").setActive(true);
		final Country unknownCountry = new Country().setId(3L).setConId(30L).setActive(false); //no name
		final Country japan = new Country().setId(4L).setConId(40L).setName("japan").setActive(true);

		final DtList<Country> dtc = new DtList<>(Country.class);
		// les index sont données par ordre alpha > null à la fin >
		dtc.add(france);
		dtc.add(usa);
		dtc.add(unknownCountry);
		dtc.add(japan);
		return dtc;
	}
}
