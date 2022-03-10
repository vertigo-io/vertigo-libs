VertigoUi.initData(VertigoUi, JSON.parse(window.document.getElementById('vui-init-data').innerHTML));

var VUiExtensions = VUiExtensions || {};
const VUiPage = Vue.createApp({
  data() {
	return {
		  vueData : VertigoUi.vueData,
		  componentStates : VertigoUi.componentStates,
		  uiMessageStack: VertigoUi.uiMessageStack,
		  dataX : VUiExtensions.dataX,
		  vuiLang : VertigoUi.vuiLang
	}
  },
  methods: { ...VertigoUi.methods, ...VUiExtensions.methods },
  created : function() {
	  this.$http.interceptors.response.use(function(response) {
	        return response;
	     }, function(error) {
	          this.onAjaxError(error.response);
	    }.bind(this))
  }
});
if (Quasar.lang.enUS) {
  Quasar.lang.enUS.vui = VertigoUi.lang.enUS;
}
if (Quasar.lang.fr) {
  Quasar.lang.fr.vui = VertigoUi.lang.fr;
}
VUiPage.use(Quasar, {
	lang : Quasar.lang[VertigoUi.vuiLang]
})
VUiPage.use(VertigoUi, {axios : axios});

VUiPage.mount('#page');

// fixes wrong components states due to firefox bfcache (back-forward cache)
//https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Working_with_BFCache
window.addEventListener('pageshow', function(event) {
	//VUiPage.$forceUpdate();
});
