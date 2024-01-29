package io.vertigo.vega.impl.servlet.filter;

import java.io.IOException;

import io.vertigo.core.node.Node;
import io.vertigo.vega.ratelimiting.RateLimitingManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * RateLimiting by Servlet Filter.
 * @author npiedeloup
 */
public final class RateLimitingFilter extends AbstractFilter {
	private RateLimitingManager rateLimitingManager;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		rateLimitingManager = Node.getNode().getComponentSpace().resolve(RateLimitingManager.class);
	}

	/** {@inheritDoc} */
	@Override
	public void doMyFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		if (!rateLimitingManager.isActive() //fast bypass
				|| !(req instanceof HttpServletRequest) || !(res instanceof HttpServletResponse)) {
			chain.doFilter(req, res);
			return;
		}

		if (rateLimitingManager.preHandle((HttpServletRequest) req, (HttpServletResponse) res)) {
			chain.doFilter(req, res);
		}
	}

}
