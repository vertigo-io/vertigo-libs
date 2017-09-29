<#import "page.ftl" as page>
<#import "module_macros.ftl" as module>

<@page.header/>

	<div class="card-deck px-3 pb-3 justify-content-around"">
	</div>
	
	<div>
		<div class="chart flotchart linechart" style="width:90%;height:400px"
			    data-url="data/series" 
			    data-query-measures='["duration:min", "duration:mean", "duration:percentile_80"]'
			    data-query-data-filter='{"measurement": "webservices", "location": "*","name": "*","topic": "*" }'
			    data-query-time-filter='{ "from": "now() - 3d", "to": "now()", "dim": "1h"}'
				data-labels='{"duration:min":"Minimum", "duration:mean":"Moyenne", "duration:percentile_80":"Per80" }' 
			    data-colors='GREEN2BLUE'></div>   
			    
		<div class="chart flotchart stakedareachart"  style="width:90%;height:400px"
			    data-url="data/series/clustered" 
			    data-query-clustered-measure='{ "measure": "duration:count", "thresholds": ["10","20","50","100","200","500","1000","2000"] }'
			    data-query-data-filter='{ "measurement": "webservices", "location": "*", "name": "*", "topic": "*" }'
			    data-query-time-filter='{ "from": "now() - 5d", "to": "now()-3d", "dim": "1h" }'
			    data-labels='{"duration:count<10":"<10ms","duration:count_20":"<20ms","duration:count_50":"<50ms","duration:count_100":"<100ms", "duration:count_200":"<200ms", "duration:count_500":"<500ms", "duration:count_1000":"<1s", "duration:count_2000":"<2s", "duration:count>2000":">2s"}'
			    data-colors='iRED2GREEN'></div>
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
