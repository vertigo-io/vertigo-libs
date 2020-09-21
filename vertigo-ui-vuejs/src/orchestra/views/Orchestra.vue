<template>
  <div><router-view :api-url="apiUrl"></router-view></div>
</template>

<script>
import router from "../router";
export default {
  name: "app",
  router,

  data() {
    return {
      left: false,
    };
  },
  props: ["apiUrl"],
};
</script>
