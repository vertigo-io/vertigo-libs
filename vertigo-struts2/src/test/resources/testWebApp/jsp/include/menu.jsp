<%@ taglib prefix="s" uri="/struts-tags"%>

<div id="menu">
	<ul>	
	<s:iterator value="menuItems" var="menu">
		<s:if test="#menu.viewMenu()">
		<li>
		<span class="menu">
			<s:if test="#menu.isAddressEmpty()">
				<s:property value="#menu.getLabel()"/>
			</s:if>
			<s:else>
				<s:set var="address" value="#menu.getAddress()"/>
				<s:a href="%{address}"><s:property value="#menu.getLabel()"/></s:a>
			</s:else>
		</span>
		
		<s:if test="#menu.hasChildren()">
			<ul class="subMenu">
			<s:iterator var="subMenu" value="#menu.getSubItems()">
				<s:if test="#subMenu.isAddressEmpty()==false">
					<li class="nowrap">
					<s:set var="address" value="#subMenu.getAddress()"/>
					<s:a href="%{address}"><s:property value="#subMenu.getLabel()"/></s:a>
					</li>
				</s:if>
			</s:iterator>
			</ul>
		</s:if>
		</li>
		</s:if> 
	</s:iterator>
	</ul>
</div><!-- Fin menu principal -->