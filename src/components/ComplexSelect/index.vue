<template>
  <div v-if="section==='department'" class="select-container">
    <el-row>
      <el-col :span="12">
        <div class="p-20">
          <el-input class="filter-input" placeholder="输入关键字" v-model.trim="filterText"></el-input>
          <el-tree
            ref="tree"
            @check="handleCheck"
            :data="departmentList"
            node-key="uuid"
            :props="propsObj"
            default-expand-all
            show-checkbox
            :filter-node-method="filterNode"
          >
            <div slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <el-tag size="mini" type="info">{{data.orgNode?'组织':'部门'}}</el-tag>
            </div>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="p-20" style="margin-top:52px;">
          <div class="line-tag color-info" v-for="item in selects" :key="item.uuid">
            <div>
              <i class="el-icon-s-operation"></i>
              {{item.name}}
            </div>
            <div>
              <span class="close-btn" @click="handleCloseTag(item)">
                <i class="el-icon-close color-info"></i>
              </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-else class="select-container">
    <el-row>
      <el-col :span="12">
        <div class="p-20">
          <el-input class="filter-input" placeholder="输入组织/部门关键字" v-model.trim="filterText"></el-input>
          <el-tree
            :expand-on-click-node="false"
            ref="tree"
            :data="departmentList"
            node-key="uuid"
            :props="propsObj"
            @node-click="handleNodeClick"
            default-expand-all
            :filter-node-method="filterNode"
          >
            <div slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <el-tag size="mini" type="info">{{data.orgNode?'组织':'部门'}}</el-tag>
              <keep-alive>
                <user-list v-if="false" :key="node.key"></user-list>
              </keep-alive>
            </div>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="p-20" style="margin-top:52px;">
          <div class="line-tag color-info" v-for="item in selects" :key="item.uuid">
            <div>
              <i class="el-icon-s-operation"></i>
              {{item.name}}
            </div>
            <div>
              <span class="close-btn" @click="handleCloseTag(item)">
                <i class="el-icon-close color-info"></i>
              </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserList from './user-list'
import { intercept } from '@/utils/common'
export default {
  components: {
    UserList
  },
  props: {
    section: {
      type: String,
      default: 'department'
    },
    selects: {
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  model: {
    prop: 'selects',
    event: 'change'
  },
  data() {
    return {
      filterText: '',
      propsObj: {
        label: 'name',
        children: 'children'
      },
      root: {}
    }
  },
  watch: {
    filterText(val) {
      this.$refs['tree'].filter(val)
    }
  },
  computed: {
    departmentList() {
      return this.options
    }
  },
  mounted() {
    console.log(this.$refs['tree'].getCurrentKey())
    //   this.initNodeData()
  },
  methods: {
    filterNode(value, data) {
      console.log(value, data)
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    initData() {
      this.$store
        .dispatch('department/getDepartmentListAll')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })
    },
    initNodeData() {
      const payload = { departmentsUuid: 3 }
      this.$store
        .dispatch('user/getAllUserList', payload)
        .then(res => {
          console.log()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '加载失败'
          })
        })
    },
    /**
     * 删除标签
     */
    handleCloseTag(item) {
      //删除当前点击项目
      const temp = this.selects
      temp.splice(temp.indexOf(item), 1)

      const tree = this.$refs['tree'].children

      const uuid = item.uuid

      const filterTree = intercept('uuid', uuid, tree)
      /**
       * 左删除
       */
      const flatten = data =>
        data.reduce(
          (arr, { uuid, children = [] }) =>
            arr.concat([{ uuid }], flatten(children)),
          []
        )

      const keys = flatten(filterTree).map(item => {
        return item.uuid
      })

      /**
       * 右删除
       */
      const queue = []

      flatten(filterTree).forEach(item => {
        temp.forEach((unit, index) => {
          if (item.uuid === unit.uuid) {
            queue.push(unit)
          }
        })
      })
      this.$nextTick(async () => {
        await this.$refs['tree'].getHalfCheckedKeys().forEach(uuid => {
          temp.forEach(unit => {
            if (unit.uuid == uuid) {
              queue.push(unit)
            }
          })
        })
        console.log(queue)
        /**
         * 右删除
         */
        queue.forEach(item => {
          temp.splice(temp.indexOf(item), 1)
        })

        this.$emit('change', temp)
      })

      console.log(queue)
      //   queue.push(item)

      /**
       * 左删除
       */
      keys.forEach(key => {
        this.$refs['tree'].setChecked(key, false, true)
      })
    },
    intercept(...args) {
      return intercept(...args)
    },
    /**
     * 改变选择
     */
    handleCheck(val, node) {
      const temp = []
      const arr = node.checkedNodes
      const keys = node.checkedKeys
      //   console.log(arr, keys)
      arr.forEach((item, index) => {
        temp.push({ ...item })
      })
      console.log(temp)
      this.$emit('change', temp)
    },
    /**
     * 点击node节点
     */
    handleNodeClick(data, node) {
      console.log(node)
    }
  }
}
</script>
<style lang="scss" scoped>
.line-tag {
  display: flex;
  max-width: 240px;
  line-height: 26px;
  justify-content: space-between;
  // margin: 5px;
  &:hover {
    background-color: #f5f7fa;
  }
}

.select-container {
  width: 800px;
  padding: 20px;
  .filter-input {
    margin-bottom: 20px;
  }
}
.close-btn {
  cursor: pointer;
}
</style>