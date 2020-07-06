<template>
  <div class="container">
    <div class="left-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          <div style="margin-left:10px;">
            <div class="font-l" style="color:#fff;font-size:16px">{{roles[roleCode]}}</div>
            <div class="font-es color-info" style>{{name}}</div>
          </div>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {removeToken} from '@/utils/auth'
export default {
  name: "user-avatar",
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "roleCode"]),
    ...mapState({
      roles: state => state.enum.roles
    })
  },
  methods: {
    logout() {
      //   await this.$store.dispatch('user/logout')
      this.removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    removeToken(){
        return removeToken()
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #1f2d3d;
}
.left-menu {
  height: 50px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  .left-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      display: flex;
      align-items: center;
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>