<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="v" uri="/vertigo-tags"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<s:include value="/jsp/include/pageHeader.jsp">
	<s:param name="subtitle">${pageName}</s:param>
</s:include>
<s:form>
	<s:actionmessage/>
	<v:div layout="table">
		<s:textfield name="utilisateur.login" label="default" />
		<s:password name="utilisateur.password"	label="default"  AUTOCOMPLETE="off" />
	</v:div>
	Connectez-vous avec admin/admin ou demo/demo<br />
	<div class="buttonbar">
		<div class="right">
			<s:submit action="loginLogin" value="Connexion" />
		</div>
	</div>
</s:form>

<div class="copyright">Klee - Tous droits réservés 2013 - v2.0 beta</div>
<s:include value="/jsp/include/pageFooter.jsp" />