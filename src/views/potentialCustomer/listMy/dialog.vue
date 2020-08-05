<!--
 * @Author: your name
 * @Date: 2020-07-16 20:20:12
 * @LastEditTime: 2020-08-05 11:37:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\potentialCustomer\listMy\dialog.vue
-->
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      center
      :modal-append-to-body="false"
      append-to-body
       @close="close"
      width="600px"
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" :transfer="transfer" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateTemplate from "./event-create.vue";
import EditTemplate from "./event-edit.vue";
import DistributeTemplate from "./event-distribute";
import addBatchTask from "./event-addBatchTask";

import { mapState } from "vuex";
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    DistributeTemplate,
    addBatchTask
  },
  data() {
    return {
      dialogVisible: false,
      event: "DistributeTemplate",
      eventType: "",
      transfer: {}
    };
  },
  watch: {
    eventType: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.genTitle();
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {},
  updated() {},
  methods: {
    genTitle() {
      //   if(this.eventType==='create'){
      //       return '创建模板'
      //   }

      //   if(this.eventType==='edit'){
      //       return '编辑模板'
      //   }

      if (this.eventType === "distribute") {
        return "分配部门";
      } else if (this.eventType === "AddBatchTask") {
        return "批量添加好友";
      }
    },
    close() {
      this.event = "";
    }
  }
};
</script>

<style>
</style>