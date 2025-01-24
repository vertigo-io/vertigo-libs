package io.vertigo.commons.peg.rule;

/** Mode de selection des caractères. */
public enum PegWordRuleMode {
	/** N'accepte que les caractères passés en paramètre. */
	ACCEPT,
	/** Accepte tout sauf les caractères passés en paramètre. */
	REJECT,
	/**
	 * Accepte tout sauf les caractères passés en paramètre.
	 * Avec la possibilité d'echaper un caractère avec le \
	 */
	REJECT_ESCAPABLE
}