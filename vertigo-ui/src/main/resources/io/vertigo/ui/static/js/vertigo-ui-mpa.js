VertigoUi.initData(VertigoUi, JSON.parse(window.document.getElementById('vui-init-data').innerHTML));
var VUiExtensions = VUiExtensions || {};
window.dispatchEvent(new CustomEvent('vui-before-app-create'));
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
  methods: { ...VertigoUi.methods, ...(typeof DSFR === 'undefined' || DSFR?.methods), ...VUiExtensions.methods }
}, {...VUiExtensions.rootOptions });

window.dispatchEvent(new CustomEvent('vui-before-plugins', { detail : {vuiAppInstance : VUiApp}}));

if (typeof Quasar !== 'undefined') {
	if (Quasar.lang.enUS) {
	  Quasar.lang.enUS.vui = {...Quasar.lang.enUS.vui, ...VertigoUi.lang.enUS};
	}
	if (Quasar.lang.fr) {
	  Quasar.lang.fr.vui = {...Quasar.lang.fr.vui, ...VertigoUi.lang.fr};
	}
}

if (typeof DSFR !== 'undefined') VUiApp.use(DSFR);

if (typeof WYSIWYG !== 'undefined') VUiApp.use(WYSIWYG)

if (typeof Quasar !== 'undefined') {
	VUiApp.use(Quasar, {
		config: window?.quasarConfig || {},
		lang : Quasar.lang[VertigoUi.vuiLang]
	})
	VUiApp.config.globalProperties.Quasar = Quasar
}
VUiApp.config.globalProperties.VUiExtensions = VUiExtensions
VUiApp.use(VertigoUi, {axios : axios});

window.dispatchEvent(new CustomEvent('vui-before-page-mounted', { detail : {vuiAppInstance : VUiApp}}));
const VUiPage = VUiApp.mount('#page');
window.VUiApp = VUiApp;
window.VUiPage = VUiPage;
window.dispatchEvent(new CustomEvent('vui-after-page-mounted', { detail : {vuiAppInstance : VUiApp, vuiPageInstance : VUiPage}}));

axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (error.code !== "ERR_CANCELED" && // silent error for canceled requests
		!error.config.vNoDefaultErrorHandler // custom config added to axios request config to make the error silent (from VertigoUi)
	    ) {
        VUiPage.onAjaxError(error.response);
    }
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
