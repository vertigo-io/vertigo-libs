package io.vertigo.vega.plugins.webservice.webserver.javalin;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import io.javalin.Javalin;
import io.javalin.http.JavalinServlet;
import io.vertigo.core.node.Node;
import io.vertigo.vega.impl.webservice.WebServerPlugin;

/**
 * VegaJavalinFilter for JavalinServlet (mandatory).
 * @author npiedeloup
 */
public final class VegaJavalinFilter implements Filter {
	JavalinServlet javalinServlet;

	@Override
	public void init(final FilterConfig filterConfig) throws ServletException {
		final WebServerPlugin webServerPlugin = Node.getNode().getComponentSpace().resolve(WebServerPlugin.class);
		final Javalin javalin = ((JavalinServletFilterWebServerPlugin) webServerPlugin).getJavalin();
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
