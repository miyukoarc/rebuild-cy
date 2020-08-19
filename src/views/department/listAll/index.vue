<template>
  <div class="app-container">
    <el-card class="content-spacing" style="overflow:initial">
      <tool-bar
        :hasExport="false"
        :hasImport="false"
        :hasRefresh="true"
        @handleRefresh="initDataList"
      >
        <div slot="right">
          <el-t-button
            size="small"
            type="primary"
            :popAuth="true"
            v-permission="'department,department_add'"
            :auth="'department,department_add'"
            @click="handleCreate"
          >创建部门</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <el-table
        v-loading="loading"
        :data="departmentList"
        style="width: 100%"
        row-key="uuid"
        lazy
        default-expand-all
        :tree-props="{ children: 'children' }"
        header-row-class-name="el-table-header"
      >
        <el-table-column label="名称" align="left">
          <template v-slot="{row}">
            {{row.name}}
            <span style="margin-left:20px">
              <el-tag size="small" type="info">{{orgType[row.type]}}</el-tag>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="员工人数" align="left">
            <template v-slot="{row}">
                <div>{{row.users.length||'--'}}</div>
            </template>
        </el-table-column>
        
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-t-button
              type="text"
              size="mini"
              v-permission="'department,department_update'"
              :auth="'department,department_update'"
              :popAuth="true"
              @click.stop.native="handleEdit(scope.$index,scope.row)"
              v-if="scope.row.type!=='HEAD'"
            >编辑</el-t-button>

            <span v-else class="font-exs color-info">编辑</span>

            <el-t-button
              type="text"
              size="mini"
              v-permission="'department,department_update'"
              :auth="'department,department_update'"
              :popAuth="true"
              @click="handleChange(scope.$index,scope.row)"
              v-if="scope.row.type==='DEPT'"
            >变更</el-t-button>
            <span v-else class="font-exs color-info">变更</span>
            <el-t-button
              type="text"
              v-permission="'department,department_delete'"
              :auth="'department,department_delete'"
              :popAuth="true"
              size="mini"
              @click.stop.native="handleDelete(scope.row)"
            >删除</el-t-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- <el-card class="content-spacing">
        <Cascader :options="departmentList" :props="{childre:'children',department:'nodes'}"></Cascader>
    </el-card>-->

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
// import mHeadedr from "./header";
import UserDetail from "./detail.vue";
import ListHeader from "./header.vue";
import FormDialog from "./dialog";
import ToolBar from "./tool-bar";
import Cascader from "@/components/Cascader";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: 'department_listAll',
  components: {
    ListHeader,
    UserDetail,
    FormDialog,
    ToolBar,
    Cascader,
  },
  data() {
    return {
      total: 0,
    };
  },
  watch: {},
  computed: {
    ...mapState({
      departmentList: (state) => state.department.departmentList,
      loading: (state) => state.department.loading,
      orgType: (state) => state.enum.orgType,

      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  activated() {
    this.initDataList();
    // this.initFilter()
  },
  mounted() {
    this.$bus.$on('showFormDialog', (target) => {
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].eventType = 'create'
      this.$refs['formDialog'].dialogVisible = true
    })
    this.$bus.$on('handleRefresh', () => {
      this.initDataList()
    })
    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off('handleRefresh')
    })
  },
  beforeDestroy() {
    this.$bus.$off("showFormDialog");
  },
  methods: {
    handleClick(val, e) {
      e.stopPropagation();
      this.handleDelete(val.uuid);
      alert("点击");
    },

    handleRowClick(value) {
      this.$store.commit("department/SAVE_DETAIL", value);
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].dialogVisible = true;
    },
    sortChange(val) {
      this.initDataList();
    },
    pageChange() {
      this.initDataList();
    },
    initFilter() {
      this.$store
        .dispatch("department/getDepartmentListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
    initDataList() {
      this.$store
        .dispatch("department/getDepartmentListAll")
        .then((res) => {
          const { total } = res;
          this.total = total;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
    handleEdit(index, row) {
      //   const payload = this.departmentList[index]
      //   console.log(row)
      //   this.$store.commit('department/SAVE_DETAIL', row)
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = row;
    },
    handleDelete(val) {
      console.log(val.uuid);
      const uuid = val.uuid;

      const payload = {
        uuid: uuid,
      };

      this.$confirm("是否删除当前部门", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store
            .dispatch("department/deleteDepartment", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.initDataList();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
            });
        })
        .catch((err) => {});
    },
    handleChange(index, row) {
      // if (row.type === "DEPT") return;
      this.$refs["formDialog"].event = "ChangeTemplate";
      this.$refs["formDialog"].eventType = "change";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = row;
    },
    handleCreate() {
      this.$refs["formDialog"].event = "CreateTemplate";
      this.$refs["formDialog"].eventType = "create";
      this.$refs["formDialog"].dialogVisible = true;
    },
  },
};
</script>

<style lang="scss">
.app-container {
  border-top: 1px solid #e9e9e9;
  background: white;
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
header .el-header button {
  margin-right: 5px;
}
.cell {
  user-select: none;
}
</style>
