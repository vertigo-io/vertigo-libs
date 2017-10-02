function showRickshawChart(graphElement, datas, dataMetrics) {
		
		graphElement.html("");
		var palette = new Rickshaw.Color.Palette();
		
		var mySeries = $.map(dataMetrics , function(serieName, index){
			return {
				color: palette.color(),
			 	data : $.map(datas,  function( value, index ) { 
		        				var y_value = (value.values)[serieName] != undefined ? (value.values)[serieName] : null;
					        	return {
					        		x: value.time,
					        	 	y: y_value
					        	}
		        		})
		        	}
		});
	
		
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
}