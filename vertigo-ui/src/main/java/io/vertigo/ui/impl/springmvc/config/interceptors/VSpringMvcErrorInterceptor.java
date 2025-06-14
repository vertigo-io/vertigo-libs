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
package io.vertigo.ui.impl.springmvc.config.interceptors;

import org.springframework.web.servlet.HandlerInterceptor;

import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.node.Node;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Spring handle errors in a dedicated thread so we must put back our session in the threadLocal.
 */
public final class VSpringMvcErrorInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
		if (DispatcherType.ERROR.equals(request.getDispatcherType())) {
			final var securityManager = getSecurityManager();
			if (securityManager.getCurrentUserSession().isEmpty()) {
				final UserSession userSession = (UserSession) request.getSession().getAttribute("io.vertigo.Session");
				if (userSession != null) {
					securityManager.startCurrentUserSession(userSession);
				} else {
					securityManager.createUserSession();
				}
			}
		}
		return true;
	}

	@Override
	public void afterCompletion(final HttpServletRequest request, final HttpServletResponse response, final Object handler, final Exception ex) throws Exception {
		if (DispatcherType.ERROR.equals(request.getDispatcherType())) {
			getSecurityManager().stopCurrentUserSession();
		}
	}

	private VSecurityManager getSecurityManager() {
		return Node.getNode().getComponentSpace().resolve(VSecurityManager.class);
	}
}
