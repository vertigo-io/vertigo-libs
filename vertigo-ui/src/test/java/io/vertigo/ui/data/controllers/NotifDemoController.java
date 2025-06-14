/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.data.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.vega.webservice.validation.UiMessageStack;

@Controller
@RequestMapping("/notifDemo")
public class NotifDemoController extends AbstractVSpringMvcController {

	@GetMapping("/")
	public void initContext() {
		// nothing to do
		getUiMessageStack().info("Notif on init context");
	}

	@PostMapping("/_testNotifAction")
	public void testNotifAction(final UiMessageStack uiMessageStack) {
		uiMessageStack.warning("Notif action");
	}

	@PostMapping("/_testNotifAjax")
	public ViewContext testNotifAjax(final ViewContext vc, final UiMessageStack uiMessageStack) {
		uiMessageStack.warning("Notif ajax");
		return vc;
	}

	@PostMapping("/_testNotifRedirect")
	public String testNotifRedirect(final UiMessageStack uiMessageStack) {
		uiMessageStack.warning("Notif redirect");
		return "redirect:/notifDemo/";
	}

	@PostMapping("/_testNotifDelayed")
	public void testNotifDelayed(final UiMessageStack uiMessageStack) {
		uiMessageStack.warning("Notif delayed");
		UiRequestUtil.delayUiMessageStack();
	}

	@PostMapping("/_testNotifCrash")
	public void testNotifCrash(final UiMessageStack uiMessageStack) {
		uiMessageStack.warning("Notif error");
		throw new RuntimeException("Test error");
	}

	@PostMapping("/_testNotifCrashAjax")
	public ViewContext testNotifCrashAjax(final ViewContext vc, final UiMessageStack uiMessageStack) {
		uiMessageStack.warning("Notif ajax");
		throw new RuntimeException("Test error ajax");
	}
}
