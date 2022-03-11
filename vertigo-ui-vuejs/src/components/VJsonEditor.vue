<template>
    <div class="row">
        <div v-for="(value, key) in jsonAsObject" :key="key" :class="'col-'+(12/cols)">
            <q-input  v-if="!readonly" :label="key" orientation="vertical" stack-label  v-model="jsonAsObject[key]" @update:modelValue="updateJson" ></q-input>
            <q-field v-else :label="key" orientation="vertical" stack-label borderless readonly>
                <span >{{value}}</span>
            </q-field>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        modelValue: { type: String, required: true},
        readonly : { type: Boolean, required: true },
        cols : { type: Number, 'default': 2 }
    },
    emits: ["update:modelValue"],
    data : function () {
        return {
            jsonAsObject : JSON.parse(this.$props.modelValue)
        }
    },
    watch: { 
          modelValue: function(newVal) {
              this.$data.jsonAsObject = JSON.parse(newVal);
          }
    },
    methods: {
        updateJson() {
          this.$emit('update:modelValue', JSON.stringify(this.$data.jsonAsObject));
        }
      }
}
</script>