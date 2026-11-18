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
import static io.vertigo.ui.upgrade.UiActions.submit;
import static io.vertigo.ui.upgrade.UiActions.waitVisible;

import java.util.List;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;
import com.microsoft.playwright.options.LoadState;

import io.vertigo.ui.upgrade.UiScenario;

/**
 * The demo pages of the test webapp, and the interactions on the components a Quasar changelog often touches.
 */
public final class UiScenariosPages {
	private static final String FAMILY = "pages";
	/** The ajax notification is shown by vu:messages (a q-card), not as a Quasar notification. */
	private static final String AJAX_MESSAGE = ".q-card .q-item-label:has-text('Notif ajax')";

	private UiScenariosPages() {
		//util
	}

	public static List<UiScenario> scenarios() {
		return List.of(
				UiScenario.page("movies", FAMILY, "/movies/")
						.withChecks(page -> assertThat(page.locator(".q-table tbody tr").first()).isVisible()),
				UiScenario.page("movie-read", FAMILY, "/movie/1000"),
				UiScenario.page("components-demo", FAMILY, "/componentsDemo/"),
				UiScenario.page("modifiable-table", FAMILY, "/modifiableTableDemo/"),
				UiScenario.page("my", FAMILY, "/my/")
						.withChecks(page -> assertThat(page.locator("input[type=submit]")).isVisible()),
				UiScenario.page("components-demo-dsfr", FAMILY, "/componentsDemoDsfr/")
						.withChecks(page -> assertThat(page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("insee.csv")).first()).isVisible()),
				UiScenario.page("file-upload", FAMILY, "/fileUploadDemo/"),
				UiScenario.page("movies-table-sorted", FAMILY, "/movies/")
						.withActions(page -> page.locator(".q-table th.sortable").first().click()),
				UiScenario.page("movie-edit", FAMILY, "/movie/1000")
						.withActions(UiScenariosPages::edit)
						.withChecks(page -> assertThat(page.locator("#saveAction")).isVisible()),
				UiScenario.page("movie-edit-select-open", FAMILY, "/movie/1000").withOverlay()
						.withActions(page -> {
							edit(page);
							centerAndClick(page.locator(".q-select .q-field__control").first());
							waitVisible(page, ".q-menu");
						})
						.withChecks(page -> assertThat(page.getByRole(AriaRole.OPTION).first()).isVisible()),
				UiScenario.page("movie-edit-date-popup", FAMILY, "/movie/1000").withOverlay()
						.withActions(page -> {
							edit(page);
							centerAndClick(page.locator(".q-icon:has-text('event')").first());
							waitVisible(page, ".q-date");
						})
						.withChecks(page -> assertThat(page.locator(".q-date").first()).isVisible()),
				UiScenario.page("movie-edit-time-popup", FAMILY, "/movie/1000").withOverlay()
						.withActions(page -> {
							edit(page);
							centerAndClick(page.locator(".q-icon:has-text('access_time')").first());
							waitVisible(page, ".q-time");
						})
						.withChecks(page -> assertThat(page.locator(".q-time").first()).isVisible()),
				UiScenario.page("movie-edit-autocomplete", FAMILY, "/movie/1000").withOverlay()
						.withActions(page -> {
							edit(page);
							final Locator autocomplete = page.locator(".q-select input.q-field__input >> visible=true").first();
							centerAndClick(autocomplete);
							autocomplete.fill("1");
							page.waitForTimeout(500);
						}),
				UiScenario.page("movie-edit-keyboard-focus", FAMILY, "/movie/1000")
						.withActions(page -> {
							edit(page);
							for (int i = 0; i < 4; i++) {
								page.keyboard().press("Tab");
							}
						}),
				UiScenario.page("movie-modal", FAMILY, "/movie/1000").withOverlay()
						.withActions(page -> {
							page.locator(".q-btn:has-text('OpenModal')").click();
							waitVisible(page, ".q-dialog");
						})
						.withChecks(page -> assertThat(page.locator(".q-dialog").first()).isVisible()),
				UiScenario.page("components-confirm-dialog", FAMILY, "/componentsDemo/").withOverlay()
						.withActions(page -> {
							page.locator(".q-btn:has-text('Save (confirm with attr)')").click();
							waitVisible(page, ".q-dialog");
						})
						.withChecks(page -> assertThat(page.locator(".q-dialog").first()).isVisible()),
				UiScenario.page("components-editor-focus", FAMILY, "/componentsDemo/") // vu:text-editor (TipTap)
						.withActions(page -> page.locator("[contenteditable=true] >> visible=true").first().click()),
				UiScenario.page("components-form-errors", FAMILY, "/componentsDemo/")
						.withActions(page -> {
							page.locator(".q-btn:has-text('Save (with DtObj Check)')").click();
							page.waitForLoadState(LoadState.NETWORKIDLE);
						})
						.withChecks(page -> assertThat(page.locator(".q-field--error").first()).isVisible()),
				UiScenario.page("notif", FAMILY, "/notifDemo/").withOverlay()
						.withActions(page -> {
							page.locator(".q-btn:has-text('Notif ajax')").click();
							waitVisible(page, AJAX_MESSAGE);
						})
						.withChecks(page -> assertThat(page.locator(AJAX_MESSAGE).first()).isVisible()),
				// drawer breakpoint (measured without the scrollbar since Quasar 2.28)
				UiScenario.page("movies-1040px", FAMILY, "/movies/").withWidth(1040),
				UiScenario.page("movies-1000px", FAMILY, "/movies/").withWidth(1000));
	}

	private static void edit(final Page page) {
		submit(page, "#editAction");
	}
}
