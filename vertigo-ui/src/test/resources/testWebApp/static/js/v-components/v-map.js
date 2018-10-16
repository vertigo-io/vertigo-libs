Vue.component('v-map', {
  template: '<div id="map" style="width:100%; height:50vh"></div>',
  props: {
    list: Array
  },
  mounted: function () {
	  var london = ol.proj.fromLonLat([-0.12755, 51.507222]);
      var view = new ol.View({
        center: london,
        zoom: 6
      });
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            preload: 4,
            source: new ol.source.OSM()
          })
        ],
        // Improve user experience by loading tiles while animating. Will make
        // animations stutter on mobile or slow devices.
        loadTilesWhileAnimating: true,
        view: view
      });
  }
})

