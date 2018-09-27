package io.vertigo.ui.impl.thymeleaf;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;

import io.vertigo.lang.Assertion;
import io.vertigo.ui.impl.thymeleaf.composite.ThymeleafComponentNamedElementProcessor;
import io.vertigo.ui.impl.thymeleaf.composite.OnceAttributeTagProcessor;
import io.vertigo.ui.impl.thymeleaf.composite.ThymeleafComponent;
import io.vertigo.ui.impl.thymeleaf.composite.ThymeleafComponentParser;

public final class VUiStandardDialect extends AbstractProcessorDialect {

	public static final String NAME = "VertigoStandard";
	public static final String PREFIX = "vu";
	public static final int PROCESSOR_PRECEDENCE = 2000;

	// These variables will be initialized lazily following the model applied in the extended StandardDialect.
	private final Set<ThymeleafComponent> components;
	private final List<ThymeleafComponentParser> parsers = new ArrayList<>();

	public VUiStandardDialect(final Set<ThymeleafComponent> components) {
		super(NAME, PREFIX, PROCESSOR_PRECEDENCE);
		Assertion.checkNotNull(components);
		//---
		this.components = components;
	}

	@Override
	public Set<IProcessor> getProcessors(final String dialectPrefix) {
		return createVUiStandardProcessorsSet(dialectPrefix);
	}

	private Set<IProcessor> createVUiStandardProcessorsSet(final String dialectPrefix) {
		final Set<IProcessor> processors = new HashSet<>();
		processors.add(new OnceAttributeTagProcessor(dialectPrefix));

		//standard components
		for (final ThymeleafComponent comp : components) {
			processors.add(new ThymeleafComponentNamedElementProcessor(dialectPrefix, comp));
		}

		//additionalComponents
		for (final ThymeleafComponent comp : parseComponents()) {
			processors.add(new ThymeleafComponentNamedElementProcessor(dialectPrefix, comp));
		}

		return processors;

	}

	/**
	 * Get components from parsers
	 * @return Thymeleaf components
	 */
	private Set<ThymeleafComponent> parseComponents() {
		final Set<ThymeleafComponent> parsedComponents = new HashSet<>();
		//TODO autodetect composites
		return parsedComponents;
	}

	/**
	 * Add parser to the list of parsers
	 *
	 * @param parser Thymeleaf component parser
	 */
	public void addParser(final ThymeleafComponentParser parser) {
		parsers.add(parser);
	}

}
