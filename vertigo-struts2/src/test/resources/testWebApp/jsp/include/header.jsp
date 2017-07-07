<%@ taglib prefix="s" uri="/struts-tags"%>

<s:include value="/jsp/include/pageHeader.jsp">
	<s:param name="subtitle" value="param.subtitle" />
</s:include>
<div id="header">
	<s:a action="Accueil" id="logo">
		<img src="static/images/logo.jpg" alt="DemoKasper" />
	</s:a>
</div>
<hr/>
<%@include file="/jsp/include/menu.jsp" %>
<div class="row-fluid">
	<div class="panel span12">
		<h2>${param.subtitle}</h2>
		<% boolean pageManagedMessages = Boolean.parseBoolean(request.getParameter("pageManagedMessages")); %>
		<% if (!pageManagedMessages) { %>
			<s:actionmessage/>
		<% } %>
			