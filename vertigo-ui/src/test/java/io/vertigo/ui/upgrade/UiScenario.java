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
package io.vertigo.ui.upgrade;

import java.util.function.Consumer;

import com.microsoft.playwright.Page;

/**
 * A page of the test webapp, what the user does on it, and what he must get : played with each version of the
 * swapped libraries.
 *
 * @param name unique name (scenario filter, report, screenshot files)
 * @param family component family (one class of scenarios per family)
 * @param path path of the page, under the test webapp context
 * @param width viewport width (height 900)
 * @param overlay true if the scenario opens an overlay (dialog, popup, menu) : shot in the viewport, as the user sees it
 * @param actions what the user does
 * @param checks what the user must get (Playwright assertions)
 */
public record UiScenario(String name, String family, String path, int width, boolean overlay, Consumer<Page> actions, Consumer<Page> checks) {

	/** @return a scenario showing the page, 1280px wide, without action nor check */
	public static UiScenario page(final String name, final String family, final String path) {
		return new UiScenario(name, family, path, 1280, false, page -> {
		}, page -> {
		});
	}

	public UiScenario withWidth(final int newWidth) {
		return new UiScenario(name, family, path, newWidth, overlay, actions, checks);
	}

	public UiScenario withOverlay() {
		return new UiScenario(name, family, path, width, true, actions, checks);
	}

	public UiScenario withActions(final Consumer<Page> newActions) {
		return new UiScenario(name, family, path, width, overlay, newActions, checks);
	}

	public UiScenario withChecks(final Consumer<Page> newChecks) {
		return new UiScenario(name, family, path, width, overlay, actions, newChecks);
	}
}
