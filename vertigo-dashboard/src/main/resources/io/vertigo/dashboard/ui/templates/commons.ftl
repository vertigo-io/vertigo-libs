<#import "page.ftl" as page>
<#import "module_macros.ftl" as module>

<@page.header/>

	<div class="card-deck px-3 pb-3 justify-content-around"">
		<@module.indicator title="Daemons" icon="schedule" status=daemonsStatus metric=daemons.size() legend="daemon(s)" />
		<@module.indicator title="EventBus" icon="vertical_align_center" status=eventsStatus metric=eventSubcriptionsCount legend="subscription(s)" />
		<@module.indicator title="Cache" icon="cached" status=cacheStatus metric=caches.size() legend="cache(s)" />
	</div>


	<@module.standardPanel 'Daemons' 'daemons' >
		<@module.standardList>
			<#list daemons as daemon>
				<@module.line type='daemons' name=daemon.name active=daemon.lastExecSuccess />
			</#list>
		</@module.standardList>
		<@module.standardDetail>
			<#list daemons as daemon>
				<@module.lineDetail  type='daemons' name=daemon.name >
					<@module.formGroup>
					 	<@module.property 'Period' daemon.periodInSeconds+' seconds' />
					  </@module.formGroup>
					   <div class="graph-panel" 
					  		data-url="/dashboard/data/series" 
					  		data-query-data-filter='{"measurement":"daemon","name":"${daemon.name}","location":"*","measures":["duration:median","duration:percentile_90","duration:max"]}'
					  		data-query-time-filter='{"from" : "now() - 1d", "to" : "now()", "dim" : "6m"}' >
					  	</div>
				</@module.lineDetail >
			</#list>
		</@module.standardDetail>
	</@module.standardPanel>
	
	<@module.standardPanel 'Events' 'eventBus' >
		<@module.standardList>
			<#list events as event>
				<@module.line type='eventBus' name=event.name active=!event.deadEvent />
			</#list>
		</@module.standardList>
		<@module.standardDetail>
			<#list events as event>
				<@module.lineDetail  type='eventBus' name=event.name >
					<span>Subscribers</span>
					<ul class="list-group">
					<#list event.subscribers as subscriber>
						<li class="list-group-item">${subscriber}</li>
					</#list>
					</ul>
				</@module.lineDetail >
			</#list>
		</@module.standardDetail>
	</@module.standardPanel>
	
	<@module.standardPanel 'Cache' 'cache' >
		<@module.standardList>
			<#list caches as cache>
				<@module.line type='cache' name=cache.name />
			</#list>
		</@module.standardList>
		<@module.standardDetail>
			<#list caches as cache>
				<@module.lineDetail  type='cache' name=cache.name >
					 <@module.formGroup>
					 	<@module.property 'Time To Live Idle' cache.ttlIdle+' seconds' />
					 	<@module.property 'Time To Live' cache.ttl+' seconds' />
					 	<@module.property 'Max elements' cache.maxElements />
					  </@module.formGroup>
				</@module.lineDetail >
			</#list>
		</@module.standardDetail>
	</@module.standardPanel>
         
          
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
