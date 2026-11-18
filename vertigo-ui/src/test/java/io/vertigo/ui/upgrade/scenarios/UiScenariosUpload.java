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
package io.vertigo.ui.upgrade.scenarios;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;
import static io.vertigo.ui.upgrade.UiActions.submit;

import java.nio.charset.StandardCharsets;
import java.util.List;

import com.microsoft.playwright.options.FilePayload;

import io.vertigo.ui.upgrade.UiScenario;

/**
 * The v-fileupload components no demo page showed : v-fileupload, -dropzone, -simple-object (page catalogUpload).
 * v-fileupload-simple is not on the page : the key mode of v-fileupload fails (its assertion needs a label, not a param).
 */
public final class UiScenariosUpload {
	private static final String FAMILY = "upload";
	private static final String PAGE = "/catalogUpload/";
	private static final FilePayload UPLOADED = new FilePayload("upload-test.txt", "text/plain", "uploaded by the upgrade tests".getBytes(StandardCharsets.UTF_8));

	private UiScenariosUpload() {
		//util
	}

	public static List<UiScenario> scenarios() {
		return List.of(
				UiScenario.page("catalog-upload", FAMILY, PAGE)
						.withChecks(page -> {
							assertThat(page.locator(".catalog-v-fileupload").getByText("my1stFile.csv").first()).isVisible();
							assertThat(page.locator(".catalog-v-fileupload-simple-object").getByText("my3rdFile.csv").first()).isVisible();
						}),
				UiScenario.page("catalog-upload-add", FAMILY, PAGE)
						.withActions(page -> page.locator(".catalog-v-fileupload input[type=file]").first().setInputFiles(UPLOADED))
						.withChecks(page -> assertThat(page.locator(".catalog-v-fileupload").getByText("upload-test.txt").first()).isVisible()),
				UiScenario.page("catalog-upload-dropzone-add", FAMILY, PAGE)
						.withActions(page -> page.locator(".catalog-v-fileupload-dropzone input[type=file]").first().setInputFiles(UPLOADED))
						.withChecks(page -> assertThat(page.locator(".catalog-v-fileupload-dropzone").getByText("upload-test.txt").first()).isVisible()),
				UiScenario.page("catalog-upload-read", FAMILY, PAGE)
						.withActions(page -> submit(page, "#readAction"))
						.withChecks(page -> {
							assertThat(page.locator("#editAction")).isVisible();
							assertThat(page.locator(".catalog-v-fileupload").getByText("my1stFile.csv").first()).isVisible();
						}));
	}
}
