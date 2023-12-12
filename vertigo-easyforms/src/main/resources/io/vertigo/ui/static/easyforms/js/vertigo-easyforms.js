let context = document.currentScript.dataset.context ;

VUiExtensions.methods = {
    ...VUiExtensions.methods,
    hasErreurFormulaire : function(uiMessageStack, champ) {
	if (uiMessageStack.objectFieldErrors.reservation == null)
uiMessageStack.objectFieldErrors.reservation = {formulaire_prenom:["err"]};
    	  return (uiMessageStack.objectFieldErrors.reservation != null && uiMessageStack.objectFieldErrors.reservation['formulaire_'+ champ] != null)
    },
	
    getErreurFormulaire : function(uiMessageStack, champ) {
    	  return (uiMessageStack.objectFieldErrors.reservation != null && uiMessageStack.objectFieldErrors.reservation['formulaire_'+ champ] != null &&
    	  			 uiMessageStack.objectFieldErrors.reservation['formulaire_'+ champ].join(', '));
    },

    addItem : function() {
        this.httpPostAjax(context + 'easyforms/metaformulaire/_addItem', {}, {
            onSuccess: function(response) {
                this.$data.componentStates.itemModal.editIndex = -1;
                this.$data.componentStates.itemModal.opened = true
            }.bind(this)
        });
    },

    editItem : function(editIndex) {
        this.$data.componentStates.itemModal.editIndex = editIndex;
        this.httpPostAjax(context + 'easyforms/metaformulaire/_editItem', { editIndex: editIndex }, {
            onSuccess: function(response) {
                this.$data.componentStates.itemModal.opened = true
            }.bind(this)
        });
    },
    
    refreshItem : function() {
        this.httpPostAjax(context + 'easyforms/metaformulaire/_refreshItem',{'typeDeChamp':this.vueData.champEdit.typeDeChamp});
    },


    saveEditItem : function() {
        let formData = this.vueDataParams(['champEdit']);
        formData.delete('vContext[champEdit][isDefault]')//champ non modifiable
        if (!formData.has('vContext[champEdit][controleDeChamps]')) {
            formData.append('vContext[champEdit][controleDeChamps]', '')
        }
        formData.append('editIndex', this.$data.componentStates.itemModal.editIndex)
        this.httpPostAjax(context + 'easyforms/metaformulaire/_saveItem', formData, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element validé', type: 'positive' });
                this.$data.componentStates.itemModal.opened = false
            }.bind(this)
        });
    },

    deleteItem : function(editIndex) {
        this.$data.componentStates.itemModal.editIndex = editIndex;
        this.httpPostAjax(context + 'easyforms/metaformulaire/_deleteItem', { editIndex: editIndex }, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element supprimé', type: 'positive' });
            }.bind(this)
        });
    },

    moveItem : function(editIndex, offset) {
        this.httpPostAjax(context + 'easyforms/metaformulaire/_moveItem', { editIndex: editIndex, offset: offset }, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element déplacé', type: 'positive' });
            }.bind(this)
        });
    },
    
    /** When used without itemModal */
    addItemNoModal: function(listName) {
        this.httpPostAjax(context + 'easyforms/metaformulaire/_addItem', this.vueDataParams([listName]), { });
    },
    deleteItemNoModal: function(listName, editIndex) {
        let formData = this.vueDataParams([listName]);
        formData.append('editIndex', editIndex);
        this.httpPostAjax(context + 'easyforms/metaformulaire/_deleteItem', formData, {
            onSuccess: function(response) {
                this.$q.notify({ message: 'Element supprimé', type: 'positive' });
            }.bind(this)
         });
    },
    moveItemNoModal: function(listName, editIndex, offset) {
        let formData = this.vueDataParams([listName]);
        formData.append('editIndex', editIndex);
        formData.append('offset', offset);
        this.httpPostAjax(context + 'easyforms/metaformulaire/_moveItem', formData, {            
        });
    },
    
    /** When used inner vueData */
    addItemVueData: function() {
        this.$data.vueData.motifValues.push({label:''});
    },
    deleteItemVueData: function(editIndex) {
        this.$data.vueData.motifValues.splice(editIndex, 1);
    },
    moveItemVueData: function(editIndex, offset) {
	let element = this.$data.vueData.motifValues[editIndex];
	this.$data.vueData.motifValues.splice(editIndex, 1);
	this.$data.vueData.motifValues.splice(editIndex + offset, 0, element);
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

