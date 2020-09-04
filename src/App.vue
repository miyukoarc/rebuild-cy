<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  computed: {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
