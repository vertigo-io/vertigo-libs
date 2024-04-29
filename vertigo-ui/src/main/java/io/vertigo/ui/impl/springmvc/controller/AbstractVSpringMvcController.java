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
package io.vertigo.ui.impl.springmvc.controller;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.nio.charset.StandardCharsets;

import javax.inject.Inject;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datastore.kvstore.KVCollection;
import io.vertigo.datastore.kvstore.KVStoreManager;
import io.vertigo.ui.core.ComponentStates;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.core.ViewContextMap;
import io.vertigo.ui.exception.ExpiredViewContextException;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.ui.impl.springmvc.util.UiUtil;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Super class des Actions SpringMvc.
 *
 * @author npiedeloup, mlaroche
 */
public abstract class AbstractVSpringMvcController {

	public static final String DEFAULT_VIEW_NAME_ATTRIBUTE = "defaultViewName";

	/** Clé de la collection des contexts dans le KVStoreManager. */
	public static final KVCollection CONTEXT_COLLECTION_NAME = new KVCollection("VViewContext");
	/** Clé de la collection des initilizer de context dans le KVStoreManager. */
	public static final KVCollection INIT_CONTEXT_COLLECTION_NAME = new KVCollection("VViewInitContext");

	/** Clé de context du UiUtil. */
	public static final ViewContextKey<UiUtil> UTIL_CONTEXT_KEY = ViewContextKey.of("util");
	/** Préfix des clés des paramètres passés par l'url. */
	public static final String URL_PARAM_PREFIX = "params.";

	private static final String SLASH = "/";

	/**
	 * Indique que l'initialisation du context par un parametre de l'url est autorisé.
	 */
	@Target({ ElementType.TYPE })
	@Retention(RetentionPolicy.RUNTIME)
	public @interface AcceptCtxQueryParam {
		//rien
	}

	@Inject
	private KVStoreManager kvStoreManager;
	@Inject
	private CodecManager codecManager;
	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private JsonEngine jsonEngine;

	public void prepareContext(final HttpServletRequest request) {
		final var attributes = RequestContextHolder.currentRequestAttributes();
		ViewContext viewContext = null;
		final var ctxId = request.getParameter(ViewContext.CTX.get());
		final String ctxInit;
		if ("POST".equals(request.getMethod()) || "PUT".equals(request.getMethod()) || "DELETE".equals(request.getMethod())
				|| ctxId != null && acceptCtxQueryParam()) {
			if (ctxId == null) {
				throw new VSystemException("Context ctxId manquant");
			} else {
				ctxInit = ctxId.substring(0, ctxId.indexOf('$'));
				final var ctxUid = ctxId.substring(ctxId.indexOf('$') + 1);
				ViewContextMap viewContextMap;
				try (var transactionWritable = transactionManager.createCurrentTransaction()) {
					viewContextMap = kvStoreManager.find(CONTEXT_COLLECTION_NAME, obtainStoredCtxId(ctxUid, request), ViewContextMap.class).orElse(null);
					UiRequestUtil.setRequestScopedAttribute("createdContext", false);
				}
				if (viewContextMap == null) {
					// we retrieve the url that created this context
					try (var transactionWritable = transactionManager.createCurrentTransaction()) {
						final var urlInitContextOpt = kvStoreManager.find(INIT_CONTEXT_COLLECTION_NAME, ctxInit, String.class);
						throw new ExpiredViewContextException("Context ctxId:'" + ctxId + "' manquant", urlInitContextOpt);
					}
				}
				//viewContextMap can't be null here
				viewContextMap.setJsonEngine(jsonEngine);
				viewContext = new ViewContext(viewContextMap, jsonEngine);
				viewContext.makeModifiable();
				viewContext.setInputCtxId(ctxId);
				attributes.setAttribute("viewContext", viewContext, RequestAttributes.SCOPE_REQUEST);
			}

		} else {
			final var initContextUrl = getUrlWithParam(request);
			ctxInit = codecManager.getHexEncoder().encode(codecManager.getMD5Encoder().encode(initContextUrl.getBytes(StandardCharsets.UTF_8)));
			try (var transactionWritable = transactionManager.createCurrentTransaction()) {
				kvStoreManager.put(INIT_CONTEXT_COLLECTION_NAME, ctxInit, initContextUrl);
				transactionWritable.commit();
			}
			viewContext = new ViewContext(new ViewContextMap(), jsonEngine);
			attributes.setAttribute("viewContext", viewContext, RequestAttributes.SCOPE_REQUEST);
			//initContextUrlParameters(request, viewContext);
			//TODO vérifier que l'action demandée n'attendait pas de context : il va etre recrée vide ce qui n'est pas bon dans certains cas.
			preInitContext(viewContext);
			Assertion.check().isTrue(viewContext.containsKey(UTIL_CONTEXT_KEY), "Pour surcharger preInitContext vous devez rappeler les parents super.preInitContext(). Action: {0}",
					getClass().getSimpleName());
			//initContext();

		}
		viewContext.setCtxId(ctxInit);
		if (useDefaultViewName()) {
			request.setAttribute(DEFAULT_VIEW_NAME_ATTRIBUTE, getDefaultViewName(this));
		}
	}

