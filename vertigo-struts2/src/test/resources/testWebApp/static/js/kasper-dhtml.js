$(document).ready(function() {
	$(".nopaste").attr("autocomplete", "off");
	$(".nopaste").on("paste", false);
});

function toggleDisplay(checkboxElement, elementId) {
	if(checkboxElement.checked) {
		$("#"+elementId).removeClass("displaynone");
	} else {
		$("#"+elementId).addClass("displaynone");
	}
}

function toggleDisplayInverse(checkboxElement, elementId) {
	if(checkboxElement.checked) {
		$("#"+elementId).addClass("displaynone");
	} else {
		$("#"+elementId).removeClass("displaynone");
	}
}