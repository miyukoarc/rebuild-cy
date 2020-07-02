<template>
  <div>
    <!-- <div class="cascader-container" v-click-outside="close">
        <div class="trigger" @click="toggle">
            <slot></slot>
        </div> -->

    <div class="content" v-if="isVisible">
      <div class="content-left">
        <div v-for="(item, index) in options" :key="index">
          <div @click="select(item)">
            <div class="title">
              <span>{{ item.name }}</span>
              <el-button style="position:relative;left:0;right:0;" type="text" size="mini">
                  <span style="margin-right:10px;">下级</span>
                  <i class="el-icon-caret-right" style="position:absolute;right:0px;top:8px;" v-if="item.name===currentSelect.name"></i>

              </el-button>
            </div>
          </div>
          <div class="department-container" >
            <div v-for="(part,index) in item.department" :key="index">&emsp;{{part.name}}</div>
          </div>
          <div class="text-align-center">
            <!-- <el-button
              size="mini"
              type="text"
              @click.stop="showColumn = !showColumn"
              >部门<i
                :class="[
                  showColumn ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                ]"
              ></i
            ></el-button> -->
          </div>
        </div>
      </div>
      <div class="content-right" v-if="lists && lists.length">
        <cascader-item
          :options="lists"
          @change="change"
          :value="value"
        ></cascader-item>
      </div>

      <!-- --显示面板 -->
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
import CascaderItem from "./components/cascader-item";
export default {
  name: "Cascader",
  components: {
    CascaderItem
  },
  directives: {
    clickOutside: {
      inserted(el, bingdings) {
        //只在插入时绑定事件
        document.addEventListener("click", e => {
          if (e.target === el || el.contains(e.target)) {
            return;
          }
          bingdings.value();
        });
      }
    }
  },
  data() {
    return {
      value: "",
      isVisible: true,
      currentSelect: null,
      showColumn: false
    };
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length) {
          this.currentSelect = newVal[0];
        }
      },
      immediate: true
    }
  },
  computed: {
    lists() {
      return this.currentSelect && this.currentSelect.children;
    }
  },
  methods: {
    change(val) {},
    select(item) {
      this.currentSelect = item;
    },
    toggle() {
      this.isVisible = !this.isVisible;
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="scss" scoped>
.trigger {
  width: 150px;
  height: 25px;
  border: 1px solid #ccc;
}
.cascader-container {
  display: flex;
}
.content {
  display: flex;
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
