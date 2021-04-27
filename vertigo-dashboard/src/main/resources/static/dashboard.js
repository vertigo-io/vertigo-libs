/**
 * Charge les données lors du chargement de la page.
 **/
function showCharts() {
	$('div.chart').each(function () {
		showChart($(this));
	});
}


function showChart(elem) {
		var dataUrl = getDataUrl(elem); 
		
		var queryMeasures = elem.data("query-measures");
		var queryClusteredMeasure = elem.data("query-clustered-measure");
		var queryGroupBy = elem.data("query-group-by");
		var queryDataFilter = elem.data("query-data-filter");
		var queryTimeFilter = elem.data("query-time-filter");
		var queryMaxRows = elem.data("query-max-rows");
		var additionalOptions = elem.data("options");
		//--- retrieve time filter from input
		updateTimeFilterFromSelection(queryTimeFilter);
		updateLocationFilterFromSelection(queryDataFilter)
		//--- query
		var dataQuery = { dataFilter : queryDataFilter, timeFilter : queryTimeFilter };
		if (queryMeasures) {
			dataQuery['measures'] = queryMeasures;
		}
		if (queryClusteredMeasure) {
			dataQuery['clusteredMeasure'] = queryClusteredMeasure;
		}
		if (queryGroupBy) {
			dataQuery['groupBy'] = queryGroupBy;
		}
		if (queryMaxRows) {
			dataQuery['maxRows'] = queryMaxRows;
		}
		//--- styling
		var dataLabels =  elem.attr('data-labels');
		if(dataLabels) {
			dataLabels = jQuery.parseJSON( dataLabels );
		}
		var dataIcons =  elem.attr('data-icons');
		if(dataIcons) {
			dataIcons = jQuery.parseJSON( dataIcons );
		}
		var dataColors =  elem.attr('data-colors');
		
		$.post(dataUrl, JSON.stringify(dataQuery) , "json")      
		.done(
		  function( datas ) {
			  if(notEmpty(datas.timedDataSeries) || notEmpty(datas.tabularDataSeries)) {
				  var dataValues = datas.timedDataSeries ? datas.timedDataSeries : datas.tabularDataSeries;
				  var dataMetrics = datas.seriesNames;
				  if (elem.hasClass ("bignumber")) {
					  showBigNumber(elem, dataValues, dataMetrics, dataQuery, dataLabels, dataIcons, dataColors);
				  } else if (elem.hasClass ("objective")) {
					  showObjective(elem, dataValues, dataMetrics, dataQuery, dataLabels, dataIcons, dataColors);
				  } else if (elem.hasClass ("healthMonitor")) {
					  showHealthMonitor(elem, dataValues, dataMetrics, dataQuery, dataLabels, dataIcons, dataColors);
				  } else if (elem.hasClass ("chartjs")) {
					  showChartJsChart(elem, dataValues, dataMetrics, dataQuery, dataLabels, dataColors, additionalOptions);
				  }
			  }
		  });
}


function updateTimeFilterFromSelection(queryTimeFilter) {
	if ($.cookie) {
		var timeSelection = $.cookie("timeFilter");
	
		var to = 'now()';
		var from = '-1d';
		var dim = '6m';
		if(timeSelection === 'last_day') {
			from = '-1d'; 
			dim = '6m';
		} else if(timeSelection === 'last_3_days') {
			from = '-3d';
			dim = '1h';
		} else if(timeSelection === 'last_week') {
			from = '-1w';
			dim = '2h';
		} 
		if(from){
			queryTimeFilter.from = from;
		}
		if(dim){
			queryTimeFilter.dim = dim;
		}
		queryTimeFilter.to = to;
	}
}

function updateLocationFilterFromSelection(dataFilter) {
	var locationSelection
	if ($.cookie) {
		locationSelection = $.cookie('locationFilter');
	
		if(locationSelection) {
			dataFilter.filters.location = locationSelection;
		} else {
			dataFilter.filters.location = "*";
		}
	}
	
}

function notEmpty(datas) {
	if (!$.isEmptyObject(datas)) {
		for(var i = 0; i < datas.length; i++) {
			for(var value in datas[i].values) {
				return true;
			}
		}
	}
	return false;
}
/**
 * Charge les données lors du chargement de la page.
 **/
