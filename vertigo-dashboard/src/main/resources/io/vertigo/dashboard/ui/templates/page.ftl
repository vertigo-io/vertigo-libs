<#macro header>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="/dashboard/static/dashboard.css">
		
		<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js" ></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js" ></script>
		<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js" ></script>
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css">
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.bundle.min.js"></script>
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-color/1.0.3/d3-color.min.js" ></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-interpolate/1.1.5/d3-interpolate.min.js" ></script>
		
		<script src="/dashboard/static/dashboard.js"></script>
		<script src="/dashboard/static/dashboard.chartjs.js"></script>
		<script src="/dashboard/static/dashboard.datatable.js"></script>
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
		  <a class="navbar-brand" href="/dashboard">Dashboard</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="/dashboard" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      <li class="nav-item active">
		        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
		      </li>
		    </ul>
		  </div>
		   <div class="float-right">
		   	<#if locations?? >
		  	<select id="locationSelection" >
		  	 	  <option value="">All locations</option>
		  	 	  <#list locations as location >
				  <option value="${location}">${location}</option>
				  </#list>
			</select>
			</#if>
		  	<select id="timeSelection" >
				  <option value="last_day">Last day</option>
				  <option value="last_3_days" selected >Last 3 days</option>
				  <option value="last_week">Last week</option>
			</select>
		  <div>
		</nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="bg-faded sidebar">
          <ul class="nav nav-pills flex-column">
			<li class="nav-item">
				<a class="nav-link ${(moduleName?? && (moduleName == 'commons'))?then('active', '')}" href="/dashboard/modules/commons" data-toggle="popover" data-placement="right" data-content="Commons">
					<i class="material-icons">build</i>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link ${(moduleName?? && (moduleName == 'dynamo'))?then('active', '')}" href="/dashboard/modules/dynamo" data-toggle="popover" data-placement="right" data-content="Dynamo">
					<i class="material-icons" >view_quilt</i>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link ${(moduleName?? && (moduleName == 'vega'))?then('active', '')}" href="/dashboard/modules/vega" data-toggle="popover" data-placement="right" data-content="Vega">
					<i class="material-icons">import_export</i>
				</a>
			</li>
          </ul>
        </nav>

        <main class="pt-3 content container-fluid">
</#macro>
		
<#macro footer>
				</main>
			</div>
		</div>
		<script>
		$(function () {
		  $('[data-toggle="popover"]').popover(
		 	 {
			  trigger: 'hover'
			})
		})
		
		
		$(document).ready(function() { 
			startClock(); 
			
			//update input with cookies
			if ($.cookie("timeFilter")) {
				$('#timeSelection').val($.cookie("timeFilter"));
			}
			
			if ($.cookie("locationFilter")) {
				$('#locationSelection').val($.cookie("locationFilter"));
			}
			
			
			showCharts(); 
			showTables(); 
			
			 $('table.table.sortable').DataTable(
			  	{
			        "paging":   false,
			        "info": false,
			        "searching": false
			    }
		  	);
		});
		
		
		$('[data-toggle="list"] ').on('shown.bs.tab', function (e) {
			var graphElement = $($(e.target).attr("href")).find(".chart-panel");
			if (graphElement.length == 1) {
				showChart($(graphElement[0]))
			}
		});
		
		
		$('#timeSelection').on('change', function() {
			$.cookie("timeFilter", $(this).val(), { path : '/' });
			
			showCharts(); 
			showTables(); 
		});
		
		<#if locations?? >
		$('#locationSelection').on('change', function() {
			$.cookie("locationFilter", $(this).val(), { path : '/' });
		
			showCharts(); 
			showTables(); 
		});
		</#if>
		
		</script>
	</body>
</html>
</#macro>
