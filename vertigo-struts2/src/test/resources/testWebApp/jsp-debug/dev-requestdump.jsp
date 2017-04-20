<%@page contentType="text/html;charset=ISO-8859-1" import="java.io.IOException,java.lang.management.*, java.text.SimpleDateFormat"%>
<%@page import="java.util.*, org.apache.log4j.Logger"%>

<%!
   private String normalize(String value)
   {
      StringBuffer sb = new StringBuffer();
      for (int i = 0; i < value.length(); i++) {
         char c = value.charAt(i);
         sb.append(c);
         if (c == ';')
            sb.append("<br>");
      }
      return sb.toString();
   }
%>
<html>
   <head>
      <title>Request dump</title>      
   </head>
   <body>
      <h1>HTTP Request Headers Received</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         Enumeration eNames = request.getHeaderNames();
         while (eNames.hasMoreElements()) {
            String name = (String) eNames.nextElement();
            String value = normalize(request.getHeader(name));
      %>
         <tr><td><%= name %></td><td><%= value %></td></tr>
      <%
         }
      %>
      </table>
      
      <h1>HTTP Request Parameters Received</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         Enumeration enParams = request.getParameterNames(); 
				 while(enParams.hasMoreElements()){
            String name = (String) enParams.nextElement();
            String value = normalize(String.valueOf(request.getParameter(name)));
      %>
         <tr><td><%= name %></td><td><%= value %></td></tr>
      <%
         }
      %>
      </table>
      
      <h1>HTTP Request Attributes Received</h1>
      <table border="1" cellpadding="4" cellspacing="0">
      <%
         Enumeration enAttr = request.getAttributeNames(); 
				 while(enAttr.hasMoreElements()){
            String name = (String) enAttr.nextElement();
            String value = normalize(String.valueOf(request.getAttribute(name)));
      %>
         <tr><td><%= name %></td><td><%= value %></td></tr>
      <%
         }
      %>
      </table>
      
   </body>
</html>