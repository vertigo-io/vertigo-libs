<#import "page.ftl" as page>
<#import "module_macros.ftl" as module>

<@page.header/>
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
					 	<@module.property 'Period' daemon.periodInSeconds?string.computer+' seconds' />
					  </@module.formGroup>
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
					 	<@module.property 'Time To Live Idle' cache.ttlIdle?string.computer+' seconds' />
					 	<@module.property 'Time To Live' cache.ttl?string.computer+' seconds' />
					 	<@module.property 'Max elements' cache.maxElements?string.computer />
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
