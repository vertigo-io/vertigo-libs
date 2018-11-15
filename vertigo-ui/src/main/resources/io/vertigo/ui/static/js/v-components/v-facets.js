Vue.component('v-facets', {
  template: '<div class="facets">'
 + '<div class="selectedFacets q-pb-md">'
 + '	<div v-for="(selectedFacetValues, selectedFacet) in selectedFacets" :key="selectedFacet">'
 + '		<q-chip class="q-mb-sm" v-for="selectedFacetValue in selectedFacetValues" :key="selectedFacetValue.code" @click="$emit(\'toogle-facet\', selectedFacet, selectedFacetValue, contextKey)" icon-right="cancel"><big>{{facetLabelByCode(selectedFacet)}}: {{facetValueLabelByCode(selectedFacet, selectedFacetValue)}}</big></q-chip>'
 + '	</div>'
 + '</div>'
 + '<q-list v-if="facet.multiple || !isFacetSelected(facet.code)" v-for="facet in facets" :key="facet.code" class="facetValues" dense highlight no-border>'
 + '<q-list-header><big>{{facet.label}}</big></q-list-header>'
 + '	  		<q-item v-for="value in facet.values" :key="value.code" class="facetValue q-ml-md">'
 + '	  			<q-checkbox v-if="facet.multiple" v-bind:value="isFacetValueSelected(facet.code, value.code)" :label="facetValueLabel(value.label, value.count)" @change="$emit(\'toogle-facet\', facet.code, value.code, contextKey)" ></q-checkbox>'
 + '	  			<span v-else @click="$emit(\'toogle-facet\', facet.code, value.code, contextKey)" >{{facetValueLabel(value.label, value.count)}}</span>'
 + '	  		</q-item>'
 + '	  </q-list>'
 + '</div>'
  ,
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String
  },
  computed: {
  },
  methods: {
	  facetByCode : function (facetCode) {
		  return this.facets.filter(function (facet) {
			  return facet.code === facetCode;
		  })[0];
	  },
	  facetLabelByCode : function (facetCode) {
		  return this.facetByCode(facetCode).label;
	  },
	  facetValueLabelByCode : function (facetCode, facetValueCode) {
		  return this.facetByCode(facetCode).values.filter(function (facetValue) {
			  return facetValue.code === facetValueCode;
		  })[0].label;
	  },
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

