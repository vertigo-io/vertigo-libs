package io.vertigo.vega.plugins.webservice.webserver.javalin;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import io.javalin.Javalin;
import io.javalin.http.JavalinServlet;
import io.vertigo.connectors.javalin.JavalinConnector;
import io.vertigo.core.util.InjectorUtil;

/**
 * VegaJavalinFilter for JavalinServlet (mandatory).
 * @author npiedeloup
 */
public final class VegaJavalinFilter implements Filter {
	@Inject
	private JavalinConnector javalinConnector;
	private JavalinServlet javalinServlet;

	public VegaJavalinFilter() {
		InjectorUtil.injectMembers(this);
	}

	@Override
	public void init(final FilterConfig filterConfig) throws ServletException {
		final Javalin javalin = javalinConnector.getClient();
		javalinServlet = javalin.servlet();
	}

	/** {@inheritDoc} */
	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
			throws IOException, ServletException {
		javalinServlet.service(request, response);
		//chain.doFilter(request, response);
	}

}
