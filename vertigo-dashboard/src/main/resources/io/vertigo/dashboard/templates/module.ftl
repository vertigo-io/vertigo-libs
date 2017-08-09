<#import "page.ftl" as page>

<@page.header/>
	<div class="row" >
		<#list healthchecksByTopic?keys as topic>
			<div class="card" style="width: 20rem;">
			  <div class="card-block">
			    <h4 class="card-title">${topic}</h4>
			    <#list healthchecksByTopic[topic] as healthcheck>
					<p>${healthcheck.name} : ${healthcheck.measure.status}</p>
				</#list>
			  </div>
			</div>
			
		</#list>
	</div>
<@page.footer/>	

