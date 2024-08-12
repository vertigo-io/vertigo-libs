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
package io.vertigo.datastore.filestore.mimetype;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.config.NodeConfig;

public class DefaultMimeTypeFileStoreManagerTest extends AbstractMimeTypeFileStoreManagerTest {

	protected NodeConfig buildNodeConfig() {
		return buildNodeConfig(false, false);
	}
	
	
	/**
	 * DefaultMimeTypeDetector don't support detect by Data
	 */
	@Test
	@Disabled
	public void testMimeTypeImageByData() throws Exception {
		super.testMimeTypeImageByData();
	}
	
	/** 
	 * DefaultMimeTypeDetector don't support detect by Data
	 */
	@Test
	@Disabled
	public void testMimeTypeTextByData() throws Exception {
		super.testMimeTypeTextByData();
	}
	
	/**
	 * DefaultMimeTypeDetector don't support detect by Data
	 */
	@Test
	@Disabled
	public void testMimeTypeDocByData() throws Exception {
		super.testMimeTypeDocByData();
	}
	
	/**
	 * DefaultMimeTypeDetector don't support detect by Data
	 */
	@Test
	@Disabled
	public void testMimeTypeDocXmlByData() throws Exception {
		super.testMimeTypeDocXmlByData();
	}
	
	/**
	 * DefaultMimeTypeDetector don't support detect by Data
	 */
	@Test
	@Disabled
	public void testMimeTypeXlsByData() throws Exception {
		super.testMimeTypeDocByData();
	}
	
	/**
	 * DefaultMimeTypeDetector don't support detect by Data
	 */
	@Test
	@Disabled
	public void testMimeTypeXlsXmlByData() throws Exception {
		super.testMimeTypeDocXmlByData();
	}
	
	
}
