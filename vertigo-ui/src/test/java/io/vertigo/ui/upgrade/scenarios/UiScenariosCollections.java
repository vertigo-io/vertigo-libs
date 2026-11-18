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
import static io.vertigo.ui.upgrade.UiActions.centerAndClick;
import static io.vertigo.ui.upgrade.UiActions.waitVisible;

import java.util.List;

import io.vertigo.ui.upgrade.UiScenario;

/**
 * The Quasar collections and buttons no demo page showed : list, collection, buttons-group (page catalogCollections).
 */
public final class UiScenariosCollections {
	private static final String FAMILY = "collections";
	private static final String PAGE = "/catalogCollections/";

	private UiScenariosCollections() {
		//util
	}

	public static List<UiScenario> scenarios() {
		return List.of(
				UiScenario.page("catalog-collections", FAMILY, PAGE)
						.withChecks(page -> {
							assertThat(page.locator(".catalog-list .q-item")).hasCount(3); // rowsPerPage
							assertThat(page.locator(".catalog-collection .q-card")).hasCount(3);
						}),
				// pagination mode of vu:cards : 3 cards per page, the page 2 shows the next ones ; pagination_color reaches the q-pagination
				UiScenario.page("catalog-collections-pagination", FAMILY, PAGE)
						.withActions(page -> page.locator(".catalog-cards-pages .q-pagination .q-btn:has-text('2')").first().click())
						.withChecks(page -> {
							assertThat(page.locator(".catalog-cards-pages .q-card")).hasCount(3);
							assertThat(page.locator(".catalog-cards-pages .q-pagination .q-btn.bg-secondary")).hasText("2");
						}),
				UiScenario.page("catalog-collections-show-more", FAMILY, PAGE)
						.withActions(page -> page.locator(".catalog-list .q-btn:has-text('More movies')").click())
						.withChecks(page -> assertThat(page.locator(".catalog-list .q-item")).hasCount(6)),
				// at 1280px (Quasar md), md="2" : 2 buttons shown, the others in the "more" menu
				UiScenario.page("catalog-collections-buttons-group-more", FAMILY, PAGE).withOverlay()
						.withActions(page -> {
							centerAndClick(page.locator(".catalog-buttons .q-btn[title='More actions']").first());
							waitVisible(page, ".q-menu");
						})
						.withChecks(page -> assertThat(page.locator(".q-menu .q-btn:visible")).hasCount(2)),
				UiScenario.page("catalog-collections-buttons-group-click", FAMILY, PAGE)
						.withActions(page -> page.locator(".catalog-buttons .q-btn:has-text('Action 2') >> visible=true").first().click())
						.withChecks(page -> assertThat(page.locator(".q-notification").first()).containsText("Action 2")));
	}
}
