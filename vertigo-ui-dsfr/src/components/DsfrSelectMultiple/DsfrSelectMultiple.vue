<script lang="ts" setup>
import {ref, computed, watch} from 'vue';
import {useCollapsable} from '@/composables/useCollapsable'

import type {DsfrSelectMultipleProps} from './DsfrSelectMultiple.types'

export type {DsfrSelectMultipleProps}

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
  selectId: () => 'id',
  options: () => [],
  label: '',
  selectId: '',
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
  }
})

// Ref

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
  let result = `${props.modelValue.length} options séléctionnées`
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
    for (let opt of localOptions.value) {
      props.modelValue.push(opt.value)
    }
  }
}

let filterFn = function (event) {
  const needle = event.target.value.toLowerCase();
  localOptions.value = props.options.filter(o => o.text.toLowerCase().indexOf(needle) > -1);
}

let focusOptionDown = function (event) {
  if (document.activeElement.id.startsWith("opt-")) {
    const optId = Number(document.activeElement.id.split("-")[1]);
    if (optId < localOptions.value.length - 1) {
      document.getElementById(`opt-${optId + 1}`).focus();
    } else {
      focusFirstOption()
    }
  } else {
    focusFirstOption();
  }
}

let focusOptionUp = function (event) {
  if (document.activeElement.id.startsWith("opt-")) {
    const optId = Number(document.activeElement.id.split("-")[1]);
    if (optId > 0) {
      document.getElementById(`opt-${optId - 1}`).focus();
    } else {
      focusLastOption()
    }
  } else {
    focusLastOption()
  }
}

let focusFirstOption = function (event) {
  document.getElementById("opt-0").focus();
}

let focusLastOption = function (event) {
  document.getElementById(`opt-${localOptions.value.length - 1}`).focus();
}

let focusTabFromDiv = function (event) {
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

let focusTabInDiv = function (event) {
  if (!event.shiftKey) {
    if (props.comboHasButton && !props.comboHasFilter && document.activeElement.id === `${props.selectId}_button`) {
      event.preventDefault();
      expanded.value = false
    } else if (props.comboHasFilter && document.activeElement.id === `${props.selectId}_filter`) {
      event.preventDefault();
      expanded.value = false
    }
    if (!props.comboHasFilter && !props.comboHasButton) {
      expanded.value = false
    }
  }
}

let focusAltTab = function (event) {
  if (document.activeElement.id.startsWith("opt-")) {
    if (props.comboHasFilter) {
      event.preventDefault()
      filter.value.focus()
    } else if (props.comboHasButton) {
      button.value.focus()
    }
  }
}

</script>

<template>
  <div
      class="fr-select-group"
      :class="{ [`fr-select-group--${messageType}`]: message !== ''}"
  >
    <label
        class="fr-label"
        for="selectId"
    >
      <!-- @slot Slot pour personnaliser tout le contenu de la balise <label> cf. [DsfrInput](/?path=/story/composants-champ-de-saisie-champ-simple-dsfrinput--champ-avec-label-personnalise). Une **props porte le même nom pour un label simple** (texte sans mise en forme) -->
      <slot name="label">
        {{ label }}
        <!-- @slot Slot pour indiquer que le champ est obligatoire. Par défaut, met une astérisque si `required` est à true (dans un `<span class="required">`) -->
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
        :id="selectId"
        :class="{ [`fr-select--${messageType}`]: message !== ''}"
        class="fr-input"
        @click.prevent.stop="expanded = !expanded"
        @keyup.esc.stop="expanded = false"
        @keyup.space.prevent="expanded = !expanded"
        @keydown.down.prevent="focusFirstOption"
        @keydown.up.prevent="focusLastOption"
        @keydown.tab="focusTabFromDiv"
        tabindex="0"
        role="combobox"
        aria-haspopup="listbox"
        aria-autocomplete="none"
        :aria-disabled="disabled"
        :aria-controls="`${selectId}_list`"
        :aria-expanded="expanded"
        :aria-required="required"
        v-bind="$attrs"
    >
      <p>{{ selectionDisplay }}</p>
    </div>
    <div
        :id="`${selectId}_list`"
        ref="collapse"
        class="fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white"
        :class="{ 'fr-collapse--expanded': cssExpanded, 'fr-collapsing': collapsing }"
        @keyup.esc="expanded = false"
        @keydown.tab="focusTabInDiv"
        @keydown.down.prevent="focusOptionDown"
        @keydown.up.prevent="focusOptionUp"
        @keydown.shift.tab="focusAltTab"
        @transitionend="onTransitionEnd(expanded)"
    >
      <ul class="fr-btns-group fr-btns-group--icon-left" v-if="comboHasButton">
        <li>
          <button class="fr-btn fr-btn--tertiary"
                  :id="`${selectId}_button`"
                  @click="selectAll()"
                  ref="button"
                  :class="`${selectAllIcon}`" type="button">{{ selectAllText }}
          </button>
        </li>
      </ul>

      <div class="fr-input-wrap fr-icon-search-line fr-mb-3v" v-if="comboHasFilter">
        <input class="fr-input"
               :id="`${selectId}_filter`"
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

      <ul role="listbox" class="fr-select__ul">
        <li v-for="(option, idx) in localOptions" class="fr-checkbox-group fr-checkbox-group--sm fr-py-1v"
            role="option" :aria-selected="modelValue.includes(option.value)">
          <input :id="`opt-${idx}`" type="checkbox" class="" :value="option.value" v-model="modelValue">
          <label class="fr-label" :for="`opt-${idx}`">
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

.bg-white {
  background: var(--background-default-grey);
}

.fr-select__ul {
  --xl-block: 0;
  --ul-type: none;
  padding-left: 0;
}
</style>