/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.core;

import java.io.IOException;
import java.io.Serializable;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.nio.charset.Charset;
import java.util.Enumeration;
import java.util.Map.Entry;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.multipart.UploadedFile;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;

import io.vertigo.app.Home;
import io.vertigo.commons.codec.Codec;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.codec.Encoder;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.core.param.ParamManager;
import io.vertigo.dynamo.kvstore.KVStoreManager;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.VSystemException;
import io.vertigo.lang.WrappedException;
import io.vertigo.struts2.exception.ExpiredContextException;

/**
 * Super class des Actions struts.
 *
 * @author npiedeloup
 */
public abstract class AbstractActionSupport extends ActionSupport implements ModelDriven<KActionContext>, Preparable, ServletResponseAware {
	private static final long serialVersionUID = -1850868830308743394L;

	/** Clé de la collection des contexts dans le KVStoreManager. */
	public static final String CONTEXT_COLLECTION_NAME = "VActionContext";

	/** Clé de context du UiUtil. */
	public static final String UTIL_CONTEXT_KEY = "util";
	/** Clé de context du mode. */
	public static final String MODE_CONTEXT_KEY = "mode";
	//TODO voir pour déléguer cette gestion des modes
	/** Clé de context du mode Edit. */
	public static final String MODE_EDIT_CONTEXT_KEY = "modeEdit";
	/** Clé de context du mode ReadOnly. */
	public static final String MODE_READ_ONLY_CONTEXT_KEY = "modeReadOnly";
	/** Clé de context du mode Create. */
	public static final String MODE_CREATE_CONTEXT_KEY = "modeCreate";
	/** Préfix des clés des paramètres passés par l'url. */
	public static final String URL_PARAM_PREFIX = "params.";

	/**
	 * Indique que l'initialisation du context par un parametre de l'url est autorisé.
	 */
	@Target({ ElementType.TYPE })
	@Retention(RetentionPolicy.RUNTIME)
	public @interface AcceptCtxQueryParam {
		//rien
	}

	private HttpServletResponse response;
	private KActionContext context;
	@Inject
	private KVStoreManager kvStoreManager;
	@Inject
	private CodecManager codecManager;
	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private ParamManager paramManager;

	private final StrutsUiMessageStack uiMessageStack;

	/**
	 * Constructeur.
	 */
	protected AbstractActionSupport() {
		DIInjector.injectMembers(this, Home.getApp().getComponentSpace());
		uiMessageStack = new StrutsUiMessageStack(this);
	}

	/** {@inheritDoc} */
	@Override
	public final void prepare() throws ExpiredContextException {
		final HttpServletRequest request = ServletActionContext.getRequest();
		prepareContext(request);
	}

	private void prepareContext(final HttpServletRequest request) throws ExpiredContextException {
		final String ctxId = request.getParameter(KActionContext.CTX);
		if ("POST".equals(request.getMethod()) || ctxId != null && acceptCtxQueryParam()) {
			if (ctxId == null) {
				contextMiss(null);
			} else {
				try (VTransactionWritable transactionWritable = transactionManager.createCurrentTransaction()) {
					context = kvStoreManager.find(CONTEXT_COLLECTION_NAME, obtainStoredCtxId(ctxId, request), KActionContext.class).get();
					transactionWritable.commit();
				}

				if (context == null) {
					contextMiss(ctxId);
				}
				context.makeModifiable();
			}
		} else {
			context = new KActionContext();
			initContextUrlParameters(request);
			//TODO vérifier que l'action demandée n'attendait pas de context : il va etre recrée vide ce qui n'est pas bon dans certains cas.
			preInitContext();
			Assertion.checkState(context.containsKey(UTIL_CONTEXT_KEY), "Pour surcharger preInitContext vous devez rappeler les parents super.preInitContext(). Action: {0}",
					getClass().getSimpleName());
			initContext();
		}
	}

	private String obtainStoredCtxId(final String ctxId, final HttpServletRequest request) {
		if (bindCtxToSession()) {
			final HttpSession session = request.getSession(false);
			if (session != null) {
				final Codec<byte[], String> base64Codec = codecManager.getBase64Codec();
				final Encoder<byte[], byte[]> sha256Encoder = codecManager.getSha256Encoder();
				final String sessionIdHash = base64Codec.encode(sha256Encoder.encode(session.getId().getBytes(Charset.forName("utf8"))));

				return new StringBuilder(ctxId)
						.append("-")
						.append(sessionIdHash)
						.toString();
			}
		}
		return ctxId;
	}

	private boolean acceptCtxQueryParam() {
		return this.getClass().isAnnotationPresent(AcceptCtxQueryParam.class);
	}

	/**
	 * Lock context to sessionId.
	 * Should be desactivated by devs for sessionLess actions.
	 * @return if ctx is bind to session
	 */
	protected boolean bindCtxToSession() {
		return true;
	}

	/**
	 * Appeler lorsque que le context est manquant.
	 * Par défaut lance une ExpiredContextException.
	 * Mais une action spécifique pourrait reconstruire le context si c'est pertinent.
	 * @param ctxId Id du context manquant (seule info disponible)
	 * @throws ExpiredContextException Context expiré (comportement standard)
	 */
	protected void contextMiss(final String ctxId) throws ExpiredContextException {
		throw new ExpiredContextException("Context ctxId:'" + ctxId + "' manquant");
	}

	/**
	 * Initialisation du context.
	 * Pour accepter initContext avec des paramètres de la request, il est possible de le faire avec ce code :
	 * <code>
	 * final RequestContainerWrapper container = new RequestContainerWrapper(ServletActionContext.getRequest());
	 * MethodUtil.invoke(this, "initContext", container);
	 * </code>
	 */
	protected abstract void initContext();

