package io.vertigo.vega.plugins.webservice.handler;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.definitions.WebServiceParam.WebServiceParamType;
import io.vertigo.vega.webservice.exception.SessionException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Log Exceptions handler. Log WebService Requests returning server errors (5XX).
 * @author xdurand
 */
public final class LogExceptionsHandlerPlugin implements WebServiceHandlerPlugin {

	private static final int HTTP_SERVER_ERROR_START = 500;
	private static final int HTTP_SERVER_ERROR_END = 600;

	/** Stack index of the handler for sorting at startup **/
	public static final int STACK_INDEX = 5;

	private static final Logger LOGGER = LogManager.getLogger(LogExceptionsHandlerPlugin.class);

	/** {@inheritDoc} */
	@Override
	public boolean accept(final WebServiceDefinition webServiceDefinition) {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public Object handle(final HttpServletRequest request, final HttpServletResponse response, final WebServiceCallContext routeContext, final HandlerChain chain) throws SessionException {
		final Object ret = chain.handle(request, response, routeContext);
		if (response.getStatus() >= HTTP_SERVER_ERROR_START && response.getStatus() < HTTP_SERVER_ERROR_END) {
			final List<WebServiceParam> a = routeContext.getWebServiceDefinition().getWebServiceParams();
			final String pathValues = a.stream()
					.filter(wsp -> WebServiceParamType.Path.equals(wsp.getParamType()))
					.map(wsp -> wsp.getName() + "=" + routeContext.getPathParam(wsp))
					.collect(Collectors.joining(","));

			LOGGER.error("Error [{}] for Route [{}] [{}] [{}] Body: {} ", response.getStatus(), routeContext.getWebServiceDefinition().getVerb(),
					routeContext.getWebServiceDefinition().getPath(), pathValues, routeContext.getBody());
		}
		return ret;
	}

	@Override
	public int getStackIndex() {
		return STACK_INDEX;
	}
}
