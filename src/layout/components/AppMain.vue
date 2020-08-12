<!--
 * @Author: your name
 * @Date: 2020-07-13 12:05:38
 * @LastEditTime: 2020-08-11 21:58:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <el-scrollbar>
        <keep-alive v-if="saveroutes">
        <!-- <keep-alive :include="cachedViews"> -->
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view> 
      </el-scrollbar>
      <!-- <router-view :key="key" /> -->
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppMain",
  computed: {
    ...mapState({
      cachedViews: (state) => state.tagsView.cachedViews,
      routes: (state) => state.permission.routes,
    }),
    saveroutes() {
      return this.cachedViews.some((item) => {
        return JSON.stringify(this.routes).includes(item);
      });
    },
    // key() {
    //   return this.$route.path
    // }
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow-y: scroll;
  background-color: #fff;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
