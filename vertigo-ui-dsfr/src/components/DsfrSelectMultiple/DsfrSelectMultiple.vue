<script lang="ts" setup>
import {ref, computed, watch, onMounted, onUnmounted} from 'vue';
import {useCollapsable} from '@/composables/useCollapsable'

import type {DsfrSelectMultipleProps} from './DsfrSelectMultiple.types'
import {getRandomId} from "@/utils/random-utils";

export type {DsfrSelectMultipleProps}

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

// Props
const props = withDefaults(defineProps<DsfrSelectMultipleProps>(), {
  id: () => getRandomId("select-multiple"),
  options: () => [],
  label: '',
  name: undefined,
  description: undefined,
  successMessage: '',
  errorMessage: '',
  comboHasButton: true,
  comboHasFilter: true,
  comboLabel: '',
  comboDescription: ''
})

const expanded = ref(false)
const modelValue = defineModel({default: []})
const localOptions = ref(props.options)

watch(expanded, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    doExpand(newValue)
    if (newValue) {
      document.addEventListener("click", handleFocusOut);
      document.addEventListener("touchstart", handleFocusOut);
    } else {
      document.removeEventListener("click", handleFocusOut);
      document.removeEventListener("touchstart", handleFocusOut);
    }
  }
})

// Ref

const container = ref(null)
const button = ref(null)
const filter = ref(null)

// Computed

const message = computed(() => {
  return props.errorMessage || props.successMessage
})
const messageType = computed(() => {
  return props.errorMessage !== '' ? 'error' : 'valid'
})

const selectAllIcon = computed(() => {
  return props.modelValue.length === localOptions.value.length ? 'fr-icon-close-circle-line' : 'fr-icon-check-line'
})
const selectAllText = computed(() => {
  return props.modelValue.length === localOptions.value.length ? 'Tout déselectionner' : 'Tout sélectionner'
})

const selectionDisplay = computed(() => {
  const count = props.options.filter(o => props.modelValue.includes(o.value)).length;
  let result = `${count} options séléctionnées`
  if (props.modelValue.length > 2) {
    return result;
  } else {
    return props.options
        .filter(o => props.modelValue.includes(o.value))
        .map(o => o.text)
        .join(", ")
  }
})

// Methods

let selectAll = function () {
  if (props.modelValue.length >= localOptions.value.length) {
    props.modelValue.length = 0;
  } else {
    const unduplicatedOptions = localOptions.value.filter(o => !props.modelValue.includes(o.value));
    for (let opt of unduplicatedOptions) {
      props.modelValue.push(opt.value)
    }
  }
}

let filterFn = function (event) {
  const needle = event.target.value.toLowerCase();
  localOptions.value = props.options.filter(o => o.text.toLowerCase().indexOf(needle) > -1);
}

const getNextFocusableItem = (currentItemId, direction) => {
  const nextId = direction === "down"
      ? (currentItemId + 1) % localOptions.value.length
      : (currentItemId - 1 + localOptions.value.length) % localOptions.value.length;

  const item = document.getElementById(`${props.id}_option_${nextId}`);

  return item.ariaDisabled === "true"
      ? getNextFocusableItem(nextId, direction)
      : item;
};

const focusNextOption = (direction) => {
  const activeId = document.activeElement.id;
  const currentItemId = activeId.startsWith(`${props.id}_option_`)
      ? Number(activeId.split("_")[2])
      : (direction === "down" ? -1 : 0);

  getNextFocusableItem(currentItemId, direction).focus();
};

const focusOptionDown = (event) => focusNextOption("down");
const focusOptionUp = (event) => focusNextOption("up");

/* Détermine le prochain focus lorsque l’on appuie sur tab une fois dans le popup*/
let setFocusTabFromDiv = function (event) {
  if (!event.shiftKey) {
    if (props.comboHasButton) {
      if (!expanded.value) {
        expanded.value = true
        event.preventDefault()
        setTimeout(() => button.value.focus(), 100)
      }
    } else if (props.comboHasFilter) {
      if (!expanded.value) {
        expanded.value = true
        event.preventDefault()
        setTimeout(() => filter.value.focus(), 100)
      }
    }
  }
}

/* Détermine le prochain focus lorsque l’on appuie sur tab une fois sur le champs select*/
let setFocusTabInDiv = function (event) {
  if (!event.shiftKey) {
    if (props.comboHasButton && !props.comboHasFilter && document.activeElement.id === `${props.id}_button`) {
      event.preventDefault();
      expanded.value = false
    } else if (props.comboHasFilter && document.activeElement.id === `${props.id}_filter`) {
      event.preventDefault();
      expanded.value = false
    }
    if (!props.comboHasFilter && !props.comboHasButton) {
      expanded.value = false
    }
  }
}

let setFocusForShiftTab = function (event) {
  if (document.activeElement.id.startsWith(`${props.id}_option_`)) {
    if (props.comboHasFilter) {
      event.preventDefault()
      filter.value.focus()
    } else if (props.comboHasButton) {
      button.value.focus()
    }
  }
}

