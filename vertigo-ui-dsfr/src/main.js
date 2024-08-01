import '@gouvfr/dsfr/dist/dsfr.min.css'                 // Import des styles du DSFR //
import '@gouvfr/dsfr/dist/utility/icons/icons.css'      // Import des icones du DSFR //
import '@gouvminint/vue-dsfr/styles'                    // Import des styles globaux propre à VueDSFR //
import VueDsfr from '@gouvminint/vue-dsfr'              // Import (par défaut) de la bibliothèque //

import DsfrMethods from './methods'
import RouterLink from "@/components/Routerlink.vue";
import DsfrFacets from "@/components/DsfrFacets.vue";

import './utils.css'
import DsfrVTable from "@/components/DsfrVTable.vue";
import DsfrVTd from "@/components/DsfrVTd.vue";

var DSFR = {
    install: function (vueApp, options) {
        vueApp.use(VueDsfr);

        vueApp.component('RouterLink', RouterLink)
        vueApp.component('DsfrFacets', DsfrFacets)
        vueApp.component('DsfrVTable', DsfrVTable)
        vueApp.component('DsfrVTd', DsfrVTd)
    },

    methods: DsfrMethods,
}

if (window) {
    window.DSFR = DSFR
}

export default DSFR;
