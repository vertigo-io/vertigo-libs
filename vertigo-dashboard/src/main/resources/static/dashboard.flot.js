
function showFlotChart(elem, datas, dataMetrics, dataQuery, dataLabels, dataColors) {
	var allMetrics = dataMetrics;
	var timedSeries = datas[0].time;
	var flotDatas = toFlotData(datas, dataMetrics, allMetrics, dataLabels, timedSeries, dataQuery.groupBy);
	var defaultChartOptions = createDefaultChartOptions(allMetrics, dataQuery, datas, timedSeries);
	setColorOptions(defaultChartOptions, allMetrics.length, dataColors);
	
	var chartOptions;
	if (elem.hasClass ("barchart")) {
		chartOptions = getBarOptions(dataQuery, datas, timedSeries, dataColors);
	} else if (elem.hasClass ("stakedbarchart")) {
		chartOptions = getStakedBarOptions(dataQuery, timedSeries, dataColors);
	} else if (elem.hasClass ("linechart")) {
		chartOptions = getLineOptions(dataQuery, datas, timedSeries, dataColors);
	} else if (elem.hasClass ("stakedareachart")) {
		chartOptions = getStakedAreaOptions(dataQuery, timedSeries, dataColors);
	} else if (elem.hasClass ("sparkbar")) {
		chartOptions = getSparkBarOptions(dataQuery, datas, timedSeries, dataColors);		
	} else if (elem.hasClass ("sparkline")) {
		chartOptions = getSparkLineOptions(dataQuery, datas, timedSeries, dataColors);
	} else if (elem.hasClass ("donut")) {
		flotDatas = inverseFlotData(flotDatas, dataLabels);
		chartOptions = getDonutOptions(dataQuery, datas, timedSeries, dataColors);
		setColorOptions(chartOptions, flotDatas.length, dataColors);
	} 
	var options = $.extend(defaultChartOptions, chartOptions);
	var plot = $.plot(elem, flotDatas, options);
	elem.bind("plothover", options.tooltipsFunction(plot));
	elem.bind("plotleave", options.leavePlotFunction(plot));
}

function createDefaultChartOptions(allMetrics, dataQuery, datas, timedSeries, dataColors) {
	var options = {
			series: {
				//specific
			},
			grid: { hoverable: true, borderWidth:1	},
			xaxis: {
				
			},
			yaxis: {
				min:0
			},
			legend : {
				show : false /*on cache la legend, en attendant de la placer mieux */
			},
			tooltipsFunction : function(plot) {
				var previousPoint = null;
				return showTooltipsFunctionBeta(previousPoint, plot, false, true);
			},
			leavePlotFunction : function(plot){
				executeLeavePlotFunction(plot);
			}
		};
		if(timedSeries) {
			options.xaxis = {
				min: datas[0].time*1000.0,
			    max: datas[datas.length-1].time*1000.0,
				mode: "time",
				timezone : "browser",
				timeformat: dashboardTools.getTimeFormat(dataQuery.timeFilter.dim)
			};	
		} else {
			options.xaxis = {
					mode: "categories",
					tickFormatter : function(value, axis) {
				    	return axis.ticks[Math.round(value)].label;
					}
			};
		}
		return options;
}

function setColorOptions(options, nbSeries, dataColors) {
	if(dataColors) {
		options.colors = dashboardTools.getColors(dataColors, nbSeries);
	}
	return options;
}


function getDonutOptions(dataQuery, datas, timedSeries, dataColors) {
	var options = {
		series: {
			pie: {
				show: true,
				radius :1,
				innerRadius: 0.5,
				label: {
	                show: false,
	            },
	            combine: {
	            	threshold: 0.01
	            }
			}
		},
		tooltipsFunction : function(plot) {
			var previousPoint = null;
			return showPieTooltipsFunction(previousPoint, plot, false, true);
		}};
	return options;
}


