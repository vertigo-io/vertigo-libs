<script lang="ts" setup>
import {inject, onMounted, ref} from "vue";
import type {DsfrMenuButtonProps} from './DsfrMenu.types'

export type {DsfrMenuButtonProps}

const props = withDefaults(defineProps<DsfrMenuButtonProps>(), {
  label: '',
  url: ''
})

defineOptions({
  inheritAttrs: false
})

const { menuItemIndex, addMenuItem } = inject("menuItem")

const id = inject("id")
const currentCount = menuItemIndex.value
addMenuItem(props.label, currentCount)

</script>

<template>
  <li role="none">
    <template v-if="url === ''">
      <dsfr-button tabindex="-1" role="menuitem" :label="label" :id="`${id}_item_${currentCount}`" secondary class="fr-nav__link" v-bind="$attrs"/>
    </template>
    <template v-else>
      <a tabindex="-1" role="menuitem" :id="`${id}_item_${currentCount}`" :href="url" class="fr-btn fr-btn--secondary fr-nav__link" v-bind="$attrs">{{ label }}</a>
    </template>
  </li>
</template>

<style scoped>
</style>