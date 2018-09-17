Vue.component('v-table', {
  template: `  
  <table>
    <thead>
		<slot name="header" v-bind:columns="columns"  v-bind:listState="listState">
		    <v-table-header :columns="columns" @sort="sortBy" :listState="listState" ></v-table-header>
		</slot>
    </thead>
    <tbody>
      	<slot name="body" v-bind:columns="columns"  v-bind:filteredData="filteredData">
			<v-table-line v-for="entry in filteredData" :columns="columns" :entry="entry" ></v-table-line>
		</slot>
    </tbody>
  </table>
	  `
  ,
  props: {
    list: Array,
    columns: Array,
    componentId: String,
    filterKey: String
  },
  data: function () {
    return {
    	listState : {
	      sortFieldName: '',
	      sortDesc: true
    	}
    }
  },
  computed: {
    filteredData: function () {
      window.data.componentStates[this.$props.componentId] = this.$data;
      var sortFieldName = this.listState.sortFieldName;
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.listState.sortDesc ? -1 : 1;
      var data = this.list;
      
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortFieldName) {
        data = data.slice().sort(function (a, b) {
          a = a[sortFieldName]
          b = b[sortFieldName]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  methods: {
    sortBy: function (key) {
      this.listState.sortFieldName = key
      this.listState.sortDesc = !this.listState.sortDesc
    }
  }
})

Vue.component('v-table-header', {
  template: `
	  <tr>
	  	<th v-for="column in columns" @click="$emit('sort', column)" :class="{ active: listState.sortFieldName == column }">
	  	  <slot name="head" v-bind:column="column" v-bind:listState="listState">
	  	  	{{ column }}
	  	  </slot>
	      <span class="arrow" :class="listState.sortDesc ? 'dsc' : 'asc' ">
	      </span>
	  	</th>
	  </tr>
	  `,
  props: {
	columns: Array,
    listState: Object
  }
});

Vue.component('v-table-line', {
  template: `
	  <tr>
		<td v-for="column in columns">
			<slot name="line" v-bind:column="column" v-bind:entry="entry">
          		{{entry[column]}}
          	</slot>
        </td>
	  </tr>
	  `,
  props: {
	columns: Array,
	entry: Object
  }
});