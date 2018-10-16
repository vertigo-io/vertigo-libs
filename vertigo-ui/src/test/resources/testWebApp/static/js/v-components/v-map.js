Vue.component('v-map', {
	template : '<div id="map" style="width:100%; height:50vh"></div>',
	props : {
		list : Array
	},
	mounted : function() {
		digitalFactory = {lat : 2.239230, lon: 48.773744 };
		issy = {lat : 2.280263, lon: 48.827317 };
		imt = {lat : -4.570026, lon: 48.357621 };
		myList = [digitalFactory, issy, imt];
		var view = new ol.View();

		var styleIcon = new ol.style.Style({
			text : new ol.style.Text({
				font : "45px Material Icons",
				text : "place",
				fill : new ol.style.Fill({color : "#027BE3" })
			})
		});

		features = myList.map(function(object) {
			var iconFeature = new ol.Feature({
				geometry : new ol.geom.Point(ol.proj.fromLonLat([ object.lat, object.lon ])),
				name : 'Klee Digital Factory',
			});
			
			iconFeature.setStyle(styleIcon);
			return iconFeature
		});

		var vectorSource = new ol.source.Vector({
			features : features
		});

		var vectorLayer = new ol.layer.Vector({
			source : vectorSource
		});
		
		view.fit(vectorLayer.getSource().getExtent());

		var osmLayer = new ol.layer.Tile({
			preload : 4,
			source : new ol.source.OSM()
		})
		var map = new ol.Map({
			target : 'map',
			layers : [ osmLayer, vectorLayer ],
			// Improve user experience by loading tiles while animating. Will
			// make
			// animations stutter on mobile or slow devices.
			loadTilesWhileAnimating : true,
			view : view
		});
	}
})
