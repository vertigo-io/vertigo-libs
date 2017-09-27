<#macro header>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
		<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="/dashboard.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/rickshaw/1.6.1/rickshaw.js" ></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rickshaw/1.6.1/rickshaw.css">
		
		<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js" ></script>
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
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
		
		
		function showChart(graphElement) {
		
				graphElement.html("");
				
				var queryUrl = graphElement.data("url");
				var queryMeasures = graphElement.data("query-measures");
				var queryDataFilter = graphElement.data("query-data-filter");
				var queryTimeFilter = graphElement.data("query-time-filter");
				var query = {measures : queryMeasures, dataFilter : queryDataFilter, timeFilter : queryTimeFilter };
					
				$.post(queryUrl, JSON.stringify(query) , function( jsonData, textStatus) {
					var palette = new Rickshaw.Color.Palette();
					var mySeries = $.map(jsonData.seriesNames , function(serieName, index){
						return {
							color: palette.color(),
						 	data : $.map(jsonData.timedDataSeries,  function( value, index ) { 
					        				var y_value = (value.values)[serieName] != undefined ? (value.values)[serieName] : null;
								        	return {
								        		x: value.time,
								        	 	y: y_value
								        	}
					        		})
					        	}
					}, "json");
				
					
					var graph = new Rickshaw.Graph( {
					    element: graphElement.get()[0], 
					    width: 300, 
					    height: 200, 
					    series: mySeries
					});
					 
					var xAxis = new Rickshaw.Graph.Axis.Time({
					    graph: graph
					});
					
					xAxis.render();
					graph.render();
				})
		}
		
		
		
		function showBarChart(graphElement) {
		
				graphElement.html("");
				
				var queryUrl = graphElement.data("url");
				var queryMeasures = graphElement.data("query-measures");
				var queryDataFilter = graphElement.data("query-data-filter");
				var queryTimeFilter = graphElement.data("query-time-filter");
				var queryGroupBy = graphElement.data("query-group-by");
				var query = { measures : queryMeasures, dataFilter : queryDataFilter, timeFilter : queryTimeFilter, groupBy : queryGroupBy };
					
				$.post(queryUrl, JSON.stringify(query) , function( jsonData, textStatus) {
					var palette = new Rickshaw.Color.Palette();
					var mySeries = $.map(jsonData.seriesNames , function(serieName, index){
						var i = 0
						return {
							color: palette.color(),
						 	data : $.map(jsonData.dataSeries,  function( value, key) { 
						 					var x_value = i;
						 					i++;
					        				var y_value = (value.values)[serieName] != undefined ? (value.values)[serieName] : null;
								        	return {
								        		x: x_value,
								        	 	y: y_value
								        	}
					        		})
					        	}
					}, "json");
				
					var format = function(n) {
						var i = 0
						var map = {};
						$.each(jsonData.dataSeries,  function( value, key) { 
							map[i] = value;
						});
					
						return map[n];
					}
					
					
					
					var graph = new Rickshaw.Graph( {
					    element: graphElement.get()[0], 
					    renderer: 'bar',
					    width: 300, 
					    height: 200, 
					    series: mySeries
					});
					
					var x_ticks = new Rickshaw.Graph.Axis.X( {
						graph: graph,
						tickFormat: format
					} );
					
					x_ticks.render();
					graph.render();
				})
		}
		
		
		
		$('[data-toggle="list"] ').on('shown.bs.tab', function (e) {
			var graphElement = $($(e.target).attr("href")).find(".graph-panel");
			if (graphElement.length == 1) {
				showChart($(graphElement[0]))
			}
		})
		
		$(document).ready(function() {
		
		  $('table.table.sortable').DataTable(
				  	{
		        "paging":   false,
		        "info": false,
		        "searching": false
		    }
		  	);
		});
		</script>
	</body>
</html>
</#macro>
