<template>
    <canvas ref="graphCanvas"></canvas>
</template>
<script>
import {getColors} from './dashboard-tools'

export default {
	props : {
		type:          					{ type: String, 	required: true },
		url:          					{ type: String, 	required: true },
		queryClusteredMeasure:     		{ type: Object,  	required: false },
		queryMeasures:     				{ type: Array,  	required: false },
		queryDataFilter:  				{ type: Object,  	required: true },
		queryTimeFilter:				{ type: Object,  	required: true },
		colors: 						{ type: String,  	required: true },
		labels: 						{ type: Object,  	required: true },
		queryGroupBy: 					{ type: String,  	required: true },
		additionalOptions: 				{ type: Object,  	required: false },
	},
	created : function () {
       this.fetchData();
        
    },
	data: function () {
		return {
			graphDataSets: []
		}
	},
	watch: { 
          modelValue: {
             handler(newValue, oldValue) {
				// Note: `newValue` will be equal to `oldValue` here
				// on nested mutations as long as the object itself
				// hasn't been replaced.
			},
			deep: true
          }
    },
	methods: {
		fetchData: function() {
			var dataQuery = this.buildQuery();
            this.$http.post(this.url, dataQuery )
            .then( function (response) { //Ok
                var datas = response.data;
                var dataValues = datas.timedDataSeries ? datas.timedDataSeries : datas.tabularDataSeries;
				var dataMetrics = datas.seriesNames;
				this.showChartJsChart(dataValues, dataMetrics, dataQuery, this.labels, this.colors, this.additionalOptions);
            }.bind(this));
        },
		buildQuery: function() {
			var dataQuery = { dataFilter : this.queryDataFilter, timeFilter : this.queryTimeFilter };
			if (this.queryMeasures) {
				dataQuery['measures'] = this.queryMeasures;
			}
			if (this.queryClusteredMeasure) {
				dataQuery['clusteredMeasure'] = this.queryClusteredMeasure;
			}
			if (this.queryGroupBy) {
				dataQuery['groupBy'] = this.queryGroupBy;
			}
			return dataQuery;
		},

		showChartJsChart: function(datas, dataMetrics, dataQuery, dataLabels, dataColors, additionalOptions) {
			var timedSeries = datas[0].time;
			var labels = dataLabels
			var chartOptions;
			var chartJsDataSets;
			var chartJsType;
			if ( this.type === "bubbles") {
				chartJsType = 'bubble';
				var realMetrics = dataMetrics.filter(metric => metric !== dataQuery.groupBy);
				var bubblesData = this.toChartJsBubblesData(datas, realMetrics , dataLabels, dataQuery.groupBy);
				chartJsDataSets = [ {data: bubblesData }];
				chartOptions = this.getChartJsBubblesOptions(datas, realMetrics, dataQuery, dataLabels, additionalOptions);
				this.setChartJsColorOptions(chartJsDataSets, dataColors, 0.5);
			} else if (this.type ==="linechart") {
				chartJsType = 'line';
				chartJsDataSets = this.toChartJsData(datas, dataMetrics, dataLabels, timedSeries, dataQuery.groupBy);
				chartOptions = this.getChartJsLineOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions);
				this.setChartJsColorOptions(chartJsDataSets, dataColors);
			} else if (this.type ==="stakedbarchart") {
				chartJsType = 'bar';
				chartJsDataSets = this.toChartJsData(datas, dataMetrics,  dataLabels, timedSeries, dataQuery.groupBy);
				chartOptions = this.getStackedOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions);
				this.setChartJsColorOptions(chartJsDataSets, dataColors);
			} else if (this.type ==="polararea") {
				chartJsType = 'polarArea';
				chartJsDataSets = this.toChartJsData(datas, dataMetrics,  dataLabels, timedSeries, dataQuery.groupBy);
				var pieData  = this.toChartJsPieData(chartJsDataSets, dataLabels);
				chartJsDataSets = pieData.datasets;
				labels = pieData.labels;
				chartOptions = this.getPolarChartOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions);
				this.setChartJsPieColorOptions(chartJsDataSets, dataColors);
			} else if (this.type ==="doughnut") {
				chartJsType = 'doughnut';
				
				var realMetrics = dataMetrics.filter(metric => metric !== dataQuery.groupBy);
				chartJsDataSets = this.toChartJsData(datas, realMetrics, dataLabels, timedSeries, dataQuery.groupBy);
				var pieData  = this.toChartJsPieData(chartJsDataSets, dataLabels);
				chartJsDataSets = pieData.datasets;
				labels = pieData.labels;
				this.setChartJsPieColorOptions(chartJsDataSets, dataColors);
				chartOptions = {
					legend : {
						display: true,
						position: 'bottom'
					}
				};
			}
			//
			var ctx = this.$.refs.graphCanvas;
			var finalOptions = {...chartOptions, ...additionalOptions};
			var myBubbleChart = new Chart(ctx,{
				type: chartJsType,
				data: {
					labels : labels,
					datasets: chartJsDataSets
				},
				options: finalOptions
			});
		},
		setChartJsColorOptions: function(datasets, dataColors, opacity) {
			if(dataColors) {
				var myColors = getColors(dataColors, datasets.length, opacity);
				for(var i = 0 ; i<datasets.length; i++) {
					datasets[i].backgroundColor = myColors[i];
					datasets[i].fill = true
				}
				
			}
		},

		 setChartJsPieColorOptions: function(datasets, dataColors, opacity) {
			if(dataColors) {
				for(var i = 0 ; i<datasets.length; i++) {
					datasets[i].backgroundColor = getColors(dataColors, datasets[i].data.length, opacity);//we have one dataset
				}
			}
		},


		 getChartJsBubblesOptions: function(datas, dataMetrics, dataQuery, dataLabels, additionalOptions){
			var maxRadius = this.getMaxRadius(datas, dataMetrics[2]); //always the third columns
			var xAxisType = this.getAxisType(datas, additionalOptions, 'xAxisType', dataMetrics[0]);
			var yAxisType = this.getAxisType(datas, additionalOptions, 'yAxisType', dataMetrics[1]);
			return {
					scales: {
						x: {
							type: xAxisType
							},
						y: {
							type: yAxisType
							}
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
					plugins: {
						tooltip: {
							displayColors: false,
							callbacks: {
								title: function(graphs) {
									var graph = graphs[0]
									//we have on serie so we keep only the first one
									return graph.dataset.data[graph.dataIndex].name;
								},
								label: function(graph) {
									var point = graph.dataset.data[graph.dataIndex];
									return [
										dataLabels[dataMetrics[0]] +" : "+ Math.round(point.x),
										dataLabels[dataMetrics[1]] +" : "+ Math.round(point.y),
										dataLabels[dataMetrics[2]] +" : "+ Math.round(point.r_measure),
										];
								}
							}
						}
					}
			};
		},

		getPolarChartOptions: function(datas, dataMetrics, dataQuery, dataLabels, additionalOptions){
			return {};
		},

		 getAxisType: function(datas, additionalOptions, optionKey, metric) {
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
		},

		getChartJsLineOptions: function(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions){
			var options =  {
				scales : {
					y : {
						ticks : {
							beginAtZero: true
						}
					}
				},
				plugins: {
					tooltip: {
						mode: 'index',
						callbacks: {
							label: function(graph) {
								var point = graph.dataset.data[graph.dataIndex];
								return graph.dataset.label +" : "+ Math.floor(point.y);
							},
							title: function(graphs) {
								return '';
							}
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
				options.scales.x = {
						type: 'time',
						time: {
							unit: 'hour',
							displayFormats: {
								hour: 'HH:mm'
							}
						}
					}
			} else {
				options.scales.x = {
					type: 'category'
				}
			}
			return options;
		},


		 getStackedOptions: function(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions){
			var options = this.getChartJsLineOptions(datas, dataMetrics, dataQuery, dataLabels, timedSeries, additionalOptions)
			options.scales.x.stacked = true;
			options.scales.y.stacked = true;
			return options;
		},


		 toChartJsBubblesData: function(data, dataMeasures,  dataLabels, groupBy) {
			var newSeries = new Array();
			for(var i = 0 ; i< data.length; i++) {
				var serie = new Object();
				serie.x = data[i].values[dataMeasures[0]];
				serie.y = data[i].values[dataMeasures[1]];
				var r = data[i].values[dataMeasures[2]];
				if (!this.isEmpty(data[i].values) && !r) {
					r = 0;
				}
				serie.name = data[i].values[groupBy]
				serie.r_measure = r;
				newSeries.push(serie);
			}
			return newSeries;
		},


		 getMaxRadius: function(datas, radiusField) {
			var maxRadius = 0 ;
			for(var i = 0 ; i< datas.length; i++) {
				var r = datas[i].values[radiusField];
				if (r > maxRadius) {
					maxRadius = r;
				}
			}
			return Math.max(maxRadius, 1);
		},

		getMinMax: function(datas, field) {
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
		},



		/** Conversion de données servers List<Instant, Map<NomMetric, value>> en données Chartjs.*/
		toChartJsData: function(datas, metrics, dataLabels, timedSeries, xAxisMeasure) {
			let _endsWith = function(string, suffix) {
				return string.indexOf(suffix, string.length - suffix.length) !== -1;
			};
			var categorieIndex = new Array();
			
			var newSeries = new Array();
			for(var i = 0 ; i< metrics.length; i++) {
				var metric = metrics[i];
				var serie = new Object();
				serie.parsing = false;
				if(dataLabels && dataLabels[metric]) {
					serie.label = dataLabels[metric];
				}
				serie.data = new Array();
				for(var j = 0 ; j<datas.length; j++) {
					var x = timedSeries ? Date.parse(datas[j].time) : datas[j].values[xAxisMeasure]; // timed series by default, else categories 
					var y = datas[j].values[metric];
					if (!this.isEmpty(datas[j].values) && !y) {
						y = 0;
					}
					serie.data[j]=({
						x: x,
						y: y
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
		},

		toChartJsPieData: function(chartJsDataSets, dataLabels) {
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
			
		},
		isEmpty: function(obj) {
			return Object.keys(obj).length === 0;
		}
	}
}
</script>