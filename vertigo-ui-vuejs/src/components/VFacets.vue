<template>
    <div class="facets">
        <div class="selectedFacets q-pb-md" v-if="isAnyFacetValueSelected()">
            <div v-for="(selectedFacetValues, selectedFacet) in selectedFacets" :key="selectedFacet" >
                <template v-if="!facetMultipleByCode(selectedFacet)">
                    <q-chip clickable class="q-mb-sm" v-for="selectedFacetValue in selectedFacetValues" :key="selectedFacetValue.code"
                        @click="$emit('toogle-facet', selectedFacet, selectedFacetValue, contextKey)" icon-right="cancel">{{facetLabelByCode(selectedFacet)}}: {{facetValueLabelByCode(selectedFacet, selectedFacetValue)}}
                    </q-chip>
                </template>
            </div>
        </div>
            <q-list  v-for="facet in facets" :key="facet.code" class="facetValues q-py-none" dense >
                <template v-if="facet.multiple || !isFacetSelected(facet.code)">
                    <q-item-label header><big>{{facet.label}}</big></q-item-label>
                    <q-item v-for="(value) in selectedInvisibleFacets(facet.code)" :key="value.code" class="facetValue q-ml-md" clickable @click.native="$emit('toogle-facet', facet.code, value.code, contextKey)">
                        <q-item-section side v-if="facet.multiple" >
                            <q-checkbox dense v-bind:value="true" @input="$emit('toogle-facet', facet.code, value.code, contextKey)" ></q-checkbox>
                        </q-item-section>
                        <q-item-section >{{value.label}}</q-item-section> 
                        <q-item-section side>{{value.count}}</q-item-section>
                    </q-item>
                    
                    <q-item v-for="(value) in visibleFacets(facet.code, facet.values)" :key="value.code" class="facetValue q-ml-md" clickable @click.native="$emit('toogle-facet', facet.code, value.code, contextKey)">
                        <q-item-section side v-if="facet.multiple" >
                            <q-checkbox dense v-bind:value="isFacetValueSelected(facet.code, value.code)" @input="$emit('toogle-facet', facet.code, value.code, contextKey)" ></q-checkbox>
                        </q-item-section>
                        <q-item-section >{{value.label}}</q-item-section> 
                        <q-item-section side>{{value.count}}</q-item-section>
                    </q-item>
                    <q-btn flat v-if="facet.values.length > maxValues && !isFacetExpanded(facet.code)" @click="expandFacet(facet.code)">{{$q.lang.vui.facets.showAll}}</q-btn>
                    <q-btn flat v-if="facet.values.length > maxValues && isFacetExpanded(facet.code)" @click="reduceFacet(facet.code)">{{$q.lang.vui.facets.showLess}}</q-btn>
                </template>
            </q-list>
    </div>
</template>
<script>
export default {
    props: {
        facets: Array,
        selectedFacets: Object,
        contextKey: String,
        maxValues: {
            type : Number,
            default : 5
        }
  },
  computed: {
  },
  data : function() {
      return {
          expandedFacets:[]
      }
  },
  methods: {
      facetByCode : function (facetCode) {
          return this.facets.filter(function (facet) {
              return facet.code === facetCode;
          })[0];
      },
      facetValueByCode : function (facetCode, facetValueCode) {
          return this.facetByCode(facetCode).values.filter(function (facetValue) {
              return facetValue.code === facetValueCode;
          })[0];
      },
      facetLabelByCode : function (facetCode) {
          return this.facetByCode(facetCode).label;
      },      
      facetMultipleByCode : function (facetCode) {
          return this.facetByCode(facetCode).multiple;
      },
      facetValueLabelByCode : function (facetCode, facetValueCode) {
          var facetValueByCode = this.facetValueByCode(facetCode,facetValueCode);
          return facetValueByCode?facetValueByCode.label:facetValueCode; //might be not found
      },
      isFacetValueSelected : function (facetCode, facetValueCode){
          return this.selectedFacets[facetCode].includes(facetValueCode);
      },
      isFacetSelected : function (facetCode){
          if (this.selectedFacets[facetCode]) {
              return this.selectedFacets[facetCode].length > 0;
          }
          return false;
      },
      isAnyFacetValueSelected : function() {
          return Object.keys(this.selectedFacets).some(function (facetCode) {
              return !this.facetMultipleByCode(facetCode);
          }.bind(this));
      },
      expandFacet : function (facetCode){
          if (!this.isFacetExpanded(facetCode)) {
              this.$data.expandedFacets.push(facetCode);
          }
      },
      reduceFacet : function (facetCode){
          if (this.isFacetExpanded(facetCode)) {
              this.$data.expandedFacets.splice( this.$data.expandedFacets.indexOf(facetCode), 1);
          }
      },
      isFacetExpanded : function (facetCode){
         return this.$data.expandedFacets.includes(facetCode);
      },
      selectedInvisibleFacets : function (facetCode) {
          return this.selectedFacets[facetCode]
             .filter( facetValueCode => !this.facetValueByCode(facetCode, facetValueCode) )
             .map(facetValueCode => { 
              var obj = {}; 
              obj.code=facetValueCode; 
              obj.label=facetValueCode; 
              obj.count=0; 
              return obj; 
          });
      },
      visibleFacets : function (facetCode, facetValues){
          if (!this.isFacetExpanded(facetCode)) {
              return  facetValues.slice(0, this.maxValues);
          }
          return facetValues;
      }
  }
}
</script>