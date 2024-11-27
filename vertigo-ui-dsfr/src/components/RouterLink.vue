<!-- Ce composant nous permet de nous passer du router qui est utilisé par vue-dsfr pour remplacer ça par de simples liens <a>  -->
<!-- Dans le cadre de notre MPA, ce router n’a pas réellement d’intêret et la dépendance n’est de toute façon pas tirée -->
<script setup>

  const props = defineProps(['to'])
  const current = props.to === '/'
      ? window.location.pathname === props.to
      : window.location.pathname.startsWith(props.to);

</script>

<template>
  <a :href="props.to" :aria-current="current ? 'page' : undefined">
    <slot></slot>
  </a>
</template>

<style scoped>

</style>