<template>
    <div :id="id" >
        <div :id="id+'Popup'">
            <q-card v-if="popupDisplayed" class="q-px-md">
                <slot name="card" v-bind:objectDisplayed="objectDisplayed">
                      <div class="text-subtitle2">{{objectDisplayed[nameField]}}</div>
                </slot>
            </q-card>
        </div>	
    </div>
</template>
<script>
import * as Quasar from "quasar"
import * as ol from "ol"


export default {
    props : {
        id: { type: String, required: true},
        list : { type: Array },
        cluster : { type: Array },
        object : { type: Object },
        baseUrl : { type: String },
        field: { type: String, required: true},
        nameField: { type: String},        
        markerColor : { type: String, 'default': "#000000" },
        markerFont : { type: String, 'default': "Material Icons" },
        markerIcon : { type: String, 'default': "place" },
        markerSize : { type: Number, 'default': 30 },
        clusterCircleSize: { type: Number, 'default': 20 },
        clusterColor: { type: String, 'default': "#fff" },
        clusterCircleBorderColor: { type: String, 'default': "#000000" },
        clusterTextColor: { type: String, 'default': "#000000" },
        clusterTextSize: { type: Number, 'default': 12 },
        clusterTextFont: { type: String, 'default' : 'sans-serif' },
    },
    emits : ["moveend", "click"],
    data : function () {
        return {
            popupDisplayed : false,
            objectDisplayed: {},
            items: [],
            _itemsCoordString: null,
            clusters: [],
            _clusterCoordString: null,
            olMap: {},
            vectorSource : {},
            base32 : '0123456789bcdefghjkmnpqrstuvwxyz' // (geohash-specific) Base32 map
            
        }
    },
    watch : {
        // watch list, cluster and object but filter to only process when desired field ('field' prop, eg geoLocation) is modified
        list : {
           handler(newVal) {
              if (!!newVal) {
                  // console.log('watch list');
                  let newItemsCoordString = this.computeCoordString(newVal);
                  
                  if (!!this._itemsCoordString && newItemsCoordString !== this._itemsCoordString) {
                      this.$data.items = newVal;
                      this.updateMap();
                  }
                  this._itemsCoordString = newItemsCoordString;
              }
           },
           deep: true,
           immediate: true, // initialize _itemsCoordString
        },
        cluster : {
           handler(newVal) {
              if (!!newVal) {
                  // console.log('watch cluster');
                  let newClusterCoordString = this.computeCoordString(newVal);
                  
                  if (!!this._clusterCoordString && newClusterCoordString !== this._clusterCoordString) {
                      this.$data.clusters = [];
                      for(let i =0 ; i< newVal.length; i++) {
                          if(newVal[i].totalCount == 1) {
                              this.$data.items = this.$data.items.concat(newVal[i].list);
                          } else {
                              this.$data.clusters.push({
                              geoHash:newVal[i].code,
                              geoLocation:this.decode(newVal[i].code),
                              totalCount:newVal[i].totalCount});
                          }
                      }
                      this.updateMap();
                  }
                  this._clusterCoordString = newClusterCoordString;
              }
           },
           deep: true,
           immediate: true, // initialize _clusterCoordString
        },
        object : {
           handler(newVal) {
              if (!!newVal) {
                   // console.log('watch object');
                   let newItemsCoordString = this.computeCoordString(newVal);
                   
                   if (!!this._itemsCoordString && newItemsCoordString !== this._itemsCoordString) {
                       this.updateMap();
                   }
                   this._itemsCoordString = newItemsCoordString;
               }
           },
           deep: true,
           immediate: true, // initialize _itemsCoordString
        },
    },
    computed : {
        features: function() {
            let geoField = this.$props.field;
            let arrayOfFeatures = this.$data.items
            .filter(function(object) {
                return object[geoField]!=null;
            }).map(function(object) {
                let geoObject;
                if (typeof object[geoField] === 'string' || object[geoField] instanceof String){
                    geoObject = JSON.parse(object[geoField]);
                } else {
                    geoObject = object[geoField];
                }
                if(geoObject != null) {
                    let iconFeature = new ol.Feature({
                        geometry : new ol.geom.Point(ol.proj.fromLonLat([ geoObject.lon, geoObject.lat ])),
                    });
                    
                    if (this.$props.nameField) {
                        iconFeature.set('name', object[this.$props.nameField]);
                        iconFeature.set('innerObject', object);
                        iconFeature.set('totalCount', object.totalCount);
                    }
                    return iconFeature;
                } 
                return null;
            }.bind(this));
            
            let arrayOfClusterFeatures = this.$data.clusters
            .filter(function(object) {
                return object[geoField]!=null;
            }).map(function(object) {
                let geoObject;
                if (typeof object[geoField] === 'string' || object[geoField] instanceof String){
                    geoObject = JSON.parse(object[geoField]);
                } else {
                    geoObject = object[geoField];
                }
                if(geoObject != null) {
                    let iconFeature = new ol.Feature({
                        geometry : new ol.geom.Point(ol.proj.fromLonLat([ geoObject.lon, geoObject.lat ])),
                    });
                    
                    if (this.$props.nameField) {
                        iconFeature.set('name', object[this.$props.nameField]);
                        iconFeature.set('innerObject', object);
                        iconFeature.set('totalCount', object.totalCount);
                    }
                    return iconFeature;
                } 
                return null;
            }.bind(this));
            return arrayOfFeatures.concat(arrayOfClusterFeatures);
        }
    },
    methods : {
        fitView: function() {
            if (this.features.length > 0) {
                let maxZoom = 19;
                let maxZoomResolved = this.features.length == 1 ? Math.min(this.olMap.getView().getZoom()||maxZoom, maxZoom) // keep zoom if < maxZoom
                                                                : maxZoom; // if multiple features, dont keep zoom but dont zoom > maxZoom
                let extentPadded = ol.geom.Polygon.fromExtent(this.$data.vectorSource.getExtent())
                extentPadded.scale(1.2);
                this.olMap.getView().fit(extentPadded, {size : this.olMap.getSize(), maxZoom : maxZoomResolved});
            }
        },
        fetchList: function(topLeft, bottomRight) {
            this.$http.get(this.baseUrl+'_geoSearch?topLeft="'+ topLeft.lat+','+topLeft.lon+'"&bottomRight="'+ bottomRight.lat+','+bottomRight.lon+ '"', { timeout:5*1000, })
            .then( function (response) { //Ok
                this.$data.items = response.data;
                this.$data.vectorSource.clear();
                this.$data.vectorSource.addFeatures(this.features);
            }.bind(this));
        },
        computeCoordString: function(value) {
            let valueCoord = Array.isArray(value) ? value.map(el => el[this.$props.field]) : value[this.$props.field];
            return JSON.stringify(valueCoord);
        },
        updateMap: function() {
            this.$data.vectorSource.clear();
            this.$data.vectorSource.addFeatures(this.features);
            this.fitView();
        },
         /**
         * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
         *     to reasonable precision).
         *
         * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
         * @returns {{lat:number, lon:number}} (Center of) geohashed location.
         * @throws  Invalid geohash.
         *
         * @example
         *     const latlon = Geohash.decode('u120fxw'); // => { lat: 52.205, lon: 0.1188 }
         */
        decode : function (geohash) {
            const bounds = this.bounds(geohash); // <-- the hard work
            // now just determine the centre of the cell...
            const latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
            const latMax = bounds.ne.lat, lonMax = bounds.ne.lon;
            // cell centre
            let lat = (latMin + latMax)/2;
            let lon = (lonMin + lonMax)/2;
            // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
            lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10));
            lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10));
            return { lat: Number(lat), lon: Number(lon) };
        },
        /**
         * Returns SW/NE latitude/longitude bounds of specified geohash.
         *
         * @param   {string} geohash - Cell that bounds are required of.
         * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
         * @throws  Invalid geohash.
         */
        bounds : function(geohash) {
            if (geohash.length == 0) throw new Error('Invalid geohash');
            geohash = geohash.toLowerCase();
            let evenBit = true;
            let latMin =  -90, latMax =  90;
            let lonMin = -180, lonMax = 180;
            for (let i=0; i<geohash.length; i++) {
                const chr = geohash.charAt(i);
                const idx = this.$data.base32.indexOf(chr);
                if (idx == -1) throw new Error('Invalid geohash');
                for (let n=4; n>=0; n--) {
                    const bitN = idx >> n & 1;
                    if (evenBit) {
                        // longitude
                        const lonMid = (lonMin+lonMax) / 2;
                        if (bitN == 1) {
                            lonMin = lonMid;
                        } else {
                            lonMax = lonMid;
                        }
                    } else {
                        // latitude
                        const latMid = (latMin+latMax) / 2;
                        if (bitN == 1) {
                            latMin = latMid;
                        } else {
                            latMax = latMid;
                        }
                    }
                    evenBit = !evenBit;
                }
            }
            const bounds = {
                sw: { lat: latMin, lon: lonMin },
                ne: { lat: latMax, lon: lonMax },
            };
            return bounds;
        }
        
    },
   
    mounted : function() {
        this.$parent.onMapLoad( function( olMap ) {
            this.$data.olMap = olMap;
            this.$data.items = [];
            this.$data.clusters = [];
            if(this.$props.list) {
                this.$data.items = this.$props.list
            } else if(this.$props.cluster) {
                for(let i =0 ; i< this.$props.cluster.length; i++) {
                    if(this.$props.cluster[i].totalCount == 1) {
                        this.$data.items = this.$data.items.concat(this.$props.cluster[i].list);                        
                    } else {
                        this.$data.clusters.push({
                        geoHash:this.$props.cluster[i].code,
                        geoLocation:this.decode(this.$props.cluster[i].code),
                        totalCount:this.$props.cluster[i].totalCount});
                    }
                }
            } else  if(this.$props.object) {
                this.$data.items = [this.$props.object];
            }
            this.$data.vectorSource = new ol.source.Vector({
                features : this.features
            });
            
            let clusterSource = new ol.source.Cluster({
                source: this.$data.vectorSource,
                distance : 2*this.$props.clusterCircleSize
            });
            let clusterLayer = new ol.layer.Vector({
                source: clusterSource
            });
            
            let styleIcon = new ol.style.Style({
                text : new ol.style.Text({
                    font : this.$props.markerSize +'px ' + this.$props.markerFont,
                    text : this.$props.markerIcon,
                    fill : new ol.style.Fill({color : this.$props.markerColor }),
                    offsetY : 0
                })
            });
            
            let styleCache = {};
            clusterLayer.setStyle(function(feature, /*resolution*/) {
                let size = 0;
                let agregateFeatures = feature.get('features');
                for(let i = 0; i<agregateFeatures.length;i++) {
                    let fSize = agregateFeatures[i].get('totalCount');
                    size += !fSize?1:fSize;
                }
                if (!size || size == 1) {
                    return styleIcon;
                } else {
                      // otherwise show the number of features
                      let style = styleCache[size];
                      if (!style) {
                        style = new ol.style.Style({
                          image: new ol.style.Circle({
                            radius: this.$props.clusterCircleSize,
                            stroke: new ol.style.Stroke({
                                color: this.$props.clusterCircleBorderColor
                              }),
                            fill: new ol.style.Fill({
                              color: this.$props.clusterColor
                            })
                          }),
                          text: new ol.style.Text({
                            text: size.toString(),
                            font : this.$props.clusterTextSize +'px ' + this.$props.clusterTextFont,
                            fill: new ol.style.Fill({
                              color: this.$props.clusterTextColor
                            })
                          })
                        });
                        styleCache[size] = style;
                      }
                      return style;
                }
            }.bind(this));
            
            this.olMap.addLayer(clusterLayer); 
            
            // fit view
            this.fitView();
                
            // handle refresh if an endPoint is specified
            this.olMap.on('moveend', function(e) {
                let mapExtent =  e.map.getView().calculateExtent();
                let wgs84Extent = ol.proj.transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
                let topLeft = ol.extent.getTopLeft(wgs84Extent);
                let bottomRight = ol.extent.getBottomRight(wgs84Extent);
                if (this.baseUrl) {
                   Quasar.debounce(this.fetchList({lat:topLeft[0] , lon:topLeft[1]},{lat:bottomRight[0] , lon:bottomRight[1]}),300);
                }
                Quasar.debounce(this.$emit('moveend',topLeft, bottomRight) , 300);		
            }
            .bind(this));        
            
            if (this.$props.nameField) {
                let popup = new ol.Overlay({
                    element: this.$el.querySelector('#'+this.$props.id+'Popup'),
                    positioning: 'bottom-center',
                    stopEvent: false,
                    offset: [0, -20]
                  });
                this.olMap.addOverlay(popup);
                // display popup on click
                this.olMap.on('click', function(evt) {
                  let feature = this.olMap.forEachFeatureAtPixel(evt.pixel,
                    function(feature) {
                      return feature;
                    });
                  if (feature && feature.get('features').length == 1) {
                    let coordinates = feature.getGeometry().getCoordinates();
                    popup.setPosition(coordinates);
                    this.$data.popupDisplayed = true;
                    this.$data.objectDisplayed = feature.get('features')[0].get('innerObject');
                    evt.stopPropagation();
                    Quasar.debounce(this.$emit('click',ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326')) , 300);
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
                    let pixel = this.olMap.getEventPixel(e.originalEvent);
                    let hit = this.olMap.hasFeatureAtPixel(pixel);
                    this.olMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
                }.bind(this));
            } else {
                this.olMap.on('click', function(evt) {
                  let feature = this.olMap.forEachFeatureAtPixel(evt.pixel,
                    function(feature) {
                      return feature;
                    });
                  if (feature && feature.get('features').length == 1) {
                    let coordinates = feature.getGeometry().getCoordinates();
                    evt.stopPropagation();
                    Quasar.debounce(this.$emit('click',ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326')) , 300);
                  }
                }.bind(this));
            }
        }.bind(this)); 
    }
}
</script>