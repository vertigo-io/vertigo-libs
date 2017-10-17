
function showChartJsChart(elem, datas, dataMetrics, dataQuery, dataLabels, dataColors, additionalOptions) {
	var timedSeries = datas[0].time;
	var labels = dataLabels
	var chartOptions;
	var chartJsDataSets;
	var type;
	if ( elem.hasClass("bubbles") ) {
		type = 'bubble';
		var bubblesData = toChartJsBubblesData(datas, dataMetrics , dataLabels, dataQuery.groupBy);
		chartJsDataSets = [ {data: bubblesData }];
		chartOptions = getChartJsBubblesOptions(datas, dataMetrics, dataQuery, dataLabels, additionalOptions);
		setChartJsColorOptions(chartJsDataSets, dataColors, 0.5);
	} else if (elem.hasClass("linechart")) {
		type = 'line';
		chartJsDataSets = toChartJsData(datas, dataMetrics, dataLabels, timedSeries, dataQuery.groupBy);
		chartOptions = getChartJsLineOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions);
		setChartJsColorOptions(chartJsDataSets, dataColors);
	} else if (elem.hasClass("stakedbarchart")) {
		type = 'bar';
		chartJsDataSets = toChartJsData(datas, dataMetrics,  dataLabels, timedSeries, dataQuery.groupBy);
		chartOptions = getStackedOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions);
		setChartJsColorOptions(chartJsDataSets, dataColors);
	} else if (elem.hasClass("doughnut")) {
		type = 'doughnut';
		chartJsDataSets = toChartJsData(datas, dataMetrics, dataLabels, timedSeries, dataQuery.groupBy);
		var pieData  = toChartJsPieData(chartJsDataSets, dataLabels);
		chartJsDataSets = pieData.datasets;
		labels = pieData.labels;
		setChartJsPieColorOptions(chartJsDataSets, dataColors);
		chartOptions = {
			legend : {
				display: true,
				position: 'bottom'
			}
		};
	}
	//
	$(elem).html("");
	$(elem).append("<canvas></canvas>");
	ctx = $(elem).find("canvas");
	var myBubbleChart = new Chart(ctx,{
	    type: type,
	    data: {
	    	labels : labels,
			datasets: chartJsDataSets
		},
	    options: chartOptions
	});
}


function setChartJsColorOptions(datasets, dataColors, opacity) {
	if(dataColors) {
		var myColors = dashboardTools.getColors(dataColors, datasets.length, opacity);
		for(var i = 0 ; i<datasets.length; i++) {
			datasets[i].backgroundColor = myColors[i];
		}
		
	}
}

function setChartJsPieColorOptions(datasets, dataColors, opacity) {
	if(dataColors) {
		for(var i = 0 ; i<datasets.length; i++) {
			datasets[i].backgroundColor = dashboardTools.getColors(dataColors, datasets[i].data.length, opacity);//we have one dataset
		}
	}
}


function getChartJsBubblesOptions(datas, dataMetrics, dataQuery, dataLabels, additionalOptions){
	var maxRadius = getMaxRadius(datas, dataMetrics[2]); //always the third columns
	var xAxisType = getAxisType(datas, additionalOptions, 'xAxisType', dataMetrics[0]);
	var yAxisType = getAxisType(datas, additionalOptions, 'yAxisType', dataMetrics[1]);
	return {
			scales: {
				xAxes: [{
			         type: xAxisType
					}],
				yAxes: [{
			        type: yAxisType
					}]
			},
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
				displayColors: false,
	            callbacks: {
	            	title: function(tooltipItems, data) {
	            		//we have on serie so we keep only the first one
	            		var tooltipItem = tooltipItems[0];
	            		return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].name;
	            	},
	                label: function(tooltipItem, data) {
	                	var point = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
	                	return [
	                    	dataLabels[dataMetrics[0]] +" : "+ Math.round(point.x),
	                    	dataLabels[dataMetrics[1]] +" : "+ Math.round(point.y),
	                    	dataLabels[dataMetrics[2]] +" : "+ Math.round(point.r_measure),
	                    	];
	                }
	            }
			 }
	};
}

function getAxisType(datas, additionalOptions, optionKey, metric) {
	var axisType = 'linear';//linear by default
	if (additionalOptions) {
		if (additionalOptions[optionKey]) {
			if(additionalOptions[optionKey] === 'auto') {
				var minMax = getMinMax(datas,metric)//the x axis
				if (minMax.max > 0 &&  minMax.min/minMax.max < 0.001){
					axisType = 'logarithmic';
				}
			} else {
				axisType = additionalOptions[optionKey];
			}
		}
		
	}
	return axisType
}

function getChartJsLineOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions){
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
                	return dataLabels[dataMetrics[tooltipItem.datasetIndex]] +" : "+ Math.floor(point.y);
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


function getStackedOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions){
	var options = getChartJsLineOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions)
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

function getMinMax(datas, field) {
	var min= 0;
	var max= 0;
	for(var i = 0 ; i< datas.length; i++) {
		var value = datas[i].values[field];
		if (value > max) {
			max = value;
		}
		if (value < min) {
			min = value
		}
	}
	return {
		min: min,
		max: max
	}
}



/** Conversion de données servers List<date, Map<NomMetric, value>> en données Chartjs.*/
function toChartJsData(datas, metrics, dataLabels, timedSeries, xAxisMeasure) {
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

function toChartJsPieData(chartJsDataSets, dataLabels) {
	var newSeries = new Array();
	var labels = new Array();
	for(var i = 0 ; i< chartJsDataSets[0].data.length; i++) {
		var serie = new Object();
		var label = chartJsDataSets[0].data[i].x;
		if(dataLabels && dataLabels[chartJsDataSets[0].data[i].x]) {
			label = dataLabels[chartJsDataSets[0].data[i].x];			
		}
		labels.push(label);
		newSeries.push(chartJsDataSets[0].data[i].y);
	}
	return { 
		datasets : [{ data : newSeries }],
		labels : labels
	}
	
}
