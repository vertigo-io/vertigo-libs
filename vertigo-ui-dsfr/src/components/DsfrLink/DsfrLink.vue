<script setup lang="ts">

import {computed} from "vue";

import {getRandomId} from '@/utils/random-utils'

import type {DsfrLinkProps} from './DsfrLink.types'

export type {DsfrLinkProps}

const props = withDefaults(defineProps<DsfrLinkProps>(), {
  id: () => getRandomId('link'),
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

const dsfrIcon = computed(() => typeof props.icon === 'string' && props.icon.startsWith('fr-icon-'))
</script>

<template>
  <a
      :id="`link-${id}`"
      ref="source"
      :href="href !== '' && !disabled ? href : undefined"
      :aria-disabled="disabled"
      :class="{
        'fr-link': !asButton && !inline,
        'fr-btn': asButton,
        'fr-btn--secondary': secondary && !tertiary,
        'fr-btn--tertiary': tertiary && !secondary && !noOutline,
        'fr-btn--tertiary-no-outline': tertiary && !secondary && noOutline,
        'fr-btn--sm': sm,
        'fr-btn--md': md,
        'fr-btn--lg': lg,
        'fr-btn--icon-right': asButton && !iconOnly && dsfrIcon && iconRight,
        'fr-btn--icon-left': asButton && !iconOnly && dsfrIcon && !iconRight,
        'fr-link--icon-right': !asButton && !inline && !iconOnly && dsfrIcon && iconRight,
        'fr-link--icon-left': !asButton && !inline && !iconOnly && dsfrIcon && !iconRight,
        'inline-flex': !dsfrIcon,
        reverse: iconRight && !dsfrIcon,
        'fr-btn--custom-tooltip': iconOnly,
        'justify-center': !dsfrIcon && iconOnly,
        [icon as string]: dsfrIcon
      }"
      v-bind="$attrs"
  >
    <slot></slot>
  </a>
</template>

<style scoped>
.inline-flex {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.reverse {
  flex-direction: row-reverse;
}
</style>