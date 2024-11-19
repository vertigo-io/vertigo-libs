<script setup lang="ts">

import type {DsfrLinkTooltipProps} from './DsfrComponentTooltip.types'

export type {DsfrLinkTooltipProps}

import DsfrComponentTooltip from "@/components/DsfrTooltip/DsfrComponentTooltip.vue";

const props = withDefaults(defineProps<DsfrLinkTooltipProps>(), {
  isLink: true
})
</script>

<template>
  <DsfrComponentTooltip :is-link="isLink" v-bind="$attrs"><slot></slot></DsfrComponentTooltip>
</template>

<style scoped>

</style>