function showTables() {
	$('div.datatable').each(function () {
		var elem = $(this);
		//--- query
		var dataUrl = getDataUrl(elem); 
		var queryMeasures = elem.data("query-measures");
		var queryDataFilter = elem.data("query-data-filter");
		var queryTimeFilter = elem.data("query-time-filter");
		var queryGroupBy = elem.data("query-group-by");
		var queryMaxRows = elem.data("query-max-rows");
		var dataQuery = { measures: queryMeasures, dataFilter : queryDataFilter, timeFilter : queryTimeFilter, groupBy : queryGroupBy };
		if (queryMaxRows) {
			dataQuery['maxRows'] = queryMaxRows;
		}
		//--- retrieve time filter from input
		updateTimeFilterFromSelection(queryTimeFilter);
		
		var dataColumns =  elem.attr('data-columns');
		if(dataColumns) {
			dataColumns = jQuery.parseJSON( dataColumns );
		}
		completeDataTableQuery(dataColumns, dataQuery);
		$.post(dataUrl, JSON.stringify(dataQuery) , "json")
		.done(
		  function( datas ) {
			  showDataTable(elem, datas, dataColumns);			  
		  });
	});
	
}

getDataUrl = function(elem) {
	var dataUrl = elem.attr('data-url');
	if(dataUrl.indexOf('$')>-1) {			
		dataUrl = dataUrl.replace(/\$([a-z:]+)/gi, function(match, v) {
			return dashboardTools.getUrlVar(v);
		});
	}
	return dataUrl;
} 

