/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.webservice.debug;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * The thread dump page with a Content Security Policy nonce.
 */
public final class ThreadDumpHtmlPageTest {

	@Test
	public void testWithoutNonce() {
		final String html = ThreadDumpWebServices.htmlPage(null);
		Assertions.assertTrue(html.contains("<script>"));
		Assertions.assertTrue(html.contains("<style>"));
		Assertions.assertFalse(html.contains("nonce"));
	}

	@Test
	public void testWithNonce() {
		final String html = ThreadDumpWebServices.htmlPage("aB3+/xY=");
		Assertions.assertTrue(html.contains("<script nonce=\"aB3+/xY=\">"));
		Assertions.assertTrue(html.contains("<style nonce=\"aB3+/xY=\">"));
	}

	@Test
	public void testNonceCantInjectMarkup() {
		final String html = ThreadDumpWebServices.htmlPage("aB3\"><img src=x>");
		Assertions.assertTrue(html.contains("<script nonce=\"aB3imgsrc=x\">"), "only the base64 characters are kept");
		Assertions.assertFalse(html.contains("<img"));
	}
}
