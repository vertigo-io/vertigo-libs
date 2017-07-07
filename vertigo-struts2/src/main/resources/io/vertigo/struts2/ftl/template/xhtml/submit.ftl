<#--
/*
 * $Id: submit.ftl,v 1.1 2013/09/23 16:25:43 npiedeloup Exp $
 *
 */
-->
<#assign currentLayout = controlLayout_type?default('none') />	
<#assign submitcolspan = parameters.dynamicAttributes['submitcolspan']?default(1)?number />	
<#if currentLayout = 'table'>
	<#include "/${parameters.templateDir}/${parameters.expandTheme}/controlheader-trlogic.ftl" />
			<td <#rt/>
	<#if parameters.dynamicAttributes['submitcolspan']??><#t/>
	    colspan="${submitcolspan}" <#t/>	    
	<#t/></#if>
	<#if parameters.align??><#t/>
	    align="${parameters.align?html}"<#t/>
	<#t/></#if>
	><#t/>
	<#if controlLayout_tablecolspan?exists >
    	<#assign columnCount = controlLayout_currentColumnCount + submitcolspan?default(1) />	
		<#-- update the value of the controlLayout_currentColumnCount bean on the value stack. -->
		${stack.setValue('#controlLayout_currentColumnCount', columnCount)}<#t/>
	</#if>
</#if>
<#include "/${parameters.templateDir}/simple/submit.ftl" />