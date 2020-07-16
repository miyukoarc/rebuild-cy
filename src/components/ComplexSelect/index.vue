<template>
  <div v-if="section==='department'" class="select-container">
    <el-row>
      <el-col :span="12">
        <div class>
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
        <div style="margin-top:32px;">
          <div class="line-tag color-info" v-for="(item,index) in selects" :key="index">
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
        <div>
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
                <user-list
                  ref="userList"
                  v-if="currentDepart===node.key"
                  :index="node.key"
                  :uuid="node.key"
                  @output="handleOutput"
                  @cult="handleCult"
                  :key="node.key"
                ></user-list>
              </keep-alive>
            </div>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-top:52px;">
          <div class="line-tag color-info" v-for="item in selects" :key="item.uuid">
            <div>
              <i class="el-icon-user-solid"></i>
              {{item.name}}
            </div>
            <div>
              <span class="close-btn" @click="handleCloseUserTag(item)">
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
import UserList from "./user-list";
import { intercept, myFilter } from "@/utils/common";
export default {
  components: {
    UserList
  },
  props: {
    section: {
      type: String,
      default: "user"
    },
    selects: {
      type: Array,
      default: () => {
        return [];
      }
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "selects",
    event: "change"
  },
  data() {
    return {
      filterText: "",
      propsObj: {
        label: "name",
        children: "children"
      },
      currentDepart: null,
      userListTemp: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs["tree"].filter(val);
    }
  },
  computed: {
    departmentList() {
      return this.options;
    }
  },
  mounted() {
    //   this.initNodeData()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    initData() {
      this.$store
        .dispatch("department/getDepartmentListAll")
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    initNodeData() {
      const payload = { departmentsUuid: 3 };
      this.$store
        .dispatch("user/getAllUserList", payload)
        .then(res => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "加载失败"
          });
        });
    },
    /**
     * 删除标签
     */
    handleCloseTag(item) {
      //删除当前点击项目
      const temp = this.selects;
      temp.splice(temp.indexOf(item), 1);

      const tree = this.$refs["tree"].children;

      const uuid = item.uuid;

      const filterTree = intercept("uuid", uuid, tree);
      /**
       * 左删除
       */
      const flatten = data =>
        data.reduce(
          (arr, { uuid, children = [] }) =>
            arr.concat([{ uuid }], flatten(children)),
          []
        );

      const keys = flatten(filterTree).map(item => {
        return item.uuid;
      });

      /**
       * 右删除
       */
      const queue = [];

      flatten(filterTree).forEach(item => {
        temp.forEach((unit, index) => {
          if (item.uuid === unit.uuid) {
            queue.push(unit);
          }
        });
      });
      this.$nextTick(async () => {
        await this.$refs["tree"].getHalfCheckedKeys().forEach(uuid => {
          temp.forEach(unit => {
            if (unit.uuid == uuid) {
              queue.push(unit);
            }
          });
        });

        /**
         * 右删除
         */
        queue.forEach(item => {
          temp.splice(temp.indexOf(item), 1);
        });

        this.$emit("change", temp);
      });

      //   queue.push(item)

      /**
       * 左删除
       */
      keys.forEach(key => {
        this.$refs["tree"].setChecked(key, false, true);
      });
    },
    intercept(...args) {
      return intercept(...args);
    },
    /**
     * 改变选择
     */
    handleCheck(val, node) {
      const temp = [];
      const arr = node.checkedNodes;
      const keys = node.checkedKeys;
      //   console.log(arr, keys)
      arr.forEach((item, index) => {
        temp.push({ ...item });
      });

      this.$emit("change", temp);
    },
    /**
     * 点击node节点
     */
    handleNodeClick(data, node) {
      this.currentDepart = node.key;
    },
    handleOutput(arr) {
      let temp = this.userListTemp.concat(arr);

      temp = myFilter(temp);

      this.userListTemp = temp;

      this.$emit("change", temp);
    },
    handleCult(val) {
      let temp = [];
      if (val.length) {
        val.forEach(item => {
          this.userListTemp.splice(
            this.userListTemp.findIndex(unit => {
              return item.uuid == unit.uuid;
            }),
            1
          );
        });
        // this.userListTemp = []
      } else {
        this.userListTemp.splice(
          this.userListTemp.findIndex(item => {
            return item.uuid == val;
          }),
          1
        );
      }

      temp = this.userListTemp;
      this.$emit("change", temp);
    },
    /**
     * 删除标签
     */
    handleCloseUserTag(val) {
      const uuid = val.uuid;
      let temp = this.selects;
      temp.splice(
        temp.findIndex(item => {
          return item.uuid == val.uuid;
        }),
        1
      );

      //   const trigger = this.selects.map(item=>{return item.uuid})

      //   console.log(trigger)

      //   this.$refs['userList'].handleChange(trigger)

      this.$nextTick(() => {
        let target = this.$refs["userList"].selects;

        target.splice(
          target.findIndex(item => {
            return item == val.uuid;
          }),
          1
        );
      });

      // console.log(target)
      // this.$emit('change',temp)
    }
  }
};
</script>
<style lang="scss" scoped>
.line-tag {
  display: flex;
  max-width: 240px;
  line-height: 26px;
  justify-content: space-between;
  &:hover {
    background-color: #f5f7fa;
  }
}

.select-container {
  .filter-input {
    margin-bottom: 20px;
  }
}
.close-btn {
  cursor: pointer;
}
</style>

<style lang="scss">
.select-container {
  margin-bottom: 20px;
  .el-tree-node__content {
    height: auto;
  }
}
</style>