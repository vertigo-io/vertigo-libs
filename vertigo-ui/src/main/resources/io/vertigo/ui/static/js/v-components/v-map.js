Vue.component('v-map', {
	template : '<div :id="id" >'
+'					<div id="popup">'
+'						<q-card  v-if="popupDisplayed" class="q-px-md">'
+'							<div class="text-subtitle2">{{popupTitle}}</div>'
+'						</q-card>'
+'					</div>'			
+'				</div>'
,
	props : {
		id: { type: String, required: true},
		list : { type: Array },
		baseUrl : { type: String },
		field: { type: String, required: true},
		nameField: { type: String},
		zoomLevel : { type: Number},
		markerColor : { type: String, 'default': "#000000" },
		markerFont : { type: String, 'default': "Material Icons" },
		markerIcon : { type: String, 'default': "place" },
		markerSize : { type: Number, 'default': 45 }
	},
	data : function () {
		return {
			popupDisplayed : false,
			popupTitle: '',
			items: [],
			olMap: {}
		}
	},
	computed : {
		features: function() {
			var geoField = this.$props.field;
			var styleIcon = new ol.style.Style({
				text : new ol.style.Text({
					font : this.$props.markerSize +'px ' + this.$props.markerFont,
					text : this.$props.markerIcon,
					fill : new ol.style.Fill({color : this.$props.markerColor }),
					offsetY : -this.$props.markerSize/2
				})
			});
			var arrayOfFeatures = this.$data.items.map(function(object) {
				var geoObject;
				if (typeof object[geoField] === 'string' || object[geoField] instanceof String){
					geoObject = JSON.parse(object[geoField]);
				} else {
					geoObject = object[geoField];
				}
				var iconFeature = new ol.Feature({
					geometry : new ol.geom.Point(ol.proj.fromLonLat([ geoObject.lon, geoObject.lat ])),
				});
				
				if (this.$props.nameField) {
					iconFeature.set('name', object[this.$props.nameField]);
				}
				
				iconFeature.setStyle(styleIcon);
				return iconFeature
			}.bind(this));
			return arrayOfFeatures;
		}
	},
	methods : {
		fetchList: function(topLeft, bottomRight) {
	        this.$http.get(this.baseUrl+'bases/_geoSearch?topLeft="'+ topLeft.lat+','+topLeft.lon+'"&bottomRight="'+ bottomRight.lat+','+bottomRight.lon+ '"', { timeout:5*1000, })
	        .then( function (response) { //Ok
	        	this.$data.items = response.body;
	        	this.olMap.getLayers().getArray()[1].getSource().clear();
	        	this.olMap.getLayers().getArray()[1].getSource().addFeatures(this.features);
			});
	    }
		
	},
	mounted : function() {
		this.$data.items = this.$props.list ? this.$props.list : [];		
		var view = new ol.View();

		var vectorSource = new ol.source.Vector({
			features : this.features
		});

		var vectorLayer = new ol.layer.Vector({
			source : vectorSource
		});
		
		var osmLayer = new ol.layer.Tile({
			preload : 4,
			source : new ol.source.OSM()
		})
		this.olMap = new ol.Map({
			interactions: ol.interaction.defaults({
	          onFocusOnly: true
	        }),
			target : this.$props.id,
			layers : [ osmLayer, vectorLayer ],
			// Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
			loadTilesWhileAnimating : true,
			view : view
		});
		
		// fit view
		if (this.features.length > 0) {
			this.olMap.getView().fit(vectorLayer.getSource().getExtent(), this.olMap.getSize());
		}
		if (this.$props.zoomLevel) {
			this.olMap.getView().setZoom(this.$props.zoomLevel);
		}
		
		this.olMap.on('moveend', Quasar.utils.debounce(function(e) {
			var mapExtent =  e.map.getView().calculateExtent();
			var wgs84Extent = ol.proj.transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
			var topLeft = ol.extent.getTopLeft(wgs84Extent);
			var bottomRight = ol.extent.getBottomRight(wgs84Extent);
			this.fetchList({lat:topLeft[0] , lon:topLeft[1]},{lat:bottomRight[0] , lon:bottomRight[1]});
			
		}.bind(this), 300));
		
		if (this.$props.nameField) {
			var popup = new ol.Overlay({
		        element: this.$el.querySelector('#popup'),
		        positioning: 'bottom-center',
		        stopEvent: false,
		        offset: [0, -10]
		      });
			this.olMap.addOverlay(popup);
			// display popup on click
			this.olMap.on('click', function(evt) {
	          var feature = this.olMap.forEachFeatureAtPixel(evt.pixel,
	            function(feature) {
	              return feature;
	            });
	          if (feature) {
	            var coordinates = feature.getGeometry().getCoordinates();
	            popup.setPosition(coordinates);
	            this.$data.popupDisplayed = true;
	            this.$data.popupTitle = feature.get('name');
	          } else {
	          	this.$data.popupDisplayed = false;
	          }
	        }.bind(this));
		      
		    // change mouse cursor when over marker
			this.olMap.on('pointermove', function(e) {
				if (e.dragging) {
					this.$data.popupDisplayed = false;
				  return;
				}
				var pixel = this.olMap.getEventPixel(e.originalEvent);
				var hit = this.olMap.hasFeatureAtPixel(pixel);
				this.olMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
			}.bind(this));
		}

	}
})
