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

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;

import com.microsoft.playwright.Page;

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
		final List<UiScenario> scenarios = new ArrayList<>(buttonsGroupResponsive());
		scenarios.addAll(List.of(
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
						.withChecks(page -> assertThat(page.locator(".q-notification").first()).containsText("Action 2"))));
		return scenarios;
	}

	/** Quasar screen sizes, a width in each : xs < 600px, sm < 1024px, md < 1440px, lg < 1920px, xl. */
	private static final List<String> SIZES = List.of("xs", "sm", "md", "lg", "xl");
	private static final List<Integer> WIDTHS = List.of(400, 800, 1200, 1600, 2000);

	/**
	 * buttons-group by screen size : with N the threshold of the size, the buttons of rank &lt; N inline, the others in the
	 * "more" menu, the "more" button only if there are more than N buttons (catalog-bg-* groups of the page).
	 */
	private static List<UiScenario> buttonsGroupResponsive() {
		final List<UiScenario> scenarios = new ArrayList<>();
		for (int i = 0; i < SIZES.size(); i++) {
			final int size = i;
			scenarios.add(UiScenario.page("catalog-buttons-group-" + SIZES.get(i), FAMILY, PAGE).withWidth(WIDTHS.get(i))
					.withChecks(page -> {
						assertThat(page.locator(".catalog-bg-none .q-btn").first()).isVisible(); // mounted
						final String expected = String.join(" ; ",
								group("none", 6, 6), // no threshold
								group("showcase", List.of(1, 2, 2, 4, 5).get(size), 6), // xs=1 md=2 lg=4 xl=5 (sm follows md)
								group("base", List.of(0, 0, 2, 3, 3).get(size), 3), // sm=0 md=2 (xs follows sm)
								group("equal", 3, 3)); // md=3 : as many as the buttons
						final String shown = String.join(" ; ",
								shownGroup(page, "none", "More none"),
								shownGroup(page, "showcase", "More showcase"),
								shownGroup(page, "base", "More base"),
								shownGroup(page, "equal", "More equal"));
						Assertions.assertEquals(expected, shown);
					}));
		}
		scenarios.add(buttonsGroupMenu("md", 1200, "More showcase", 4));
		scenarios.add(buttonsGroupMenu("xl", 2000, "More showcase", 1));
		scenarios.add(buttonsGroupMenu("md", 1200, "More base", 1)); // from md : below, the drawer of the test layout covers the page
		return scenarios;
	}

	private static UiScenario buttonsGroupMenu(final String size, final int width, final String moreLabel, final int items) {
		return UiScenario.page("catalog-buttons-group-menu-" + size + "-" + moreLabel.substring("More ".length()), FAMILY, PAGE).withWidth(width).withOverlay()
				.withActions(page -> {
					centerAndClick(page.locator(".q-btn[title='" + moreLabel + "']").first());
					waitVisible(page, ".q-menu");
				})
				.withChecks(page -> assertThat(page.locator(".q-menu .q-btn:visible")).hasCount(items));
	}

	private static String group(final String group, final int inline, final int count) {
		return group + " : " + inline + " inline, more " + (inline < count ? "shown" : "hidden");
	}

	private static String shownGroup(final Page page, final String group, final String moreLabel) {
		final var container = page.locator(".catalog-bg-" + group);
		final int inline = container.locator(".q-btn:visible:not([title='" + moreLabel + "'])").count();
		final boolean more = container.locator(".q-btn[title='" + moreLabel + "']:visible").count() > 0;
		return group + " : " + inline + " inline, more " + (more ? "shown" : "hidden");
	}
}
