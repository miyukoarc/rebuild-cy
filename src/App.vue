<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />

    <!-- <el-dialog title="提示" :visible="dialog_visible" width="30%" @open="open" @close="close">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">放 弃</el-button>
        <el-button type="primary" @click="submit">立即发送</el-button>
      </span>
    </el-dialog>-->
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
  computed: {
    // ...mapState({
    //   dialog_visible: (state) => state.websocket.dialog_visible,
    //   countdown: (state) => state.websocket.countdown,
    // }),
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // cancel() {
    //   this.$store.commit("websocket/TOGGLE_DIALOG_VISIBLE", false);
    // },
    // submit() {
    //   this.$store.commit("websocket/TOGGLE_DIALOG_VISIBLE", false);
    // },
    // open() {
    //   console.log("open");
    // },
    // close() {
    //   console.log("close");
    // },
  },
};
</script>
