Vue.component('v-facets', {
  template: '<div>'
 + '<div v-for="facet in facets" >'
 + '<h3>{{facet.label}}</h3>'
 + '  	<ul>'
 + '	  		<li v-for="value in facet.values" @click="$emit(\'toogle-facet\', facet.code, value.code, componentId)">'
 + '	  			<span>{{value.label}} ({{value.count}})</span>'
 + '	  			<span v-if="isFacetValueSelected(facet.code, value.code)"> selected</span>'
 + '	  		</li>'
 + '	  	</ul>'
 + '	  </div>'
 + '</div>'
  ,
  props: {
    facets: Array,
    selectedFacets: Object,
    componentId: String
  },
  computed: {
  },
  methods: {
	  isFacetValueSelected : function (facetCode, facetValueCode){
		  return this.selectedFacets[facetCode].includes(facetValueCode);
	  }
  }
})