	/**
	 * Preinitialisation du context, pour ajouter les composants standard.
	 * Si surcharger doit rappeler le super.preInitContext();
	 */
	protected void preInitContext() {
		context.put("appVersion", paramManager.getParam("app.version").getValueAsString());
		context.put(UTIL_CONTEXT_KEY, new UiUtil());
		toModeReadOnly();
	}

	/**
	 * Initialisation du context pour ajouter les paramètres passés par l'url.
	 * Les paramètres sont préfixés par "param."
	 */
	private void initContextUrlParameters(final HttpServletRequest request) {
		String name;
		for (final Enumeration<String> names = request.getParameterNames(); names.hasMoreElements();) {
			name = names.nextElement();
			context.put(URL_PARAM_PREFIX + name, request.getParameterValues(name));
		}
	}

	/**
	 * Conserve et fige le context.
	 * Utilisé par le KActionContextStoreInterceptor.
	 */
	public final void storeContext() {
		context.makeUnmodifiable();
		try (VTransactionWritable transactionWritable = transactionManager.createCurrentTransaction()) {
			//Suite à Struts 2.5 : les fichiers sont des UploadedFile non sérializable.
			//On vérifie qu'ils ont été consommés
			for (final Entry<String, Serializable> contextEntry : context.entrySet()) {
				if (contextEntry.getValue() instanceof UploadedFile[]) { //plus globalement !Serializable, mais on ne peut plus adapter le message
					throw new VSystemException("Le fichier '{0}' a été envoyé mais pas consommé par l'action", contextEntry.getKey());
					//sinon un warn, et on le retire du context ?
				}
			}
			kvStoreManager.put(CONTEXT_COLLECTION_NAME, obtainStoredCtxId(context.getId(), ServletActionContext.getRequest()), context);
			transactionWritable.commit();
		}
	}

	/** {@inheritDoc} */
	@GET
	@Override
	public String execute() {
		return NONE;
	}

	/** {@inheritDoc} */
	@Override
	public final void validate() {
		//rien
	}

	/** {@inheritDoc} */
	@Override
	public final KActionContext getModel() {
		return context;
	}

	/**
	 * Passe en mode edition.
	 */
	protected final void toModeEdit() {
		//TODO voir pour déléguer cette gestion des modes
		context.put(MODE_CONTEXT_KEY, FormMode.edit);
		context.put(MODE_READ_ONLY_CONTEXT_KEY, false);
		context.put(MODE_EDIT_CONTEXT_KEY, true);
		context.put(MODE_CREATE_CONTEXT_KEY, false);
	}

	/**
	 * Passe en mode creation.
	 */
	protected final void toModeCreate() {
		//TODO voir pour déléguer cette gestion des modes
		context.put(MODE_CONTEXT_KEY, FormMode.create);
		context.put(MODE_READ_ONLY_CONTEXT_KEY, false);
		context.put(MODE_EDIT_CONTEXT_KEY, false);
		context.put(MODE_CREATE_CONTEXT_KEY, true);
	}

	/**
	 * Passe en mode readonly.
	 */
	protected final void toModeReadOnly() {
		//TODO voir pour déléguer cette gestion des modes
		context.put(MODE_CONTEXT_KEY, FormMode.readOnly);
		context.put(MODE_READ_ONLY_CONTEXT_KEY, true);
		context.put(MODE_EDIT_CONTEXT_KEY, false);
		context.put(MODE_CREATE_CONTEXT_KEY, false);
	}

	/**
	 * @return Si on est en mode edition
	 */
	protected final boolean isModeEdit() {
		return FormMode.edit.equals(context.get(MODE_CONTEXT_KEY));
	}

	/**
	 * @return Si on est en mode readOnly
	 */
	protected final boolean isModeRead() {
		return FormMode.readOnly.equals(context.get(MODE_CONTEXT_KEY));
	}

	/**
	 * @return Si on est en mode create
	 */
	protected final boolean isModeCreate() {
		return FormMode.create.equals(context.get(MODE_CONTEXT_KEY));
	}

	/**
	 * @return AjaxResponseBuilder pour les requetes Ajax
	 */
	public final AjaxResponseBuilder createAjaxResponseBuilder() {
		//TODO Voir pour l'usage de return AjaxMessage ou FileMessage
		try {
			response.setCharacterEncoding("UTF-8");
			return new AjaxResponseBuilder(response.getWriter(), false);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Impossible de récupérer la response.");
		}
	}

	/**
	 * @return VFileResponseBuilder pour l'envoi de fichier
	 */
	public final VFileResponseBuilder createVFileResponseBuilder() {
		return new VFileResponseBuilder(response);
	}

	/**
	 * @return Pile des messages utilisateur.
	 */
	public final StrutsUiMessageStack getUiMessageStack() {
		return uiMessageStack;
	}

	/** {@inheritDoc} */
	@Override
	public final void setServletResponse(final HttpServletResponse servletResponse) {
		response = servletResponse;
	}

	/** {@inheritDoc}
	 * @deprecated Utiliser getUiMessageStack() */
	//We keep the deprecated, to keep a warning to not use the struts method
	@Override
	@Deprecated
	public final void addActionMessage(final String message) {
		super.addActionMessage(message);
	}

	/** {@inheritDoc}
	 * @deprecated Utiliser getUiMessageStack() */
	//We keep the deprecated, to keep a warning to not use the struts method
	@Override
	@Deprecated
	public final void addActionError(final String message) {
		super.addActionError(message);
	}

	/** {@inheritDoc}
	 * @deprecated Utiliser getUiMessageStack() */
	//We keep the deprecated, to keep a warning to not use the struts method
	@Override
	@Deprecated
	public final void addFieldError(final String fieldName, final String errorMessage) {
		super.addFieldError(fieldName, errorMessage);
	}

}
