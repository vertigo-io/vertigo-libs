Vue.component('v-facets', {
  template: `  
  <div>
	  <div v-for="facet in facets" >
	  	<h3>{{facet.label}}</h3>
	  	<ul>
	  		<li v-for="value in facet.values" @click="$emit('toogle-facet', facet.code, value.code, componentId)">{{value.label}} ({{value.count}})</li>
	  	</ul>
	  </div>
  </div>
	  `
  ,
  props: {
    facets: Array,
    selectedFacets: Object,
    componentId: String
  },
  computed: {
  },
  methods: {
  }
})

