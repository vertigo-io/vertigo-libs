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
package io.vertigo.basics.constraint;

import java.math.BigDecimal;
import java.util.Optional;

import io.vertigo.core.locale.LocaleMessageText;

/**
 * Contrainte vérifiant que l'objet est :
 * <ul>
 * <li>soit un Double comprit dans le segment ]-10^n, 10^n[</li>
 * <li>soit null</li>
 * </ul>
 * .
 * <br>
 *
 * @author pchretien
 */
public final class ConstraintDoubleLength extends AbstractConstraintLength<Double> {
	/**
	 * Borne maximale au sens strict de Double (= 10 puissance maxLength)
	 */
	private final Double maxValue;

	/**
	 * Borne minimale au sens strict de Double (= - maxValue)
	 */
	private final Double minValue;

	private final LocaleMessageText errorMessage;

	/**
	 * Constructeur nécessaire pour le ksp.
	 *
	 * @param args Liste des arguments réduite à un seul castable en integer.
	 * Cet argument correspond au nombre de chiffres maximum autorisé sur le Double.
	 * maxLength Valeur n du segment ]-10^n, 10^n[ dans lequel est comprise la valeur.
	 */
	public ConstraintDoubleLength(final String args, final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt) {
		super(args);
		//-----
		maxValue = BigDecimal.valueOf(1L).movePointRight(getMaxLength()).doubleValue();
		minValue = BigDecimal.valueOf(1L).movePointRight(getMaxLength()).negate().doubleValue();
		errorMessage = ConstraintUtil.resolveMessage(overrideMessageOpt, overrideResourceMessageOpt, Resources.DYNAMO_CONSTRAINT_DECIMALLENGTH_EXCEEDED, minValue, maxValue);
	}

	/** {@inheritDoc} */
	@Override
	public boolean checkConstraint(final Double value) {
		return value == null
				|| value.compareTo(maxValue) < 0 && value.compareTo(minValue) > 0;
	}

	/** {@inheritDoc} */
	@Override
	public LocaleMessageText getErrorMessage() {
		return errorMessage;
	}
}
