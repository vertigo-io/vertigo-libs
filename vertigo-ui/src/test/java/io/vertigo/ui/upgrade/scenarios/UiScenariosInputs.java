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

import org.junit.jupiter.api.Assertions;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

import io.vertigo.ui.upgrade.UiScenario;

/**
 * The Quasar inputs no demo page showed : select-multiple, label, checkbox, checkbox-confirm, q-text-editor, tree
 * (page catalogInputs).
 */
public final class UiScenariosInputs {
	private static final String FAMILY = "inputs";
	private static final String PAGE = "/catalogInputs/";

	private UiScenariosInputs() {
		//util
	}

	public static List<UiScenario> scenarios() {
		return List.of(
				UiScenario.page("catalog-inputs", FAMILY, PAGE)
						.withChecks(page -> {
							assertThat(page.getByText("France").first()).isVisible(); // select-multiple and tree read : labels of the selected nodes
							assertThat(page.locator("#editAction")).isVisible();
						}),
				UiScenario.page("catalog-inputs-edit", FAMILY, PAGE)
						.withActions(UiScenariosInputs::edit)
						.withChecks(page -> assertThat(page.locator("#saveAction")).isVisible()),
				UiScenario.page("catalog-inputs-select-multiple-open", FAMILY, PAGE).withOverlay()
						.withActions(page -> {
							edit(page);
							centerAndClick(page.locator(".catalog-select-multiple .q-field__control").first());
							waitVisible(page, ".q-menu");
						})
						.withChecks(page -> assertThat(page.getByRole(AriaRole.OPTION)).hasCount(4)),
				// checkbox-confirm : a consent checkbox ("I confirm ..."), no dialog
				UiScenario.page("catalog-inputs-checkbox-confirm", FAMILY, PAGE)
						.withActions(page -> {
							edit(page);
							page.locator(".catalog-checkbox-confirm .q-checkbox").first().click();
						})
						.withChecks(page -> assertThat(page.locator(".catalog-checkbox-confirm [role=checkbox]").first()).hasAttribute("aria-checked", "true")),
				UiScenario.page("catalog-inputs-text-editor", FAMILY, PAGE)
						.withActions(page -> {
							edit(page);
							final var editor = page.locator(".catalog-text-editor [contenteditable=true]").first();
							editor.click();
							page.keyboard().type(" Vertigo");
						})
						.withChecks(page -> assertThat(page.locator(".catalog-text-editor [contenteditable=true]").first()).containsText("Vertigo")),
				UiScenario.page("catalog-inputs-tree", FAMILY, PAGE).withOverlay()
						.withActions(page -> {
							edit(page);
							centerAndClick(page.locator(".catalog-tree .q-field__control").first());
							waitVisible(page, ".q-menu");
						})
						.withChecks(page -> assertThat(page.locator(".q-menu").getByText("Asia")).isVisible()),
				// vu:include-data-map : label of the node in the client data ; vu:include-data-protected : a protected value, not the raw one
				UiScenario.page("catalog-include-data", FAMILY, PAGE)
						.withChecks(page -> {
							Assertions.assertEquals("France", page.evaluate("() => VUiPage.vueData.form.nodeId_display"));
							final Object reference = page.evaluate("() => VUiPage.vueData.form.reference");
							Assertions.assertTrue(reference instanceof String && !((String) reference).isBlank() && !"REF-42".equals(reference),
									() -> "protected value expected, got " + reference);
						}),
				UiScenario.page("catalog-inputs-save", FAMILY, PAGE)
						.withActions(page -> {
							edit(page);
							page.locator(".catalog-checkbox .q-checkbox").first().click();
							submit(page, "#saveAction");
						})
						.withChecks(page -> {
							assertThat(page.locator("#editAction")).isVisible();
							assertThat(page.locator(".catalog-checkbox [role=checkbox]").first()).hasAttribute("aria-checked", "true");
						}));
	}

	private static void edit(final Page page) {
		submit(page, "#editAction");
	}
}
