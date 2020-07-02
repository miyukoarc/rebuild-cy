<template>
  <div class="content cascader-item">
    <div class="content-left">
      <div class="label" v-for="(item,key) in options" :key="key">
        <div @click="select(item)">
          <div class="title">
            <span>{{ item.name }}</span>
            <el-button
              v-if="lists && lists.length"
              style="position:relative;left:0;right:0;"
              type="text"
              size="mini"
            >
              <span style="margin-right:10px;">下级</span>
              <i
                class="el-icon-caret-right"
                style="position:absolute;right:0px;top:8px;"
                v-if="item.name===currentSelect.name"
              ></i>
            </el-button>
          </div>
        </div>
        <!-- <div class="department-container" >
            <div v-for="(part,index) in item.department" :key="index">&emsp;{{part.name}}</div>
        </div>-->
        <department-list
          ref="department"
          :list="item.department"
          :index="key"
          @handleToggle="changeStatus"
        ></department-list>
      </div>

    </div>
    <div class="content-right" v-if="lists && lists.length">
      <CascaderItem :options="lists"></CascaderItem>
    </div>
  </div>
</template>

<script>
import DepartmentList from './department-list.vue'
export default {
  name: 'CascaderItem',
  components: {
    DepartmentList
  },
  data() {
    return {
      currentSelect: null, // 当前点击的第一层
      stateArr: null
    }
  },
  created() {},
  mounted() {
    // this.buildStateArr()
    this.$refs['department'].forEach((item, index) => {
      this.$refs['department'][index].showDepartment = false
    })
    this.$refs['department'][0].showDepartment = true
  },
  methods: {
    showState(index) {
      return !!this.stateArr[index]
    },
    changeStatus(val) {
      const { index, status } = val

      this.$refs['department'].forEach((item, index) => {
        this.$refs['department'][index].showDepartment = !status
      })
      this.$refs['department'][index].showDepartment = status

    },
    // buildStateArr() {
    //   const count = this.$refs['department'].length
    //   const stateArr = new Array(count).fill(false)
    //   stateArr[0] = true
    //   this.stateArr = stateArr
    // },
    select(item) {
      this.currentSelect = item
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length) {
          this.currentSelect = newVal[0]
        }
      },
      immediate: true
    }
  },
  computed: {
    lists() {
      return this.currentSelect && this.currentSelect.children
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.cascader-item {
  display: flex;
}
.content-left {
  border: 1px solid #ccc;
  min-height: 100px;
}
.content-right {
  margin-left: -1px;
}
.label {
  /* width:60px; */
  /* font-size: 12px; */
  line-height: 20px;
  color: #606266;
  /* padding: 10px; */
  /* cursor: pointer */
}
.label:hover {
  background: #f5f7fa;
}
.title {
  display: flex;
  line-height: 30px;
  justify-content: space-between;
  align-items: center;
}
</style>