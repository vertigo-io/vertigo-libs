<script lang="ts" setup>
import {inject, onMounted} from "vue";
import type {DsfrMenuButtonProps} from './DsfrMenu.types'

export type {DsfrMenuButtonProps}

const props = withDefaults(defineProps<DsfrMenuButtonProps>(), {
  label: ''
})

defineOptions({
  inheritAttrs: false
})

const { itemCounter, incrementCounter, addMenuItem } = inject("itemCounter")
incrementCounter();

const id = inject("id")
const currentCount = itemCounter.value

onMounted(() => {
  addMenuItem(props.label, currentCount)
})

</script>

<template>
  <li role="none">
    <dsfr-button tabindex="-1" role="menuitem" :label="label" :id="`${id}_item_${currentCount}`" secondary class="fr-nav__link" v-bind="$attrs"/>
  </li>
</template>

<style scoped>
</style>