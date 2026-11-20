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
package io.vertigo.ui.impl.thymeleaf.components;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.thymeleaf.IEngineConfiguration;
import org.thymeleaf.context.Context;
import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templateresolver.AbstractConfigurableTemplateResolver;
import org.thymeleaf.templateresolver.StringTemplateResolver;
import org.thymeleaf.templateresource.ITemplateResource;
import org.thymeleaf.templateresource.StringTemplateResource;

import io.vertigo.ui.impl.thymeleaf.VUiPreDialect;

/**
 * A value computed at rendering (a value of the model, put by a th: attribute or forwarded by an enclosing component)
 * is passed to the component as it is.
 * The values look like stored data : a message template holding a placeholder, a name with underscores...
 */
class NamedComponentComputedValueTest {
	private static final String MESSAGE = "Bonjour ${user.name}";
	private static final Map<String, String> COMPONENTS = Map.of(
			"show.html", "<span th:fragment=\"show(label, flag, other_attrs)\" th:attr=\"__${other_attrs}__\">"
					+ "<b th:text=\"${label}\"></b><i th:if=\"${flag == true}\">yes</i></span>",
			"wrap.html", "<div th:fragment=\"wrap()\"><vu:content th:title=\"${value}\"/></div>",
			"deep.html", "<i th:fragment=\"deep(depth)\" th:attr=\"data-d=${depth}\"><vu:deep th:if=\"${depth lt 3}\" th:depth=\"${depth + 1}\"/></i>",
			// a component with static attributes on its inner tag, and a component forwarding its input_attrs to it
			"field.html", "<q-input th:fragment=\"field(input_attrs)\" title=\"default\" stack-label maxlength=\"10\" class=\"a\" :class=\"{b: true}\" th:attr=\"__${input_attrs}__\"></q-input>",
			"outer.html", "<div th:fragment=\"outer(input_attrs)\"><vu:field input_attrs=\"${input_attrs}\"/></div>",
			// a component setting an attribute of its inner tag with a th:
			"fixed.html", "<q-input th:fragment=\"fixed(input_attrs)\" th:maxlength=\"${10}\" th:attr=\"__${input_attrs}__\"></q-input>",
			// a component forwarding its relay_attrs to an inner one, and writing a value on the same tag
			"relay.html", "<div th:fragment=\"relay(relay_attrs)\"><vu:show other_attrs=\"${relay_attrs}\" label=\"${'Written'}\"/></div>",
			// a component writing an attribute without value after (relayflat) or before (flatrelay) the forwarded ones
			"relayflat.html", "<div th:fragment=\"relayflat(relay_attrs)\"><vu:show other_attrs=\"${relay_attrs}\" flat/></div>",
			"flatrelay.html", "<div th:fragment=\"flatrelay(relay_attrs)\"><vu:show flat other_attrs=\"${relay_attrs}\"/></div>",
			// a component giving a value to the attributes of its content, as the menu of vu:buttons-group
			"item.html", "<div th:fragment=\"item()\"><vu:content label=\"${'Item'}\"/></div>");

	private static String render(final String page, final String value) {
		return render(page, value, false);
	}

