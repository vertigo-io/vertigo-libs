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

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.regex.Pattern;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.FilePayload;
import com.microsoft.playwright.options.AriaRole;

import io.vertigo.ui.upgrade.UiScenario;

/**
 * The DSFR components : the ones componentsDemoDsfr didn't show (page catalogDsfr), and the interactions on componentsDemoDsfr.
 */
public final class UiScenariosDsfr {
	private static final String FAMILY = "dsfr";
	private static final String CATALOG = "/catalogDsfr/";
	private static final String DEMO = "/componentsDemoDsfr/";

	private UiScenariosDsfr() {
		//util
	}

	/** @return a pattern matching a class attribute holding this class (no Pattern.quote : the regex runs in javascript, without \Q \E) */
	private static Pattern cssClass(final String className) {
		return Pattern.compile("(^|\\s)" + className + "(\\s|$)");
	}

	public static List<UiScenario> scenarios() {
		return List.of(
				UiScenario.page("dsfr-catalog", FAMILY, CATALOG)
						.withChecks(page -> {
							assertThat(page.getByText("Catalog block").first()).isVisible(); // dsfr-block
							assertThat(page.locator(".fr-card").first()).containsText("Card content"); // dsfr-card
							assertThat(page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Second tab"))).isVisible(); // dsfr-tabnav
							// dsfr-button-link : a link shown as a button, with a label or an icon only (its title is the accessible name)
							assertThat(page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Download").setExact(true))).hasClass(cssClass("fr-btn"));
							assertThat(page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Download the file"))).hasClass(cssClass("fr-icon-download-line"));
							assertThat(page.locator(".catalog-dsfr-label").first()).containsText("TITLE"); // dsfr-label
							assertThat(page.locator(".catalog-dsfr-facets").getByText("Par type")).isVisible(); // dsfr-facets (values collapsed)
						}),
				UiScenario.page("dsfr-dropzone-upload", FAMILY, CATALOG)
						.withActions(page -> page.locator(".catalog-dsfr-dropzone input[type=file]").first()
								.setInputFiles(new FilePayload("dsfr-upload.txt", "text/plain", "uploaded by the upgrade tests".getBytes(StandardCharsets.UTF_8))))
						.withChecks(page -> assertThat(page.locator(".catalog-dsfr-dropzone").getByText("dsfr-upload.txt").first()).isVisible()),
				UiScenario.page("dsfr-links", FAMILY, DEMO)
						.withChecks(page -> {
							// dsfr-link (vue component, used directly) : a download link with its detail, a simple link, a disabled one
							final var download = page.locator("a.fr-link--download", new Page.LocatorOptions().setHasText("Fichier CSV"));
							assertThat(download).hasClass(cssClass("fr-link"));
							assertThat(download).hasAttribute("download", Pattern.compile(".*")); // present, empty value
							assertThat(download).hasAttribute("href", Pattern.compile("componentsDemo/myFiles"));
							assertThat(download.locator(".fr-link__detail")).hasText("Fichier CSV");
							final var link = page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("insee.csv").setExact(true));
							assertThat(link).hasClass(cssClass("fr-link"));
							assertThat(link).not().hasClass(cssClass("fr-btn"));
							assertThat(page.locator("a:not([href])", new Page.LocatorOptions().setHasText("Coucou n°3"))).hasClass(cssClass("fr-btn--secondary"));
							// vu:dsfr-button-link : the same vue component, as a button
							assertThat(page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Download insee.csv"))).hasClass(cssClass("fr-btn"));
						}),
				UiScenario.page("dsfr-select-multiple-open", FAMILY, DEMO).withOverlay()
						.withActions(page -> {
							centerAndClick(page.locator(".fr-select--menu[role=combobox]").first());
							final var menu = page.locator(".fr-select__menu").first();
							menu.locator("[role=option]").nth(0).click();
							menu.locator("[role=option]").nth(1).click();
						})
						.withChecks(page -> {
							final var combobox = page.locator(".fr-select--menu[role=combobox]").first();
							final var options = page.locator(".fr-select__menu").first().locator("[role=option]");
							assertThat(combobox).hasAttribute("aria-expanded", "true");
							assertThat(options.nth(0)).hasAttribute("aria-selected", "true");
							assertThat(options.nth(1)).hasAttribute("aria-selected", "true");
							assertThat(options.nth(2)).hasAttribute("aria-selected", "false");
							// two options selected : their labels are shown in the field
							assertThat(combobox).containsText(options.nth(0).textContent().trim() + ", " + options.nth(1).textContent().trim());
						}),
				UiScenario.page("dsfr-select-multiple-filter-all", FAMILY, DEMO).withOverlay()
						.withActions(page -> {
							centerAndClick(page.locator(".fr-select--menu[role=combobox]").first());
							final var menu = page.locator(".fr-select__menu").first();
							final var filter = menu.getByRole(AriaRole.TEXTBOX, new Locator.GetByRoleOptions().setName("Rechercher une option"));
							final String firstOption = menu.locator("[role=option]").nth(0).textContent().trim(); // not innerText : empty while the menu opens
							filter.fill(firstOption);
							assertThat(menu.locator("[role=option]")).hasCount(1);
							assertThat(menu.locator("[role=option]").first()).hasText(firstOption);
							filter.fill("");
							menu.getByRole(AriaRole.BUTTON, new Locator.GetByRoleOptions().setName("Tout sélectionner")).click();
						})
						.withChecks(page -> {
							final var menu = page.locator(".fr-select__menu").first();
							assertThat(menu.locator("[role=option][aria-selected=false]")).hasCount(0);
							assertThat(menu.getByRole(AriaRole.BUTTON, new Locator.GetByRoleOptions().setName("Tout déselectionner"))).isVisible();
							// more than two options selected : their count is shown
							assertThat(page.locator(".fr-select--menu[role=combobox]").first()).containsText(Pattern.compile("\\d+ options séléctionnées"));
						}),
				UiScenario.page("dsfr-demo-read", FAMILY, DEMO + "read"),
				UiScenario.page("dsfr-dialog", FAMILY, DEMO).withOverlay()
						.withActions(page -> {
							page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Ouvre-moi")).first().click();
							page.getByRole(AriaRole.DIALOG).first().waitFor(); // a native dialog : no role attribute
						})
						.withChecks(page -> assertThat(page.getByRole(AriaRole.DIALOG).first()).isVisible()),
				UiScenario.page("dsfr-accordion", FAMILY, DEMO)
						.withActions(page -> page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Accordéon n°1")).first().click())
						.withChecks(page -> assertThat(page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Accordéon n°1")).first()).hasAttribute("aria-expanded", "true")),
				UiScenario.page("dsfr-date", FAMILY, DEMO)
						.withActions(page -> page.locator("input[type=date]").first().fill("2024-05-01"))
						.withChecks(page -> assertThat(page.locator("input[type=date]").first()).hasValue("2024-05-01")));
	}
}
