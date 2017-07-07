/**
 * Script Javascript de gestion du focus.
 * 
 * @author Christophe Godard
 * @version : $Id: focus.js,v 1.2 2013/09/27 15:47:28 npiedeloup Exp $
 */

/* Fonction d'ajout d'évenement sur un objet de la page */
function addEvent(obj, evType, fn, useCapture){
	if (obj.addEventListener){
		obj.addEventListener(evType, fn, useCapture);
		return true;
	} else if (obj.attachEvent){
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} else {
		alert("La fonction " + fn + " ne peux pas être rattachée à l'évènement on" + evType + " sur l'objet " + obj);
	}
}

/* Initialisation du focus sur un élément par défaut du formulaire de la page */
function initFocus() {
	if(document.forms.length>=1) {
		var form = document.forms[0];
		if(form != null) {
			var elements = form.elements;
			var items;
			var itemType;
			
			// Focus sur le premier champ saisissable
			for (i = 0; i < elements.length; i++) {		
				if (elements[i].tagName == 'INPUT') {
					items = elements[i];
					itemType = items.type;
					if (itemType == 'text') {
						//alert(elements[i].name);
						elements[i].focus();
						return true;
					}
				}
				if (elements[i].tagName == 'SELECT') {
					//alert(elements[i].name);
					elements[i].focus();
					return true;
				}
				if (elements[i].tagName == 'TEXTAREA') {
					//alert(elements[i].name);
					elements[i].focus();
					return true;
				}		
			}
			return true;
		}
		else {
			return true;
		}
	}
	else {
		return true;
	}
}
