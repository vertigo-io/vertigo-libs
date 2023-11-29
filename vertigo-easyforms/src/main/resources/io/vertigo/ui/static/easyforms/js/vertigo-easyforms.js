VUiExtensions.methods = {
    ...VUiExtensions.methods,
    hasErreurFormulaire : function(uiMessageStack, champ) {
    	  return (uiMessageStack.objectFieldErrors.reservation != null && uiMessageStack.objectFieldErrors.reservation['formulaire_'+ champ] != null)
    },
	
    getErreurFormulaire : function(uiMessageStack, champ) {
    	  return uiMessageStack.objectFieldErrors.reservation['formulaire_'+ champ].join(', ');
    },

    addItem : function() {
        this.httpPostAjax('_addItem', {}, {
            onSuccess: function(response) {
                this.$data.componentStates.itemModal.editIndex = -1;
                this.$data.componentStates.itemModal.opened = true
            }.bind(this)
        });
    },

    editItem : function(editIndex) {
        this.$data.componentStates.itemModal.editIndex = editIndex;
        this.httpPostAjax('_editItem', { editIndex: editIndex }, {
            onSuccess: function(response) {
                this.$data.componentStates.itemModal.opened = true
            }.bind(this)
        });
    },


    saveEditItem : function() {
        let formData = this.vueDataParams(['champEdit']);
        formData.delete('vContext[champEdit][isDefault]')//champ non modifiable
        if (!formData.has('vContext[champEdit][controleDeChamps]')) {
            formData.append('vContext[champEdit][controleDeChamps]', '')
        }
        formData.append('editIndex', this.$data.componentStates.itemModal.editIndex)
        this.httpPostAjax('_saveItem', formData, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element validé', type: 'positive' });
                this.$data.componentStates.itemModal.opened = false
            }.bind(this)
        });
    },

    deleteItem : function(editIndex) {
        this.$data.componentStates.itemModal.editIndex = editIndex;
        this.httpPostAjax('_deleteItem', { editIndex: editIndex }, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element supprimé', type: 'positive' });
            }.bind(this)
        });
    },

    moveItem : function(editIndex, offset) {
        this.httpPostAjax('_moveItem', { editIndex: editIndex, offset: offset }, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element déplacé', type: 'positive' });
            }.bind(this)
        });
    }
}

window.addEventListener('vui-before-plugins', function(event) {
	
	let vuiEasyForms = Vue.defineComponent({
		props: {
			modelValue: { type: Object, required: true },
		},
		data: function() {
			return {
				formulaire :  {}
			}
		},
		template: `
			<div>
				<slot v-bind:formulaire="formulaire" >
				</slot>
			</div>
		`
		,
		emits: ["update:modelValue"],
		created: function() {
			if(this.$props.modelValue) {
				this.$data.formulaire = this.$props.modelValue
			} else {
				this.$data.formulaire = {}
			}
		},
		watch: {
			modelValue: function(newVal) {
				this.$data.formulaire = newVal;
			},
			formulaire: {
				handler: function(newVal) {
					this.$emit('update:modelValue', this.$data.formulaire);
				},
				deep: true
			},
		}
	})
	event.detail.vuiAppInstance.component('vui-easy-forms',vuiEasyForms)
});

