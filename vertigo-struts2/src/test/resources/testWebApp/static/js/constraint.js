function renderTag(check, targetTagId) { 
	var elem = document.getElementById(targetTagId);
	var hasErrorLast = elem.className.indexOf(' error')==(elem.className.length-6);
	var hasErrorFirst = elem.className.indexOf('error ')==0;
	if (check && hasErrorLast) {
		elem.className = elem.className.substring(0, elem.className.indexOf(' error'));
	} else if (check && hasErrorFirst) {
		elem.className = elem.className.substring(6);
	} else if(!check && !hasErrorLast && !hasErrorFirst) {
		elem.className = elem.className + ' error';	
	}
	return check;
}

function checkNotNull(tag) {
	if ((tag.value==null) || (tag.value.length==0)) {
		return false;
	} else {
		return true;
	} 
}

function  checkStringLength(tag, maxLength) {
	if (tag.value.length> maxLength) {
		return false;
	} else {
		return true;
	} 
}

function checkTypeInteger(tag) {
	if (tag.value != null && tag.value.length != 0) {
		// contrôle si la valeur d'un champ est un nombre conforme
		var svalue = tag.value;
		svalue = svalue.replace(" ", "");
		var re = new RegExp("[0-9]{1,9}");
		return tag.value.match(re);
	} else {
		return true;
	}
}

function  checkRegex(tag, regex) {
	var re = new RegExp(regex);
	if (tag.value != null) {
		return tag.value.match(re);
	} else {
		return false;
	} 
}


