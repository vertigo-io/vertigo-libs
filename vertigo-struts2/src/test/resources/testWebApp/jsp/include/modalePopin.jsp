<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="popin-overlay" style="display: none;"/></div>
<div id="popin" style="display: none;">
	<div class="modal-header">
		<input type="button" class="close fermer" value="x" title="Annuler"/>
		<h4>Demande de confirmation</h4>
	</div>
	<div class="modal-body"></div>
	<div class="modal-footer">
		<div class="button-bar">
			<input type="button" value="Annuler" class="bouton annuler fermer"/>		
			<div class="right">
				<input type="button" value="Confirmer" class="bouton confirmer valider"/>
			</div>
		</div>
	</div>
</div>
