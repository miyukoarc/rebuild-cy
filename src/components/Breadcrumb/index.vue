<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <span v-else >{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      levelList: null,
    }
  },
  watch: {
    $route: {
      handler(newVal,oldVal){
        this.getBreadcrumb()
      }
    }
  },
  computed: {
    ...mapState({
      rebuildMenu: state => state.menu.rebuildMenu
    })
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

    //   if (!this.isDashboard(first)) {
    //     matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
    //   }

      this.levelList = matched.filter(item => {
        if(item.meta && item.meta.title && item.meta.breadcrumb !== false){
          if(item.path==='#'){
            if(item.name==='media'){
              item.meta.title = '运营管理'
            }
            if(item.name==='tag'){
              item.meta.title = '运营管理'
            }
            if(item.name==='batchSendTask'){
              item.meta.title = '运营管理'
            }
            if(item.name==='contactWay'){
              item.meta.title = '运营管理'
            }
            if(item.name==='potentialCustomer'){
              item.meta.title = '客户管理'
            }
            if(item.name==='externalUser'){
              item.meta.title = '客户管理'
            }
            if(item.name==='riskManagement'){
              item.meta.title = '风控安全'
            }
            if(item.name==='user'){
              item.meta.title = '员工管理'
            }
            if(item.name==='department'){
              item.meta.title = '员工管理'
            }
            if(item.name==='role'){
              item.meta.title = '员工管理'
            }
            
            
          }
          return item
        }
      })
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
