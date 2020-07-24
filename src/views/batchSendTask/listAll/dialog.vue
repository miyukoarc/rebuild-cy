<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      :width="dialogWidth"
      center
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateTemplate from "./event-create.vue";
import EditTemplate from "./event-edit.vue";
import DistributeTemplate from "./event-distribute";
import addBatchSendTaskTemplate from "./component/addBatchSendTask";

import { mapState } from "vuex";
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    DistributeTemplate,
    addBatchSendTaskTemplate
  },
  data() {
    return {
      dialogVisible: false,
      event: "DistributeTemplate",
      eventType: "",
      dialogWidth: "600px"
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
      } else if (this.eventType == "addBatchSendTask") {
        return "新建群发消息";
      }
    }
  }
};
</script>

<style>
</style>