	private static String render(final String page, final String value, final boolean devMode) {
		final var engine = new SpringTemplateEngine(); // SpEL, as vertigo-ui
		final var componentResolver = new AbstractConfigurableTemplateResolver() {
			@Override
			protected ITemplateResource computeTemplateResource(final IEngineConfiguration configuration, final String ownerTemplate, final String template,
					final String resourceName, final String characterEncoding, final Map<String, Object> templateResolutionAttributes) {
				return new StringTemplateResource(COMPONENTS.get(template));
			}
		};
		componentResolver.setResolvablePatterns(COMPONENTS.keySet());
		componentResolver.setOrder(1);
		final var pageResolver = new StringTemplateResolver();
		pageResolver.setOrder(2);
		engine.addTemplateResolver(componentResolver);
		engine.addTemplateResolver(pageResolver);
		engine.addDialect("vu", new VUiPreDialect()); // as VSpringWebConfig
		final var show = new NamedComponentDefinition("show", "show.html", Optional.of("label, flag, other_attrs"), "show");
		final var wrap = new NamedComponentDefinition("wrap", "wrap.html", Optional.empty(), "wrap");
		final var deep = new NamedComponentDefinition("deep", "deep.html", Optional.of("depth"), "deep");
		final var field = new NamedComponentDefinition("field", "field.html", Optional.of("input_attrs"), "field");
		final var outer = new NamedComponentDefinition("outer", "outer.html", Optional.of("input_attrs"), "outer");
		final var fixed = new NamedComponentDefinition("fixed", "fixed.html", Optional.of("input_attrs"), "fixed");
		final var relay = new NamedComponentDefinition("relay", "relay.html", Optional.of("relay_attrs"), "relay");
		final var relayflat = new NamedComponentDefinition("relayflat", "relayflat.html", Optional.of("relay_attrs"), "relayflat");
		final var flatrelay = new NamedComponentDefinition("flatrelay", "flatrelay.html", Optional.of("relay_attrs"), "flatrelay");
		final var item = new NamedComponentDefinition("item", "item.html", Optional.empty(), "item");
		engine.addDialect(new AbstractProcessorDialect("test", "vu", 2000) { // as VUiStandardDialect : after the th: standard dialect (1000)
			@Override
			public Set<IProcessor> getProcessors(final String dialectPrefix) {
				return Set.of(new NamedComponentElementProcessor(dialectPrefix, show, devMode), new NamedComponentElementProcessor(dialectPrefix, wrap, devMode),
						new NamedComponentElementProcessor(dialectPrefix, deep, devMode), new NamedComponentElementProcessor(dialectPrefix, field, devMode),
						new NamedComponentElementProcessor(dialectPrefix, outer, devMode), new NamedComponentElementProcessor(dialectPrefix, fixed, devMode),
						new NamedComponentElementProcessor(dialectPrefix, relay, devMode), new NamedComponentElementProcessor(dialectPrefix, relayflat, devMode),
						new NamedComponentElementProcessor(dialectPrefix, flatrelay, devMode), new NamedComponentElementProcessor(dialectPrefix, item, devMode),
						new ContentComponentProcessor(dialectPrefix));
			}
		});
		final var context = new Context();
		context.setVariable("value", value);
		context.setVariable("values", List.of("Value", value));
		// the attributes forwarded by an enclosing component, as label_attrs="${label_attrs}"
		context.setVariable("forwardedLabel", "label=${value}");
		context.setVariable("forwardedTitle", "title=${value}");
		context.setVariable("forwardedNoTitle", "title=${null}");
		return engine.process(page, context);
	}

	@Test
	void booleanAttributes() {
		// true or false (any case) for an attribute of a *_attrs : written with : to be evaluated by VueJS, as a boolean param (VueJS reads the text "false" as true)
		assertEquals("<span :stack-label=\"false\"><b></b></span>", render("<vu:show stack-label=\"false\"/>", "Value"));
		assertEquals("<span :stack-label=\"true\"><b></b></span>", render("<vu:show stack-label=\"TRUE\"/>", "Value"));
		assertEquals("<span :stack-label=\"false\"><b></b></span>", render("<vu:show th:stack-label=\"${value == 'Other'}\"/>", "Value"));
		// an attribute without value, as before
		assertEquals("<span :flat=\"true\"><b></b></span>", render("<vu:show flat/>", "Value"));
		// an event or a slot keeps its name
		assertEquals("<span @click=\"true\"><b></b></span>", render("<vu:show @click=\"true\"/>", "Value"));
		// another value stays a text
		assertEquals("<span stack-label=\"no\"><b></b></span>", render("<vu:show stack-label=\"no\"/>", "Value"));
	}

