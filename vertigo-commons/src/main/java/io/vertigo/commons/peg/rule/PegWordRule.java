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
package io.vertigo.commons.peg.rule;

import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegResult;
import io.vertigo.core.lang.Assertion;

/**
 * Règle a état permettant de récupérer un mot.
 * En précisant :
 * - Soit les caractères acceptés,
 * - Soit les caractères rejetés.
 *
 * @author pchretien
 */
final class PegWordRule implements PegRule<String> {
	private static final char escapeChar = '\\';
	private final String acceptedCharacters;
	private final String rejectedCharacters;
	private final String readableExpression;
	private final boolean emptyAccepted;
	private final PegWordRuleMode mode;

	/**
	 * Constructor.
	 *
	 * @param emptyAccepted Si les mots vides sont acceptés
	 * @param checkedChars Liste des caractères vérifiés
	 * @param mode Indique le comportement du parseur : si les caractères vérifiés sont les seuls acceptés, sinon les seuls rejetés, et si l'echappement est autorisé
	 * @param readableCheckedChar Expression lisible des caractères vérifiés
	 */
	PegWordRule(final boolean emptyAccepted, final String checkedChars, final PegWordRuleMode mode, final String readableCheckedChar) {
		super();
		Assertion.check()
				.isNotNull(mode)
				.isNotNull(checkedChars)
				.isNotBlank(readableCheckedChar);
		//-----
		this.emptyAccepted = emptyAccepted;
		this.mode = mode;
		if (mode == PegWordRuleMode.ACCEPT) {
			acceptedCharacters = checkedChars;
			rejectedCharacters = "";
		} else {
			acceptedCharacters = "";
			rejectedCharacters = checkedChars;
		}
		readableExpression = readableCheckedChar;
	}

	/** {@inheritDoc} */
	@Override
	public String getExpression() {
		return readableExpression;
	}

	/** {@inheritDoc} */
	@Override
	public PegResult<String> parse(final String text, final int start) throws PegNoMatchFoundException {
		int index = start;
		// On vérifie que le caractère est contenu dans les caractères acceptés.
		// On vérifie que le caractère n'est pas contenu dans les caractères rejetés.
		while (index < text.length()
				&& (mode != PegWordRuleMode.ACCEPT || acceptedCharacters.indexOf(text.charAt(index)) >= 0)
				&& (mode == PegWordRuleMode.REJECT_ESCAPABLE && (index > 0) && text.charAt(index - 1) == escapeChar || (rejectedCharacters.indexOf(text.charAt(index)) < 0))) {
			index++;
		}
		if (!emptyAccepted && index == start) {
			throw new PegNoMatchFoundException(text, start, null, "Mot respectant {0} attendu", getExpression());
		}
		String word = text.substring(start, index);
		if (mode == PegWordRuleMode.REJECT_ESCAPABLE) {
			word = word.replaceAll("\\\\(.)", "$1");
		}
		return new PegResult<>(index, word);
	}
}
