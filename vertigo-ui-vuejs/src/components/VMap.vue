<template>
    <div :id="id" class="map">
        <slot v-bind="$attrs"></slot>
    </div>
</template>
<script>
import * as ol from "ol"
import Debounce from "lodash.debounce"



export default {
    props : {
        id: { type: String, required: true},
        initialZoomLevel : { type: Number},
        initialCenter : { type: Object },
        search: { type: Boolean },
        overview : { type: Boolean },
    },
    emits:["moveend", "click"],
    methods: {
          onMapLoad: function(found) {
            let vm = this;
            function checkForMap() {
              if (vm.olMap) {
                found(vm.olMap);
                vm.postInit()
              } else {
                setTimeout(checkForMap, 50);
              }
            }
            checkForMap();
          },
          postInit() {
            if (this.$props.initialZoomLevel) {
                this.olMap.getView().setZoom(this.$props.initialZoomLevel);
            }
            if (this.olMap.vInitialZoomOverride) {
                this.olMap.getView().setZoom(this.olMap.vInitialZoomOverride);
            }
          }
    },
    mounted : function() {        
        let view = new ol.View();
        const osmSource = new ol.source.OSM();
        
        let osmLayer = new ol.layer.Tile({
            preload : 4,
            source : osmSource
        })
        
        const mapControls = [buildCustomControls()];
        if (this.$props.overview) {
            mapControls.push(new ol.control.OverviewMap({layers: [new ol.layer.Tile({source: osmSource}),],}));
        }
        if (this.$props.search && (typeof Geocoder === 'function')) {
            // this functionnality needs https://unpkg.com/ol-geocoder@4.3.1/dist/ol-geocoder.js and https://unpkg.com/ol-geocoder@4.3.1/dist/ol-geocoder.min.css
            // see https://github.com/Dominique92/ol-geocoder
        	mapControls.push(new Geocoder('nominatim', {
                provider: 'osm',
                lang: 'fr',
                placeholder: 'Search for ...',
                limit: 5,
                debug: false,
                autoComplete: true,
                keepOpen: true,
                preventMarker: true,
                defaultFlyResolution: 19,
            }));
        }
        
        this.olMap = new ol.Map({
            interactions: ol.interaction.defaults.defaults({
              onFocusOnly: true
            }),
            target : this.$props.id,
            layers : [ osmLayer ],
            // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
            loadTilesWhileAnimating : true,
            view : view,
            controls: ol.control.defaults.defaults().extend(mapControls),
        });
        
        if (this.$props.initialCenter) {
            this.olMap.getView().setCenter(ol.proj.fromLonLat([this.$props.initialCenter.lon, this.$props.initialCenter.lat]));
        }
        
        // handle refresh if an endPoint is specified
        this.onMapMoveEndDebounced = Debounce((topLeft, bottomRight) => {
            this.$emit('moveend', topLeft, bottomRight);
        }, 300);
        this.olMap.on('moveend', function(e) {
            let mapExtent =  e.map.getView().calculateExtent();
            let wgs84Extent = ol.proj.transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
            let topLeft = ol.extent.getTopLeft(wgs84Extent);
            let bottomRight = ol.extent.getBottomRight(wgs84Extent);
            this.onMapMoveEndDebounced(topLeft, bottomRight);       
        }.bind(this));

        this.onMapClickDebounced = Debounce((coordinate) => {
            this.$emit('click', ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
        }, 300);
        setTimeout(function () {
            this.olMap.on('click', function(evt) {
                if (evt.originalEvent.target instanceof HTMLCanvasElement ) {
                    // only when click on the map
                    evt.stopPropagation();
                    this.onMapClickDebounced(evt.coordinate);
                }
            }.bind(this)); 
        }.bind(this), 300); 
    }
}

function buildCustomControls() {
    return new class VCustomControls extends ol.control.Control {
       /**
        * @param {Object} [opt_options] Control options.
        */
       constructor(opt_options) {
          const options = opt_options || {};
        
          const element = document.createElement('div');
          element.className = 'ol-v-custom-buttons ol-unselectable ol-control';
        
          super({
             element: element,
             target: options.target,
          });
       }
    }
}
</script>