	@Test
	void colonAttributeReplacesStaticAttribute() {
		// an attribute written with : by the developer (or true / false) replaces the static attribute of the same name put by the component (VueJS keeps the first one)
		final String others = "title=\"default\" maxlength=\"10\" class=\"a\" :class=\"{b: true}\"";
		assertEquals("<q-input " + others + " :stack-label=\"false\"></q-input>", render("<vu:field input_stack-label=\"false\"/>", "Value"));
		assertEquals("<div><q-input " + others + " :stack-label=\"false\"></q-input></div>", render("<vu:outer input_stack-label=\"false\"/>", "Value"));
		assertEquals("<q-input title=\"default\" stack-label class=\"a\" :class=\"{b: true}\" :maxlength=\"vueData.max\"></q-input>",
				render("<vu:field input_:maxlength=\"vueData.max\"/>", "Value"));
		// a text replaces the attribute of the same name, ${null} removes it (also forwarded by a component)
		assertEquals("<q-input title=\"Name\" stack-label maxlength=\"10\" class=\"a\" :class=\"{b: true}\"></q-input>", render("<vu:field input_title=\"Name\"/>", "Value"));
		assertEquals("<q-input title=\"default\" stack-label class=\"a\" :class=\"{b: true}\"></q-input>", render("<vu:field input_maxlength=\"${null}\"/>", "Value"));
		assertEquals("<div><q-input title=\"default\" stack-label class=\"a\" :class=\"{b: true}\"></q-input></div>", render("<vu:outer input_maxlength=\"${null}\"/>", "Value"));
		// class and style are merged by VueJS : a :class replaces the :class of the component, its class stays
		assertEquals("<q-input title=\"default\" stack-label maxlength=\"10\" class=\"a\" :class=\"{c: true}\"></q-input>", render("<vu:field input_:class=\"{c: true}\"/>", "Value"));
		// a th: attribute given by the developer is evaluated on the inner tag, true or false included
		assertEquals("<q-input title=\"true\" stack-label maxlength=\"10\" class=\"a\" :class=\"{b: true}\"></q-input>", render("<vu:field input_th:title=\"true\"/>", "Value"));
		// an attribute set by the component with a th: is processed after : it is not replaced (the component offers a param for it)
		assertEquals("<q-input maxlength=\"10\" :maxlength=\"vueData.max\"></q-input>", render("<vu:fixed input_:maxlength=\"vueData.max\"/>", "Value"));
	}

	@Test
	void forwardedValueWins() {
		// the value given by the page, forwarded by a component, wins over the value the component writes on the same tag
		assertEquals("<div><span><b>Page</b></span></div>", render("<vu:relay relay_label=\"Page\"/>", "Value"));
		// nothing given by the page : the written value, evaluated
		assertEquals("<div><span><b>Written</b></span></div>", render("<vu:relay/>", "Value"));
		// whatever the place of the attribute written by the component, a ${null} included
		assertEquals("<div><span :flat=\"false\"><b></b></span></div>", render("<vu:relayflat relay_flat=\"false\"/>", "Value"));
		assertEquals("<div><span :flat=\"false\"><b></b></span></div>", render("<vu:flatrelay relay_flat=\"false\"/>", "Value"));
		assertEquals("<div><span><b></b></span></div>", render("<vu:relayflat relay_flat=\"${null}\"/>", "Value"));
		assertEquals("<span><b></b></span>", render("<vu:show th:title=\"${value}\" other_attrs=\"${forwardedNoTitle}\"/>", "Value"));
	}

	@Test
	void booleanForwardedToDeclaredParam() {
		// true, false or no value, forwarded to a declared param of the inner component : the param gets it
		assertEquals("<div><span><b>Written</b><i>yes</i></span></div>", render("<vu:relay relay_flag=\"true\"/>", "Value"));
		assertEquals("<div><span><b>Written</b><i>yes</i></span></div>", render("<vu:relay relay_flag/>", "Value"));
		assertEquals("<div><span><b>Written</b></span></div>", render("<vu:relay relay_flag=\"false\"/>", "Value"));
		// a :x evaluated by VueJS stays an attribute, the declared param x keeps its value
		assertEquals("<div><span :flag=\"vueData.ok\"><b>Written</b></span></div>", render("<vu:relay relay_:flag=\"vueData.ok\"/>", "Value"));
		assertEquals("<div><span :label=\"vueData.label\"><b>Written</b></span></div>", render("<vu:relay relay_:label=\"vueData.label\"/>", "Value"));
	}

	@Test
	void contentAttributeReplacesComputedValue() {
		// a value given by the component to its content replaces the value computed on the tag, and is evaluated
		assertEquals("<div><span><b>Item</b></span></div>", render("<vu:item><vu:show th:label=\"${value}\"/></vu:item>", "Value"));
	}

