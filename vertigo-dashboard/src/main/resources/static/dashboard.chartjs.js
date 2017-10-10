
function showChartJsChart(elem, datas, dataMetrics, dataQuery, dataLabels, dataColors) {
	var allMetrics = dataMetrics;
	
	var chartOptions;
	var chartJsDataSets;
	var type;
	if ( elem.hasClass("bubbles") ) {
		type = 'bubble';
		var bubblesData = toChartJsBubblesData(datas, dataQuery.measures , dataLabels, dataQuery.groupBy);
		chartJsDataSets = [ {data: bubblesData }];
		chartOptions = getChartJsBubblesOptions(datas, dataQuery, dataLabels);
	} 
	
	$(elem).html("");
	$(elem).append("<canvas></canvas>");
	ctx = $(elem).find("canvas");
	var myBubbleChart = new Chart(ctx,{
	    type: type,
	    data: {
	    	labels : dataLabels,
			datasets: chartJsDataSets
		},
	    options: chartOptions
	});
}

function getChartJsBubblesOptions(datas, dataQuery, dataLabels){
	var maxRadius = getMaxRadius(datas, dataQuery.measures[2]); //always the thirs columns
	return {
			elements: {
			    point: {
			      radius: function(context) {
			        var index = context.dataIndex;
			        var data = context.dataset.data[index];
			        var size = context.chart.width;
			        var base = data.r_measure / maxRadius; 
			        return (size / 24) * base;
			      }
			    }
			  },
			 legend: {
				 display: false,
			 },
			 tooltips: {
	            callbacks: {
	                label: function(tooltipItem, data) {
	                	var point = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
	                	return [
	                    	data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].name,
	                    	dataLabels[dataQuery.measures[0]] +" : "+ Math.floor(point.x),
	                    	dataLabels[dataQuery.measures[1]] +" : "+ Math.floor(point.y),
	                    	dataLabels[dataQuery.measures[2]] +" : "+ point.r_measure,
	                    	];
	                }
	            }
			 }
	};
}

function toChartJsBubblesData(data, dataMeasures,  dataLabels, groupBy) {
	var newSeries = new Array();
	for(var i = 0 ; i< data.length; i++) {
		var serie = new Object();
		serie.x = data[i].values[dataMeasures[0]];
		serie.y = data[i].values[dataMeasures[1]];
		var r = data[i].values[dataMeasures[2]];
		if (!$.isEmptyObject(data[i].values) && !r) {
			r = 0;
		}
		serie.name = data[i].values[groupBy]
		serie.r_measure = r;
		newSeries.push(serie);
	}
	return newSeries;
}


function getMaxRadius(datas, radiusField) {
	var maxRadius = 0 ;
	for(var i = 0 ; i< datas.length; i++) {
		var r = datas[i].values[radiusField];
		if (r > maxRadius) {
			maxRadius = r;
		}
	}
	return Math.max(maxRadius, 1);
}

