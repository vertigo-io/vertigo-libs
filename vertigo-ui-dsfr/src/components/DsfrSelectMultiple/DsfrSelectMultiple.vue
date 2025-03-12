<script lang="ts" setup>
import {ref, computed, watch} from 'vue';
import {useCollapsable} from '@/composables/useCollapsable'

import type {DsfrSelectMultipleProps} from './DsfrSelectMultiple.types'
import {useRandomId} from "@/utils/random-utils";

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
  id: () => useRandomId("select-multiple"),
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
const filterValue = ref('')

// Computed

const message = computed(() => {
  return props.errorMessage || props.successMessage
})
const messageType = computed(() => {
  return props.errorMessage !== '' ? 'error' : 'valid'
})

const selectAllIcon = computed(() => {
  return localOptions.value.every(x => props.modelValue.includes(x.value)) ? 'fr-icon-close-circle-line' : 'fr-icon-check-line'
})
const selectAllText = computed(() => {
  return localOptions.value.every(x => props.modelValue.includes(x.value)) ? 'Tout déselectionner' : 'Tout sélectionner'
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

/*
  Gère les evenements claviers de la div principale
 */
const handleDivKeypress = function (e) {
  switch (e.key) {
    case 'Escape':
    case 'Esc':
      e.stopPropagation();
      expanded.value = false;
      break;
    case ' ':
    case 'Space':
      if (document.activeElement.id === props.id) {
        e.preventDefault();
        expanded.value = !expanded.value
      }
      break;
    case 'Down':
    case 'ArrowDown':
      e.preventDefault();
      if (!expanded.value) {
        expanded.value = true
        setTimeout(() => focusItemDown(e), 100)
      } else {
        focusItemDown(e)
      }
      break;
    case 'Up':
    case 'ArrowUp':
      e.preventDefault();
      if (!expanded.value) {
        expanded.value = true
        setTimeout(() => focusItemUp(e), 100)
      } else {
        focusItemUp(e)
      }
      break;
    case 'Tab':
      handleTab(e);
      break;
    default:
      let isAlphaNumeric = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test(e.key);

      if (!isAlphaNumeric && e.shiftKey) {
        return
      }

      if (props.comboHasFilter && document.activeElement.id === `${props.id}_filter`) {
        // Filter has focus
      } else {
        if (props.comboHasFilter && isAlphaNumeric) {
          filter.value.focus();
        } else {
          setFocusByFirstCharacter(e);
        }
      }
  }
}

const getNextFocusableItem = (currentItemId, direction) => {
  const nextId = direction === "down"
      ? (currentItemId + 1) % (localOptions.value.length)
      : (currentItemId - 1 + localOptions.value.length) % (localOptions.value.length);

  const item = document.getElementById(`${props.id}_item_${nextId}`);

  return item === null || item.ariaDisabled === "true"
      ? getNextFocusableItem(nextId, direction)
      : item;
};

const focusNextItem = (direction) => {
  const activeId = document.activeElement.id;
  const currentItemId = activeId.startsWith(`${props.id}_item_`)
      ? Number(activeId.split("_")[2])
      : (direction === "down" ? -1 : 0);

  getNextFocusableItem(currentItemId, direction).focus();
};

const focusItemDown = (event) => focusNextItem("down");
const focusItemUp = (event) => focusNextItem("up");

const handleTab = (e) => {
  if (!expanded.value) {
    return
  }

  const elements = [];

  if (props.comboHasButton) {
    elements.push(`${props.id}_button`);
  }
  if (props.comboHasFilter) {
    elements.push(`${props.id}_filter`);
  }

  elements.push('item');

  const currentIndex = elements.indexOf(e.target.id);
  let nextIndex;

  if (e.shiftKey) {
    // Navigation en arrière (Shift + Tab)
    nextIndex = (currentIndex - 1 + elements.length) % elements.length;
  } else {
    // Navigation en avant (Tab)
    nextIndex = (currentIndex + 1) % elements.length;
  }

  const nextElement = document.getElementById(elements[nextIndex]);
  if (elements[nextIndex] === 'item') {
    focusItemDown();
    e.preventDefault();
  } else if (nextElement) {
    nextElement.focus();
    e.preventDefault();
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

let toggleOption = (event, value) => {
  if (modelValue.value.includes(value)) {
    modelValue.value.splice(modelValue.value.indexOf(value), 1);
  } else {
    modelValue.value.push(value);
    if (localOptions.value.length === 1) {
      filterValue.value = "";
    }
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
        @keydown="handleDivKeypress"
        :value="selectionDisplay"
        tabindex="0"
        aria-autocomplete="none"
        role="combobox"
        :aria-expanded="expanded"
        aria-haspopup="dialog"
        :aria-controls="`${id}_dialog`"
        :aria-disabled="disabled"
        :aria-required="required"
    >
      <p class="grow overflow">{{ selectionDisplay }}</p>
      <div class="fr-pl-1v fr-select__icon">
        <v-icon style="font-size: 1rem" name="ri-arrow-down-s-line"></v-icon>
      </div>
    </div>
    <div
        :id="`${id}_dialog`"
        ref="collapse"
        role="dialog"
        aria-modal="true"
        aria-label="Choix des options"
        class="fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white"
        :class="{ 'fr-collapse--expanded': cssExpanded, 'fr-collapsing': collapsing }"
        @keydown="handleDivKeypress"
        @transitionend="onTransitionEnd(expanded)"
    >
      <div class="fr-btns-group fr-btns-group--icon-left" v-if="comboHasButton">
        <button class="fr-btn fr-btn--tertiary fr-btn--sm"
                :id="`${id}_button`"
                @click="selectAll()"
                ref="button"
                :class="`${selectAllIcon}`" type="button">{{ selectAllText }}
        </button>
      </div>

      <div class="fr-input-wrap fr-icon-search-line fr-mb-3v" v-if="comboHasFilter">
        <input class="fr-input"
               :id="`${id}_filter`"
               ref="filter"
               @input="filterFn"
               v-model="filterValue"
               aria-label="Rechercher une option"
               :aria-controls="`${id}_listbox`"
               placeholder="Rechercher"
               type="text">
      </div>

      <p class="fr-label fr-mb-2v" :id="`${id}_combolabel`" v-if="comboLabel">
        {{ comboLabel }}
        <span class="fr-hint-text" v-if="comboDescription">{{ comboDescription }}</span>
      </p>

      <ul role="listbox"
          aria-multiselectable="true"
          :aria-describedby="comboLabel ? `${id}_combolabel` : null"
          :id="`${id}_listbox`"
          aria-live="polite"
          class="fr-select__ul">
        <li v-for="(option, idx) in localOptions"
            class="fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v"
            :id="`${id}_item_${idx}`"
            tabindex="-1"
            role="option"
            @keydown.space.prevent="(e) => toggleOption(e, option.value)"
            @click="(e) => toggleOption(e, option.value)"
            :aria-selected="modelValue.includes(option.value)">
          <input :data-id="option.value" type="hidden" class="" tabindex="-1"
                 :value="option.value" v-model="modelValue">
          <span>
            {{ option.text }}
          </span>
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

ul[aria-multiselectable=true] li[aria-selected=true] span::before {
  --data-uri-svg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23f5f5fe' d='m10 15.17 9.2-9.2 1.4 1.42L10 18l-6.36-6.36 1.4-1.42z'/%3E%3C/svg%3E");
  background-color: var(--background-active-blue-france);
  background-image: radial-gradient(at 5px 4px, transparent 4px, var(--border-active-blue-france) 4px, var(--border-active-blue-france) 5px, transparent 6px), linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)), radial-gradient(at calc(100% - 5px) 4px, transparent 4px, var(--border-active-blue-france) 4px, var(--border-active-blue-france) 5px, transparent 6px), linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)), radial-gradient(at calc(100% - 5px) calc(100% - 4px), transparent 4px, var(--border-active-blue-france) 4px, var(--border-active-blue-france) 5px, transparent 6px), linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)), radial-gradient(at 5px calc(100% - 4px), transparent 4px, var(--border-active-blue-france) 4px, var(--border-active-blue-france) 5px, transparent 6px), linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)), var(--data-uri-svg);
}

