import Wysiwyg from "@/components/Wysiwyg.vue";
import EnUs from './lang/vertigo-wysiwyg-lang-en-us'
import Fr from './lang/vertigo-wysiwyg-lang-fr'

var WYSIWYG = {
    install: function (vueApp, options) {
        vueApp.component('v-wysiwyg', Wysiwyg);
        
        VertigoUi.lang.enUS.wysiwyg = EnUs;
        VertigoUi.lang.fr.wysiwyg = Fr;
    },
}

if (window) {
    window.WYSIWYG = WYSIWYG
}

export default WYSIWYG;