let setFocusByFirstCharacter = (event) => {
  let char = event.key;
  if ((char.length > 1 && char.match(/\S/)) || document.activeElement.id === `${props.id}_filter`) {
    return;
  }

  char = char.toLowerCase();

  let filteredItems = localOptions.value.filter(o => o.text.toLowerCase().startsWith(char))
  let activeDocumentId = document.activeElement.id;
  for (let item of filteredItems) {
    let domItem = document.querySelector(`[data-id='${item.value}']`)
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
  <div
      ref="container"
      class="fr-select-group"
      @keyup.tab="handleFocusOut"
      :class="{ [`fr-select-group--${messageType}`]: message !== ''}"
      v-bind="$attrs"
  >
    <label
        class="fr-label"
        :for="id"
        :id="`${id}_label`"
    >
      <slot name="label">
        {{ label }}
        <slot name="required-tip">
          <span
              v-if="required"
              class="required"
          >&nbsp;*</span>
        </slot>
      </slot>

      <span
          v-if="description"
          class="fr-hint-text">{{ description }}</span>
    </label>

    <div
        :id="id"
        :class="{ [`fr-select--${messageType}`]: message !== ''}"
        class="fr-input fr-select--menu flex"
        @click="expanded = !expanded"
        @keydown.esc.stop="expanded = false"
        @keydown.space.prevent="expanded = !expanded"
        @keydown.down.prevent="focusOptionDown"
        @keydown.up.prevent="focusOptionUp"
        @keydown.tab="setFocusTabFromDiv"
        @keydown="setFocusByFirstCharacter"
        tabindex="0"
        role="combobox"
        aria-haspopup="listbox"
        aria-autocomplete="none"
        :aria-labelledby="`${id}_label`"
        :aria-disabled="disabled"
        :aria-controls="`${id}_list`"
        :aria-expanded="expanded"
        :aria-required="required"
    >
      <p class="grow overflow">{{ selectionDisplay }}</p>
      <div class="fr-pl-1v fr-select__icon">
        <v-icon style="font-size: 1rem" name="ri-arrow-down-s-line"></v-icon>
      </div>
    </div>
    <div
        :id="`${id}_list`"
        ref="collapse"
        class="fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white"
        :class="{ 'fr-collapse--expanded': cssExpanded, 'fr-collapsing': collapsing }"
        @keyup.esc="expanded = false"
        @keydown.tab="setFocusTabInDiv"
        @keydown.down.prevent="focusOptionDown"
        @keydown.up.prevent="focusOptionUp"
        @keydown.shift.tab="setFocusForShiftTab"
        @keydown="setFocusByFirstCharacter"
        @transitionend="onTransitionEnd(expanded)"
    >
      <ul class="fr-btns-group fr-btns-group--icon-left" v-if="comboHasButton">
        <li>
          <button class="fr-btn fr-btn--tertiary fr-btn--sm"
                  :id="`${id}_button`"
                  @click="selectAll()"
                  ref="button"
                  :class="`${selectAllIcon}`" type="button">{{ selectAllText }}
          </button>
        </li>
      </ul>

      <div class="fr-input-wrap fr-icon-search-line fr-mb-3v" v-if="comboHasFilter">
        <input class="fr-input"
               :id="`${id}_filter`"
               ref="filter"
               @input="filterFn"
               aria-label="Rechercher une option"
               placeholder="Rechercher"
               type="text">
      </div>

      <p class="fr-label fr-mb-2v" v-if="comboLabel">
        {{ comboLabel }}
        <span class="fr-hint-text" v-if="comboDescription">{{ comboDescription }}</span>
      </p>

      <ul role="listbox" aria-multiselectable="true" class="fr-select__ul">
        <li v-for="(option, idx) in localOptions"
            class="fr-checkbox-group fr-checkbox-group--sm fr-py-1v"
            role="option"
            :aria-selected="modelValue.includes(option.value)">
          <input :id="`${id}_option_${idx}`" :data-id="option.value" type="checkbox" class="" tabindex="-1" :value="option.value" v-model="modelValue">
          <label class="fr-label" :for="`${id}_option_${idx}`">
            {{ option.text }}
          </label>
        </li>
      </ul>
    </div>
  </div>
  <p
      v-if="message"
      :id="`select-${messageType}-desc-${messageType}`"
      :class="`fr-${messageType}-text`"
  >
    {{ message }}
  </p>
</template>

<style scoped>
.fr-select__menu {
  pointer-events: unset !important;
  margin: 0 !important;
}

p.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  height: 1.5rem;
}

.bg-white {
  background: var(--background-default-grey);
}

.fr-select__ul {
  --xl-block: 0;
  --ul-type: none;
  padding-left: 0;
  overflow-y: scroll;
  max-height: 300px;
}
</style>