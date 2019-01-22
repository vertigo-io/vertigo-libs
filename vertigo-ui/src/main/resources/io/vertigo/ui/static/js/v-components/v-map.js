Vue.component('v-map', {
	template : '<div :id="id" ></div>',
	props : {
		id: { type: String, required: true},
		list : { type: Array, required: true },
		field: { type: String, required: true},
		markerColor : { type: String, 'default': "#000000" },
		markerFont : { type: String, 'default': "Material Icons" },
		markerIcon : { type: String, 'default': "place" },
		markerSize : { type: String, 'default': "45px" }
	},
	mounted : function() {
		var view = new ol.View();

		var styleIcon = new ol.style.Style({
			text : new ol.style.Text({
				font : this.$props.markerSize +' ' + this.$props.markerFont,
				text : this.$props.markerIcon,
				fill : new ol.style.Fill({color : this.$props.markerColor })
			})
		});

		var geoField = this.$props.field;
		features = this.$props.list.map(function(object) {
			var geoObject;
			if (typeof object[geoField] === 'string' || object[geoField] instanceof String){
				geoObject = JSON.parse(object[geoField]);
			} else {
				geoObject = object[geoField];
			}
			var iconFeature = new ol.Feature({
				geometry : new ol.geom.Point(ol.proj.fromLonLat([ geoObject.lon, geoObject.lat ])),
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
		
		var osmLayer = new ol.layer.Tile({
			preload : 4,
			source : new ol.source.OSM()
		})
		var map = new ol.Map({
			interactions: ol.interaction.defaults({
	          onFocusOnly: true
	        }),
			target : this.$props.id,
			layers : [ osmLayer, vectorLayer ],
			// Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
			loadTilesWhileAnimating : true,
			view : view
		});
		
		map.getView().fit(vectorLayer.getSource().getExtent(), map.getSize());
		

	}
})
