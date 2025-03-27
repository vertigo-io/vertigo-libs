/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui;

import java.io.IOException;
import java.io.Serializable;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.htmlunit.HtmlUnitWebElement;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.HttpMethod;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.WebWindow;
import com.gargoylesoftware.htmlunit.html.HtmlForm;
import com.gargoylesoftware.htmlunit.html.HtmlInput;
import com.gargoylesoftware.htmlunit.javascript.host.xml.FormData;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Classe parent des tests Ui.
 *
 * @author npiedeloup
 */
public class AbstractUiTestCase extends AbstractTestCase {

	protected static final int SC_OK = 200;
	protected static final String hostUrl = "https://localhost:8443";
	protected static final String webappContext = "/rdvfacile";
	protected static final String baseUrl = hostUrl + webappContext;

	protected static HtmlUnitDriver driver;

	protected static void setUpDriver() {
		driver = new HtmlUnitDriver(BrowserVersion.CHROME, false); //VueJS 3 non supporté
		System.setProperty("javax.xml.transform.TransformerFactory", "com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl");
	}

	protected void clearAllCookies() {
		driver.manage().deleteAllCookies();
	}

	protected JsonObject doGet(final String url) {
		driver.get(url);
		Assertions.assertEquals(SC_OK, getResponseStatusCode());
		return getVueData();
	}

	protected JsonObject submitForm(final WebElement form, final String formaction) {
		// Localiser le formulaire et le soumettre
		final var htmlForm = (HtmlForm) ((HtmlUnitWebElement) form).getElement();
		htmlForm.setActionAttribute(formaction);
		htmlForm.submit(null);
		final WebClient webClient = driver.getWebClient();
		try {
			webClient.loadDownloadedResponses();
		} catch (final IOException e) {
			throw new WebDriverException(e);
		}
		final var statusCode = getResponseStatusCode();
		if (SC_OK != statusCode) {
			System.err.println(driver.getPageSource());
			throw new AssertionError("Erreur HTTP " + statusCode + " sur " + formaction);
		}
		return getVueData();
	}

	protected JsonObject doPost(final String url, final Map<String, Serializable> params) {
		try {
			/** On envoi une requete POST via le driver */
			final var webRequest = new WebRequest(new URL(url), HttpMethod.POST);
			webRequest.setCharset(StandardCharsets.UTF_8);
			//webRequest.setAdditionalHeader("Content-Type", "application/json");
			final FormData formData = new FormData();
			params.entrySet().forEach(e -> formData.append(e.getKey(), e.getValue(), null));
			formData.fillRequest(webRequest);

			final WebClient webClient = driver.getWebClient();
			final var webWindow = driver.getCurrentWindow().getWebWindow();
			webClient.getPage(webWindow.getTopWindow(), webRequest);
			// A "get" works over the entire page
			driver.setCurrentWindow(webWindow.getTopWindow());
			final WebResponse webResponse = webWindow.getEnclosedPage().getWebResponse();
			final int statusCode = webResponse.getStatusCode();
			if (SC_OK != statusCode) {
				System.err.println(driver.getPageSource());
				throw new AssertionError("Erreur HTTP " + statusCode + " sur httpPostAjax " + url);
			}
			return getVueData();
		} catch (final IOException e) {
			throw new WebDriverException(e);
		}
	}

	protected JsonObject httpPostAjax(final String url, final Map<String, Serializable> params) {
		try {
			/** On envoi une requete POST en Ajax via le driver */
			final var webRequest = new WebRequest(new URL(url), HttpMethod.POST);
			//webRequest.setAdditionalHeader("Content-Type", "application/json");
			final FormData formData = new FormData();
			params.entrySet().forEach(e -> formData.append(e.getKey(), e.getValue(), null));
			formData.fillRequest(webRequest);

			final WebClient webClient = driver.getWebClient();
			final var response = webClient.loadWebResponse(webRequest);
			final var statusCode = response.getStatusCode();
			if (SC_OK != statusCode) {
				System.err.println(driver.getPageSource());
				throw new AssertionError("Erreur HTTP " + statusCode + " sur httpPostAjax " + url);
			}
			final var responseContent = response.getContentAsString();
			final var json = JsonParser.parseString(responseContent).getAsJsonObject();
			return json;
		} catch (final IOException e) {
			throw new WebDriverException(e);
		}
	}

	protected JsonObject getVueData() {
		// Localiser le bloc <script> contenant le JSON
		if (isElementPresent(By.cssSelector("script#vui-init-data"))) {
			final WebElement scriptElement = driver.findElement(By.cssSelector("script#vui-init-data"));

			// Extraire le contenu textuel du script
			final String jsonText = scriptElement.getAttribute("innerHTML");

			// Parser le JSON avec Gson
			final var json = JsonParser.parseString(jsonText).getAsJsonObject().getAsJsonObject("vueData");

			//System.out.println("CTX=" + json.get("CTX"));

			return json;
		}
		return null;
	}

	protected void setInputValue(final WebElement input, final String value) {
		// Localiser le formulaire et le soumettre
		final var htmlInput = (HtmlInput) ((HtmlUnitWebElement) input).getElement();
		htmlInput.setValueAttribute(value);
	}

	protected void setInputValue(final String inputName, final String value) {
		// Localiser le formulaire et le soumettre
		final var inputElement = driver.findElement(By.cssSelector("input[name='" + inputName + "']"));
		final var htmlInput = (HtmlInput) ((HtmlUnitWebElement) inputElement).getElement();
		htmlInput.setValueAttribute(value);
		System.out.println("setInputValue " + inputName + ".value=" + value);
	}

	protected int getResponseStatusCode() {
		// Obtenir le WebClient sous-jacent
		final WebClient webClient = driver.getWebClient();
		// Récupérer la réponse HTTP
		final WebWindow webWindow = webClient.getCurrentWindow();
		final WebResponse webResponse = webWindow.getEnclosedPage().getWebResponse();
		final int statusCode = webResponse.getStatusCode();
		return statusCode;
	}

	protected WebElement waitElement(final By byElement) throws InterruptedException {
		return waitElement(byElement, 1000);
	}

	protected WebElement waitElement(final By byElement, final long timeout) throws InterruptedException {
		final var start = System.currentTimeMillis();
		do {
			try {
				if (isElementPresent(byElement)) {
					Thread.sleep(250);
					return driver.findElement(byElement);
				}
			} catch (final Exception e) {
				//do nothing
			}
			Thread.sleep(100);
		} while (System.currentTimeMillis() - start < timeout);
		System.out.println(driver.getPageSource());
		throw new AssertionError("Element non trouvé en " + timeout + "ms : " + byElement.toString());
	}

	protected static boolean isElementPresent(final By by) {
		try {
			return driver.findElements(by).size() > 0;
		} catch (final org.openqa.selenium.NoSuchElementException | IllegalStateException e) {
			return false;
		}
	}

}
