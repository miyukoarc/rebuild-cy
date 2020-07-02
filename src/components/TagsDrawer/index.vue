<template>
  <div>
    <div class="drawer-container">
      <div class="drawer-item" v-for="group in alterGroups" :key="group.groupId">
        <el-row :gutter="5" type="flex" class="row-bg" justify="center" >
          <el-col :span="10">
            <div class="font-es group-name">{{group.groupName}}:</div>
          </el-col>
          <el-col :span="14">
            <div class="tags-container">
              <el-tag
                class="tag-unit text-ellipsis"
                type="info"
                size="mini"
                v-for="tag in alterTags(group.tagnames)"
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
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array
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
        console.log(newVal,'999')
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
      width: 80px;
      line-height: 20px;
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