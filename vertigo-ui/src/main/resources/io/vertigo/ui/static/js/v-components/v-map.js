Vue.component('v-map', {
	template : '<div :id="id" ></div>',
	props : {
		id: String,
		list : Array,
		color : String,
	},
	mounted : function() {
		var view = new ol.View();

		var styleIcon = new ol.style.Style({
			text : new ol.style.Text({
				font : "45px Material Icons",
				text : "place",
				fill : new ol.style.Fill({color : this.$props.color })
			})
		});

		features = this.$props.list.map(function(object) {
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
			target : this.$props.id,
			layers : [ osmLayer, vectorLayer ],
			// Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
			loadTilesWhileAnimating : true,
			view : view
		});
	}
})
