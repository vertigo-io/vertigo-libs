<#import "page.ftl" as page>
<#import "module_macros.ftl" as module>

<@page.header/>

	<div class="mx-3">
		<div class="card-deck my-3">
				<@module.card title="Pages' hits clustered by response time" >   
					<div class="chart chartjs stakedbarchart"
						    data-url="${contextName}/api/dashboard/data/series/clustered" 
						    data-query-clustered-measure='{ "measure": "duration:count", "thresholds": ["10","20","50","100","200","500","1000","2000"] }'
						    data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
						    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1h" }'
						    data-labels='{"duration:count<10":"<10ms","duration:count_20":"<20ms","duration:count_50":"<50ms","duration:count_100":"<100ms", "duration:count_200":"<200ms", "duration:count_500":"<500ms", "duration:count_1000":"<1s", "duration:count_2000":"<2s", "duration:count>2000":">2s"}'
						    data-colors='iRED2GREEN'></div>
				</@module.card>  
				<@module.card title="Pages' time repartition" >
					<div class="chart chartjs stakedbarchart" 
					    data-url="${contextName}/api/dashboard/data/series" 
					    data-query-measures='["sql_duration:mean", "search_duration:mean","redis_duration:mean", "inner_duration:mean"]'
					     data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
					    data-query-time-filter='{ "from": "-3d", "to": "now()", "dim": "1h"}'
						data-labels='{"sql_duration:mean":"SQL duration", "search_duration:mean":"Search duration","redis_duration:mean":"Redis duration", "inner_duration:mean":"Internal duration" }' 
					    data-colors='GREEN2BLUE'></div> 
				</@module.card>  
		</div>
		<div class="card-deck my-3" >
				<@module.card title="Most consumming Pages" >
					<div class="datatable"
						    data-url="${contextName}/api/dashboard/data/tabular/tops" 
						    data-query-measures='["duration:sum"]'
						   	 data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
						    data-query-time-filter='{ "from": "now() - 1w", "to": "now()"}'
						    data-query-group-by='name'
						   	data-query-max-rows='5' 
						    data-columns='[
						    { "label":"Webservices", "data":"name"},
						    { "label":"Total time", "data":"duration:sum", "format": "time:second"}]'
						    data-paging='false'></div>
				</@module.card> 
				<@module.card title="Slowest Pages" >    
						<div class="datatable"
						    data-url="${contextName}/api/dashboard/data/tabular/tops" 
						    data-query-measures='["duration:mean"]'
						   	 data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
						    data-query-time-filter='{ "from": "now() - 1w", "to": "now()"}'
						    data-query-group-by='name'
						   	data-query-max-rows='5' 
						    data-columns='[
						    { "label":"Webservice", "data":"name"},
						    { "label":"Mean Time", "data":"duration:mean", "format": "time:second"}]'
						    data-paging='false'></div> 
				</@module.card> 
				<@module.card title="Pages' Status" >
						<div class="chart chartjs doughnut"
						    data-url="${contextName}/api/dashboard/data/tabular" 
						    data-query-measures='["duration:count"]'
						     data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
						    data-query-time-filter='{ "from": "-3d", "to": "now()", "dim": "1w"}'
						    data-query-group-by='exception'
							data-labels='{"null":"OK"}' 
						    data-colors='iRED2GREEN'></div>   
				</@module.card> 
		</div>
		<div class="card-deck my-3" >
				<@module.card title="Database load by Webservice" >   
				<div class="chart chartjs bubbles"
					    data-url="${contextName}/api/dashboard/data/tabular" 
					    data-query-measures='["duration:count", "duration:mean", "sql_count:mean"]'
					    data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
					    data-query-time-filter='{ "from": "-3d", "to": "now()", "dim": "1w"}'
					    data-query-group-by='name'
						data-labels='{"duration:count":"Hits", "duration:mean":"Mean duration", "sql_count:mean":"SQL hits" }' 
						data-options='{"xAxisType":"auto", "yAxisType":"linear"}'
					    data-colors='GREEN2BLUE'></div> 		
				</@module.card>  
				<@module.card title="Sql Usage by Webserice" >    
						<div class="datatable"
						    data-url="${contextName}/api/dashboard/data/tabular" 
						    data-query-measures='["sql_count:mean","sql_count:max", "sql_duration:sum"]'
						   	data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
						    data-query-time-filter='{ "from": "now() - 1w", "to": "now()"}'
						    data-query-group-by='name'
						   	data-query-max-rows='5' 
						    data-columns='[
						    { "label":"WebService", "data":"name"},
						    { "label":"Sql Hits (Mean)", "data":"sql_count:mean", "format": "number"},
						    { "label":"Sql Hits (Max)", "data":"sql_count:max", "format": "number"},
						    { "label":"Overall time consumption", "data":"sql_duration:sum", "format": "time:second"}]'></div> 
				</@module.card> 
		</div>	
		<div class="row" >	
			<div class="col-6" >    
				<@module.card title="Pages' usage" >
					<div class="chart chartjs linechart" 
					    data-url="${contextName}/api/dashboard/data/series" 
					    data-query-measures='["duration:median", "duration:quantile__q_0.7", "duration:quantile__q_0.9"]'
					     data-query-data-filter='{ "measurement": "page", "filters": {"location": "*", "name": "*", "module": "*", "feature": "*" }}'
					    data-query-time-filter='{ "from": "-3d", "to": "now()", "dim": "1h"}'
						data-labels='{"duration:median":"Médiane", "duration:quantile__q_0.7":"Per70", "duration:quantile__q_0.9":"Per90" }' 
					    data-colors='iRED2GREEN'></div>   
				</@module.card>
			</div>
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
