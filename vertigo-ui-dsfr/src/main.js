import '@gouvfr/dsfr/dist/dsfr.min.css'                 // Import des styles du DSFR //
import '@gouvfr/dsfr/dist/utility/icons/icons.css'      // Import des icones du DSFR //

import '@gouvminint/vue-dsfr/styles'                    // Import des styles globaux propre à VueDSFR //

import VueDsfr from '@gouvminint/vue-dsfr'              // Import (par défaut) de la bibliothèque //

import DsfrMethods from './methods'
import RouterLink from "@/components/Routerlink.vue";
import DsfrFacets from "@/components/DsfrFacets.vue";

import DsfrMenu from "@/components/DsfrMenu/DsfrMenu.vue";
import DsfrMenuLink from "@/components/DsfrMenu/DsfrMenuLink.vue";
import DsfrSelectMultiple from "@/components/DsfrSelectMultiple/DsfrSelectMultiple.vue";
import DsfrHeaderMenu from "@/components/DsfrMenu/DsfrHeaderMenu.vue";

import DsfrCustomHeader from "@/components/DsfrHeader/DsfrCustomHeader.vue";
import DsfrCustomHeaderMenuLinks from "@/components/DsfrHeader/DsfrCustomHeaderMenuLinks.vue";
import DsfrCustomDataTable from "@/components/DsfrDataTable/DsfrCustomDataTable.vue";
import DsfrCustomCheckbox from "@/components/DsfrCheckbox/DsfrCustomCheckbox.vue";

import DsfrButtonTooltip from "@/components/DsfrTooltip/DsfrButtonTooltip.vue";
import DsfrLinkTooltip from "@/components/DsfrTooltip/DsfrLinkTooltip.vue";
import DsfrLink from "@/components/DsfrLink/DsfrLink.vue";

import './utils.css'
import './surcharges.css'

var DSFR = {
    install: function (vueApp, options) {
        vueApp.use(VueDsfr);

        vueApp.component('RouterLink', RouterLink)
        vueApp.component('DsfrFacets', DsfrFacets)

        // Composants en avance sur le DSFR
        vueApp.component('DsfrSelectMultiple', DsfrSelectMultiple)
        vueApp.component('DsfrMenu', DsfrMenu)
        vueApp.component('DsfrMenuLink', DsfrMenuLink)
        vueApp.component('DsfrHeaderMenu', DsfrHeaderMenu)

        // Surcharges
        vueApp.component('DsfrCustomHeader', DsfrCustomHeader)
        vueApp.component('DsfrCustomHeaderMenuLinks', DsfrCustomHeaderMenuLinks)
        vueApp.component('DsfrCustomDataTable', DsfrCustomDataTable)
        vueApp.component('DsfrCustomCheckbox', DsfrCustomCheckbox)

        // Autres
        vueApp.component('DsfrButtonTooltip', DsfrButtonTooltip)
        vueApp.component('DsfrLinkTooltip', DsfrLinkTooltip)
        vueApp.component('DsfrLink', DsfrLink)
    },

    methods: DsfrMethods,
}

if (window) {
    window.DSFR = DSFR
}

export default DSFR;
