
function showChartJsChart(elem, datas, dataMetrics, dataQuery, dataLabels, dataColors) {
	var allMetrics = dataMetrics;
	var timedSeries = datas[0].time;
	
	var chartOptions;
	var chartJsDataSets;
	var type;
	if ( elem.hasClass("bubbles") ) {
		type = 'bubble';
		var bubblesData = toChartJsBubblesData(datas, dataQuery.measures , dataLabels, dataQuery.groupBy);
		chartJsDataSets = [ {data: bubblesData }];
		chartOptions = getChartJsBubblesOptions(datas, dataQuery, dataLabels);
	} else if (elem.hasClass("linechart")) {
		type = 'line';
		chartJsDataSets = toChartJsData(datas, dataMetrics, allMetrics, dataLabels, timedSeries, dataQuery.groupBy);
		chartOptions = getChartJsLineOptions(datas, dataQuery, dataLabels, timedSeries);
	} else if (elem.hasClass("stakedbarchart")) {
		type = 'bar';
		chartJsDataSets = toChartJsData(datas, dataMetrics, allMetrics, dataLabels, timedSeries, dataQuery.groupBy);
		chartOptions = getStackedOptions(datas, dataQuery, dataLabels, timedSeries);
	}
	//colors
	setChartJsColorOptions(chartJsDataSets, dataColors);
	//
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


function setChartJsColorOptions(datasets, dataColors) {
	if(dataColors) {
		var myColors = dashboardTools.getColors(dataColors, datasets.length);
		for(var i = 0 ; i<datasets.length; i++) {
			datasets[i].backgroundColor = myColors[i];
		}
		
	}
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

function getChartJsLineOptions(datas, dataQuery, dataLabels, timedSeries){
	var options =  {
		scales : {
			yAxes : [{
				ticks : {
					beginAtZero: true
				}
			}]
		},
		tooltips: {
	        mode: 'index',
            callbacks: {
                label: function(tooltipItem, data) {
                	var point = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                	return dataLabels[dataQuery.measures[tooltipItem.datasetIndex]] +" : "+ Math.floor(point.y);
                },
                title: function(tooltipItems, data) {
                	return '';
                }
            }
	    },
	    elements : {
	        point : {
	        	radius : 0
	        },
	        line : {
	        	tension: 0
	        }
	    }
	};
	if (timedSeries) {
		 options.scales.xAxes = [{
		         type: 'time',
			     time: {
			     	unit: 'hour',
			         displayFormats: {
			         	hour: 'HH'
			         }
			     },
			     ticks: {
			    	 callback: function(value, index, values) {
		             	return value +'h';
		             }
		         }
		     }]
	 } else {
		 options.scales.xAxes = [{
	         type: 'category'
	     }]
	 }
	 return options;
}


function getStackedOptions(datas, dataQuery, dataLabels, timedSeries){
	var options = getChartJsLineOptions(datas, dataQuery, dataLabels, timedSeries)
	options.scales.xAxes[0].stacked = true;
	options.scales.yAxes[0].stacked = true;
	return options;
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


/** Conversion de données servers List<date, Map<NomMetric, value>> en données Chartjs.*/
function toChartJsData(datas, metrics, allMetrics, dataLabels, timedSeries, xAxisMeasure) {
	_endsWith = function(string, suffix) {
	    return string.indexOf(suffix, string.length - suffix.length) !== -1;
	};
	var categorieIndex = new Array();
	
	var newSeries = new Array();
	for(var i = 0 ; i< metrics.length; i++) {
		var metric = metrics[i];
		var serie = new Object();
		if(dataLabels && dataLabels[metric]) {
			serie.label = dataLabels[metric];
		}
		serie.data = new Array();
		for(var j = 0 ; j<datas.length; j++) {
			var x = timedSeries ? datas[j].time*1000 : datas[j].values[xAxisMeasure]; // timed series by default, else categories 
			var y = datas[j].values[metric];
			if (!$.isEmptyObject(datas[j].values) && !y) {
				y = 0;
			}
			serie.data[j]=({
				x: x,
				y, y
			});
		}
		var index = allMetrics.indexOf(metric);
		serie.color = index>=0 ? index : i;
		
		if(!serie.label) {
			if(_endsWith(metric, 'count')) {
				serie.label = "Quantit&eacute;";
			} else if(_endsWith(metric, 'mean')) {
				serie.label = "Moyenne";
			} else if(_endsWith(metric, 'min')) {
				serie.label = "Minimum";
			} else if(_endsWith(metric, 'max')) {
				serie.label = "Maximum";
			}
		}
		
		newSeries.push(serie);
	}
	return newSeries;
}
