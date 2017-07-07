<%@page contentType="text/html;charset=ISO-8859-1" import="java.io.IOException,java.lang.management.*, java.text.SimpleDateFormat"%>
<%@page import="java.util.*, org.apache.log4j.Logger"%>
<%@page import="java.net.InetAddress, java.net.UnknownHostException,java.text.DecimalFormat, java.text.NumberFormat"%>
	<%!
	/**
	 * Formatter utilisé pour présenter les décimaux.
	 */
	private static final NumberFormat DOUBLE_FORMATTER = new DecimalFormat("#,##0.00");
  private static final String ACTION_NAME_GC = "GC";
	
private void doGC(final JspWriter out) throws IOException {
		Logger.getLogger(getClass()).info("Execution du garbage collector");
		final long freeBegin = Runtime.getRuntime().freeMemory();
		final long begin = System.currentTimeMillis();
		System.gc();
		final long end = System.currentTimeMillis();
		long freeEnd = Runtime.getRuntime().freeMemory();
		if (freeEnd < freeBegin) {
			freeEnd = freeBegin;
		}
		//------------------------------------------------------------------------
		// Rendu html de la page effectuant un garbage collector.
		out.print("Garbage collector effectué en ");
		out.print(DOUBLE_FORMATTER.format(((double) end - begin) / 1000));
		out.print(" s, mémoire libérée : ");
		out.print(DOUBLE_FORMATTER.format(((double) freeEnd - freeBegin) / 1024 / 1024));
		out.print(" Mo");
		out.println("<br/>");
	}

	private static void systemToHtml(final JspWriter out) throws IOException {
		out.println("<h2>Système</h2>");

		out.print("Java: ");
		out.print(System.getProperty("java.version"));
		out.print(", OS: ");
		out.print(System.getProperty("os.name"));
		out.print('/');
		out.print(System.getProperty("os.version"));
		// pour l'instant, on ne met pas user.name, user.home, user.dir pour raison de sécurité
		try {
			out.print(", host: ");
			out.print(InetAddress.getLocalHost().getHostAddress());
			out.print(", hostName: ");
			out.print(InetAddress.getLocalHost().getHostAddress());
		} catch (final UnknownHostException e) {
			out.print(e.toString());
		}
		out.print(", Log level (root) : ");
		out.print(Logger.getRootLogger().getLevel());
	}

	static double memoryUsedPct() {
		final double free = Runtime.getRuntime().freeMemory();
		final double total = Runtime.getRuntime().totalMemory();
		return (int) ((total - free) * 1000 / total) / 10d;
	}

	private static void memoryToHtml(final JspWriter out) throws IOException {
		out.println("<h2>Mémoire</h2>");
		out.print("Libre : ");
		out.print(DOUBLE_FORMATTER.format((double) Runtime.getRuntime().freeMemory() / 1024 / 1024));
		out.print(" Mo");
		out.print(" | ");
		out.print("Total : ");
		out.print(DOUBLE_FORMATTER.format((double) Runtime.getRuntime().totalMemory() / 1024 / 1024));
		out.print(" Mo");
		out.print(" | ");
		out.print("Maximum : ");
		out.print(DOUBLE_FORMATTER.format((double) Runtime.getRuntime().maxMemory() / 1024 / 1024));
		out.print(" Mo");
		out.println("<br/>");
	}
	private static HashMap test = new HashMap();
	%>
	
	<% 
		if (ACTION_NAME_GC.equals(request.getParameter("ACTION"))) {
			doGC(out);
		}	else if ("CONSO_MEM".equals(request.getParameter("ACTION"))) {
			String bigString = "TEST ";
			for (int i =0; i<5; i++) {
				bigString = bigString + bigString;
			}
			for(int i = 0 ; i< 500000; i++) {
				test.put(i, new java.lang.ref.SoftReference(bigString+i));
			}
		}
	%>
	  <a href="?ACTION=REFRESH">Refresh</a> &nbsp; &nbsp; <a href="?ACTION=<%=ACTION_NAME_GC%>">Force Garbage Collector</a> &nbsp; &nbsp; <a href="?ACTION=CONSO_MEM">Test conso memory (~256 Mo)</a> &nbsp; 
		<br/>
	<%
		 systemToHtml(out);
		 memoryToHtml(out);
	%>