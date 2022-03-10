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
                    :expanded.sync="expandedNodes"
                    @update:expanded="handleExpanded" 
                    :selected.sync="selectedNode" 
                    @update:selected="handleSelected" >
            </q-tree>
        </q-menu>
    </q-field>
</template>
<script>
import * as Quasar from "quasar"

export default {
	props : {
		value:			{ type: String, required: true},
		list:          	{ type: Array,  required: true },
		keyField:     	{ type: String,  required: true },
		labelField:  	{ type: String,  required: true },
		parentKeyField: { type: String,  required: true },
		subTreeKey: 	{ type: String,  required: false },
	},
	data: function () {
		return {
			selectedNode: this.$props.value,
			expandedNodes: [this.$props.value]
		}
	},
	watch: { 
          value: function(newVal) {
              this.$data.selectedNode = newVal;
          }
    },
	methods: {
		handleSelected: function(target) {
			this.$emit('input', this.$data.selectedNode);
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
			var map = {}, node, roots = [], i;
			for (i = 0; i < list.length; i += 1) {
				map[list[i][this.$props.keyField]] = i; // initialize the map
				list[i].children = []; // initialize the children
			}
		
			for (i = 0; i < list.length; i += 1) {
				node = list[i];
				if (node[this.$props.parentKeyField]) {
					// if you have dangling branches check that map[node.parentId] exists
					list[map[node[this.$props.parentKeyField]]].children.push(node);
				} else {
					roots.push(node);
				}
			}
			
			if (subTreeKey) {
				return [list[map[subTreeKey]]];
			}
			
			return roots;
		}
	}
}
</script>