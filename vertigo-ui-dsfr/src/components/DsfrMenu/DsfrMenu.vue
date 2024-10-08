<script lang="ts" setup>
import {provide, ref, watch} from 'vue';
import {useCollapsable} from '@/composables/useCollapsable'

import type {DsfrMenuProps} from './DsfrMenu.types'
import {getRandomId} from '@/utils/random-utils'
import {VIcon} from "@gouvminint/vue-dsfr";

export type {DsfrMenuProps}

// Collapsable
const {
  collapse,
  collapsing,
  cssExpanded,
  doExpand,
  onTransitionEnd,
} = useCollapsable()

const props = withDefaults(defineProps<DsfrMenuProps>(), {
  id: () => getRandomId("menu"),
  icon: '',
  label: '',
  secondary: false,
  tertiary: false,
  disabled: false
})

const expanded = ref(false)
let itemCounter = ref(-1)
let menuItems = []

const incrementCounter = () => {
  itemCounter.value += 1
}

const addMenuItem = (label, id) => {
  menuItems.push(`${label}@${id}`)
}

provide('itemCounter', { itemCounter, incrementCounter, addMenuItem })
provide('id', props.id)

watch(expanded, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    doExpand(newValue)
    if (newValue) {
      setTimeout(() => focusOption(0), 100)
    }
  }
})

let focusOption = function(itemId) {
  document.getElementById(`${props.id}_item_${itemId}`).focus()
}

let focusOptionDown = function (event) {
  const activeId = document.activeElement.id;
  const itemId = activeId.startsWith(`${props.id}_item_`)
      ? Number(activeId.split("_")[2])
      : -1;

  const nextId = itemId + 1 < itemCounter.value
      ? itemId + 1
      : 0;
  focusOption(nextId);
}

let focusOptionUp = function (event) {
  const activeId = document.activeElement.id;
  const itemId = activeId.startsWith(`${props.id}_item_`)
      ? Number(activeId.split("_")[2])
      : -1;

  const nextId = itemId - 1 >= 0
      ? itemId - 1
      : itemCounter.value - 1;
  focusOption(nextId);
}

let setFocusByFirstCharacter = (event) => {
  let char = event.key;
  if (char.length > 1 && char.match(/\S/)) {
    return;
  }

  char = char.toLowerCase();

  let filteredItems = menuItems.filter(o => o.toLowerCase().startsWith(char));
  let activeDocumentId = document.activeElement.id;
  for (let item of filteredItems) {
    let buttonId = item.split('@')[1];
    let domItem = document.getElementById(`${props.id}_item_${buttonId}`)
    if (activeDocumentId === domItem.id) {
      continue;
    }
    domItem.focus()
    break;
  }
}

</script>

<template>
  <div class="relative-position" ref="focus-container">
    <button
        :id="id"
        @click.prevent.stop="expanded = !expanded"
        @keyup.esc.stop="expanded = false"
        @keyup.space.prevent="expanded = !expanded"
        @keydown.down.prevent="focusOption(0)"
        @keydown.up.prevent="focusOption(itemCounter)"
        @keydown="setFocusByFirstCharacter"
        @keydown.tab="expanded = false"
        class="fr-btn fr-menu__btn"
        :class="{
          'fr-btn--secondary': secondary,
          'fr-btn--tertiary': tertiary
        }"
        aria-haspopup="menu"
        aria-autocomplete="none"
        :aria-disabled="disabled"
        :aria-controls="`${id}_menu`"
        :aria-expanded="expanded"
        v-bind="$attrs"
    >
      <v-icon v-if="icon !== ''" :name="icon"></v-icon>
      <span>{{ label }}</span>
    </button>
    <div
        :id="`${id}_menu`"
        ref="collapse"
        class="fr-collapse fr-menu"
        role="menu"
        :aria-labelledby="id"
        :class="{ 'fr-collapse--expanded': cssExpanded, 'fr-collapsing': collapsing }"
        @keyup.esc="expanded = false"
        @keydown.tab="expanded = false"
        @keydown.down.prevent="focusOptionDown"
        @keydown.up.prevent="focusOptionUp"
        @keydown="setFocusByFirstCharacter"
        @transitionend="onTransitionEnd(expanded)"
    >
      <ul class="fr-menu__list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.relative-position {
  position: relative;
}

.fr-menu__btn::after {
  flex: 0 0 auto;
  display: inline-block;
  vertical-align: calc((0.75em - var(--icon-size)) * 0.5);
  background-color: currentColor;
  width: var(--icon-size);
  height: var(--icon-size);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0ibTEyIDEzLjE3MiA0Ljk1LTQuOTUgMS40MTQgMS40MTRMMTIgMTYgNS42MzYgOS42MzYgNy4wNSA4LjIyMmw0Ljk1IDQuOTVaIi8+PC9zdmc+);
  mask-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0ibTEyIDEzLjE3MiA0Ljk1LTQuOTUgMS40MTQgMS40MTRMMTIgMTYgNS42MzYgOS42MzYgNy4wNSA4LjIyMmw0Ljk1IDQuOTVaIi8+PC9zdmc+);
  --icon-size: 1rem;
  content: "";
  margin-left: 0.5rem;
  margin-right: 0;
  transition: transform 0.3s;
}

.fr-menu__btn[aria-expanded=true]::after {
  transform: rotate(-180deg);
}

.fr-menu__list {
  --ul-type: none;
  --ul-start: 0;
  --li-bottom: 0;
}

</style>