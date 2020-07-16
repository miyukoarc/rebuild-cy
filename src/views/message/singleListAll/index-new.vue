<!--
 * @Author: your name
 * @Date: 2020-05-12 15:34:16
 * @LastEditTime: 2020-07-15 15:54:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\listSingle.vue
 -->
<template>
  <section class="single-list-all app-container">
    <el-card>
      <el-row>
        <el-col :span="4">
          <chat-side-bar></chat-side-bar>
        </el-col>
        <el-col :span="20">
          <!-- 右侧顶部按钮-->
          <div class="right">
            <chat-information></chat-information>
            <div class="chat-content">
              <chat-tab-bar></chat-tab-bar>
              <keep-alive>
                <!-- <router-view></router-view> -->
              </keep-alive>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>

import { mapState, mapMutations, mapActions } from "vuex";

import ChatSideBar from "./components/ChatSideBar.vue";

import ChatInformation from "./components/ChatInformation.vue";
import ChatTabBar from "./components/ChatTabBar.vue";



export default {
  name: "ListSingleAll",
  components: {
    ChatSideBar,
    ChatTabBar,
    ChatInformation
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // singleListAll: state => state.message.singleListAll,
      // singleListPage: state => state.message.singleListPage
    })
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.single-list-all {
  .right {
    border: 1px solid #eee;
    padding: 0 20px;
    .chat-content {
      height: calc(70vh + 40px);
    }
  }
}
</style>

<style lang="scss">
</style>
