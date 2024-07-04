<template>
    <canvas ref="graphCanvas"></canvas>
</template>
<script>
import {getColors} from './dashboard-tools'


const verticalLineTooltipPlugin = {
 id: 'verticalLineTooltipPlugin',
 afterDraw: (chart) => {
    if (chart.tooltip?._active?.length) {
      const { x } = chart.tooltip._active[0].element;
      const yAxis = chart.scales.y;
      const { ctx } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(50, 50, 50, 0.4)';
      ctx.stroke();
      ctx.restore();
    }
  }
}
 
 
const verticalLinePlugin = {
 id: 'verticalLinePlugin',
 getLinePositionAtIndex: function (chart, pointIndex) {
     const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
     const data = meta.data;
     return data[pointIndex].x;
 },
 getLinePositionAtX: function (chart, pointX) {
     const scaleX = chart.scales['x'];
     return scaleX.getPixelForValue(pointX,0);
 },
 renderVerticalLine: function (chartInstance, vLine) {
     const scaleY = chartInstance.scales['y'];
     const context = chartInstance.ctx;
	  const lineLeftOffset = vLine.x?
	  this.getLinePositionAtX(chartInstance, vLine.x)
	  :getLinePositionAtIndex(chart, vLine.idx);
    
     // render vertical line
     context.beginPath();
     context.strokeStyle = vLine.color?vLine.color:'#ff0000';
     context.moveTo(lineLeftOffset, scaleY.top);
     context.lineTo(lineLeftOffset, scaleY.bottom);
     context.stroke();

     // write label
     context.fillStyle = vLine.color?vLine.color:'#ff0000';
     context.textAlign = 'center';
	 if (typeof vLine.label === 'function') {
		context.fillText(vLine.label(), lineLeftOffset, scaleY.top-8);
	 } else {
     	context.fillText(vLine.label?vLine.label:'', lineLeftOffset, scaleY.top-8);
	 }
 },

 afterDatasetsDraw: function (chart, easing) {
     if (chart.config.options.vLineAt) {
         chart.config.options.vLineAt.forEach(vLine => this.renderVerticalLine(chart, vLine));
     }
 }
 };


