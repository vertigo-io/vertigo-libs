<script>

export default {
  name: "DsfrVTable",
  props: {
    key: String,
    props: Object
  },
  computed: {},
  data: function () {
    return {}
  },
  created: function () {
  },
  methods: {}
}
</script>

<template>
  <td :key="key">
    <slot :props="props"></slot>
  </td>
</template>

<style scoped>

</style>