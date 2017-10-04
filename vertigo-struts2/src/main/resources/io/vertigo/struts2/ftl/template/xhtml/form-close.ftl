<#--
/*
 * $Id: form-close.ftl,v 1.2 2014/01/15 15:32:30 npiedeloup Exp $
 *
 */
-->
<@s.hidden name="CTX" value="%{CTX}"/>

<#include "/${parameters.templateDir}/simple/form-close.ftl" />
<#-- no form-close : form isn't a control. table are include by s:div layout=table -->
<#-- no form-validation-close : form's validations are server side only (for security purpose) -->
<#if parameters.focusElement??>
<script type="text/javascript">
    StrutsUtils.addOnLoad(function() {
        var element = document.getElementById("${parameters.focusElement?html}");
        if(element) {
            element.focus();
        }
    });
</script>
</#if>
