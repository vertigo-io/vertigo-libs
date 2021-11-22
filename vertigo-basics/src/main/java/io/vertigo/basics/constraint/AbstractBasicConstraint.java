/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2020, Vertigo.io, team@vertigo.io
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

import java.util.Optional;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.MessageText;
import io.vertigo.datamodel.structure.definitions.Constraint;

/**
 * Une contrainte simple qui possède un message d'erreur par défaut pouvant être surchargé par le paramètre msg ou resourceMsg.
 *
 * @author skerdudou
 * @param <J> Type java de la propriété associée à la contrainte
 * @param <D> Type java de la valeur à contrôler
 */
abstract class AbstractBasicConstraint<J, D> implements Constraint<J, D> {
	/**
	 * Message d'erreur
	 */
	private final MessageText customErrorMessage;

	protected AbstractBasicConstraint(final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt) {
		Assertion.check()
				.isNotNull(overrideMessageOpt)
				.isNotNull(overrideResourceMessageOpt)
				.isFalse(overrideMessageOpt.isPresent() && overrideResourceMessageOpt.isPresent(), "msg et resourceMsg ne peuvent pas être renseignés simultanément");
		//-----
		if (overrideMessageOpt.isPresent()) {
			customErrorMessage = MessageText.of(overrideMessageOpt.get());
		} else if (overrideResourceMessageOpt.isPresent()) {
			customErrorMessage = MessageText.of(() -> overrideResourceMessageOpt.get());
		} else {
			customErrorMessage = null;
		}
	}

	protected abstract MessageText getDefaultMessageText();

	@Override
	public MessageText getErrorMessage() {
		return customErrorMessage != null ? customErrorMessage : getDefaultMessageText();
	}

}
