<#macro indicator title icon status metric legend >
<div class="card topic-abstract">
	<div class="card-header font-weight-bold text-light bg-<@classByStatus status/>">
	    <span>${title}</span>
	    <i class="material-icons float-right">${icon}</i>
	 </div>
	 <div class="card-body text-center">
	 	<span class="indicator">${metric}</span><span> ${legend}</span>
	 </div>
</div> 
</#macro>


<#macro health>
	<div class="row" >
		<#list topics as topic>
			<div class="card" style="width: 20rem;">
			  <div class="card-block">
			    <h4 class="card-title">${topic}</h4>
			    <ul class="list-group">
			    <#list healthchecksByTopic[topic] as healthcheck>
					<li class="list-group-item list-group-item-<#switch healthcheck.measure.status >
							<#case 'GREEN'>success<#break>
							<#case 'YELLOW'>warning<#break>
							<#case 'RED'>danger<#break>
							<#default>
						</#switch>" >
						<div class="container" >
							<span>${healthcheck.name}</span>
							<button type="button" class="btn btn-secondary float-right" data-toggle="popover"  data-html="true"  data-content="
														<ul>
															<li>checkedBy : ${healthcheck.checker}</li>
															<li>at : ${healthcheck.checkInstant}</li>
														</ul>">Detail</button>
						</div>
					</li>
				</#list>
				</ul>
			  </div>
			</div>
		</#list>
	</div>
</#macro>


<#macro standardPanel title topic>
<div class="card mx-3 mb-3">
	<div class="card-header">
		${title}
		<@healthByTopic topic />
	</div>
	<div class="card-body">
		<div class="row">
		<#nested>
		</div>
	</div>
</div>
</#macro>

<#macro standardList>
<div class="col-4">
	<div class="list-group" id="list-tab" role="tablist">
		<#nested>
	</div>
</div>
</#macro>

<#macro standardDetail>
<div class="col-8">
	<div class="tab-content" id="nav-tabContent">
		<#nested>
	</div>
</div>
</#macro>




<#macro healthByTopic topic >
	<#if healthchecksByTopic[topic]?? >
		<#list healthchecksByTopic[topic] as healthCheck>
			<span class="badge badge-<#switch healthCheck.measure.status >
						<#case 'GREEN'>success<#break>
						<#case 'YELLOW'>warning<#break>
						<#case 'RED'>danger<#break>
						<#default>
					</#switch>" >${healthCheck.name}</span>
		</#list>
	</#if>
</#macro>

<#macro classByStatus status >
<#switch status >
	<#case 'GREEN'>success<#break>
	<#case 'YELLOW'>warning<#break>
	<#case 'RED'>danger<#break>
	<#default>
</#switch>
</#macro>

<#macro line type name active=''>
	<a class="list-group-item list-group-item-action" id="${type}Detail-${name}-list" data-toggle="list" href="#${type}Detail-${name}" role="tab">
		<span>${name}</span>
		<#if active?has_content>
		<i class="material-icons float-right">
			<#if active>
				done
			<#else> 
				error
			</#if>
		</i>
		</#if>
	</a>
</#macro>

<#macro lineDetail type name>
<div class="tab-pane fade" id="${type}Detail-${name}" role="tabpanel">
<#nested>
</div>
</#macro>

<#macro property label value=''>
<label class="col-sm-2 col-form-label">${label}</label>
<div class="col-sm-10">
  <p class="form-control-plaintext  font-weight-bold">${value}</p>
</div>
</#macro>

<#macro formGroup>
<div class="form-group row">
<#nested>
</div>
</#macro>