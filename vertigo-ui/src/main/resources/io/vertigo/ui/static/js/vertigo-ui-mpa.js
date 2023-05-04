var VUiExtensions = VUiExtensions || {};
Vue.use(VertigoUi, { axios: axios });

VertigoUi.initData(VertigoUi, JSON.parse(window.document.getElementById('vui-init-data').innerHTML));
Quasar.lang.set(Quasar.lang[VertigoUi.vuiLang]);
var VUiPage = new Vue({
    el: '#page',
    data: {
        vueData: VertigoUi.vueData,
        componentStates: VertigoUi.componentStates,
        uiMessageStack: VertigoUi.uiMessageStack,
        dataX: VUiExtensions.dataX,
        vuiLang: VertigoUi.vuiLang
    },
    methods: Vue.util.extend(VertigoUi.methods, VUiExtensions.methods || {})
});

axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    VUiPage.onAjaxError(error.response);
    return Promise.reject(error);
})

// fixes wrong components states due to firefox bfcache (back-forward cache)
//https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Working_with_BFCache
window.addEventListener('pageshow', function(event) {
    VUiPage.$forceUpdate();    
});

window.addEventListener('pagehide', function(event) {
    // on retire les pendingActions, pour le cas du back
    if(VUiPage.componentStates && VUiPage.componentStates.pendingAction) {
        VUiPage.componentStates.pendingAction.actionNames = [];
    }  
});
