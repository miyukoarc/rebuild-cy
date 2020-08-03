<!--
 * @Author: your name
 * @Date: 2020-07-09 17:59:52
 * @LastEditTime: 2020-07-29 19:21:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\components\TagDrawerObj\index.vue
--> 
<template>
  <div>
    <div class="drawer-container" v-if="JSON.stringify(alterGroups) != '{}'">
        <div class="drawer-item" v-for="(group,key) in alterGroups" :key="key">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <div class="font-exs color-info group-name">{{key}}：</div>
            </el-col>
            <el-col :span="16">
              <div class="tags-container">
                <el-tag
                  class="tag-unit text-ellipsis"
                  type="info"
                  size="mini"
                  v-for="(tag,index) in alterTags(group)"
                  :key="index"
                >{{tag.tagName}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
      <div class="text-align-center" v-if="total>2">
        <el-button type="text" size="mini" @click="curly=!curly">
          <span>{{curly?'展开':'收起'}}</span>
          <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
        </el-button>
      </div>
    </div>

    <span v-else>--</span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  name: "tags-drawer",
  data() {
    return {
      curly: false
    };
  },
  watch: {
    tags: {
      handler(newVal, oldVal) {
        if (newVal) {
          if (Object.keys(newVal).length > 2) {
            this.curly = true;
          } else {
            this.curly = false;
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    total() {
      if (this.tags) {
        return Object.keys(this.tags).length;
      } else {
        return 0;
      }
    },
    alterGroups() {
      if (this.tags) {
        let group = Object.keys(this.tags);
        if (this.curly) {
          return group.reduce((pre, cur, index) => {
            if (index < 2) {
              pre[cur] = this.tags[cur];
            }
            return pre;
          }, {});
        } else {
          return group.reduce((pre, cur, index) => {
            pre[cur] = this.tags[cur];
            return pre;
          }, {});
        }
      }
    }
  },
  mounted() {},
  methods: {
    alterTags(arr) {
      if (this.curly) {
        return arr.slice(0, 1);
      } else {
        return arr;
      }
    }
  }
};
</script>

<style>
/* .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

} */
</style>

<style lang="scss" scoped>
.drawer-container {
  .drawer-item {
    margin-bottom: 3px;
    .group-name {
      width: 82px;
      line-height: 25px;
      font-weight: 500;
    }
    .tags-container {
      .tag-unit {
        //   width: 33px;
        margin-right: 3px;
      }
    }
  }
}
</style>