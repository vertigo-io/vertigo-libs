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

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;

/**
 * User actions shared by the scenarios.
 */
public final class UiActions {

	private UiActions() {
		//util
	}

	/** Centers the element in the viewport first : the popup it opens is in the viewport shot. */
	public static void centerAndClick(final Locator locator) {
		locator.evaluate("element => element.scrollIntoView({block: 'center'})");
		locator.click();
	}

	/** Waits for the first visible element matching the selector (5s). */
	public static void waitVisible(final Page page, final String selector) {
		page.locator(selector + " >> visible=true").first().waitFor(new Locator.WaitForOptions().setTimeout(5_000));
	}

	/** Clicks a button submitting the page (edit, save...) and waits for the new page. */
	public static void submit(final Page page, final String selector) {
		page.locator(selector).first().click();
		page.waitForLoadState(LoadState.NETWORKIDLE);
	}
}