export default {
	props : {
        title:                          { type: String,  },
		type:          					{ type: String,  required: true },
		datas:                          { type: Array,   },
		dataSeriesTranslator:           { type: Function,},
		queryUrl:                       { type: String,  },
        queryClusteredMeasure:     		{ type: Object,  },
		queryMeasures:     				{ type: Array,   },
		queryDataFilter:  				{ type: Object,  },
		queryTimeFilter:				{ type: Object,  },
		queryGroupBy:                   { type: String,  },
        colors: 						{ type: String,  required: true,   default:'DEFAULT' },
		labels:                         { type: Object,  required: true },
        minTime:                        { type: String, },
        maxTime:                        { type: String, },
		fillGapDim:                     { type: String, },
		fillGapValue:					{ type: Number, },
		timeFormat:                     { type: String,  required: true,   default:'DD/MM/YYYY HH:mm' },
		verticalLines: 					{ type: Array, }, /** {x, label, color} */
        additionalOptions: 				{ type: Object, },
	},
	created : function () {
       this.$data.graphChartId = "graphChartId_"+this.hashCode(this.type+'_'+JSON.stringify(this.labels));
       if(!window.dashboardGraphChart) {
           window.dashboardGraphChart = {};
       }
    },
    mounted: function() {
       if(this.queryUrl) {
           this.fetchData();
       } else {
           this.$data.graphDataSeriesTranslator = this.dataSeriesTranslator?this.dataSeriesTranslator:this.defaultDataSeriesTranslator;
           var translatedData = this.$data.graphDataSeriesTranslator(this.datas);
           this.showChartJsChart(translatedData.dataValues, translatedData.dataMetrics, translatedData.timedSeries, this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
       }	   
    },
	data: function () {
		return {
			graphChartId: {},
            graphDataSeriesTranslator: this.defaultDataSeriesTranslator,			
			stepSize: 1,			
            truncatedMinTime: null,			
			truncatedMaxTime: null,
		}
	},
	watch: { 
          datas: {
             handler(newValue, oldValue) {
                if(!!this.datas) {
                    var translatedData = this.$data.graphDataSeriesTranslator(newValue);
                    this.showChartJsChart(translatedData.dataValues, translatedData.dataMetrics, translatedData.timedSeries, this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
                }
            },
            deep: true
          },
          queryTimeFilter: {
             handler(newValue, oldValue) {
                if(!!this.queryUrl && this.hashCode(JSON.stringify(newValue)) !== this.hashCode(JSON.stringify(oldValue))) {
				    this.fetchData();
				}
			},
			deep: true
          },
          queryDataFilter: {
             handler(newValue, oldValue) {
                if(!!this.queryUrl && this.hashCode(JSON.stringify(newValue)) !== this.hashCode(JSON.stringify(oldValue))) {
                    this.fetchData();
                }
            },
            deep: true
          }
    },
	methods: {
        hashCode: function(s) {
            let h;
            for(let i = 0; i < s.length; i++) 
                  h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        
            return h;
        },
		fetchData: function() {
			var dataQuery = this.buildQuery();
            this.$http.post(this.queryUrl, dataQuery )
            .then( function (response) { //Ok
                var translatedData = this.$data.graphDataSeriesTranslator(response.data);
                this.showChartJsChart(translatedData.dataValues, translatedData.dataMetrics, translatedData.timedSeries,this.queryGroupBy, this.labels, this.colors, this.title, this.additionalOptions);
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

		showChartJsChart: function(datas, dataMetrics, timedSeries, queryGroupBy, dataLabels, dataColors, chartTitle, additionalOptions) {
			var dimPeriod = this.timeDimToDayJsPeriod();
			if(this.fillGapDim && this.minTime && this.maxTime && dimPeriod !== 'hour') {
			   var truncatedMinTime = dayjs(this.minTime, this.timeFormat).startOf(dimPeriod);
			   var truncatedMaxTime = dayjs(this.maxTime, this.timeFormat).startOf(dimPeriod);			   
			   var truncatedEndOfMinTime = dayjs(this.minTime, this.timeFormat).endOf(dimPeriod);
			   if(truncatedEndOfMinTime.isAfter(truncatedMaxTime)) { //On s'assure que la période min est celle de la dimenssion
					truncatedMaxTime = truncatedEndOfMinTime;
			   }
			   this.$data.truncatedMinTime = truncatedMinTime.add(truncatedMinTime.utcOffset(), 'minute').valueOf();
			   this.$data.truncatedMaxTime = truncatedMaxTime.add(truncatedMaxTime.utcOffset(), 'minute').valueOf();
			} else {
				this.$data.truncatedMinTime = this.minTime?dayjs(this.minTime, this.timeFormat).valueOf():null;
				this.$data.truncatedMaxTime = this.maxTime?dayjs(this.maxTime, this.timeFormat).valueOf():null;
			}
			   
			var xLabels = Object.values(dataLabels);
			var chartOptions;
			var chartJsDataSets;
			var chartJsType;
			if ( this.type === "bubbles") {
				chartJsType = 'bubble';
				var realLabels = dataLabels.filter(metric => metric !== queryGroupBy);
				xLabels = Object.values(realLabels);
                var bubblesData = this.toChartJsBubblesData(datas, realLabels.keys(), realLabels, queryGroupBy);
				chartJsDataSets = [ {data: bubblesData }];
				chartOptions = this.getChartJsBubblesOptions(datas, realLabels.keys(), queryGroupBy, realLabels, chartTitle, additionalOptions);
				this.setChartJsColorOptions(chartJsDataSets, dataColors, 0.5);
			} else if (this.type ==="linechart") {
				chartJsType = 'line';
				chartJsDataSets = this.toChartJsData(datas, dataLabels, timedSeries, queryGroupBy);
				chartOptions = this.getChartJsLineOptions(datas, queryGroupBy, dataLabels, timedSeries, chartTitle, additionalOptions);
				this.setChartJsColorOptions(chartJsDataSets, dataColors);
			} else if (this.type ==="stakedbarchart") {
				chartJsType = 'bar';
				chartJsDataSets = this.toChartJsData(datas, dataLabels, timedSeries, queryGroupBy);
				chartOptions = this.getStackedOptions(datas, queryGroupBy, dataLabels, timedSeries, chartTitle, additionalOptions);
				this.setChartJsColorOptions(chartJsDataSets, dataColors);
			} else if (this.type ==="polararea") {
				chartJsType = 'polarArea';
				chartJsDataSets = this.toChartJsData(datas, dataLabels, timedSeries, queryGroupBy);
				var pieData  = this.toChartJsPieData(chartJsDataSets, dataLabels);
				chartJsDataSets = pieData.datasets;
				xLabels = pieData.labels;
				chartOptions = this.getPolarChartOptions(datas, queryGroupBy, dataLabels, timedSeries, chartTitle, additionalOptions);
				this.setChartJsPieColorOptions(chartJsDataSets, dataColors);
			} else if (this.type ==="doughnut") {
				chartJsType = 'doughnut';
				var realLabels = dataLabels.filter(metric => metric !== queryGroupBy);
				chartJsDataSets = this.toChartJsData(datas, realLabels, timedSeries, queryGroupBy);
				var pieData  = this.toChartJsPieData(chartJsDataSets, dataLabels);
				chartJsDataSets = pieData.datasets;
				xLabels = pieData.labels;
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
			var finalOptions = this.mergeDeep(chartOptions,additionalOptions);
			if(!window.dashboardGraphChart[this.$data.graphChartId]) {
    			let chartData = {
                    datasets: chartJsDataSets
                };
                if(!timedSeries) {
                    chartData.labels = xLabels;
                }
    			var graphChart = new Chart(ctx,{
    				type: chartJsType,
    				data: chartData,
    				options: finalOptions,
					plugins: [verticalLineTooltipPlugin, verticalLinePlugin]
    			});
				
    			window.dashboardGraphChart[this.$data.graphChartId] = graphChart;
			} else {
                var graphChart =  window.dashboardGraphChart[this.$data.graphChartId];
                graphChart.data.datasets = chartJsDataSets;
			    if(this.hashCode(JSON.stringify(graphChart.options.scales)) !== this.hashCode(JSON.stringify(finalOptions.scales))) {
                    graphChart.options.scales = finalOptions.scales;
                }
                graphChart.update("none");
			}
		},
		setChartJsColorOptions: function(datasets, dataColors, opacity) {
			if(dataColors) {
				var myColors = getColors(dataColors, datasets.length, opacity);
				var myBgColors = getColors(dataColors, datasets.length, opacity?opacity*0.25:0.25);
                for(var i = 0 ; i<datasets.length; i++) {
					datasets[i].borderColor = myColors[i];
                    datasets[i].backgroundColor = myBgColors[i];
                    datasets[i].pointBackgroundColor = myColors[i];
                    datasets[i].pointBorderColor = '#FFFFFFAF';
                    datasets[i].pointBorderWidth = 2;
					datasets[i].fill = true;
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


		 getChartJsBubblesOptions: function(datas, dataMetrics, queryGroupBy, dataLabels, chartTitle, additionalOptions){
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

		getPolarChartOptions: function(datas, queryGroupBy, dataLabels, chartTitle, additionalOptions){
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
		getChartJsLineOptions: function(datas, queryGroupBy, dataLabels, timedSeries, chartTitle, additionalOptions){
			var options =  {
				scales : {
                    y : {
						ticks : {
							beginAtZero: true,
						},
						suggestedMin: 0, 
						suggestedMax: 5
					}
				},
				plugins: {
                    title: {
                        display: !!chartTitle,
                        text: chartTitle?chartTitle:'',
                        align:'start',
                        padding:20,
                        font: {size: 14, weight:'bold'}
                    },
                    legend: {
                        position: 'bottom'                           
                    },
					tooltip: {
						mode: 'index',
						position: 'nearest',
						boxPadding:3, 
						backgroundColor:'#F8F8F8D0', 
						titleColor:'#000', 
						bodyColor:'#000', 
						borderColor:'#333', 
						borderWidth:1,
						/*callbacks: {
							label: function(graph) {
								var point = graph.dataset.data[graph.dataIndex];
								return graph.dataset.label +" : "+ Math.floor(point.y);
							},
							title: function(graphs) {
								return timeFormatter;
							}
						}*/
					}
				},
				elements : {
					point : {
						radius : 3,
						hoverRadius : 6
					},
					line : {
						tension: 0
					}
				}
			};
			if (timedSeries) {
				options.scales.x = {
                    type: 'time',
					ticks: {
                        source:'auto', 
                        major: {
                            enabled: true
                        }
                    },
                    time: {
                      displayFormats: {
                        hour: 'HH:mm',
                        minute: 'HH:mm'
                      }, 
                      tooltipFormat: this.timeFormat+' Z'
                    }
				}				
                if(this.$data.truncatedMinTime) {
                    options.scales.x.suggestedMin = this.$data.truncatedMinTime;
                }
                if(this.$data.truncatedMaxTime) {
                    options.scales.x.suggestedMax = this.$data.truncatedMaxTime;
                }
			} else {
				options.scales.x = {
					type: 'category'
				}
			}
			return options;
		},


		 getStackedOptions: function(datas, queryGroupBy, dataLabels, timedSeries, chartTitle, additionalOptions){
			var options = this.getChartJsLineOptions(datas, dataQuery, dataLabels, timedSeries, additionalOptions)
			options.scales.x.stacked = true;
			options.scales.y.stacked = true;
			return options;
		},


		 toChartJsBubblesData: function(data, dataMeasures, dataLabels, groupBy) {
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
        defaultDataSeriesTranslator: function(datas) {
            var dataValues = datas.timedDataSeries ? datas.timedDataSeries : datas.tabularDataSeries;
            var dataMetrics = datas.seriesNames;
            return {dataValues: dataValues, dataMetrics:dataMetrics, timedSeries:!!datas.timedDataSeries};
        },
		/** Conversion de données servers List<Instant, Map<NomMetric, value>> en données Chartjs.*/
		toChartJsData: function(datas, dataLabels, timedSeries, xAxisMeasure) {
			let _endsWith = function(string, suffix) {
				return string.indexOf(suffix, string.length - suffix.length) !== -1;
			};
			
			var dimPeriod = this.timeDimToDayJsPeriod();
			var newSeries = new Array();
			for(const metric in dataLabels) {
				var serie = new Object();
				serie.data = new Array();
                serie.parsing = false;
				if(dataLabels && dataLabels[metric]) {
					serie.label = dataLabels[metric];
				}
				var lastTime = this.$data.truncatedMinTime?dayjs(this.$data.truncatedMinTime).subtract(1,dimPeriod):null;//if minTime, we start as we are just before; if no minTime, we keep undefined	
                for(var j = 0 ; j<datas.length; j++) {
                    if(timedSeries && !!this.fillGapDim) {
						var expectedNextTime = lastTime?dayjs(lastTime).add(1,dimPeriod):null;
						var expected2NextTime = lastTime?expectedNextTime.add(1,dimPeriod):null;
						var dataTime = dayjs(datas[j].time);
                        while(!dataTime.isBefore(expected2NextTime)) {
                            serie.data.push({x: expectedNextTime.valueOf(),y: this.fillGapValue});
							expectedNextTime = expected2NextTime;
							expected2NextTime = expected2NextTime.add(1,dimPeriod);
							lastTime = expectedNextTime.valueOf();							
                        }
                    }
					var x = timedSeries ? dayjs(datas[j].time).valueOf() : datas[j].values[xAxisMeasure]; // timed series by default, else categories 
					var y = datas[j].values[metric];
					if (!this.isEmpty(datas[j].values) && !y) {
						y = 0;
					}
					serie.data.push({ x: x, y: y });
					lastTime = x;
				}
				/**We complete data to maxTime included */
				if (timedSeries && !!this.fillGapDim && !!this.$data.truncatedMaxTime) {
					var expectedNextTime = lastTime?dayjs(lastTime).add(1,dimPeriod):null;
					var maxTime = dayjs(this.$data.truncatedMaxTime);
                    while(!expectedNextTime.isAfter(maxTime)) {
                        serie.data.push({x: expectedNextTime.valueOf(),y: this.fillGapValue});	
						expectedNextTime = expectedNextTime.add(1,dimPeriod);
						lastTime = expectedNextTime.valueOf();
                    }
				}
				
				if(!serie.label) {
					if(_endsWith(metric, 'count')) {
						serie.label = "Quantité";
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
		timeDimToDayJsPeriod : function() {
		            let dateTimeDim = this.fillGapDim;
		            if(dateTimeDim === '1h') {
		                return 'hour';
		            } else if(dateTimeDim === '1d') {
		                return 'day';
		            } else if(dateTimeDim === '1w') {
		                return 'week';
		            } else if(dateTimeDim === '1M') {
		                return 'month';
					} else if(dateTimeDim === '3M') {
			            return 'quarter';
					} else if(dateTimeDim === '1y') {
			            return 'year';
			        } else {
		                return 'hour';
		            }
		        },
		isEmpty: function(obj) {
			return Object.keys(obj).length === 0;
		},
		isObject: function(item) {
          return (item && typeof item === 'object' && !Array.isArray(item));
        },
        mergeDeep: function(target, ...sources) {
          if (!sources.length) return target;
          const source = sources.shift();
        
          if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
              if (this.isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                this.mergeDeep(target[key], source[key]);
              } else {
                Object.assign(target, { [key]: source[key] });
              }
            }
          }
          return this.mergeDeep(target, ...sources);
        }
	}
}
</script>