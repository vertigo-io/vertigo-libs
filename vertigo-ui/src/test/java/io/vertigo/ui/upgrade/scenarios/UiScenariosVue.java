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

import java.util.List;

import org.junit.jupiter.api.Assertions;

import io.vertigo.ui.upgrade.UiScenario;

/**
 * The Vue components of vertigo-ui working without a server : v-dashboard-chart (Chart.js and dayjs are not embedded :
 * the page gives them, with the dayjs adapter of Chart.js for the time axis), v-json-editor (page catalogVue). v-tree is covered by vu:tree (UiScenariosInputs).
 */
public final class UiScenariosVue {
	private static final String FAMILY = "vue";
	private static final String PAGE = "/catalogVue/";

	private UiScenariosVue() {
		//util
	}

	public static List<UiScenario> scenarios() {
		return List.of(
				UiScenario.page("vue-chart", FAMILY, PAGE)
						.withChecks(page -> {
							assertThat(page.locator(".catalog-chart canvas")).hasCount(2);
							for (final var canvas : page.locator(".catalog-chart canvas").all()) {
								final var box = canvas.boundingBox();
								Assertions.assertTrue(box != null && box.width > 0 && box.height > 0, "chart canvas without size");
							}
						}),
				UiScenario.page("vue-json-editor", FAMILY, PAGE)
						.withActions(page -> page.locator(".catalog-json-editor input").first().fill("Lyon"))
						.withChecks(page -> Assertions.assertTrue(
								String.valueOf(page.evaluate("() => VUiPage.vueData.catalogJson")).contains("Lyon"),
								"v-json-editor didn't update its model")));
	}
}
