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
package io.vertigo.ui;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import io.vertigo.ui.boot.JettyBoot;
import io.vertigo.ui.boot.JettyBootParams;

@Disabled
public class TestUi {

	private static final int port = 18080;
	private final String baseUrl = "http://localhost:" + port;
	private static WebDriver driver;

	@BeforeAll
	public static void setUp() throws Exception {
		startServer(false);
		/*driver = new JBrowserDriver(Settings.builder()
				.timezone(Timezone.EUROPE_PARIS)
				.headless(true) //use false for debug purpose
				.build());*/
		final FirefoxOptions options = new FirefoxOptions();
		options.addArguments("-headless");
		driver = new FirefoxDriver(options);
		//driver = new HtmlUnitDriver(BrowserVersion.FIREFOX, true);
		Thread.sleep(5000);
	}

	private static void startServer(final boolean join) throws IOException, Exception {
		final var jettyBootParamsBuilder = JettyBootParams.builder("testWebApp/", TestVSpringWebApplicationInitializer.class)
				.withContextPath("/test")
				.noSsl()
				.withPort(port);
		if (!join) {
			jettyBootParamsBuilder.noJoin();
		}
		final var jettyBootParams = jettyBootParamsBuilder.build();

		JettyBoot.startServer(jettyBootParams, (context) -> {
			final var multipartConfigInjectionHandler = new MultipartConfigInjectionHandler();
			multipartConfigInjectionHandler.setHandler(context);
			return List.of(multipartConfigInjectionHandler);
		});
	}

	@AfterAll
	public static void tearDown() throws Exception {
		driver.quit();
		JettyBoot.stop();
	}

	public static void main(final String[] args) throws Exception {
		startServer(true);
	}

	@Test
	public void testLoadLoginPage() {
		driver.get(baseUrl + "/test/");
		Assertions.assertEquals(baseUrl + "/test/", driver.getCurrentUrl());
	}

