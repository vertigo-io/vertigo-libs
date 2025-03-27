<script setup lang="ts">

import DsfrComponentTooltip from "@/components/DsfrTooltip/DsfrComponentTooltip.vue";

</script>

<template>
  <DsfrComponentTooltip :is-link="false" v-bind="$attrs"><slot></slot></DsfrComponentTooltip>
</template>

<style scoped>

</style>