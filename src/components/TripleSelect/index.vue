<template>
  <!-- 选择部门 -->
  <div v-if="section==='department'" class="select-container">
    TripleSelect
    <div class="board-container">
      <div class="part-container">
        <div class="cell">
          <el-input
            size="small"
            class="filter-input"
            placeholder="输入部门关键字"
            v-model.trim="filterText"
          ></el-input>
          <!-- 多选 -->
          <el-tree
            v-if="multiple"
            ref="tree"
            @check="handleCheck"
            :data="departmentList"
            node-key="uuid"
            :props="propsObj"
            default-expand-all
            show-checkbox
            highlight-current
            check-on-click-node
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
          >
            <div slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <el-tag size="mini" type="info">{{data.orgNode?'组织':'部门'}}</el-tag>
            </div>
          </el-tree>
          <!-- 单选 -->
          <el-tree
            ref="tree"
            v-else
            @check-change="handleCheckSingle"
            :data="departmentList"
            node-key="uuid"
            :props="propsObj"
            default-expand-all
            show-checkbox
            highlight-current
            check-on-click-node
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
          >
            <div slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <el-tag size="mini" type="info">{{data.orgNode?'组织':'部门'}}</el-tag>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="part-container">
        <div class="cell">
          <p class="color-info text-align-center">当前</p>
          <ul>
            <li v-for="item in showOffDepartmentList" :key="item.uuid">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 选择用户 -->
  <div v-else class="select-container">
    <div class="board-container">
      <div class="part-container">
        <div class="cell">
          <el-input
            size="small"
            class="filter-input"
            placeholder="输入部门关键字"
            v-model.trim="filterText"
          ></el-input>
          <el-tree
            ref="tree"
            :data="departmentList"
            node-key="uuid"
            :props="propsObj"
            default-expand-all
            highlight-current
            check-on-click-node
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            @current-change="handleNodeClick"
          >
            <div slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <el-tag size="mini" type="info">{{data.orgNode?'组织':'部门'}}</el-tag>
            </div>
          </el-tree>
        </div>
      </div>

      <div class="part-container">
        <div class="cell">
          <keep-alive>
            <user-list :uuid="currentDepart"></user-list>
          </keep-alive>
        </div>
      </div>
      <div class="part-container">
        <div class="cell"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { flattenDept } from '@/utils/common'
import UserList from './user-list.vue'
export default {
  name: 'TripleSelect',
  components: {
    UserList,
  },
  props: {
    section: {
      type: String,
      default: 'user', //user or department
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      filterText: '',
      propsObj: {
        label: 'name',
        children: 'children',
      },
      // el-tree config
      departmentList: [], //all tree
      flattenList: [], //all flatten
      showOffDepartmentList: [], //from v-model

      //   showUser: false,//是否显示
      currentDepart: null,
      userList: [], //query by departmentUuid
      loading: false,
    }
  },
  watch: {
    filterText(val) {
      this.$refs['tree'].filter(val)
    },
    value: {
      handler(newVal, oldVal) {},
    }
  },
  computed: {
    alterValue() {
      return
    },
  },
  created() {
    this.initFramework()
  },
  mounted() {},
  methods: {
    /**
     * department logical
     */
    //初始化部门树
    initFramework() {
      this.$store
        .dispatch('department/getListSelectTree')
        .then((res) => {
          this.departmentList = res
          this.flattenList = flattenDept(res)
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })
    },
    //节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    //多选
    handleCheck(val, node) {
      let temp = []
      const arr = node.checkedNodes
      const keys = node.checkedKeys
      //   console.log(arr, keys)
      //   arr.forEach((item, index) => {
      //     temp.push({ ...item })
      //   })

      this.showOffDepartmentList = arr
      temp = arr.map((item) => {
        return item.uuid
      })

      console.log(temp, arr)

      this.$emit('change', temp)
    },
    //树节点单选
    handleCheckSingle(data, checked, node) {
      if (checked) {
        this.showOffDepartmentList.splice(0, 1)
        this.$refs.tree.setCheckedNodes([data])
        this.$emit('change', [data.uuid])
        this.showOffDepartmentList.push(data)
      } else {
        this.$emit('change', [])
        //
      }
    },

    /**
     * user logical
     */

    /**
     * 点击department node节点
     */
    handleNodeClick(data, node) {
      //   this.showUser = !this.showUser
      //   console.log(data,node)
      this.currentDepart = data.uuid
    },
  },
}
</script>

<style lang="scss" scoped>
.select-container {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
  .cell {
    padding: 5px;
    margin: 5px 0 5px 0;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
  .cell:nth-child(2n-1) {
    margin: 0 5px 0 5px;
  }

  .board-container {
    display: flex;
    .part-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      .cell {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
</style>

<style lang="scss">
.select-container {
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #1717f773;
  }
}
</style>