	@Test
	void writtenValues() {
		assertEquals("<span><b>Text #1</b></span>", render("<vu:show label=\"Text #1\"/>", "Value"));
		assertEquals("<span><b>Bonjour ${user.name}</b></span>", render("<vu:show label=\"${value}\"/>", MESSAGE));
		assertEquals("<span><b>Hello Value</b></span>", render("<vu:show label=\"|Hello ${value}|\"/>", "Value"));
		assertEquals("<span title=\"${user.name}\"><b></b></span>", render("<vu:show title=\"${value}\"/>", "${user.name}"));
		assertEquals("<span><b></b><i>yes</i></span>", render("<vu:show flag=\"true\"/>", "Value"));
		// a leading 0 is kept
		assertEquals("<span><b>0102030405</b></span>", render("<vu:show label=\"0102030405\"/>", "Value"));
		// a negative number
		assertEquals("<span><b>-5</b></span>", render("<vu:show label=\"-5\"/>", "Value"));
	}

	@Test
	void declaredParamWithThPrefix() {
		assertEquals("<span><b>Value</b></span>", render("<vu:show th:label=\"${value}\"/>", "Value"));
		assertEquals("<span><b>Bonjour ${user.name}</b></span>", render("<vu:show th:label=\"${value}\"/>", MESSAGE));
		assertEquals("<span><b>report__v2.txt</b></span>", render("<vu:show th:label=\"${value}\"/>", "report__v2.txt"));
		assertEquals("<span><b>l&#39;été \\ fin\\</b></span>", render("<vu:show th:label=\"${value}\"/>", "l'été \\ fin\\"));
		assertEquals("<span><b>01000</b></span>", render("<vu:show th:label=\"${value}\"/>", "01000"));
		assertEquals("<span><b></b><i>yes</i></span>", render("<vu:show th:flag=\"${value == 'Value'}\"/>", "Value"));
		assertEquals("<span><b></b></span>", render("<vu:show th:flag=\"${value == 'Value'}\"/>", "Other"));
	}

	@Test
	void otherAttributeWithThPrefix() {
		assertEquals("<span title=\"Value\"><b></b></span>", render("<vu:show th:title=\"${value}\"/>", "Value"));
		assertEquals("<span title=\"${user.name}\"><b></b></span>", render("<vu:show th:title=\"${value}\"/>", "${user.name}"));
		assertEquals("<span title=\"report__v2.txt\"><b></b></span>", render("<vu:show th:title=\"${value}\"/>", "report__v2.txt"));
		assertEquals("<span title=\"5&amp;#36; offered\"><b></b></span>", render("<vu:show th:title=\"${value}\"/>", "5&#36; offered"));
	}

	@Test
	void declaredParamForwarded() {
		assertEquals("<span><b>Value</b></span>", render("<vu:show other_attrs=\"${forwardedLabel}\"/>", "Value"));
		assertEquals("<span><b>Bonjour ${user.name}</b></span>", render("<vu:show other_attrs=\"${forwardedLabel}\"/>", MESSAGE));
		assertEquals("<span><b>report__v2.txt</b></span>", render("<vu:show other_attrs=\"${forwardedLabel}\"/>", "report__v2.txt"));
	}

	@Test
	void otherAttributeForwarded() {
		assertEquals("<span title=\"Value\"><b></b></span>", render("<vu:show other_attrs=\"${forwardedTitle}\"/>", "Value"));
		assertEquals("<span title=\"${user.name}\"><b></b></span>", render("<vu:show other_attrs=\"${forwardedTitle}\"/>", "${user.name}"));
		assertEquals("<span title=\"report__v2.txt\"><b></b></span>", render("<vu:show other_attrs=\"${forwardedTitle}\"/>", "report__v2.txt"));
		assertEquals("<span title=\"5&amp;#36; offered\"><b></b></span>", render("<vu:show other_attrs=\"${forwardedTitle}\"/>", "5&#36; offered"));
		assertEquals("<span title=\"a__b\"><b></b></span>", render("<vu:show other_attrs=\"${forwardedTitle}\"/>", "a__b"));
	}

	@Test
	void thAttributeInAttrs() {
		// a th: attribute put by the component on its inner tag : evaluated there
		assertEquals("<span title=\"Value\"><b></b></span>", render("<vu:show other_th:title=\"${value}\"/>", "Value"));
		assertEquals("<span title=\"2026-11\"><b></b></span>", render("<vu:show other_th:title=\"${value}\"/>", "2026-11"));
	}

