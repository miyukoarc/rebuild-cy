<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <el-tooltip v-if="showAuth&&popAuth&&onlyOneChild.meta" placement="left">
        <div slot="content">
          <div v-for="(item, index) in resolveAuth(onlyOneChild.meta.auth||{})" :key="index">{{item}}</div>
        </div>
        <app-link :to="resolvePath(onlyOneChild.path)">
          <el-menu-item
            :index="resolvePath(onlyOneChild.path)"
            :class="{'submenu-title-noDropdown':!isNest}"
            v-if="onlyOneChild.meta"
          >
            <item
              :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
              :title="onlyOneChild.meta.title"
            />
          </el-menu-item>
        </app-link>
      </el-tooltip>

      <app-link v-else :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
          v-if="onlyOneChild.meta"
        >
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.name" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.code"
        :is-nest="true"
        :item="child"
        :popAuth="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import settings from '@/settings'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    popAuth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      authData: {
        roles: [],
        title: '',
        module: '',
        needAudit: false,
        code: ''
      }
    }
  },
  computed: {
    showAuth() {
      return settings.showAuth
    }
  },
  created() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          //   const {  title, module, needAudit, code } = item.meta.auth
          //     // this.authData.roles = roles
          //     this.authData.title = title
          //     this.authData.module = module
          //     this.authData.needAudit = needAudit
          //     this.authData.code = code
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    resolveAuth(obj) {
      const arr = []
      for (let key in obj) {
        // arr[4] = '角色：'
        if (key === 'roles') {
          arr[4] =
            '角色：' +
            obj['roles']
              .map(item => {    
                return item.name
              })
              .join(',')
        }
        if (key === 'module') {
          // arr.push()
          arr[2] = '模块：' + obj['module']
        }
        if (key === 'needAudit') {
          arr[3] = obj['needAudit'] ? '审核：需要审核' : '审核：不需要审核'
          // arr.push()
        }

        if (key === 'code') {
          arr[1] = 'code：' + obj['code']
          // arr.push()
        }
        if (key === 'title') {
          arr[0] = '名称：' + obj['title']
          // arr.push()
        }
      }
      return arr
    }
  }
}
</script>


