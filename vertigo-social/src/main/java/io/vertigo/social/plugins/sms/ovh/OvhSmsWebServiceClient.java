package io.vertigo.social.plugins.sms.ovh;

import java.util.List;
import java.util.Map;

import io.vertigo.core.node.component.Amplifier;
import io.vertigo.vega.impl.webservice.client.WebServiceProxyAnnotation;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.InnerBodyParam;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PathParam;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.SessionLess;

@WebServiceProxyAnnotation(connectorName = "ovhSms", requestSpecializer = "ovhRequestSpecializer")
@PathPrefix("/1.0")
public interface OvhSmsWebServiceClient extends Amplifier {

	@AnonymousAccessAllowed
	@SessionLess
	@POST("/sms/{serviceName}/jobs/")
	Map sendSms(
			@PathParam("serviceName") final String serviceName,
			@InnerBodyParam("sender") final String sender,
			@InnerBodyParam("receivers") final List<String> receivers,
			@InnerBodyParam("message") final String message,
			@InnerBodyParam("noStopClause") final boolean noStopClause);

	@AnonymousAccessAllowed
	@SessionLess
	@GET("/sms")
	List<String> sms();

	@AnonymousAccessAllowed
	@SessionLess
	@GET("/sms/{serviceName}")
	Map smsService(@PathParam("serviceName") final String serviceName);

	@AnonymousAccessAllowed
	@SessionLess
	@GET("/sms/{serviceName}/senders")
	List<String> smsServiceSenders(@PathParam("serviceName") final String serviceName);

	@AnonymousAccessAllowed
	@SessionLess
	@POST("/sms/{serviceName}/senders")
	String createSender(
			@PathParam("serviceName") final String serviceName,
			@InnerBodyParam("sender") final String sender,
			@InnerBodyParam("description") final String description,
			@InnerBodyParam("reason") final String reason);

	@AnonymousAccessAllowed
	@SessionLess
	@GET("/sms/{serviceName}/senders/{sender}")
	Map getSenderDetail(
			@PathParam("serviceName") final String serviceName,
			@PathParam("sender") final String sender);

}
