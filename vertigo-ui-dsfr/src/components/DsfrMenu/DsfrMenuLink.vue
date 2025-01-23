<script lang="ts" setup>
import {computed, inject, onMounted, ref} from "vue";
import type {DsfrMenuButtonProps} from './DsfrMenu.types'

export type {DsfrMenuButtonProps}

const props = withDefaults(defineProps<DsfrMenuButtonProps>(), {
  icon: '',
  label: '',
  url: ''
})

defineOptions({
  inheritAttrs: false
})

const { menuItemIndex, addMenuItem } = inject("menuItem")

const dsfrIcon = computed(() => typeof props.icon === 'string' && props.icon.startsWith('fr-icon-'))
const aClass = `fr-btn fr-btn--secondary fr-nav__link ${dsfrIcon ? props.icon : ''} fr-btn--icon-left`

const id = inject("id")

const currentCount = menuItemIndex.value
addMenuItem(props.label, currentCount)

</script>

<template>
  <li role="none">
    <template v-if="url === ''">
      <dsfr-button tabindex="-1" role="menuitem" :label="label" :id="`${id}_item_${currentCount}`" :icon="icon" tertiary no-outline class="fr-nav__link" v-bind="$attrs"/>
    </template>
    <template v-else>
      <a tabindex="-1"
         role="menuitem"
         :id="`${id}_item_${currentCount}`"
         :href="url"
         :class="aClass"
         v-bind="$attrs">
        <v-icon v-if="!dsfrIcon" :name="icon"></v-icon>
        {{ label }}
      </a>
    </template>
  </li>
</template>

<style scoped>
.fr-nav__link {
  display: inline-flex;
}
</style>