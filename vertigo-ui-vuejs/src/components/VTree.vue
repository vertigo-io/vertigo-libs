<template>
    <q-field v-bind="$attrs" >
        <template v-slot:append>
            <q-icon name="arrow_drop_down" />
        </template>
        <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ getSelectedLabel() }}</div>
        </template>
        <q-menu :breakpoint="600" fit ref="menu">
            <q-tree :nodes="convertListToTree($props.list, $props.subTreeKey)" 
                    :node-key="$props.keyField" :label-key="$props.labelField" 
                    v-model:expanded="expandedNodes"
                    @update:expanded="handleExpanded" 
                    v-model:selected="selectedNode" 
                    @update:selected="handleSelected" >
            </q-tree>
        </q-menu>
    </q-field>
</template>
<script>
import * as Quasar from "quasar"

export default {
	props : {
		modelValue:			{ type: String, required: true},
		list:          	{ type: Array,  required: true },
		keyField:     	{ type: String,  required: true },
		labelField:  	{ type: String,  required: true },
		parentKeyField: { type: String,  required: true },
		subTreeKey: 	{ type: String,  required: false },
	},
	emits: ["update:modelValue"],
	data: function () {
		return {
			selectedNode: this.$props.modelValue,
			expandedNodes: [this.$props.modelValue]
		}
	},
	watch: { 
          modelValue: function(newVal) {
              this.$data.selectedNode = newVal;
          }
    },
	methods: {
		handleSelected: function(target) {
			this.$emit('update:modelValue', this.$data.selectedNode);
			if (target) {
				this.$refs.menu.hide()
			}
		},
		handleExpanded: function() {
			Quasar.debounce(this.$refs.menu.updatePosition, 500)();
		},
		getSelectedLabel: function() {
			if (this.$data.selectedNode) {
				let node =  this.$props.list
					.find(function(rse) { 
						return rse[this.$props.keyField] === this.$data.selectedNode 
					}.bind(this));
				return node[this.$props.labelField]
			}
			return null;
		},
		convertListToTree: function (list, subTreeKey) {
			var map = {}, node, roots = [], i, newList = [];
			for (i = 0; i < list.length; i += 1) {
				map[list[i][this.$props.keyField]] = i; // initialize the map
				newList.push({...list[i], children : []}); // initialize the newList with children
			}
		
			for (i = 0; i < list.length; i += 1) {
				node = newList[i];
				if (node[this.$props.parentKeyField]) {
					// if you have dangling branches check that map[node.parentId] exists
					newList[map[node[this.$props.parentKeyField]]].children.push(node);
				} else {
					roots.push(node);
				}
			}
			
			if (subTreeKey) {
				return [newList[map[subTreeKey]]];
			}
			
			return roots;
		}
	}
}
</script>