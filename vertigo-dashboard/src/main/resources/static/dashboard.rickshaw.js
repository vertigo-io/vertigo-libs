function showRickshawChart(graphElement) {
		
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