<script setup lang="ts">

import {computed} from "vue";

import {useRandomId} from '@/utils/random-utils'

import type {DsfrLinkProps} from './DsfrLink.types'

export type {DsfrLinkProps}

const props = withDefaults(defineProps<DsfrLinkProps>(), {
  id: () => useRandomId('link'),
  icon: '',
  label: '',
  disabled: false,
  asButton: false,
  inline: false,
  href: ''
})

const sm = computed(() => ['sm', 'small'].includes(props.size))
const md = computed(() => ['md', 'medium'].includes(props.size))
const lg = computed(() => ['lg', 'large'].includes(props.size))

const type = computed(() => props.asButton ? 'btn' : 'link')

const dsfrIcon = computed(() => typeof props.icon === 'string' && props.icon.startsWith('fr-icon-'))
</script>

<template>
  <a
      :id="`link-${id}`"
      ref="source"
      :href="href !== '' && !disabled ? href : undefined"
      :aria-disabled="disabled"
      :class="{
        [`fr-${type}`]: !inline,
        'fr-btn--secondary': secondary && !tertiary,
        'fr-btn--tertiary': tertiary && !secondary && !noOutline,
        'fr-btn--tertiary-no-outline': tertiary && !secondary && noOutline,
        [`fr-${type}--sm`]: sm,
        [`fr-${type}--md`]: md,
        [`fr-${type}--lg`]: lg,
        [`fr-${type}--icon-right`]: !iconOnly && dsfrIcon && iconRight,
        [`fr-${type}--icon-left`]: !iconOnly && dsfrIcon && !iconRight,
        reverse: iconRight && !dsfrIcon,
        'fr-btn--custom-tooltip': iconOnly,
        'justify-center': !dsfrIcon && iconOnly,
        [icon as string]: dsfrIcon
      }"
      v-bind="$attrs"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<style scoped>
.reverse {
  flex-direction: row-reverse;
}
</style>