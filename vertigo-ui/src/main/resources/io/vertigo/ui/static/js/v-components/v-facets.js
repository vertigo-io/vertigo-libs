Vue.component('v-facets', {
  template: '<div>'
 + '<div>'
 + '	<div v-for="(selectedFacetValues, selectedFacet) in selectedFacets" :key="selectedFacet">'
 + '		<q-chip v-for="selectedFacetValue in selectedFacetValues" :key="selectedFacetValue.code" @click="$emit(\'toogle-facet\', selectedFacet, selectedFacetValue, componentId)" icon-right="cancel">{{selectedFacet}}:{{selectedFacetValue}}</q-chip>'
 + '	</div>'
 + '</div>'
 + '<div v-if="facet.multiple || !isFacetSelected(facet.code)" v-for="facet in facets" >'
 + '<h3>{{facet.label}}</h3>'
 + '  	<ul>'
 + '	  		<li v-for="value in facet.values">'
 + '	  			<q-checkbox v-if="facet.multiple" v-bind:value="isFacetValueSelected(facet.code, value.code)" :label="facetValueLabel(value.label, value.count)" @change="$emit(\'toogle-facet\', facet.code, value.code, componentId)" ></q-checkbox>'
 + '	  			<span v-else @click="$emit(\'toogle-facet\', facet.code, value.code, componentId)" >{{facetValueLabel(value.label, value.count)}}</span>'
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
	  },
	  isFacetSelected : function (facetCode){
		  return this.selectedFacets[facetCode].length > 0;
	  },
	  facetValueLabel : function (label, count){
		  return label + ' (' + count + ')';
	  }
  }
})

