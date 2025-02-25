<script setup lang="ts">
/**
 * Ce composant permet de créer des boutons, qui utilise un tooltip custom qui répond mieux aux besoins d’accessibilités
 *
 */

import {computed, onMounted, onUnmounted, ref, watch} from 'vue'

import {useRandomId} from '@/utils/random-utils'

import type {DsfrComponentTooltipProps} from './DsfrComponentTooltip.types'

export type {DsfrComponentTooltipProps}

const props = withDefaults(defineProps<DsfrComponentTooltipProps>(), {
  id: () => useRandomId('tooltip'),
  icon: '',
  label: '',
  isLink: false,
  inline: false,
  href: ''
})

const show = ref(false)

const source = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)

const translateX = ref('0px')
const translateY = ref('0px')
const arrowX = ref('0px')
const top = ref(false)
const opacity = ref(0)

async function computePosition () {
  if (typeof document === 'undefined') {
    return
  }
  if (!show.value || tooltip.value.matches(":empty")) {
    return
  }

  await new Promise(resolve => setTimeout(resolve, 100))
  const sourceTop = source.value?.getBoundingClientRect().top as number
  const sourceHeight = source.value?.offsetHeight as number
  const sourceWidth = source.value?.offsetWidth as number
  const sourceLeft = source.value?.getBoundingClientRect().left as number
  const tooltipHeight = tooltip.value?.offsetHeight as number
  const tooltipWidth = tooltip.value?.offsetWidth as number
  const tooltipTop = tooltip.value?.offsetTop as number
  const tooltipLeft = tooltip.value?.offsetLeft as number
  const isSourceAtTop = (sourceTop - tooltipHeight) < 0
  const isSourceAtBottom = !isSourceAtTop && (sourceTop + sourceHeight + tooltipHeight) >= document.documentElement.offsetHeight
  top.value = isSourceAtBottom
  const isSourceOnRightSide = (sourceLeft + sourceWidth) >= document.documentElement.offsetWidth
  const isSourceOnLeftSide = (sourceLeft + (sourceWidth / 2) - (tooltipWidth / 2)) <= 0

  translateY.value = isSourceAtBottom
      ? `${sourceTop - tooltipTop - tooltipHeight + 8}px`
      : `${sourceTop - tooltipTop + sourceHeight - 8}px`
  opacity.value = 1
  translateX.value = isSourceOnRightSide
      ? `${sourceLeft - tooltipLeft + sourceWidth - tooltipWidth - 4}px`
      : isSourceOnLeftSide
          ? `${sourceLeft - tooltipLeft + 4}px`
          : `${sourceLeft - tooltipLeft + (sourceWidth / 2) - (tooltipWidth / 2)}px`

  arrowX.value = isSourceOnRightSide
      ? `${(tooltipWidth / 2) - (sourceWidth / 2) + 4}px`
      : isSourceOnLeftSide
          ? `${-(tooltipWidth / 2) + (sourceWidth / 2) - 4}px`
          : '0px'
}

watch(show, computePosition, { immediate: true })

onMounted(() => {
  window.addEventListener('scroll', computePosition)
  source.value.addEventListener('click', () => show.value = false);
})
onUnmounted (() => {
  window.removeEventListener('scroll', computePosition)
})

const sm = computed(() => ['sm', 'small'].includes(props.size))
const md = computed(() => ['md', 'medium'].includes(props.size))
const lg = computed(() => ['lg', 'large'].includes(props.size))

const dsfrIcon = computed(() => typeof props.icon === 'string' && props.icon.startsWith('fr-icon-'))

const tooltipStyle = computed(() => (`transform: translate(${translateX.value}, ${translateY.value}); --arrow-x: ${arrowX.value}; opacity: ${opacity.value};'`))
const tooltipClass = computed(() => ({
  'fr-tooltip--shown': show.value,
  'fr-placement--top': top.value,
  'fr-placement--bottom': !top.value,
}))

const clickHandler = (event: MouseEvent) => {
  if (!show.value) {
    return
  }
  if (event.target === source.value || source.value?.contains(event.target as Node)) {
    return
  }
  if (event.target === tooltip.value || tooltip.value?.contains(event.target as Node)) {
    return
  }
  show.value = false
}

const keydownHandler = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    show.value = false
  }
}

const onMouseEnterHandler = (event: MouseEvent) => {
  if ((event.target === source.value || source.value?.contains(event.target as Node))) {
    show.value = true
    // @ts-ignore internal property available just for this component
    globalThis.__vueDsfr__lastTooltipShow.value = false
  }
}

const onMouseLeave = () => {
  show.value = false
}

onMounted(() => {
  document.documentElement.addEventListener('keydown', keydownHandler)
  document.documentElement.addEventListener('mouseover', onMouseEnterHandler)
})

onUnmounted(() => {
  document.documentElement.removeEventListener('keydown', keydownHandler)
  document.documentElement.removeEventListener('mouseover', onMouseEnterHandler)
})

</script>

<template>
  <component
      :id="`button-${id}`"
      ref="source"
      :is="href !== '' ? 'a' : 'button'"
      :href="href !== '' ? href : undefined"
      :class="{
        'fr-link': isLink && !inline,
        'fr-btn': !isLink,
        'fr-btn--secondary': secondary && !tertiary,
        'fr-btn--tertiary': tertiary && !secondary && !noOutline,
        'fr-btn--tertiary-no-outline': tertiary && !secondary && noOutline,
        'fr-btn--sm': sm,
        'fr-btn--md': md,
        'fr-btn--lg': lg,
        'fr-btn--icon-right': !isLink && !iconOnly && dsfrIcon && iconRight,
        'fr-btn--icon-left': !isLink && !iconOnly && dsfrIcon && !iconRight,
        'fr-link--icon-right': isLink && !inline && !iconOnly && dsfrIcon && iconRight,
        'fr-link--icon-left': isLink && !inline && !iconOnly && dsfrIcon && !iconRight,
        'inline-flex': !dsfrIcon,
        reverse: iconRight && !dsfrIcon,
        'fr-btn--custom-tooltip': iconOnly,
        'justify-center': !dsfrIcon && iconOnly,
        [icon as string]: dsfrIcon,
      }"
      :disabled="href !== '' ? undefined : disabled"
      :aria-disabled="disabled"
      :aria-labelledby="id"
      @mouseleave="onMouseLeave()"
      @focus="onMouseEnterHandler($event)"
      @blur="onMouseLeave()"
      v-bind="$attrs"
  >
    {{ label }}
  </component>
  <p
      :id="id"
      ref="tooltip"
      class="fr-tooltip fr-placement"
      :class="tooltipClass"
      :style="tooltipStyle"
      role="tooltip"
      aria-hidden="true"
  >
    <slot>
      {{ content }}
    </slot>
  </p>
</template>

<style scoped>
.fr-tooltip {
  transition: opacity 0.3s ease-in-out;
}

.fr-btn--custom-tooltip {
  font-size: .875rem;
  line-height: 1.5rem;
  max-height: 2rem !important;
  max-width: 2rem !important;
  min-height: 2rem;
  overflow: hidden;
  padding: .25rem .5rem !important;
  white-space: nowrap;
}

.fr-btn--custom-tooltip::before {
  --icon-size: 1rem !important;
  background-color: currentColor;
  content: "";
  display: inline-block;
  flex: 0 0 auto;
  height: var(--icon-size);
  margin-left: 0;
  margin-right: .5rem;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  vertical-align: calc((.75em - var(--icon-size)) * .5);
  width: var(--icon-size);
}

.inline-flex {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.reverse {
  flex-direction: row-reverse;
}
</style>