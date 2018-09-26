package io.vertigo.ui.impl.thymeleaf;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;

import io.vertigo.ui.impl.thymeleaf.composite.model.ThymeleafComponent;
import io.vertigo.ui.impl.thymeleaf.composite.parser.IThymeleafComponentParser;
import io.vertigo.ui.impl.thymeleaf.composite.processor.ComponentNamedElementProcessor;
import io.vertigo.ui.impl.thymeleaf.composite.processor.OnceAttributeTagProcessor;

public final class VUiStandardDialect extends AbstractProcessorDialect {

	public static final String NAME = "VertigoStandard";
	public static final String PREFIX = "vu";
	public static final int PROCESSOR_PRECEDENCE = 2000;

	// These variables will be initialized lazily following the model applied in the extended StandardDialect.
	private final Set<ThymeleafComponent> components;
	private final List<IThymeleafComponentParser> parsers = new ArrayList<>();

	public VUiStandardDialect() {
		this(null);
	}

	public VUiStandardDialect(final Set<ThymeleafComponent> components) {
		super(NAME, PREFIX, PROCESSOR_PRECEDENCE);
		this.components = components;
	}

	@Override
	public Set<IProcessor> getProcessors(final String dialectPrefix) {
		return createVUiStandardProcessorsSet(dialectPrefix);
	}

	private Set<IProcessor> createVUiStandardProcessorsSet(final String dialectPrefix) {
		final Set<IProcessor> processors = new HashSet<>();
		processors.add(new OnceAttributeTagProcessor(dialectPrefix));

		if (components != null) {
			for (final ThymeleafComponent comp : components) {
				processors.add(new ComponentNamedElementProcessor(dialectPrefix, comp.getName(), comp.getFragmentTemplate(), comp.getSelectionExpression(), comp.getFrag()));
			}
		}

		for (final ThymeleafComponent comp : parseComponents()) {
			processors.add(new ComponentNamedElementProcessor(dialectPrefix, comp.getName(), comp.getFragmentTemplate(), comp.getSelectionExpression(), comp.getFrag()));
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
	public void addParser(final IThymeleafComponentParser parser) {
		parsers.add(parser);
	}

}
