<#import "page.ftl" as page>

<@page.header/>
	<div class="row">
		<h1>${moduleName}</h1>
	</div>
	<div class="row" >
		<#list healthchecksByTopic?keys as topic>
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
							<button type="button" class="btn btn-secondary float-right" data-toggle="popover" title="Detail 2"  data-html="true"  data-content="
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
	<script>
		$(function () {
		  $('[data-toggle="popover"]').popover(
		 	 {
			  trigger: 'hover'
			})
		})
	</script>
<@page.footer/>	

