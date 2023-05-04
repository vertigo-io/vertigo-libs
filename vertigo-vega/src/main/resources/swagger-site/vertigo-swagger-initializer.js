function HideTopbarPlugin() {
	  // this plugin overrides the Topbar component to return nothing
	  return {
	    components: {
	      Topbar: function() { return null }
	    }
	  }
	}

	
window.onload = function() {
  // Begin Swagger UI call region	
  var url = window.location.search.match(/url=([^&]+)/);
    if (url && url.length > 1) {
      url = decodeURIComponent(url[1]);
    } else {
      url = "../swaggerApi";
    }
  // Build a system
  const ui = SwaggerUIBundle({
    url: url,
    dom_id: '#swagger-ui',
    deepLinking: true,
	validatorUrl: null,
	docExpansion: 'none',
	// sort apis by tag (className)
	operationsSorter:  'alpha',
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl,
      HideTopbarPlugin
    ],
    layout: "StandaloneLayout"
  });
  // End Swagger UI call region

  window.ui = ui;
};
