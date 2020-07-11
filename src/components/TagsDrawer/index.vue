<template>
  <div>
    <div class="drawer-container" v-if="alterGroups != null">
      <div class="drawer-item" v-for="(group,key,index) in alterGroups" :key="index">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8">
            <div class="font-exs color-info group-name">{{group.groupName}}：</div>
          </el-col>
          <el-col :span="16">
            <div class="tags-container">
              <el-tag
                class="tag-unit text-ellipsis"
                type="info"
                size="mini"
                v-for="tag in alterTags(group.tags)"
                :key="tag.tagId"
              >{{tag.tagName}}</el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="text-align-center" v-if="tags.length>2">
        <el-button type="text" size="mini" @click="curly=!curly">
          展开
          <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
        </el-button>
      </div>
    </div>
    <div v-else>--</div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => {
        return [];
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
        if (newVal.length > 2) {
          this.curly = true;
        } else {
          this.curly = false;
        }
      },
      immediate: true
    }
  },
  computed: {
    total() {
      return this.tags.length;
    },
    alterGroups() {
      if (this.curly) {
        return this.tags.slice(0, 2);
      } else {
        return this.tags;
      }
    }
  },
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