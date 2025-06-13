/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.datastore.filestore.mimetype;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.TestUtil;
import io.vertigo.datastore.filestore.AbstractFileStoreManagerTest;
import io.vertigo.datastore.filestore.FileStoreManager;
import io.vertigo.datastore.filestore.data.DtDefinitions;
import io.vertigo.datastore.filestore.data.TestSmartTypes;
import io.vertigo.datastore.filestore.data.domain.fileinfo.FileInfoFs;
import io.vertigo.datastore.filestore.model.VFile;

public abstract class AbstractMimeTypeFileStoreManagerTest {

	@Inject
	private FileStoreManager fileStoreManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	protected abstract NodeConfig buildNodeConfig();
	
	protected NodeConfig buildNodeConfig(boolean tika, boolean simplemagic) {
		var dataStoreFeatures = new DataStoreFeatures()
				.withCache()
				.withMemoryCache()
				.withFileStore()
				.withFsFileStore(Param.of("name", "fsStore"),
						Param.of("path", "${java.io.tmpdir}/testFsVertigo/"),
						Param.of("storeDtName", "DtVxFileInfo"),
						Param.of("fileInfoClass", FileInfoFs.class.getName()));
		if(tika) {
			dataStoreFeatures.withTikaMimeTypeResolver();
		}
		
		if(simplemagic) {
			dataStoreFeatures.withSimpleMagicMimeTypeResolver();
		}
		
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(dataStoreFeatures.build())
				.addModule(ModuleConfig.builder("definition")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", DtDefinitions.class.getName())
								.build())
						.build())
				.build();

	}

	

	@Test
	public void testMimeTypeText() throws Exception {
		final VFile vFile1 = TestUtil.createVFile("./data/lautreamont.txt", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
		Assertions.assertEquals("text/plain", resolvedMimeType1);
		
		final VFile vFile2 = TestUtil.createVFile("./data/testFile.txt", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
		Assertions.assertEquals("text/plain", resolvedMimeType2);
	}
	
	@Test
	public void testMimeTypeTextByData() throws Exception {
		
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/testFile.docx", AbstractFileStoreManagerTest.class, "txt");
		try {
			final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
			Assertions.assertNotEquals("text/plain", resolvedMimeType2);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/logo_vertigo.gif", AbstractFileStoreManagerTest.class, "txt");
		try {
			final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
			Assertions.assertNotEquals("text/plain", resolvedMimeType1);		
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
	}
	
	@Test
	public void testMimeTypeImage() throws Exception {
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/logo_vertigo.gif", AbstractFileStoreManagerTest.class);
		final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
		Assertions.assertEquals("image/gif", resolvedMimeType2);
		
		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/logo_vertigo.bmp", AbstractFileStoreManagerTest.class);
		final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
		Assertions.assertTrue("image/bmp".equals(resolvedMimeType1)
				|| "image/x-ms-bmp".equals(resolvedMimeType1));		
		
		final VFile vFile3 = TestUtil.createVFile("./data/mimetype/logo_vertigo.jpg", AbstractFileStoreManagerTest.class);
		final String resolvedMimeType3 = fileStoreManager.resolveMimeType(vFile3);
		Assertions.assertEquals("image/jpeg", resolvedMimeType3);
		
		final VFile vFile4 = TestUtil.createVFile("./data/mimetype/logo_vertigo.png", AbstractFileStoreManagerTest.class);
		final String resolvedMimeType4 = fileStoreManager.resolveMimeType(vFile4);
		Assertions.assertEquals("image/png", resolvedMimeType4);
	}
	
	@Test
	public void testMimeTypeImageByData() throws Exception {
		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/logo_vertigo.gif", AbstractFileStoreManagerTest.class, "bmp");
		try {
			final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
			Assertions.assertNotEquals("image/bmp", resolvedMimeType1);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/logo_vertigo.jpg", AbstractFileStoreManagerTest.class, "gif");
		try {
			final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
			Assertions.assertNotEquals("image/gif", resolvedMimeType2);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile3 = TestUtil.createVFile("./data/mimetype/logo_vertigo.png", AbstractFileStoreManagerTest.class, "jpg");
		try {
			final String resolvedMimeType3 = fileStoreManager.resolveMimeType(vFile3);
			Assertions.assertNotEquals("image/jpeg", resolvedMimeType3);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile4 = TestUtil.createVFile("./data/mimetype/logo_vertigo.bmp", AbstractFileStoreManagerTest.class, "png");
		try {
			final String resolvedMimeType4 = fileStoreManager.resolveMimeType(vFile4);
			Assertions.assertNotEquals("image/png", resolvedMimeType4);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
	}
	
	@Test
	public void testMimeTypeDoc() throws Exception {
		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/testFile.docx", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
		Assertions.assertEquals("application/vnd.openxmlformats-officedocument.wordprocessingml.document", resolvedMimeType1);
		
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/testFile.doc", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
		Assertions.assertEquals("application/msword", resolvedMimeType2);
		
		final VFile vFile3 = TestUtil.createVFile("./data/mimetype/testFile.odt", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType3 = fileStoreManager.resolveMimeType(vFile3);
		Assertions.assertEquals("application/vnd.oasis.opendocument.text", resolvedMimeType3);
		
		final VFile vFile4 = TestUtil.createVFile("./data/mimetype/testFile.pdf", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType4 = fileStoreManager.resolveMimeType(vFile4);
		Assertions.assertEquals("application/pdf", resolvedMimeType4);
	}
	
	@Test
	public void testMimeTypeXls() throws Exception {
		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/testFile.xlsx", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
		Assertions.assertEquals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", resolvedMimeType1);
		
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/testFile.xls", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
		Assertions.assertEquals("application/vnd.ms-excel", resolvedMimeType2);
		
		final VFile vFile4 = TestUtil.createVFile("./data/mimetype/testFile.csv", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType4 = fileStoreManager.resolveMimeType(vFile4);
		Assertions.assertEquals("text/csv", resolvedMimeType4);
		
		final VFile vFile3 = TestUtil.createVFile("./data/mimetype/testFile.ods", AbstractFileStoreManagerTest.class);
		//1.Création du fichier depuis un fichier texte du FS
		final String resolvedMimeType3 = fileStoreManager.resolveMimeType(vFile3);
		Assertions.assertEquals("application/vnd.oasis.opendocument.spreadsheet", resolvedMimeType3);		
	}
	
	@Test
	public void testMimeTypeDocByData() throws Exception {
	
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/testFile.pdf", AbstractFileStoreManagerTest.class, "doc");
		try {
			final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
			Assertions.assertNotEquals("application/msword", resolvedMimeType2);
			Assertions.assertTrue(false, "Accept a bad extension");		
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile4 = TestUtil.createVFile("./data/mimetype/testFile.doc", AbstractFileStoreManagerTest.class, "pdf");
		try {
			final String resolvedMimeType4 = fileStoreManager.resolveMimeType(vFile4);
			Assertions.assertNotEquals("application/pdf", resolvedMimeType4);
			Assertions.assertTrue(false, "Accept a bad extension");		
		} catch (VSystemException e) {
			//Fichier non accepté
		}
	}
	
	@Test
	public void testMimeTypeXlsByData() throws Exception {
		
		final VFile vFile4 = TestUtil.createVFile("./data/mimetype/testFile.xls", AbstractFileStoreManagerTest.class, "csv");
		try {
			final String resolvedMimeType4 = fileStoreManager.resolveMimeType(vFile4);
			Assertions.assertNotEquals("text/csv", resolvedMimeType4);
			Assertions.assertTrue(false, "Accept a bad extension");		
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile2 = TestUtil.createVFile("./data/mimetype/testFile.csv", AbstractFileStoreManagerTest.class, "xls");
		try {
			final String resolvedMimeType2 = fileStoreManager.resolveMimeType(vFile2);
			Assertions.assertNotEquals("application/vnd.ms-excel", resolvedMimeType2);
			Assertions.assertTrue(false, "Accept a bad extension");		
		} catch (VSystemException e) {
			//Fichier non accepté
		}
	}
	
	@Test
	public void testMimeTypeDocXmlByData() throws Exception {

		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/testFile.odt", AbstractFileStoreManagerTest.class, "docx");		
		try {
			final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
			Assertions.assertNotEquals("application/vnd.openxmlformats-officedocument.wordprocessingml.document", resolvedMimeType1);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		

		
		final VFile vFile3 = TestUtil.createVFile("./data/mimetype/testFile.docx", AbstractFileStoreManagerTest.class, "odt");
		try {
			final String resolvedMimeType3 = fileStoreManager.resolveMimeType(vFile3);
			Assertions.assertNotEquals("application/vnd.oasis.opendocument.text", resolvedMimeType3);
			Assertions.assertTrue(false, "Accept a bad extension");		
		} catch (VSystemException e) {
			//Fichier non accepté
		}
	}
	
	@Test
	public void testMimeTypeXlsXmlByData() throws Exception {

		final VFile vFile3 = TestUtil.createVFile("./data/mimetype/testFile.xlsx", AbstractFileStoreManagerTest.class, "ods");
		try {
			final String resolvedMimeType3 = fileStoreManager.resolveMimeType(vFile3);
			Assertions.assertNotEquals("application/vnd.oasis.opendocument.spreadsheet", resolvedMimeType3);
			Assertions.assertTrue(false, "Accept a bad extension");		
		} catch (VSystemException e) {
			//Fichier non accepté
		}
		
		final VFile vFile1 = TestUtil.createVFile("./data/mimetype/testFile.ods", AbstractFileStoreManagerTest.class, "xlsx");		
		try {
			final String resolvedMimeType1 = fileStoreManager.resolveMimeType(vFile1);
			Assertions.assertNotEquals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", resolvedMimeType1);			
			Assertions.assertTrue(false, "Accept a bad extension");
		} catch (VSystemException e) {
			//Fichier non accepté
		}
	}
}
