import * as Quasar from "quasar"

import VChatbot from './components/VChatbot.vue'
import VCommands from './components/VCommands.vue'
import VComments from './components/VComments.vue'
import VExtensionsStore from './components/VExtensionsStore.vue'
import VFacets from './components/VFacets.vue'
import VGeopointInput from './components/VGeopointInput.vue'
import VHandles from './components/VHandles.vue'
import VJsonEditor from './components/VJsonEditor.vue'
import VNotifications from './components/VNotifications.vue'
import VMap from './components/VMap.vue'
import VMapLayer from './components/VMapLayer.vue'
import VTree from './components/VTree.vue'

import VMinify from './directives/VMinify'
import VScrollSpy from './directives/VScrollSpy'

import VMethods from './methods'

import EnUs from './lang/vertigo-ui-lang-en-us'
import Fr from './lang/vertigo-ui-lang-fr'

var VertigoUi = {

  getBoundMethods : function(obj, methods) {
    let boundMethods = {};
    Object.keys(methods)
        .forEach(methodName => boundMethods[methodName] = methods[methodName].bind(obj));
    return boundMethods;
  },

   install : function (vueApp , options) {
      
    // components
    vueApp.component("v-chatbot", VChatbot);
    vueApp.component("v-commands", VCommands);
    vueApp.component("v-comments", VComments);
    vueApp.component("v-extensions-store", VExtensionsStore);
    vueApp.component("v-facets", VFacets);
    vueApp.component("v-geopoint-input", VGeopointInput);
    vueApp.component("v-handles", VHandles);
    vueApp.component("v-json-editor", VJsonEditor);
    vueApp.component("v-notifications", VNotifications);
    vueApp.component("v-map", VMap);
    vueApp.component("v-map-layer", VMapLayer);
    vueApp.component("v-tree", VTree)
    
    // directives
    vueApp.directive("minify", VMinify);
    vueApp.directive("scroll-spy", VScrollSpy);

    if (!options.axios) {
        console.error('You have to install axios')
        return
    }

    vueApp.axios = options.axios;
    vueApp.$http = options.axios;

    Object.defineProperties(vueApp.config.globalProperties, {
        axios: {
            get() {
            return options.axios
            }
        },
    
        $http: {
            get() {
            return options.axios
            }
        },

        $vui: {
            get() {
                return VertigoUi.getBoundMethods(this, VMethods);
            }
        }
    });
   
   
 },

 methods: VMethods,

 initData : function(instance, json) {
    instance.vueData = json.vueData;
	instance.componentStates = json.componentStates;
    instance.uiMessageStack = json.uiMessageStack;
    instance.vuiLang = json.vuiLang;
 },

 lang : {
     enUS: EnUs,
     fr: Fr
 }
}

if (window) {
    window.VertigoUi = VertigoUi
}



export default VertigoUi;