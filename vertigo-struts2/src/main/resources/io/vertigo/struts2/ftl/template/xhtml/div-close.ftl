<#--
/*
 * $Id: div-close.ftl,v 1.4 2014/03/18 10:52:48 npiedeloup Exp $
 *
 */
-->
<#if parameters.dynamicAttributes['layout']??>
    <#if parameters.dynamicAttributes['layout'] = "table" > 
    <#assign columnCount = controlLayout_currentColumnCount />	
	<#assign tablecolspan = controlLayout_tablecolspan />	
	<#if (columnCount > 0 && columnCount < tablecolspan) >
		<td colspan="${tablecolspan-columnCount}">&nbsp;</td>
		</tr><#-- Write out the closing tr. -->		
	</#if>
	 </table><#lt/>
    <#else>
    <#-- none -->
    </#if>
<#else>
</div>
</#if>
<#include "/${parameters.templateDir}/xhtml/popLayoutType.ftl" />
<#if currentLayout = 'table'>
    </td><#lt/>
    <#-- Write out the closing td for the html input -->
    <#include "/${parameters.templateDir}/xhtml/controlfooter-trlogic.ftl" />
</#if>