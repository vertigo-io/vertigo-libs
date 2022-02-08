/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.springmvc.auth;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.MethodParameter;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import io.vertigo.account.authorization.AuthorizationManager;
import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.account.authorization.annotations.Secured;
import io.vertigo.account.authorization.annotations.SecuredOperation;
import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

/**
 * Aspect pour la gestion des Secured au niveau de la couche service.
 * @author npiedeloup
 */
public final class VSpringMvcAuthorizationInterceptor implements HandlerInterceptor {
	private AuthorizationManager authorizationManager;

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
		if (handler instanceof HandlerMethod) {
			final HandlerMethod handlerMethod = (HandlerMethod) handler;

			final Secured secured = handlerMethod.getMethodAnnotation(Secured.class) == null
					? handlerMethod.getMethod().getDeclaringClass().getAnnotation(Secured.class)
					: handlerMethod.getMethodAnnotation(Secured.class);

			if (secured != null) { //this method is secured
				Assertion.check().isTrue(AbstractVSpringMvcController.class.isAssignableFrom(handlerMethod.getBeanType()), "Secured annotation must be used with VSpringMvcController or with Services. Can't secured {0}", handlerMethod.getBeanType().getSimpleName());

				final AuthorizationName[] authorizationNames = Arrays.stream(secured.value())
						.map(value -> {
							Assertion.check().isFalse(value.startsWith(Authorization.PREFIX), "Secured annotations must use unprefixed AuthorizationName, can't use {0} (you should remove the '{1}' prefix) ", value, Authorization.PREFIX);
							return (AuthorizationName) () -> Authorization.PREFIX + value;
						})
						.toArray(AuthorizationName[]::new);
				if (!getAuthorizationManager().hasAuthorization(authorizationNames)) {
					throw new VSecurityException(LocaleMessageText.of("Not enought authorizations"));//no too sharp info here : may use log
				}

				final MethodParameter[] parameters = handlerMethod.getMethodParameters();

				for (int i = 0; i < parameters.length; i++) {
					final MethodParameter parameter = parameters[i];
					final SecuredOperation securedOperation = parameter.getParameterAnnotation(SecuredOperation.class);
					//On repère les paramètres qui ont le @SecuredOperation
					if (securedOperation != null) {
						//le handler de request ne permet pas d'avoir accès aux args, il arrive trop tôt. Avoir si le besoin apparait
						Assertion.check().isTrue(false, "Can't check authorization on arg{0} ({1})", i, parameter.getParameterType().getSimpleName());
						//if (!authorizationManager.isAuthorized((Entity) args[i], securedOperation::value)) {
						//	throw new VSecurityException(MessageText.of("Not enought authorizations"));//no too sharp info here : may use log
						//}
					}
				}
			}
		}
		return true;
	}

	private AuthorizationManager getAuthorizationManager() {
		if (authorizationManager == null) {
			authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		}
		return authorizationManager;
	}
}