function getStakedBarOptions(dataQuery, datas, timedSeries, dataColors) {
	var options = {
			series: {
				bars: {
					//horizontal:true,
					show: true,
					fill:1,
					barWidth: timedSeries?dashboardTools.getTimeDimStep(dataQuery.timeFilter.dim)*0.8:0.8,
					align: "center",
				},
				stack: true
			},
			tooltipsFunction : function(plot) {
				var previousPoint = null;
				return showTooltipsFunction(previousPoint, plot, true, true);
			}
	};
	if(timedSeries) {
		options.xaxis = {
				mode: "time",
				timezone : "browser",
				timeformat: dashboardTools.getTimeFormat(dataQuery.timeFilter.dim)
			};		
	}
	
	return options;
}


function getBarOptions(dataQuery, datas, timedSeries, dataColors) {
	var options = {
			series: {
				bars: {
					//horizontal:true,
					show: true,
					fill:1,
					barWidth: timedSeries?dashboardTools.getTimeDimStep(dataQuery.timeFilter.dim):0.8,
					align: "center",
				}
			},
			tooltipsFunction : function(plot) {
				var previousPoint = null;
				return showTooltipsFunction(previousPoint, plot, true, true);
			}
	};
	if(timedSeries) {
		options.xaxis = {
				mode: "time",
				timezone : "browser",
				timeformat: dashboardTools.getTimeFormat(dataQuery.timeFilter.dim)
			};		
	}
	
	return options;
}

function getSparkBarOptions(dataQuery, datas, timedSeries, dataColors) {
	var options = {
		series: {
			bars: {
				show: true,
				fill:1,
				//barWidth: dashboardTools.getTimeDimStep(dataQuery.timeFilter.dim),
				lineWidth : 4, //on fixe la taille en pt
				align: "center",
			}
		},
		xaxis: {
			min: datas[0].time*1000.0,
		    max: datas[datas.length-1].time*1000.0+dashboardTools.getTimeDimStep(dataQuery.timeFilter.dim)/2,
			mode: "time",
			timezone : "browser",
			timeformat: dashboardTools.getTimeFormat(dataQuery.timeFilter.dim)
		},
		grid: {
			show: false,
			hoverable: true,
		},
		legend: {
		    show: false,
		}};
		return options;
}

function getLineOptions(dataQuery,  datas, timedSeries, dataColors) {
	var options = {
		series: {
			lines: {
				show: true,
			}
		},
		
		legend: {
		    show: true,
		},
		crosshair: { mode: "x" }};
	return options;
}

function getSparkLineOptions(dataQuery, datas, timedSeries, dataColors) {
	var options = {
		series: {
			lines: {
				show: true,
				fill: true
				/*fillColor: {colors: [ { opacity: 1.0 }, { opacity: 1.0 } ]},*/
			},
			points: { 
				show:true,
				radius:1,
				fill:false
			}
		},
		xaxis: {
			ticks : [],
		},yaxis: {
			ticks : [],
		},
		crosshair: { mode: "xy" },
		grid: {
			show: false,
			hoverable: true,
			  autoHighlight: false,
			borderWidth:1
		},
		legend: {
		    show: true
		}};
		return options;
}

function getStakedAreaOptions(dataQuery, timedSeries, dataColors) {
	var options = {
			hooks: {
				processRawData   : function(plot, series, data, datapoints) {
					datapoints.format = [
						 { x: true, number: true, required: true },
						 { y: true, number: true, defaultValue : 0, required: false },
						 { y: true, number: true, defaultValue : 0, required: false }						
					]
				}
			},
		series: {
			lines: {
				show: true,
				fill: true,
				fillColor: {colors: [ { opacity: 1.0 }, { opacity: 1.0 } ]},
	            lineWidth:0
			},
			stack: true
		},
		crosshair: { mode: "x" },
		grid: {
			show: true,
			hoverable: true
		},
		legend: {
		    show: true
		}
		};
		return options;
}