	@Test
	void contentAttributes() {
		assertEquals("<div><span title=\"Value\"><b></b></span></div>", render("<vu:wrap><vu:show/></vu:wrap>", "Value"));
		assertEquals("<div><span title=\"${user.name}\"><b></b></span></div>", render("<vu:wrap><vu:show/></vu:wrap>", "${user.name}"));
	}

	@Test
	void eachIteration() {
		assertEquals("<span><b>Value</b></span><span><b>Bonjour ${user.name}</b></span>", render("<vu:show th:each=\"v : ${values}\" th:label=\"${v}\"/>", MESSAGE));
	}

	@Test
	void textLiteralOfThAttribute() {
		// th:url="'@{/x}'" gives the text @{/x}, not a link : the way to write it is url="@{/x}"
		assertEquals("<span><b>@{/x}</b></span>", render("<vu:show th:label=\"'@{/x}'\"/>", "Value"));
		final Exception exception = assertThrows(Exception.class, () -> render("<vu:show th:label=\"'@{/x}'\"/>", "Value", true));
		assertTrue(rootMessage(exception).contains("label=\"@{/x}\""), rootMessage(exception));
		final Exception mixed = assertThrows(Exception.class, () -> render("<vu:show th:label=\"'Price ${value}'\"/>", "Value", true));
		assertTrue(rootMessage(mixed).contains("label=\"|Price ${value}|\""), rootMessage(mixed));
		// a text holding | : no literal substitution to advise
		final Exception withBar = assertThrows(Exception.class, () -> render("<vu:show th:label=\"'a|b ${value}'\"/>", "Value", true));
		assertTrue(rootMessage(withBar).contains("write label without th:"), rootMessage(withBar));
		// a single expression is advised without the spaces around
		final Exception spaces = assertThrows(Exception.class, () -> render("<vu:show th:label=\"' ${value} '\"/>", "Value", true));
		assertTrue(rootMessage(spaces).contains("write label=\"${value}\""), rootMessage(spaces));
		// an undeclared attribute : a javascript text is fine, a text starting with an expression is not
		assertEquals("<span @click=\"fn(`${value}`)\"><b></b></span>", render("<vu:show th:@click=\"'fn(`${value}`)'\"/>", "Value", true));
		final Exception attr = assertThrows(Exception.class, () -> render("<vu:show th:title=\"'${value}'\"/>", "Value", true));
		assertTrue(rootMessage(attr).contains("write title=\"${value}\""), rootMessage(attr));
		// a long value is checked without overflow
		final Exception longValue = assertThrows(Exception.class, () -> render("<vu:show th:label=\"'${" + "{a}".repeat(5000) + "x'\"/>", "Value", true));
		assertTrue(rootMessage(longValue).contains("gives the text"), rootMessage(longValue));
		// a link with params is a single expression
		final Exception link = assertThrows(Exception.class, () -> render("<vu:show th:label=\"'@{/x/{id}(id=${value})}'\"/>", "Value", true));
		assertTrue(rootMessage(link).contains("write label=\"@{/x/{id}(id=${value})}\""), rootMessage(link));
		// a javascript template literal is a text for Thymeleaf
		assertEquals("<span><b>`Total ${value}`</b></span>", render("<vu:show th:label=\"'`Total ${value}`'\"/>", "Value", true));
		// no whole expression in the text : a text
		assertEquals("<span><b>Cost 5${</b></span>", render("<vu:show th:label=\"'Cost 5${'\"/>", "Value", true));
		// an expression is fine in dev mode
		assertEquals("<span><b>Value</b></span>", render("<vu:show th:label=\"${value}\"/>", "Value", true));
		assertEquals("<span><b>Value !</b></span>", render("<vu:show th:label=\"${value} + ' !'\"/>", "Value", true));
	}

	private static String rootMessage(final Throwable throwable) {
		Throwable cause = throwable;
		while (cause.getCause() != null) {
			cause = cause.getCause();
		}
		return cause.getMessage();
	}

	@Test
	void componentInItself() {
		// a computed number stays a number (depth + 1), each level reads its own tag
		assertEquals("<i data-d=\"1\"><i data-d=\"2\"><i data-d=\"3\"></i></i></i>", render("<vu:deep depth=\"1\"/>", "Value"));
	}
}
