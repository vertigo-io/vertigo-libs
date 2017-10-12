<#import "page.ftl" as page>
<#import "module_macros.ftl" as module>

<@page.header/>

	<div class="card-deck px-3 pb-3 justify-content-around"">
		<@module.indicator title="WebServices Hits" icon="schedule" status='GREEN' metric=webservicesCount!'0' legend="" />
		<@module.indicator title="WebServices Mean Duration" icon="vertical_align_center" status=(webservicesMeanDuration<300)?then('GREEN', 'RED')  metric=webservicesMeanDuration?string["0"] legend="ms" />
		<@module.indicator title="WebServices Exception Rate" icon="vertical_align_center" status=(webservicesExceptionRate<0.5)?then('GREEN', 'RED') metric=webservicesExceptionRate?string["0.##"] legend="%" />
	</div>
	
	
	<div>
		<div class="row">
			<div class="col-6">
				<div class="chart chartjs linechart" style="width:90%;height:400px"
				    data-url="data/series" 
				    data-query-measures='["duration:median", "duration:percentile_70", "duration:percentile_90"]'
				    data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*" }'
				    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1h"}'
					data-labels='{"duration:median":"Médiane", "duration:percentile_70":"Per70", "duration:percentile_90":"Per90" }' 
				    data-colors='iRED2GREEN'></div>   
			</div>
			<div class="col-6">
				<div class="chart chartjs stakedbarchart" style="width:90%;height:400px"
				    data-url="data/series" 
				    data-query-measures='["sql_duration:mean", "search_duration:mean", "inner_duration:mean"]'
				    data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*" }'
				    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1h"}'
					data-labels='{"sql_duration:mean":"Durée SQL", "search_duration:mean":"Durée Search", "inner_duration:mean":"Durée interne" }' 
				    data-colors='GREEN2BLUE'></div>   
			</div>
		</div>
		<div class="row" >
			<div class="col-6" >
				<div class="datatable"
					    data-url="data/tabular/tops" 
					    data-query-measures='["duration:sum"]'
					   	data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*" }'
					    data-query-time-filter='{ "from": "now() - 1w", "to": "now()"}'
					    data-query-group-by='name'
					   	data-query-max-rows='5' 
					    data-columns='[
					    { "label":"Webservices", "data":"name"},
					    { "label":"Temps total", "data":"duration:sum", "format": "time:second"}]'
					    data-paging='false'></div>   
			</div>
			<div class="col-6" >	    
				 <div class="datatable"
					    data-url="data/tabular/tops" 
					    data-query-measures='["duration:mean"]'
					   	data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*" }'
					    data-query-time-filter='{ "from": "now() - 1w", "to": "now()"}'
					    data-query-group-by='name'
					   	data-query-max-rows='5' 
					    data-columns='[
					    { "label":"Webservice", "data":"name"},
					    { "label":"Temps moyen", "data":"duration:mean", "format": "time:second"}]'
					    data-paging='false'></div> 
			</div>
		</div>
		<div class="row" >
			<div class="col-6" >	 
				<div class="chart chartjs bubbles" style="width:100%"
					    data-url="data/tabular" 
					    data-query-measures='["duration:count", "duration:mean", "sql_count:mean"]'
					    data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*", "additionalWhereClause": "\"duration\"< 30000 "}'
					    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1w"}'
					    data-query-group-by='name'
						data-labels='{"duration:count":"Nombre de hits", "duration:mean":"Durée moyenne", "sql_count:mean":"Nombre dappels SQL" }' 
					    data-colors='GREEN2BLUE'></div> 		
			</div>	
					    
			<div class="col-6" >	    
				<div class="chart chartjs stakedbarchart"  style="height:400px"
					    data-url="data/series/clustered" 
					    data-query-clustered-measure='{ "measure": "duration:count", "thresholds": ["10","20","50","100","200","500","1000","2000"] }'
					    data-query-data-filter='{ "measurement": "webservices", "location": "*", "name": "*", "topic": "*" }'
					    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1h" }'
					    data-labels='{"duration:count<10":"<10ms","duration:count_20":"<20ms","duration:count_50":"<50ms","duration:count_100":"<100ms", "duration:count_200":"<200ms", "duration:count_500":"<500ms", "duration:count_1000":"<1s", "duration:count_2000":"<2s", "duration:count>2000":">2s"}'
					    data-colors='iRED2GREEN'></div>
			</div>
		</div>
	</div>
	<div class="row" >
		<div class="col-4" >
			<div class="chart chartjs doughnut" style="height:400px; width: 90%"
						    data-url="data/tabular" 
						    data-query-measures='["duration:count"]'
						    data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*"}'
						    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1w"}'
						    data-query-group-by='exception'
							data-labels='{"":"OK"}' 
						    data-colors='GREEN2BLUE'></div>   
		</div>
	</div>


	<section class="row">
	  	<div class="col-md-12">
			<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#health" aria-expanded="false" >
				Health
			</button>
			<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#config" aria-expanded="false" >
				Config
			</button>
		</div>
	  	<div id="health" class="col-md-12 collapse">
	  		<div class="card card-body">
	  			<@module.health />
	  		</div>
	  	</div>
	</section>
	
<@page.footer/>	
