<%@ taglib prefix="s" uri="/struts-tags"%>
		<hr/>
		<div id="footer">			
			<div id="logo"><img src="static/images/logo.jpg" height="20px"/></div>
			<s:a href="MentionsLegales">Mentions légales</s:a> |
			<s:a href="Contact">Contact</s:a> | 
			<s:property value="appVersion" />			
		</div>
	</div><%-- div container --%>
	
	<s:include value="/jsp/include/modalePopin.jsp"/>
	<!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
	<script src="static/js/bootstrap.js"></script>
    <script src="static/js/vertigo-ajax.js"></script>
    <script src="static/js/kasper-dhtml.js"></script>
    <script src="static/js/vertigo-autocomplete.js"></script>    
    <script src="static/js/popin.js"></script>
    ${param.scripts}
</body>
</html>