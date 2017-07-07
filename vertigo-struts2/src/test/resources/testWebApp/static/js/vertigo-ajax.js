/*******************************************************************************
 * Methodes utilisées pour les appels AJAX
 ******************************************************************************/

jQuery(document).ready(function () {
	//Traitement des fragments Ajax : ajout de la liste des targets pour filtrage coté serveur 
	jQuery.subscribe('form-pre-serialize', function(event, data, ajaxRequest) {
		ajaxRequest.headers = { 'x-request-target': ajaxRequest.target }
	});
	
	//On post les requetes ajax pour pouvoir récupérer le context
	jQuery.ajaxSetup({type: "POST"}); 
	
	//On ajoute un comportement commun pour le traitement des erreurs
	jQuery(document).ajaxError(function(event, jqxhr, settings, exception) {
		if(exception != 'abort') {
			//alert("Erreur Ajax:\n"+exception);
			console.error(exception);
			document.write(jqxhr.responseText);
		}
	});
});

// Traitement ajax en cas d'erreur
// récupére la response ajax, la découpe et envoie le flux au navigateur
/*
 * var handleFailure = function(o) { var message = "<h1>Connection error...</h1>";
 * if(o.responseText !== undefined){ message = o.responseText; baliseBody = new
 * String(message.match(regexBaliseBody)).split(",")[0]; var messageBody =
 * message.split(baliseBody); if(messageBody[1]) { message = ""; linkCssIndex =
 * messageBody[0].indexOf("<link"); while(linkCssIndex > 0) { linkCssEndIndex =
 * messageBody[0].indexOf("/>", linkCssIndex) +3; linkCss =
 * messageBody[0].substring(linkCssIndex, linkCssEndIndex); //alert(linkCss);
 * message = message + linkCss + "\n"; linkCssIndex = messageBody[0].indexOf("<link",
 * linkCssEndIndex); } styleIndex = messageBody[0].indexOf("<style>");
 * while(styleIndex > 0) { styleEndIndex = messageBody[0].indexOf("</style>",
 * styleIndex) + 8; styleBody = messageBody[0].substring(styleIndex ,
 * styleEndIndex); //alert(styleBody); message = message + styleBody + "\n";
 * styleIndex = messageBody[0].indexOf("<style>", styleEndIndex); } message =
 * message + messageBody[1].split("</body>")[0]; //alert(message); } } message = "<div
 * class=\"errorPanelAjax\">"+message+"</div>";
 *  // Initialize the temporary Panel to display while waiting for external
 * content to load errorPanel = new YAHOO.widget.Panel("ajaxError",
 * {width:"790px", fixedcenter:true, close:true, draggable:true, zIndex:4,
 * modal:true, visible:false }); errorPanel.setHeader("Application error... ");
 * errorPanel.setBody(message); evalJavascript(message);
 * errorPanel.render(document.body); errorPanel.show();
 * 
 * var closeHandler = function ( oSelf ) { errorPanel.destroy(); };
 * errorPanel.hideEvent.subscribe(closeHandler); }
 */

/*
var regexBaliseIdenditiant = /<(tr|td|div|span|form|select)( [a-zA-Z]*=\"[0-9a-zA-Z-_]*\" *)*( id=\"[0-9a-zA-Z-_]*\"){1}( [a-zA-Z]*=\"[0-9a-zA-Z-_]*\" *)*( )*>/;
var regexIdentifiantBalise = /id="[0-9a-zA-Z-_]*"/;
var regexTypeBalise = /(div|span|td|tr|form|select)/;
var regexBaliseBody = /(<body[0-9a-zA-Z-_=\" ]*>)/;


// traitement ajax en cas de succes
// récupère la response ajax, la découpe et envoie le flux au navigateur
var handleSuccess = function(data, textStatus, jqXHR) {
	alert("handleSuccess");
	//alert(jqXHR.responseText);
	if (jqXHR.responseText != undefined) {
		if(jqXHR.responseText == "<emptyAjaxResponse/>") {
				return;
		}
		var tabReponse = jqXHR.responseText.split("<htmlUpdate>");
		if (tabReponse.length > 1) {// > 1 pour etre sur que c'est bien une
									// réponse Ajax et pas une page d'erreur
			errorDiv = $('.ajaxError');
			if (errorDiv != undefined) {
				errorDiv.html("");
			}
			for ( var i = 0; i < tabReponse.length; i++) {
				if(tabReponse[i].indexOf("</htmlUpdate>") > 1) {
					tabReponse[i] = tabReponse[i].substring(0, tabReponse[i].indexOf("</htmlUpdate>"));
				}
				if (tabReponse[i].length > 1) {
					//alert(tabReponse[i]);
					//alert(getResponseId(tabReponse[i]));
					div = $(getResponseId(tabReponse[i]));
					// alert(div);
					if (div != undefined) {
						var content = getResponseContent(tabReponse[i]);
						//alert("newContent:"+ content);
						//alert("oldContent:"+ $('#selectedDevRpps',document.body).html());
						div.html(content);
					} else {
						//alert('eval Script');
						evalJavascript(tabReponse[i]);
					}
				}
			}
		} else {
			handleError(jqXHR, textStatus, "Invalid content\nMissing <htmlUpdate></htmlUpdate>");
		}
	}
};

var handleError = function(jqXHR, textStatus, errorThrown) {
	//alert("Erreur Ajax:\n"+errorThrown);
	//alert("handleError");alert(jqXHR.responseText);alert(textStatus);
	document.write(jqXHR.responseText);
};


function evalJavascript(content) {
	var patt1 = new RegExp("<script>", "i");
	var patt2 = new RegExp("</script>", "i");
	var tabContent = content.split(patt1);
	// alert(tabContent[1]);
	// alert(tabContent[1]);
	// alert('length tableau split : '+ tabContent.length);
	if (tabContent.length > 0) {
		for ( var i = 0; i < tabContent.length; i++) {
			if (patt2.test(tabContent[i])) {
				var scriptToExecute = tabContent[i].split(patt2);
				eval(scriptToExecute[0]);
			}
		}
	}
}

// Recupération de l'identifiant de l'element à mettre à jour
// avec le contenu emis par le serveur aprés appel AJAX
function getResponseId(content) {
	if (content == null || content == "") {
		return;
	}
	// on récupére la balise identifiant le contenu ajax
	baliseIdentifiant = new String(content.match(regexBaliseIdenditiant)).split(",")[0];
	// on récupére l'identifiant
	identifiant = null;
	if (baliseIdentifiant != null) {
		identifiant = new String(baliseIdentifiant.match(regexIdentifiantBalise));
		// on supprime l'identifiant "id="
		identifiant = identifiant.substring(4, (identifiant.length) - 1);
	}
	return "#" + identifiant;
}

// Recupération du contenu emis par le serveur aprés appel AJAX
function getResponseContent(content) {

	// on récupére la balise identifiant le contenu ajax
	baliseIdentifiant = new String(content.match(regexBaliseIdenditiant)).split(",")[0];

	// on récupére le type de balise (ex: "div", "span", "tr", ...)
	typeBalise = new String(baliseIdentifiant.match(regexTypeBalise)).split(",")[0];

	// on retire les balise identifiant le contenu ajax é remplacer
	var ret = content.substring(baliseIdentifiant.length, content.length - typeBalise.length - 3);

	return ret;
}
*/
/**
 * Met l'object en attente de réponse AJAX.
 */
function putInWait(element, srcImageWait) {
	element.innerHTML = "<div style='margin-top:50px;text-align:center;'><img src='"+ srcImageWait + "'></div>";
}
