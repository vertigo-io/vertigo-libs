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
package io.vertigo.commons.peg.rule;

import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegResult;
import io.vertigo.commons.peg.rule.PegRule.Dummy;
import io.vertigo.core.lang.Assertion;

/**
 * Enlève les blancs et les commentaires
 * Cette règle ne plante jamais -sauf si un blanc obligatoire n'est pas présent-
 * mais permet de faire avancer l'index.
 *
 * @author pchretien
 */
final class PegWhiteSpaceRule implements PegRule<Dummy> {
	private final PegRule<String> rule;
	private final String expression;

	/**
	 * Constructor.
	 *
	 * @param blanks Caractères "blancs" et commentaires.
	 * @param emptyAccepted Si les blancs sont optionnels
	 */
	PegWhiteSpaceRule(final String blanks, final boolean emptyAccepted) {
		super();
		Assertion.check().isNotNull(blanks);
		//-----
		rule = PegRules.word(emptyAccepted, blanks, PegWordRuleMode.ACCEPT, "_");
		expression = rule.getExpression();
	}

	/** {@inheritDoc} */
	@Override
	public String getExpression() {
		return expression;
	}

	/** {@inheritDoc} */
	@Override
	public PegResult<Dummy> parse(final String text, final int start) throws PegNoMatchFoundException {
		var index = start;

		// On commence par absorber les premiers blancs
		index = rule.parse(text, index).getIndex();

		boolean foundComment;
		do {
			foundComment = false;
			final var textLength = text.length();

			if (textLength > index + 1) {
				final var startTag = text.substring(index, index + 2);

				// 1. Gestion des commentaires BLOC /* ... */
				if ("/*".equals(startTag)) {
					index += 2;
					final var endComment = text.indexOf("*/", index);
					if (endComment < 0) {
						throw new PegNoMatchFoundException(text, index, null, "Fermeture des commentaires */ non trouvée");
					}
					index = endComment + 2;
					foundComment = true;
				}
				// 2. Gestion des commentaires LIGNE // ...
				else if ("//".equals(startTag)) {
					index += 2;
					final var endLine = text.indexOf('\n', index);
					if (endLine < 0) {
						// Si pas de \n, le commentaire va jusqu'à la fin du texte
						index = textLength;
					} else {
						index = endLine + 1; // On consomme le \n
					}
					foundComment = true;
				}

				if (foundComment) {
					// Après un commentaire, on ré-absorbe les blancs potentiels
					index = rule.parse(text, index).getIndex();
				}
			}
		} while (foundComment); // On boucle tant qu'on trouve des blocs de commentaires successifs

		return new PegResult<>(index, Dummy.INSTANCE);
	}
}
