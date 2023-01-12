/**
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
package io.vertigo.vega.plugins.authentication.keycloak;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Locale;
import java.util.Map;

import javax.servlet.AsyncContext;
import javax.servlet.DispatcherType;
import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpUpgradeHandler;
import javax.servlet.http.Part;
import javax.servlet.http.PushBuilder;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.AdapterDeploymentContext;
import org.keycloak.adapters.NodesRegistrationManagement;
import org.keycloak.adapters.servlet.KeycloakOIDCFilter;

public class VKeycloakOIDCFilter extends KeycloakOIDCFilter {

	public VKeycloakOIDCFilter(final AdapterDeploymentContext adapterDeploymentContext) {
		super();
		deploymentContext = adapterDeploymentContext;
		nodesRegistrationManagement = new NodesRegistrationManagement();
	}

	@Override
	public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		super.doFilter(req, res, (reqC, resC) -> chain.doFilter(new WrappedRequest((HttpServletRequest) reqC), resC));
	}

	private class WrappedRequest implements HttpServletRequest {

		private final HttpServletRequest originalRequest;

		public WrappedRequest(final HttpServletRequest originalRequest) {
			this.originalRequest = originalRequest;
		}

		@Override
		public String changeSessionId() {
			final String oldSessionId = getSession(false).getId();
			final String newSessionId = originalRequest.changeSessionId();

			final KeycloakPrincipal principal = (KeycloakPrincipal) getUserPrincipal();
			final String state = principal.getKeycloakSecurityContext().getToken().getSessionState();
			final String name = principal.getName();

			idMapper.removeSession(oldSessionId);
			idMapper.map(state, name, newSessionId);

			return newSessionId;
		}

		// delegate methods

		@Override
		public Object getAttribute(final String name) {
			return originalRequest.getAttribute(name);
		}

		@Override
		public String getAuthType() {
			return originalRequest.getAuthType();
		}

		@Override
		public Cookie[] getCookies() {
			return originalRequest.getCookies();
		}

		@Override
		public Enumeration<String> getAttributeNames() {
			return originalRequest.getAttributeNames();
		}

		@Override
		public long getDateHeader(final String name) {
			return originalRequest.getDateHeader(name);
		}

		@Override
		public String getCharacterEncoding() {
			return originalRequest.getCharacterEncoding();
		}

		@Override
		public void setCharacterEncoding(final String env) throws UnsupportedEncodingException {
			originalRequest.setCharacterEncoding(env);
		}

		@Override
		public String getHeader(final String name) {
			return originalRequest.getHeader(name);
		}

		@Override
		public int getContentLength() {
			return originalRequest.getContentLength();
		}

		@Override
		public long getContentLengthLong() {
			return originalRequest.getContentLengthLong();
		}

		@Override
		public Enumeration<String> getHeaders(final String name) {
			return originalRequest.getHeaders(name);
		}

		@Override
		public String getContentType() {
			return originalRequest.getContentType();
		}

		@Override
		public ServletInputStream getInputStream() throws IOException {
			return originalRequest.getInputStream();
		}

		@Override
		public Enumeration<String> getHeaderNames() {
			return originalRequest.getHeaderNames();
		}

		@Override
		public String getParameter(final String name) {
			return originalRequest.getParameter(name);
		}

		@Override
		public int getIntHeader(final String name) {
			return originalRequest.getIntHeader(name);
		}

		@Override
		public Enumeration<String> getParameterNames() {
			return originalRequest.getParameterNames();
		}

		@Override
		public HttpServletMapping getHttpServletMapping() {
			return originalRequest.getHttpServletMapping();
		}

		@Override
		public String[] getParameterValues(final String name) {
			return originalRequest.getParameterValues(name);
		}

		@Override
		public Map<String, String[]> getParameterMap() {
			return originalRequest.getParameterMap();
		}

		@Override
		public String getProtocol() {
			return originalRequest.getProtocol();
		}

		@Override
		public String getScheme() {
			return originalRequest.getScheme();
		}

		@Override
		public String getServerName() {
			return originalRequest.getServerName();
		}

		@Override
		public int getServerPort() {
			return originalRequest.getServerPort();
		}

		@Override
		public BufferedReader getReader() throws IOException {
			return originalRequest.getReader();
		}

		@Override
		public String getMethod() {
			return originalRequest.getMethod();
		}

		@Override
		public String getPathInfo() {
			return originalRequest.getPathInfo();
		}

		@Override
		public String getRemoteAddr() {
			return originalRequest.getRemoteAddr();
		}

		@Override
		public String getRemoteHost() {
			return originalRequest.getRemoteHost();
		}

		@Override
		public String getPathTranslated() {
			return originalRequest.getPathTranslated();
		}

		@Override
		public void setAttribute(final String name, final Object o) {
			originalRequest.setAttribute(name, o);
		}

		@Override
		public PushBuilder newPushBuilder() {
			return originalRequest.newPushBuilder();
		}

		@Override
		public String getContextPath() {
			return originalRequest.getContextPath();
		}

		@Override
		public void removeAttribute(final String name) {
			originalRequest.removeAttribute(name);
		}

		@Override
		public Locale getLocale() {
			return originalRequest.getLocale();
		}

		@Override
		public Enumeration<Locale> getLocales() {
			return originalRequest.getLocales();
		}

		@Override
		public String getQueryString() {
			return originalRequest.getQueryString();
		}

		@Override
		public boolean isSecure() {
			return originalRequest.isSecure();
		}

		@Override
		public String getRemoteUser() {
			return originalRequest.getRemoteUser();
		}

		@Override
		public RequestDispatcher getRequestDispatcher(final String path) {
			return originalRequest.getRequestDispatcher(path);
		}

		@Override
		public boolean isUserInRole(final String role) {
			return originalRequest.isUserInRole(role);
		}

		@Override
		public String getRealPath(final String path) {
			return originalRequest.getRealPath(path);
		}

		@Override
		public Principal getUserPrincipal() {
			return originalRequest.getUserPrincipal();
		}

		@Override
		public int getRemotePort() {
			return originalRequest.getRemotePort();
		}

		@Override
		public String getLocalName() {
			return originalRequest.getLocalName();
		}

		@Override
		public String getRequestedSessionId() {
			return originalRequest.getRequestedSessionId();
		}

		@Override
		public String getLocalAddr() {
			return originalRequest.getLocalAddr();
		}

		@Override
		public String getRequestURI() {
			return originalRequest.getRequestURI();
		}

		@Override
		public int getLocalPort() {
			return originalRequest.getLocalPort();
		}

		@Override
		public ServletContext getServletContext() {
			return originalRequest.getServletContext();
		}

		@Override
		public AsyncContext startAsync() throws IllegalStateException {
			return originalRequest.startAsync();
		}

		@Override
		public StringBuffer getRequestURL() {
			return originalRequest.getRequestURL();
		}

		@Override
		public String getServletPath() {
			return originalRequest.getServletPath();
		}

		@Override
		public HttpSession getSession(final boolean create) {
			return originalRequest.getSession(create);
		}

		@Override
		public AsyncContext startAsync(final ServletRequest servletRequest, final ServletResponse servletResponse) throws IllegalStateException {
			return originalRequest.startAsync(servletRequest, servletResponse);
		}

		@Override
		public HttpSession getSession() {
			return originalRequest.getSession();
		}

		@Override
		public boolean isRequestedSessionIdValid() {
			return originalRequest.isRequestedSessionIdValid();
		}

		@Override
		public boolean isRequestedSessionIdFromCookie() {
			return originalRequest.isRequestedSessionIdFromCookie();
		}

		@Override
		public boolean isRequestedSessionIdFromURL() {
			return originalRequest.isRequestedSessionIdFromURL();
		}

		@Override
		public boolean isRequestedSessionIdFromUrl() {
			return originalRequest.isRequestedSessionIdFromUrl();
		}

		@Override
		public boolean authenticate(final HttpServletResponse response) throws IOException, ServletException {
			return originalRequest.authenticate(response);
		}

		@Override
		public boolean isAsyncStarted() {
			return originalRequest.isAsyncStarted();
		}

		@Override
		public boolean isAsyncSupported() {
			return originalRequest.isAsyncSupported();
		}

		@Override
		public void login(final String username, final String password) throws ServletException {
			originalRequest.login(username, password);
		}

		@Override
		public AsyncContext getAsyncContext() {
			return originalRequest.getAsyncContext();
		}

		@Override
		public DispatcherType getDispatcherType() {
			return originalRequest.getDispatcherType();
		}

		@Override
		public void logout() throws ServletException {
			originalRequest.logout();
		}

		@Override
		public Collection<Part> getParts() throws IOException, ServletException {
			return originalRequest.getParts();
		}

		@Override
		public Part getPart(final String name) throws IOException, ServletException {
			return originalRequest.getPart(name);
		}

		@Override
		public <T extends HttpUpgradeHandler> T upgrade(final Class<T> handlerClass) throws IOException, ServletException {
			return originalRequest.upgrade(handlerClass);
		}

		@Override
		public Map<String, String> getTrailerFields() {
			return originalRequest.getTrailerFields();
		}

		@Override
		public boolean isTrailerFieldsReady() {
			return originalRequest.isTrailerFieldsReady();
		}

	}

}
