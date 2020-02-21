Vue.component('v-geopoint-input', {
	template :  ''
+'<div class="row">'
+'		<q-input label="Longitude" stack-label  v-model.number="inputObject.lon" @input="updateJson" ></q-input>'
+'		<q-input label="Latitude" stack-label  v-model.number="inputObject.lat" @input="updateJson" ></q-input>'
+'	</div>'
	,
	props : {
		value: { type: Object}
	},
	data : function () {
		return {
			inputObject : this.$props.value ? this.$props.value : {}
		}
	},
	watch: { 
      	value: function(newVal, oldVal) {
      		this.$data.inputObject = newVal ? newVal : {};
      	}
	},
	beforeMount() {
	    this.updateJson();
	    
	},
	methods: {
	    updateJson() {
	      var newInputValue = JSON.stringify({  lon : this.$data.inputObject.lon, lat : this.$data.inputObject.lat});
	      this.$set(this.$props.value, '_v_inputValue', newInputValue );
	      this.$emit('input', this.$data.inputObject);
	    }
	  }
})
