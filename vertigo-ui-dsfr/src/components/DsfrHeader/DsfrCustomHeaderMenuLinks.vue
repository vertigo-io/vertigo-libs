<script lang="ts" setup>
/**
 * /// SURCHARGE ///
 * Ce composant est une surcharge temporaire du composant dsfr-menu-links
 * - Ajout d’un slot pour permettre l’usage du DsfrHeaderMenu tout en restant accessible
 *
 *
 */

import {DsfrHeaderMenuLink, type DsfrHeaderMenuLinkProps} from "@gouvminint/vue-dsfr";

export type {
  DsfrHeaderMenuLinkProps,
}

withDefaults(defineProps<{
  links?: DsfrHeaderMenuLinkProps[]
  navAriaLabel?: string
}>(), {
  links: () => [],
  navAriaLabel: 'Menu secondaire',
})

const emit = defineEmits<{ linkClick: [event: MouseEvent] }>()
</script>

<template>
  <nav
      role="navigation"
      :aria-label="navAriaLabel"
  >
    <ul
        class="fr-btns-group"
    >
      <li
          v-for="(quickLink, index) in links"
          :key="index"
      >
        <DsfrHeaderMenuLink
            v-bind="quickLink"
            :on-click="($event) => { emit('linkClick', $event); quickLink.onClick?.($event) }"
        />
      </li>
      <slot></slot>
    </ul>
  </nav>
</template>