function startClock() {
//Create elements :
$('<span/>', {class: 'hours'}).appendTo('.clock');
$('<span/>', {class: 'seconds'}).appendTo('.clock');
$('<span/>', {class: 'date'}).appendTo('.clock');

// Create two variable with the names of the months and days in an array
var monthNames = [ "Janvier", "F&eacute;vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao&ucirc;t", "Septembre", "Octobre", "Novembre", "D&eacute;cembre" ]; 
// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year   

refreshClock = function() {
	// Create a newDate() object
	var newDate = new Date();
	// Extract the current date from Date object
	newDate.setDate(newDate.getDate());
	var seconds = newDate.getSeconds();
	var minutes = newDate.getMinutes();
	var hours = newDate.getHours();
	// Add a leading zero to seconds value
	$(".clock .seconds").html(( seconds < 10 ? "0" : "" ) + seconds);
	// Add a leading zero to the minutes value
	$(".clock .hours").html(( hours < 10 ? "0" : "" ) + hours + ":"+( minutes < 10 ? "0" : "" ) + minutes);
	$('.clock .date').html(newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
};
setInterval(refreshClock,1000);
refreshClock();
}

dashboardTools = function() {
	var dashboardTools = {
			"version" : "2.0.0"
	};
	
	dashboardTools.guid = function () {
		//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
		function s4() {
			  return Math.floor((1 + Math.random()) * 0x10000)
			             .toString(16)
			             .substring(1);
		};
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	           s4() + '-' + s4() + s4() + s4();		
	};
	
	dashboardTools.doWhenProcessingReady = function (guid, callbackFunction) {
		var timer = {key:null};
		timer.key = setInterval( getTimer(guid, callbackFunction, timer), 500);

		function getTimer(guid, callbackFunction, timer) {
			return function() {
				var elem = $('#'+guid);
				if(elem.attr('load')!='true' && Processing.getInstanceById(guid)) {
					callbackFunction(Processing.getInstanceById(guid));
					clearInterval(timer.key);
					elem.attr('load','true');
					timer.key = setInterval( getTimer(guid, callbackFunction, timer), 1000);
				}
			}
		}
	};
	
	
	dashboardTools.getTimeFormat = function (timeDim) {
		if(timeDim == 'Year'|| timeDim.endsWith('y')) {
			return "%Y";
		} else if(timeDim == 'Month' || timeDim.endsWith('M')) {
			return "%m/%y";
		} else if(timeDim == 'Day' || timeDim.endsWith('d')) {
			return "%e/%m";
		} else if(timeDim == 'Hour' || timeDim.endsWith('h')) {
			return "%Hh";
		} else { //'QuarterHour' || 'SixMinutes' || 'Minute'
			return "%H:%M";
		}
	}
		
	dashboardTools.getColors = function (colorName, nbSeries, opacity) {
		if ("DEFAULT" == colorName) {
			//default on ne fait rien
			return;
		} 
		var mainColors
		var interpolation = _interpolateHsl; //par défaut interpolation HSL
		if ("RAINBOW" == colorName || "iRAINBOW" == colorName) {
			 mainColors = [ "#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)" ];
		} else if ("SPECTRUM" == colorName || "iSPECTRUM" == colorName) {
			mainColors = [ "rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)" ];
			interpolation = _interpolateCatmul;
		} else if ("RED2GREEN" == colorName || "iRED2GREEN" == colorName) {
			mainColors = [ "rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)" ];
		} else if ("GREEN2BLUE" == colorName || "iGREEN2BLUE" == colorName) {
			mainColors = [ "rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)" ];
		} else if ("HEAT" == colorName || "iHEAT" == colorName) {
			mainColors = [ "rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)" ];
		} else if ("GREEN:INTENSITY" == colorName || "iGREEN:INTENSITY" == colorName) {
			mainColors = [ "rgb(51, 153, 51)", "rgb(170, 250, 170)" ];
			interpolation = _interpolateLinear;
		} else if ("ANDROID" == colorName || "iANDROID" == colorName) {
			mainColors = [ "#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"  ];
			//mainColors = [ "#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00" ];
		} else if ("ANDROID:LIGHT" == colorName || "iANDROID:LIGHT" == colorName) {
			mainColors = [ "#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00" ];
		}  
		if(colorName.charAt(0) == 'i') { 
			mainColors = mainColors.reverse(); 
		}
		var resultColors;
		var isCycle = mainColors[0] == mainColors[mainColors.length-1];
		var resultColors = interpolation(mainColors, nbSeries + (isCycle ? 1 : 0)); //si les couleurs représente un cycle, on exclue la derniére couleur (qui est aussi la premiére)
		
		if (opacity) {
			// use the alpha
			return  $.map(resultColors, function( val, i ) {
				var d3Color = d3.color(val);
				d3Color.opacity = opacity;
				return d3Color.rgb();
			});
		}
		return resultColors;
	}
	
	_interpolateHsl = function(mainColors, nbColors) {
		return _point2PointColors(mainColors, nbColors, function(t, c1, c2, c3, c4) {
			return d3.interpolateHsl(c2, c3)(t);
		}); 
	}
	
	_interpolateLinear = function(mainColors, nbColors) {
		return _point2PointColors(mainColors, nbColors, function(t, c1, c2, c3, c4) {
			return d3.interpolateRgb(c2, c3)(t);
		});
	}
	
	_interpolateCatmul = function(mainColors, nbColors) {
		return _point2PointColors(mainColors, nbColors, function(t, c1, c2, c3, c4) {
			var empty = {r:null,g : null,b : null };
			
			var nc1 = c1 ? d3.rgb(c1) : empty;
			var nc2 = d3.rgb(c2);
			var nc3 = d3.rgb(c3);
			var nc4 = c4 ? d3.rgb(c4) : empty;
			var red = ( Math.max(Math.min(Math.round(_catmull(t, nc1.r, nc2.r, nc3.r, nc4.r)), 255), 0));
			var green = ( Math.max(Math.min(Math.round(_catmull(t, nc1.g, nc2.g, nc3.g, nc4.g)), 255), 0));
			var blue = (Math.max(Math.min(Math.round(_catmull(t, nc1.b, nc2.b, nc3.b, nc4.b)), 255), 0));
			return d3.rgb(red,green,blue);
		});
	}
	
	_point2PointColors = function (mainColors, nbColors, colorInterpolation) {
		if(nbColors == 1) {
			return [mainColors[0]];
		}
		var startJ = 0;
		var interpolatedColor = new Array();
		var nbInterpolatedColor = mainColors.length;
		var nbInterpolatedColorDegree = 0;
		while ((nbInterpolatedColor - 1) % (nbColors - 1) != 0 && nbInterpolatedColorDegree < 20) {
			nbInterpolatedColorDegree++;
			nbInterpolatedColor = mainColors.length + nbInterpolatedColorDegree * (mainColors.length - 1);
		}
		nbInterpolatedColorDegree++;
		for (var i = 0; i < mainColors.length - 1; i++) {
			var c1 = i - 1 >= 0 ? mainColors[i - 1] : null;
			var c2 = mainColors[i];
			var c3 = mainColors[i + 1];
			var c4 = i + 2 < mainColors.length ? mainColors[i + 2] : null;
			for (var j = startJ; j < nbInterpolatedColorDegree + 1; j++) {
				var color = colorInterpolation(j / nbInterpolatedColorDegree, c1, c2, c3, c4);
				interpolatedColor.push(color);
			}
			startJ = 1; //on ne refait pas le premier point (dejé atteint)
		}
		var result = new Array();
		for (var i = 0; i < nbColors; i++) {
			var index = (interpolatedColor.length - 1) / (nbColors - 1) * i;
			//var index = i % (interpolatedColor.length - 1);
			result.push(interpolatedColor[index]);
		}
		return result;
	}
	
	//Catmull-Rom spline interpolation function
	//p0 et p3 servent a orienter le chemin entre p1 et p2
	//t est une fraction entre 
	_catmull = function(t, inP0, p1, p2, inP3) {
		 var delta = p2 - p1;
		 var p0 = inP0 != null ? inP0 : p1 - delta;
		 var p3 = inP3 != null ? inP3 : p2 + delta;
		return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
	}
	return dashboardTools;
}();