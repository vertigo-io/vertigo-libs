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


import VMinify from './directives/VMinify'
import VScrollSpy from './directives/VScrollSpy'

import VMethods from './methods'

export function getBoundMethods(obj, methods) {
    let boundMethods = {};
    Object.keys(methods)
        .forEach(methodName => boundMethods[methodName] = methods[methodName].bind(obj));
    return boundMethods;
}

export function install (Vue , /*options*/) {
      
    // components
    Vue.component("v-chatbot", VChatbot);
    Vue.component("v-commands", VCommands);
    Vue.component("v-comments", VComments);
    Vue.component("v-extensions-store", VExtensionsStore);
    Vue.component("v-facets", VFacets);
    Vue.component("v-geopoint-input", VGeopointInput);
    Vue.component("v-handles", VHandles);
    Vue.component("v-json-editor", VJsonEditor);
    Vue.component("v-notifications", VNotifications);
    Vue.component("v-map", VMap);
    
    // directives
    Vue.directive("minify", VMinify);
    Vue.directive("scroll-spy", VScrollSpy);

    Vue.http.interceptors.push(function(/*request*/) {
        return function(response) { if(!response.ok) { VMethods.onAjaxError.bind(this)(response); } };
     });
   
}

export let methods = VMethods