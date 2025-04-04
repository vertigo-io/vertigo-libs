<script lang="ts" setup>
import {onMounted, provide, ref, watch} from 'vue';
import {useCollapsable} from '@/composables/useCollapsable'

import type {DsfrHeaderMenuProps} from './DsfrHeaderMenu.types'
import {useRandomId} from '@/utils/random-utils'
import {VIcon} from "@gouvminint/vue-dsfr";

export type {DsfrHeaderMenuProps}

defineOptions({
  inheritAttrs: false
})

// Collapsable
const {
  collapse,
  collapsing,
  cssExpanded,
  doExpand,
  onTransitionEnd,
} = useCollapsable()

const props = withDefaults(defineProps<DsfrHeaderMenuProps>(), {
  id: () => useRandomId("header-menu"),
  icon: '',
  label: '',
  disabled: false,
  logoutUrl: '',
  logoutLabel: 'Se déconnecter',
  nom: '',
  email: ''
})

const container = ref(null)
const expanded = ref(false)
let menuItemIndex = ref(0)
let menuItems = []

const addMenuItem = (label, id) => {
  menuItemIndex.value += 1
  menuItems.push(`${label}@${id}`)
}

provide('menuItem', { menuItemIndex, addMenuItem })
provide('id', props.id)

watch(expanded, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    doExpand(newValue)
    if (newValue) {
      setTimeout(() => focusOptionDown(), 100)
      document.addEventListener("click", handleFocusOut);
      document.addEventListener("touchstart", handleFocusOut);
    } else {
      document.removeEventListener("click", handleFocusOut);
      document.removeEventListener("touchstart", handleFocusOut);
    }
  }
})

onMounted(() => {
  addMenuItem(props.logoutLabel, menuItemIndex.value)
})

const getNextFocusableItem = (currentItemId, direction) => {
  const nextId = direction === "down"
      ? (currentItemId + 1) % menuItems.length
      : (currentItemId - 1 + menuItems.length) % menuItems.length;

  const item = document.getElementById(`${props.id}_item_${nextId}`);

  return item.ariaDisabled === "true"
      ? getNextFocusableItem(nextId, direction)
      : item;
};

const focusNextOption = (direction) => {
  const activeId = document.activeElement.id;
  const currentItemId = activeId.startsWith(`${props.id}_item_`)
      ? Number(activeId.split("_")[2])
      : (direction === "down" ? -1 : 0);

  getNextFocusableItem(currentItemId, direction).focus();
};

const focusOptionDown = (event) => focusNextOption("down");
const focusOptionUp = (event) => focusNextOption("up");

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

let handleFocusOut = (event) => {
  if (!container.value.contains(event.target)) {
    expanded.value = false;
  }
}

</script>

<template>
  <div class="relative-position fr-menu-header" @keyup.tab="handleFocusOut" ref="container">
    <button
        :id="id"
        @click.prevent.stop="expanded = !expanded"
        @keyup.esc.stop="expanded = false"
        @keyup.space.prevent="expanded = !expanded"
        @keydown.down.prevent="focusOptionDown"
        @keydown.up.prevent="focusOptionUp"
        @keydown="setFocusByFirstCharacter"
        @keydown.tab="expanded = false"
        class="fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left"
        :class="{ [icon as string]: true }"
        type="button"
        aria-haspopup="menu"
        :aria-disabled="disabled"
        :aria-controls="`${id}_menu`"
        :aria-expanded="expanded"
        v-bind="$attrs"
    >
      <span>{{ label }}</span>
    </button>
    <div
        :id="`${id}_menu`"
        ref="collapse"
        class="fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white"
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
      <slot name="detail">
        <p class="fr-label fr-mb-0" v-if="!(nom === '' && email === '')">
          {{ nom }}
          <span class="fr-hint-text" v-if="email !== ''">{{ email }}</span>
        </p>
      </slot>
      <ul class="fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0" role="none">
        <slot></slot>
        <li role="none">
          <div class="fr-p-2v">
            <a v-if="logoutUrl !== ''" :id="`${id}_item_${menuItemIndex - 1}`"
               class="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left"
               role="menuitem" tabindex="-1" :href="logoutUrl">{{ logoutLabel }}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.relative-position {
  position: relative;
}

.fr-menu {
  width: max-content;
  text-align: left;
}

.fr-label {
  font-weight: bold;
}

.fr-hint-text {
  font-weight: normal;
}

.fr-menu__btn {
  margin-bottom: 1px !important;
}

.fr-menu-header__modal {
  pointer-events: unset !important;
  margin: 0 !important;
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

.fr-menu-header__list {
  --ul-type: none;
  --ul-start: 0;
  --li-bottom: 0;
  padding: 0;
  margin-top: 8px;
}

.fr-menu__list .fr-btn--secondary {
  box-shadow: unset;
}

.fr-menu-header__list :deep(li .fr-btn) {
  min-height: 2.5rem !important;
  padding: .75rem 1rem !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: unset !important;
}

.fr-menu-header__list :deep(li .fr-btn:not(:disabled)) {
  color: var(--text-action-high-grey);
}

.fr-menu-header__list :deep(li:last-child .fr-btn:not(:disabled)) {
  padding: .25rem .75rem !important;
  color: var(--text-action-high-blue-france);
}

.bg-white {
  background: var(--background-default-grey);
}

</style>