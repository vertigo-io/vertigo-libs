/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.struts2.ui.util;

import io.vertigo.core.locale.MessageText;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.struts2.core.ComponentRef;
import io.vertigo.vega.webservice.exception.VSecurityException;

/**
 * Utilitaire de vérification des accés sécurisés.
 * @author npiedeloup
 * @version $Id: SecurityUtil.java,v 1.2 2014/07/07 16:40:26 pchretien Exp $
 */
public final class SecurityUtil {

	private static ComponentRef<VSecurityManager> securityManager = ComponentRef.makeLazyRef(VSecurityManager.class);

	/**
	 * Vérifie l'accés à une ressource sécurisé.
	 * La class de l'objet détermine la SecurityResourceFactory à utiliser.
	 * @param value Object à tester
	 * @param operation Type d'opération à tester
	 * @return Si l'opération est autorisée sur cet Objet
	 */
	public static boolean hasAccess(final Object value, final String operation) {
		return securityManager.get().isAuthorized(value.getClass().getSimpleName(), value, operation);
	}

	/**
	 * Vérifie l'accés à une ressource sécurisé.
	 * La class de l'objet détermine la SecurityResourceFactory à utiliser.
	 * @param value Object à tester
	 * @param operation Type d'opération à tester
	 * @throws VSecurityException Si l'opération n'est pas autorisée sur cet Objet
	 */
	public static void checkAccess(final Object value, final String operation) throws VSecurityException {
		if (!hasAccess(value, operation)) {
			throw new VSecurityException(MessageText.of("Vous ne posséder pas les droits suffisant pour réaliser cette opération. (" + operation + " sur " + value.getClass().getSimpleName() + ")"));
		}
	}

}
