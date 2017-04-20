<%@ page session="false"  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
    <meta http-equiv=pragma content="no-cache">
    <meta http-equiv=expires content='-1'>
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-store">
    <meta http-equiv="Cache-Control" content="must-revalidate">
    <style>
    	td {
    		vertical-align:middle;
    	}
    </style>
</head>
<title>KASPER_DEMO CheckPage</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table border="0" align="center" cellpadding="5" cellspacing="5">
<tr><td>
Test JSP:</td><td><%try{%>
	<b><font color="#00C000">OK</font></b>
	<input type="hidden" name="TEST_JSP" value="OK"/>
<%} catch (Throwable th) {%>
	<b><font color="#D00000">KO</font></b> <i>(<%=th.getClass().getName()%> <%=th.getMessage()%>)</i>
	<input type="hidden" name="TEST_JSP" value="KO"/>
<%}%></td></tr>
<tr><td>
<a href="../servlet/checkrunning.html" target="_blank">Check ALL</a></td><td><iframe src ="../servlet/checkrunning.html" width="300px" height="100px" frameborder="0"></iframe>
</td></tr>
<td>
<a href="../servlet/checkrunning.html?TEST=CTRL" target="_blank">Check Controller</a></td><td><iframe src ="../servlet/checkrunning.html?TEST=CTRL" width="40px" height="20px" frameborder="0"></iframe>
</td></tr>
<tr><td>
<a href="../servlet/checkrunning.html?TEST=BDD" target="_blank">Check DataBase</a></td><td><iframe src ="../servlet/checkrunning.html?TEST=BDD" width="40px" height="20px" frameborder="0"></iframe>
</td></tr>
<tr><td>
<a href="../servlet/checkrunning.html?TEST=BALPARC" target="_blank">Check BalParc Interface</a></td><td><iframe src ="../servlet/checkrunning.html?TEST=BALPARC" width="40px" height="20px" frameborder="0"></iframe>
</td></tr>
<tr><td>
<a href="../servlet/checkrunning.html?TEST=GEOSERVICES" target="_blank">Check Geoservices Interface</a></td><td><iframe src ="../servlet/checkrunning.html?TEST=GEOSERVICES" width="40px" height="20px" frameborder="0"></iframe>
</td></tr>
<tr><td>
<a href="../servlet/checkrunning.html?TEST=AS400PARIS" target="_blank">Check AS400 Paris Interface</a></td><td><iframe src ="../servlet/checkrunning.html?TEST=AS400PARIS" width="40px" height="20px" frameborder="0"></iframe>
</td></tr>
</table>
</body>
</html>

