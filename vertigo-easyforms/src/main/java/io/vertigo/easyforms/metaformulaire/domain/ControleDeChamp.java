package io.vertigo.easyforms.metaformulaire.domain;

import java.util.Set;

import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;

@DefinitionPrefix("EfCoc")
public final class ControleDeChamp extends AbstractDefinition<ControleDeChamp> {

	private final String label;
	private final int priorite;
	private final Set<String> typeDeChamps;

	private ControleDeChamp(final String code, final String label, final int priorite, final Set<String> typeDeChamps) {
		super(code);
		//---
		this.label = label;
		this.priorite = priorite;
		this.typeDeChamps = typeDeChamps;
	}

	public static ControleDeChamp of(final String code, final String label, final int priorite, final String... typeDeChamp) {
		return new ControleDeChamp(code, label, priorite, Set.of(typeDeChamp));
	}

	public String getLabel() {
		return label;
	}

	public int getPriorite() {
		return priorite;
	}

	public Set<String> getTypeDeChamps() {
		return typeDeChamps;
	}
}