/** Conversion de données servers Map<NomMetric, <date, value>> en données Flot.
 * function toFlotData(datas, dataLabels) {
	
	var newSeries = new Array();
	for(var metric in datas) {
		var serie = new Object();
		if(dataLabels && dataLabels[metric]) {
			serie.label = dataLabels[metric];
		}
		serie.data = new Array();
		for(var i = 0 ; i<datas[metric].length; i++) {
			serie.data[i] = [datas[metric][i].x, datas[metric][i].y];		
		}
		
		newSeries.push(serie);
	}
	return newSeries;
}*/
function isDifferentEnougth(previousPoint, item, pos) {
	if(!previousPoint) {
		return true;
	}
	var distance = Math.sqrt(Math.pow(previousPoint.pageX-pos.pageX,2)+Math.pow(previousPoint.pageY-pos.pageY,2));
	return previousPoint.seriesIndex != item.seriesIndex || previousPoint.dataIndex != item.dataIndex || distance > 25;
}

function getPreviousPoint(item, pos) {
	return {seriesIndex : item.seriesIndex,
		dataIndex: item.dataIndex,
		pageX : pos.pageX,
		pageY : pos.pageY};
}

function showPieTooltipsFunction(previousPoint, plot, showAllValues, showSameValue) {
	/** Fonction de tooltip Flot.*/
	showTooltips = function (event, pos, item) {
		if (item) {
			if (isDifferentEnougth(previousPoint, item, pos)) {
				previousPoint = getPreviousPoint(item,pos); 
				$("#tooltip").remove();
				var x = item.series.label;
				var percent = parseFloat(item.datapoint[0]).toFixed(2);
				var y = item.datapoint[1][0][1];
				var content = "<span class='xvalue'>" + x + "</span><br/> ";
				content += "<div>";
				//content += "<span class='serie' style='color:"+item.series.color+"'>"+item.series.metriclabel+"</span> : ";
				content += "<span class='yvalue'>" + y + " (" + percent +"%) </span>";
				content += "</div>";
				dashboardTools.showTooltip(pos.pageX, pos.pageY, content, item.series.color);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	}
	return showTooltips;
}

function executeLeavePlotFunction(plot){
	$("#tooltip").remove();
	plot.unhighlight();
	return;
}
function checkIfPosInPlot(pos,plot){
	var x = pos.x;
	var y = pos.y;
	var xMin = plot.getAxes().xaxis.min;
	var xMax = plot.getAxes().xaxis.max;
	var yMin = plot.getAxes().yaxis.min;
	var yMax = plot.getAxes().yaxis.max;
	if(xMin<=x && x <= xMax && yMin <= y && y <= yMax){
		return true;
	}
	else {
		return false;
	}
}
function showTooltipsFunctionBeta(previousPoint, plot, showAllValues, showSameValue) {
	/** Fonction de tooltip Flot.*/
	
	showTooltips = function (event, pos, item) {
		if(!checkIfPosInPlot(pos,plot)){
			executeLeavePlotFunction(plot);
		}
		else{
			$("#tooltip").remove();
			plot.unhighlight();
			if(plot.getData() && plot.getData().length > 0 && plot.getData()[0].data.length > 1){
				var x = pos.x;
				var y = pos.y;
				var delta=parseInt((plot.getData()[0].data[1][0] - plot.getData()[0].data[0][0])/2,10)+1;
				var content = "";
				var selectedX = null;
				for(var i=0; i<plot.getData().length;i++) {
					var serie = plot.getData()[i];
					var serieDatapoints = serie.datapoints;
					content += "<div>";
					var otherY = null;
					for(var j=0; j < serieDatapoints.points.length; j+=serieDatapoints.pointsize) {
						if(serieDatapoints.points[j] - delta <= x && serieDatapoints.points[j] + delta> x)  {
							selectedX=serieDatapoints.points[j];
							otherY = serieDatapoints.pointsize>2?serieDatapoints.points[j+1]-serieDatapoints.points[j+2]:serieDatapoints.points[j+1];
							if(otherY>0){
								plot.highlight(i,j/serieDatapoints.pointsize);
							}
							break;
						}
					}
					//if we found a data at the same x
					//and we draw all series in tooltip or the data get the same Y (ie : one hide the other in chart)
					//then we render all datas
					if(serie.label) {
						content += "<span class='serie' style='color:"+serie.color+"'>"+serie.label+"</span> : ";
					}
					content += "<span class='yvalue'>" + serie.yaxis.tickFormatter(otherY,serie.yaxis) + "</span>";
					content += "</div>";
				}
				content = "<span class='xvalue'>" +plot.getData()[0].xaxis.tickFormatter(selectedX,plot.getData()[0].xaxis) + "</span><br/> " + content;
				dashboardTools.showTooltip(pos.pageX, pos.pageY, content, plot.getData()[0].color);
			}else{
				executeLeavePlotFunction(plot);
			}
		}

	}
	return showTooltips;
}

function showTooltipsFunction(previousPoint, plot, showAllValues, showSameValue) {
	/** Fonction de tooltip Flot.*/
	showTooltips = function (event, pos, item) {
		if (item) {
			if (isDifferentEnougth(previousPoint, item, pos)) {
				previousPoint = getPreviousPoint(item, pos);
				$("#tooltip").remove();
				var x = item.datapoint[0];
				var y = item.datapoint.length>2?item.datapoint[1]-item.datapoint[2]:item.datapoint[1];
				var content = "<span class='xvalue'>" +item.series.xaxis.tickFormatter(x,item.series.xaxis) + "</span><br/> ";
				
				for(var i=0; i<plot.getData().length;i++) {
					var serie = plot.getData()[i];
					var serieDatapoints = serie.datapoints;
					content += "<div>";
					var otherY = null;
					for(var j=0; j < serieDatapoints.points.length; j+=serieDatapoints.pointsize) {
						if(serieDatapoints.points[j] == x) {
							otherY = serieDatapoints.pointsize>2?serieDatapoints.points[j+1]-serieDatapoints.points[j+2]:serieDatapoints.points[j+1];
							break;
						}
					}
					//if we found a data at the same x
					//and we draw all series in tooltip or the data get the same Y (ie : one hide the other in chart)
					//then we render all datas
					if(otherY && (showAllValues || ((showSameValue || item.seriesIndex == i ) && otherY == y))) {
						if(serie.label) {
							content += "<span class='serie' style='color:"+serie.color+"'>"+serie.label+"</span> : ";
						}
						content += "<span class='yvalue'>" + serie.yaxis.tickFormatter(otherY,serie.yaxis) + "</span>";
					}
					content += "</div>";
				}
				dashboardTools.showTooltip(item.pageX, item.pageY, content, item.series.color);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	}
	return showTooltips;
}


/** Conversion de données servers List<date, Map<NomMetric, value>> en données Flot.*/
function toFlotData(datas, metrics, allMetrics, dataLabels, timedSeries, xAxisMeasure) {
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
			var x = timedSeries ? datas[j].time*1000.0 : datas[j].values[xAxisMeasure]; // timed series by default, else categories 
			var y = datas[j].values[metric];
			if (!$.isEmptyObject(datas[j].values) && !y) {
				y = 0;
			}
			serie.data[j]=([x, y]);
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

function inverseFlotData(flotData, dataLabels) {
	var newSeries = new Array();
	for(var i = 0 ; i< flotData[0].data.length; i++) {
		var serie = new Object();
		serie.label = flotData[1].data[i][1];
		if(dataLabels && dataLabels[flotData[1].data[i][1]]) {
			serie.label = dataLabels[flotData[1].data[i][1]];			
		}
		serie.data  = flotData[0].data[i][1];
		newSeries.push(serie);
	}
	return newSeries;
}