ul[aria-multiselectable=true] li span {
  --data-uri-svg: none;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 2rem;
  position: relative;
  cursor: pointer;
}

ul {
  padding: 0 4px !important;
}

ul[aria-multiselectable=true] li span::before {
  height: 1rem;
  left: -1.5rem;
  margin-top: .25rem;
  width: 1rem;

  background-image: radial-gradient(at 5px 4px, transparent 4px, var(--border-action-high-blue-france) 4px, var(--border-action-high-blue-france) 5px, transparent 6px), linear-gradient(var(--border-action-high-blue-france), var(--border-action-high-blue-france)), radial-gradient(at calc(100% - 5px) 4px, transparent 4px, var(--border-action-high-blue-france) 4px, var(--border-action-high-blue-france) 5px, transparent 6px), linear-gradient(var(--border-action-high-blue-france), var(--border-action-high-blue-france)), radial-gradient(at calc(100% - 5px) calc(100% - 4px), transparent 4px, var(--border-action-high-blue-france) 4px, var(--border-action-high-blue-france) 5px, transparent 6px), linear-gradient(var(--border-action-high-blue-france), var(--border-action-high-blue-france)), radial-gradient(at 5px calc(100% - 4px), transparent 4px, var(--border-action-high-blue-france) 4px, var(--border-action-high-blue-france) 5px, transparent 6px), linear-gradient(var(--border-action-high-blue-france), var(--border-action-high-blue-france)), var(--data-uri-svg);
  background-position: 0 0, .25rem 0, 100% 0, 0 .25rem, 100% 100%, calc(100% - .25rem) 100%, 0 100%, 100% .25rem, 50%;
  background-repeat: no-repeat;
  background-size: .25rem .25rem, calc(100% - .25rem) 1px, .25rem .25rem, 1px calc(100% - .5rem), .25rem .25rem, calc(100% - .5rem) 1px, .25rem .25rem, 1px calc(100% - .5rem), 1rem;
  border-radius: .25rem;
  content: "";
  display: block;
  margin-right: .5rem;
  position: absolute;
  top: 0;
}

</style>