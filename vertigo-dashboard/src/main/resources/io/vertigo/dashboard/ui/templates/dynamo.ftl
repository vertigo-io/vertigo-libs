<#import "page.ftl" as page>
<#import "module_macros.ftl" as module>

<@page.header/>

	<div class="card-deck px-3 pb-3 justify-content-around"">
		<@module.indicator title="Entities" icon="schedule" status='GREEN' metric=entityCount legend="entitie(s)" />
		<@module.indicator title="KeyConcept" icon="vertical_align_center" status='GREEN' metric=keyConceptCount legend="key concept(s)" />
	</div>


	<@module.standardPanel 'Entities' 'entity' >
		<@module.standardList>
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Name</th>
						<th>Count</th>
						<th>TaskCount</th>
						<th>Fields</th>
					</tr>
				</thead>
				<tbody>
				<#list entities as entity>
					<tr id="entityDetail-${entity.name}-list" data-toggle="list" href="#entityDetail-${entity.name}" role="tab"  >
						<th scope="row">${entity.name}</th>
						<td>${entity.count!'N/A'}</td>
						<td>${entity.taskCount!'N/A'}</td>
						<td>${entity.fieldCount!'N/A'}</td>
					</tr>
				</#list>
				</tbody>
			</table>
		</@module.standardList>
		<@module.standardDetail>
			<#list entities as entity>
				<@module.lineDetail  type='entity' name=entity.name >
					   <div class="graph-panel" 
					  		data-url="data/series" 
					  		data-query-measures='["value:median"]'
					  		data-query-data-filter='{"measurement":"metric","name":"entityCount", "topic":"${entity.name}" ,"location":"*","topic":"*"}'
					  		data-query-time-filter='{"from" : "now() - 1w", "to" : "now()", "dim" : "6m"}' >
					  	</div>
				</@module.lineDetail >
			</#list>
		</@module.standardDetail>
		 <div id="myStandAloneBarChart"
	  		data-url="data/tabular" 
	  		data-query-measures='["value:median"]'
	  		data-query-data-filter='{"measurement":"tasks","name":"*", "location":"*","topic":"*"}'
	  		data-query-time-filter='{"from" : "now() - 1d", "to" : "now()"}' 
	  		data-query-group-by='name' >
	  	</div>
	</@module.standardPanel>
	
	<@module.standardPanel 'Tasks' 'tasks' >
		<@module.standardList>
			<table class="table table-sm sortable">
				<thead>
					<tr>
						<th>Name</th>
						<th data-sortable="true">Hits</th>
						<th data-sortable="true">Mean duration</th>
					</tr>
				</thead>
				<tbody>
			<#list tasks as task>
				<tr id="taskDetail-${task.name}-list" data-toggle="list" href="#taskDetail-${task.name?replace("/", "_")}" role="tab" >
					<th scope="row">${task.name}</th>
					<td>${task.executionCount!'N/A'}</td>
					<td>${task.medianDuration!'N/A'}</td>
				</tr>
			</#list>
				</tbody>
			</table>
		</@module.standardList>
		<@module.standardDetail>
			<#list tasks as task>
				<@module.lineDetail  type='task' name=task.name?replace("/", "_") >
					   <div class="graph-panel" 
					  		data-url="/data/series" 
					  		data-query-measures='["duration:median","duration:max"]'
					  		data-query-data-filter='{"measurement":"tasks","name":"${task.name}","location":"*","topic":"*"}'
					  		data-query-time-filter='{"from" : "now() - 1d", "to" : "now()", "dim" : "6m"}' >
					  	</div>
				</@module.lineDetail >
			</#list>
		</@module.standardDetail>
	</@module.standardPanel>
	
	
	<@module.standardPanel 'Domains' 'domain' >
		<@module.standardList>
			<table class="table table-sm">
				<thead>
					<tr>
						<th>Name</th>
						<th>taskCount</th>
						<th>dtDefinitionCount</th>
					</tr>
				</thead>
				<tbody>
			<#list domains as domain>
				<tr id="domainDetail-${domain.name}-list" data-toggle="list" href="#domainDetail-${domain.name}" role="tab" class="${(domain.orphan)?then('table-danger', '')}">
					<th scope="row">${domain.name}</th>
					<td>${domain.taskCount!'N/A'}</td>
					<td>${domain.dtDefinitionCount!'N/A'}</td>
				</tr>
			</#list>
				</tbody>
			</table>
		</@module.standardList>
		<@module.standardDetail>
			<#list domains as domain>
				<@module.lineDetail  type='domain' name=domain.name >
					<@module.formGroup>
					 	<@module.property 'Used by ' domain.taskCount!'N/A'+' tasks' />
					 	<@module.property 'Used by' domain.dtDefinitionCount!'N/A'+' DtDefinitions' />
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
