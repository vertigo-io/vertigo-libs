VertigoUi.initData(VertigoUi, JSON.parse(window.document.getElementById('vui-init-data').innerHTML));

var VUiExtensions = VUiExtensions || {};
const VUiApp = Vue.createApp({
  data() {
	return {
		  vueData : VertigoUi.vueData,
		  componentStates : VertigoUi.componentStates,
		  uiMessageStack: VertigoUi.uiMessageStack,
		  dataX : VUiExtensions.dataX,
		  vuiLang : VertigoUi.vuiLang
	  }
  },
  methods: { ...VertigoUi.methods, ...VUiExtensions.methods }
});
if (Quasar.lang.enUS) {
  Quasar.lang.enUS.vui = VertigoUi.lang.enUS;
}
if (Quasar.lang.fr) {
  Quasar.lang.fr.vui = VertigoUi.lang.fr;
}


VUiApp.use(Quasar, {
	config: window?.quasarConfig || {},
	lang : Quasar.lang[VertigoUi.vuiLang]
})
VUiApp.use(VertigoUi, {axios : axios});

const VUiPage = VUiApp.mount('#page');
window.VUiApp = VUiApp;
window.VUiPage = VUiPage;

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