	@Test
	public void testMovies() throws InterruptedException {
		driver.get(baseUrl + "/test/movies/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testMovieDetail() throws InterruptedException {
		driver.get(baseUrl + "/test/movie/1000");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/componentsDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testModifiableTableDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/modifiableTableDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testModifiableTableSaveDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/modifiableTableDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
		findElement(By.id("saveActionList")).click();
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testModifiableTableReadDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/modifiableTableDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
		findElement(By.id("readActionList")).click();
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
		findElement(By.id("editActionList")).click();
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testFileUploadDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/fileUploadDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testFileUploadSaveDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/fileUploadDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
		findElement(By.id("saveFilesAction")).click();
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testFileUploadReadDemo() throws InterruptedException {
		driver.get(baseUrl + "/test/fileUploadDemo/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
		findElement(By.id("readActionList")).click();
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
		findElement(By.id("editActionList")).click();
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testSomeTags() throws InterruptedException {
		driver.get(baseUrl + "/test/someTags/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testPassingAttributes() throws InterruptedException {
		driver.get(baseUrl + "/test/passingAttributes/");
		Thread.sleep(5000);
		assertEquals("Home", findElement(By.xpath("/html/body//div[1]//div[3]")).getText());
	}

	@Test
	public void testPostSimpleForm() throws InterruptedException {
		driver.get(baseUrl + "/test/componentsDemo/");

		assertEquals("Details du film", waitElement(By.className("text-h6")).getText());
		findElement(By.name("vContext[movie][title]")).clear();
		sendKeysJs(By.name("vContext[movie][title]"), "Test 1");

		findElement(By.name("vContext[movie][year]")).clear();
		sendKeysJs(By.name("vContext[movie][year]"), "2020");
		findElement(By.id("saveAction")).click();
		Thread.sleep(5000);
		assertEquals("Test 1", findElement(By.name("vContext[movie][title]")).getAttribute("value"));
		assertEquals("2020", findElement(By.name("vContext[movie][year]")).getAttribute("value"));

		findElement(By.name("vContext[movie][title]")).clear();
		sendKeysJs(By.name("vContext[movie][title]"),
				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa "
						+ "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa "
						+ "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ");
		findElement(By.id("saveAction")).click();
		Thread.sleep(5000);
		assertTrue(findElement(By.cssSelector(".fieldTitle")).getAttribute("class").contains("q-field--error"));
		assertTrue(findElement(By.cssSelector(".fieldTitle .q-field__messages")).getText().contains("250"));

	}

	@Test
	public void testPostSimpleErrorForm() throws InterruptedException {
		driver.get(baseUrl + "/test/componentsDemo/");

		assertEquals("Details du film", waitElement(By.className("text-h6")).getText());

		findElement(By.name("vContext[movie][movId]")).clear();
		sendKeysJs(By.name("vContext[movie][movId]"), "1003");

		findElement(By.name("vContext[movie][title]")).clear();
		findElement(By.id("saveActionDtCheck")).click();
		Thread.sleep(5000);
		assertTrue(findElement(By.cssSelector(".fieldTitle")).getAttribute("class").contains("q-field--error"));
		assertTrue(findElement(By.cssSelector(".fieldTitle .q-field__messages")).getText().contains("Test uiMessageStack error on Dt field"));

		findElement(By.id("saveActionUiCheck")).click();
		Thread.sleep(5000);
		assertTrue(findElement(By.cssSelector(".fieldTitle")).getAttribute("class").contains("q-field--error"));
		assertTrue(findElement(By.cssSelector(".fieldTitle .q-field__messages")).getText().contains("Test uiMessageStack error on Ui field"));
	}

	@Test
	public void testDownload() throws Exception {
		driver.get(baseUrl + "/test/componentsDemo/");

		final FileDownloader4Tests fileDownloader4Tests = new FileDownloader4Tests(driver);
		final WebElement downloadLink = findElement(By.linkText("insee.csv"));
		final String downloadedFileAbsoluteLocation = fileDownloader4Tests.downloadFile(downloadLink);

		assertTrue(new File(downloadedFileAbsoluteLocation).exists());
		assertEquals(fileDownloader4Tests.getHTTPStatusOfLastDownloadAttempt(), 200);
	}

	@Disabled
	@Test
	public void testUpload() {
		driver.get(baseUrl + "/test/componentsDemo/");

		final File file = new File(getClass().getResource("/data/insee.csv").getFile());
		dropFile("uploadermyFilesUris", file);

		assertEquals("Fichier recu : insee.csv (application/octet-stream)", findElement(By.cssSelector("span")).getText());
		assertEquals("Previous file : insee.csv (application/octet-stream)", findElement(By.id("uploadFile")).getText());
	}

	@Test
	public void testSecuredController() throws InterruptedException {
		driver.get(baseUrl + "/test/securedMovie/");

		assertTrue(waitElement(By.xpath("/html/body/table/tbody/tr[3]/td")).getText().contains("Forbidden action"));
		assertTrue(waitElement(By.xpath("/html/body/table/tbody/tr[2]/td")).getText().contains("403"));

	}

	@Test
	public void testSecuredActionController() throws InterruptedException {
		driver.get(baseUrl + "/test/securedActionMovie/");

		assertEquals("Secured Action Movie Detail", driver.getTitle());

		findElement(By.id("saveAction")).click();
		Thread.sleep(5000);
		assertTrue(waitElement(By.xpath("/html/body/table/tbody/tr[3]/td")).getText().contains("Forbidden action"));
		assertTrue(waitElement(By.xpath("/html/body/table/tbody/tr[2]/td")).getText().contains("403"));

	}

	private static final String JS_SEND_FILE = "var targetName = arguments[0],"
			+ "myFile = arguments[1];" +
			"    VUiPage.$refs[targetName].addFiles(myFile.files);";
	private static final String JS_CREATE_FILE = "var input = document.createElement('INPUT');" +
			"input.type = 'file';" +
			"input.onchange = function () {" +
			"  setTimeout(function () { document.body.removeChild(input); }, 500);" +
			"};" +
			"document.body.appendChild(input);" +
			"return input;";

	static void dropFile(final String targetName, final File file) {
		final WebElement createdInput = (WebElement) ((JavascriptExecutor) driver).executeScript(JS_CREATE_FILE);
		createdInput.sendKeys(file.getAbsolutePath());
		((JavascriptExecutor) driver).executeScript(JS_SEND_FILE, targetName, createdInput);
	}

	private void sendKeysJs(final By elementBy, final String keysToSend) {
		final WebElement element = findElement(elementBy);
		((JavascriptExecutor) driver).executeScript("document.getElementById(\"" + element.getAttribute("id") + "\").value = \"" + keysToSend + "\";\n");
	}

	private WebElement waitElement(final By byElement) throws InterruptedException {
		return waitElement(byElement, 1000);
	}

	private WebElement waitElement(final By byElement, final long timeout) throws InterruptedException {
		final long start = System.currentTimeMillis();
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

	private static boolean isElementPresent(final By by) {
		try {
			driver.findElement(by);
			return true;
		} catch (final org.openqa.selenium.NoSuchElementException e) {
			return false;
		}
	}

	private static WebElement findElement(final By by) {
		try {
			return driver.findElement(by);
		} catch (final org.openqa.selenium.NoSuchElementException e) {
			System.out.println(driver.getPageSource());
			throw new NoSuchElementException(by.toString(), e);
		}
	}
}
