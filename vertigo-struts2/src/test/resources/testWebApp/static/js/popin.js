jQuery.fn.center = function () {
    this.css("position", "absolute");    
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

function showModal(modalId) {
	$(modalId + " .fermer").click(function() {
		$("#popin-overlay").hide();
		$(modalId).hide();		
	});
	
	$("#popin-overlay").show();
	$(modalId).center();
	$(modalId).show();
}

function confirmPopin(message) {
	currentElement = window.event;
	currentElement = currentElement.target || currentElement.srcElement;
    return confirmAction(currentElement, message);
}

var isConfirmed = false;		
function confirmAction(action, message) {
	
	if (isConfirmed) {
		isConfirmed = false;
		return true;
	}	
	
	$("#popin .valider").click(function() {
		isConfirmed = true;
		$("#popin").removeClass("confirm");
		$("#popin").hide();
		$(action).click();
	});
	$("#popin .fermer").click(function() {
		isConfirmed = false;
		$("#popin-overlay").hide();
		$("#popin").removeClass("confirm");
		$("#popin").hide();		
	});
	
	$("#popin").addClass("confirm");
	$("#popin .modal-body").text(message);	
	$("#popin").center();	
	$("#popin-overlay").show();
	$("#popin").show();
	
	return false;
}