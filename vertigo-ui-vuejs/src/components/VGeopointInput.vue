<template>
    <slot>
        <div class="inputs">
            Longitude <input v-model.number="inputObject.lon" @update:modelValue="updateJson" ></input>
            Latitude <input v-model.number="inputObject.lat" @update:modelValue="updateJson" ></input>
        </div>
    </slot>
</template>
<script>
export default {
    props : {
        modelValue: { type: Object}
    },
    emits: ["update:modelValue"],
    data : function () {
        return {
            inputObject : this.$props.modelValue ? this.$props.modelValue : {}
        }
    },
    watch: { 
          modelValue: function(newVal) {
              this.$data.inputObject = newVal ? newVal : {};
              this.updateJson();
          }
    },
    beforeMount() {
        this.updateJson();
        
    },
    methods: {
        updateJson() {
        var newInputValue;
        if(this.$props.modelValue) {
          newInputValue = JSON.stringify({  lon : this.$data.inputObject.lon, lat : this.$data.inputObject.lat});
          this.$props.modelValue['_v_inputValue'] = newInputValue;
        } else {
          //this.$set(this.$props.value, null );
        }        
        this.$emit('update:modelValue', this.$data.inputObject);        
      }
    }
}
</script>