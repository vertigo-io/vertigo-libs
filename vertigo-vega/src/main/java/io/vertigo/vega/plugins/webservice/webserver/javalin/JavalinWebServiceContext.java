package io.vertigo.vega.plugins.webservice.webserver.javalin;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.javalin.http.Context;
import io.vertigo.vega.plugins.webservice.handler.WebServiceContext;

final class JavalinWebServiceContext implements WebServiceContext {
	private final Context ctx;

	/**
	 * Constructor.
	 * @param ctx Javalin context
	 */
	JavalinWebServiceContext(final Context ctx) {
		this.ctx = ctx;
	}

	/** {@inheritDoc} */
	@Override
	public HttpServletRequest getRequest() {
		return ctx.req;
	}

	/** {@inheritDoc} */
	@Override
	public HttpServletResponse getResponse() {
		return ctx.res;
	}

	/** {@inheritDoc} */
	@Override
	public String getPathParam(final String pathName) {
		return ctx.pathParam(pathName);
	}

	/** {@inheritDoc} */
	@Override
	public String getBody() {
		return ctx.body();
	}
}
