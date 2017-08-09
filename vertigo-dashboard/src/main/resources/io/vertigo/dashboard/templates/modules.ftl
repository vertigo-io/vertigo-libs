<#import "page.ftl" as page>

<@page.header/>
	<div class="row" >
		<#list modules as module>
			<div class="card" style="width: 20rem;">
			  <div class="card-block">
			    <h4 class="card-title">${module}</h4>
			    <p class="card-text">an abstract of the module</p>
			    <a href="modules/${module}" class="btn btn-primary">Go to detail</a>
			  </div>
			</div>
		</#list>
	</div>
<@page.footer/>	

