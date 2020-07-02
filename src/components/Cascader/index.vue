<template>
  <div>
    <div class="content" v-if="isVisible">
      <div class="content-left">
        <div v-for="(item, index) in options" :key="index">
          <div @click="select(item)">
            <div class="title">
              <span>{{ item.name }}</span>
              <el-button style="position:relative;left:0;right:0;" type="text" size="mini">
                <span style="margin-right:10px;">下级</span>
                <i
                  class="el-icon-caret-right"
                  style="position:absolute;right:0px;top:8px;"
                  v-if="item.name===currentSelect.name"
                ></i>
              </el-button>
            </div>
          </div>
          <department-list
            ref="department"
            :list="childDepartment(item)"
            :index="index"
            @handleToggle="changeStatus"
          ></department-list>

        </div>
      </div>
      <div class="content-right" v-if="lists && lists.length">
        <cascader-item :options="lists" @change="change" :value="value"></cascader-item>
      </div>


    </div>

  </div>
</template>

<script>
import CascaderItem from './components/cascader-item'
import DepartmentList from './components/department-list'
export default {
  name: 'Cascader',
  components: {
    CascaderItem,
    DepartmentList
  },
  directives: {
    clickOutside: {
      inserted(el, bingdings) {
        //只在插入时绑定事件
        document.addEventListener('click', e => {
          if (e.target === el || el.contains(e.target)) {
            return
          }
          bingdings.value()
        })
      }
    }
  },
  data() {
    return {
      value: '',
      isVisible: true,
      currentSelect: null,
      showColumn: false
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
  mounted() {
      
  },
  methods: {
      childDepartment(item){
          console.log(item)
          return item[this.props.department]
      },
    changeStatus(val) {
      console.log(val)
      const { index, status } = val
      console.log(this.$refs['department'].showDepartment)
      this.$refs['department'].showDepartment = status

      this.$refs['department'].forEach((item, index) => {
        this.$refs['department'][index].showDepartment = !status
      })
      this.$refs['department'][index].showDepartment = status
    },
    change(val) {},
    select(item) {
      this.currentSelect = item
    },
    toggle() {
      this.isVisible = !this.isVisible
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          department: 'department'
        }
      }
    }
  }
}
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
  .content-left{
      flex: 1;
  }
  .content-right{
      flex: 1;
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