	private String obtainStoredCtxId(final String ctxId, final HttpServletRequest request) {
		if (bindCtxToSession()) {
			final var session = request.getSession(false);
			if (session != null) {
				final var base64Codec = codecManager.getBase64Codec();
				final var sha256Encoder = codecManager.getSha256Encoder();
				final var sessionIdHash = base64Codec.encode(sha256Encoder.encode(session.getId().getBytes(StandardCharsets.UTF_8)));

				return ctxId +
						"-" +
						sessionIdHash;
			}
		}
		return ctxId;
	}

	/**
	 * Lock context to sessionId.
	 * Should be desactivated by devs for sessionLess actions.
	 *
	 * @return if ctx is bind to session
	 */
	protected boolean bindCtxToSession() {
		return true;
	}

	/**
	 * Definition if whe should use the vertigo conventions to determine the default viewname
	 *
	 * @return if we should use it
	 */
	protected boolean useDefaultViewName() {
		return true;
	}

	@InitBinder()
	public void initBinder(final WebDataBinder binder) {
		final var attributes = RequestContextHolder.currentRequestAttributes();
		final var viewContext = (ViewContext) attributes.getAttribute("viewContext", RequestAttributes.SCOPE_REQUEST);
		final var viewContextMap = viewContext.asMap();
		binder.setAllowedFields(viewContextMap.viewContextUpdateSecurity().getAllowedFields());
	}

	private static String getDefaultViewName(final AbstractVSpringMvcController controller) {
		var path = controller.getClass().getName();
		path = path.substring(0, path.lastIndexOf('.'));
		//package is
		// group.id.project.feature.controllers and we look in feature/...
		// or group.id.project.controllers and we look in project/
		Assertion.check().isTrue(path.contains(".controllers"), "Default naming only works if your package contains .controllers, it's not the case for the controller {0}", controller.getClass());
		path = path.substring(path.lastIndexOf('.', path.indexOf(".controllers") - 1) + 1);
		path = path.replace(".controllers", "");
		path = path.replace(".", SLASH);
		var simpleName = StringUtil.first2LowerCase(controller.getClass().getSimpleName());
		simpleName = simpleName.replace("Controller", "");
		return path + SLASH + simpleName;
	}

	private boolean acceptCtxQueryParam() {
		return this.getClass().isAnnotationPresent(AcceptCtxQueryParam.class);
	}

	/**
	 * Preinitialisation du context, pour ajouter les composants standard.
	 * Si surcharger doit rappeler le super.preInitContext();
	 */
	protected void preInitContext(final ViewContext viewContext) {
		viewContext.publishRef(UTIL_CONTEXT_KEY, new UiUtil());
		viewContext.asMap().put("componentStates", new ComponentStates());
		viewContext.toModeReadOnly();
	}

	/**
	 * Conserve et fige le context.
	 * Utilisé par le KActionContextStoreInterceptor.
	 *
	 * @param request HttpServletRequest
	 */
	public final void storeContext(final HttpServletRequest request) {
		final var viewContext = getViewContext();
		try (var transactionWritable = transactionManager.createCurrentTransaction()) {
			final var ctxUid = viewContext.getId().substring(viewContext.getId().indexOf('$') + 1);
			kvStoreManager.put(CONTEXT_COLLECTION_NAME, obtainStoredCtxId(ctxUid, request), viewContext.asMap());// we only store the underlying map
			transactionWritable.commit();
		}
	}

	/**
	 * Conserve et fige le context.
	 * Utilisé par le KActionContextStoreInterceptor.
	 */
	public final void makeUnmodifiable() {
		final var viewContext = getViewContext();
		viewContext.makeUnmodifiable();
	}

	/** {@inheritDoc} */

	public final void validate() {
		//rien
	}

	/** {@inheritDoc} */
	private static ViewContext getViewContext() {
		final var attributes = RequestContextHolder.currentRequestAttributes();
		final var viewContext = (ViewContext) attributes.getAttribute("viewContext", RequestAttributes.SCOPE_REQUEST);
		Assertion.check().isNotNull(viewContext);
		//---
		return viewContext;
	}

	/**
	 * Passe en mode edition.
	 */
	protected static final void toModeEdit() {
		getViewContext().toModeEdit();
	}

	/**
	 * Passe en mode creation.
	 */
	protected static final void toModeCreate() {
		getViewContext().toModeCreate();
	}

	/**
	 * Passe en mode readonly.
	 */
	protected static final void toModeReadOnly() {
		getViewContext().toModeReadOnly();
	}

	/**
	 * @return Si on est en mode edition
	 */
	protected static final boolean isModeEdit() {
		return getViewContext().isModeEdit();
	}

	/**
	 * @return Si on est en mode readOnly
	 */
	protected static final boolean isModeRead() {
		return getViewContext().isModeRead();
	}

	/**
	 * @return Si on est en mode create
	 */
	protected static final boolean isModeCreate() {
		return getViewContext().isModeCreate();
	}

	/**
	 * @return Pile des messages utilisateur.
	 */
	public static final UiMessageStack getUiMessageStack() {
		return UiRequestUtil.obtainCurrentUiMessageStack();
	}

	public boolean isViewContextDirty() {
		return getViewContext().isDirty();
	}

	protected boolean isNewContext() {
		return UiRequestUtil.getRequestScopedAttribute("createdContext", Boolean.class).orElse(true);
	}

	private static String getUrlWithParam(final HttpServletRequest request) {
		final var urlBuilder = new StringBuilder(request.getServletPath());
		if (request.getQueryString() != null) {
			urlBuilder.append("?");
			urlBuilder.append(request.getQueryString());
		}
		return urlBuilder.toString();
	}

}
