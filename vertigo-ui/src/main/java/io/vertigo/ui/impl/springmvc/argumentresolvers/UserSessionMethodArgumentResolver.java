/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.springmvc.argumentresolvers;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Optional;

import javax.inject.Inject;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.util.InjectorUtil;

public final class UserSessionMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Inject
	private VSecurityManager securityManager;

	/**
	 * Construct a new ArgumentResolver
	 */
	public UserSessionMethodArgumentResolver() {
		InjectorUtil.injectMembers(this);
	}

	@Override
	public boolean supportsParameter(final MethodParameter parameter) {
		return UserSession.class.isAssignableFrom(getParameterType(parameter));
	}

	@Override
	public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) {
		final Optional<UserSession> userSession = securityManager.getCurrentUserSession();
		if (parameter.isOptional()) {
			return userSession;
		}
		return userSession.orElseThrow(() -> new VSecurityException(LocaleMessageText.of("No active session found")));
	}

	private Class<?> getParameterType(final MethodParameter parameterType) {
		final Class<?> returnTypeClazz = parameterType.getParameterType();
		if (Optional.class.isAssignableFrom(returnTypeClazz)) {
			return castAsClass(((ParameterizedType) parameterType.getGenericParameterType()).getActualTypeArguments()[0]); //we known that these GenericParameterType has one parameterized type
		}
		return returnTypeClazz;
	}

	private static Class<?> castAsClass(final Type testedType) {
		if (testedType instanceof Class) {
			return (Class<?>) testedType;
		} else if (testedType instanceof ParameterizedType) {
			return (Class<?>) ((ParameterizedType) testedType).getRawType();
		}
		throw new IllegalArgumentException("Parameters/Return Type must be Class or ParameterizedType, unsupported type:" + testedType);
	}

}
