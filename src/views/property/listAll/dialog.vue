<!--
 * @Author: your name
 * @Date: 2020-07-21 14:21:29
 * @LastEditTime: 2020-07-22 15:29:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\property\listAll\dialog.vue
--> 
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      @close="close"
      width="600px"
      center
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" :transfer="transfer" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ConfirmTemplate from "./event-confirm.vue";
import CreateTemplate from "./event-create.vue";
import EditBasicTemplate from "./event-editBasic.vue";
import EditTemplate from "./event-edit.vue";
import DistributeTemplate from "./event-distribute";
import { mapState } from "vuex";
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    DistributeTemplate,
    ConfirmTemplate,
    EditBasicTemplate
  },
  data() {
    return {
      dialogVisible: false,
      event: "EditTemplate",
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
      if (this.eventType === "create") {
        return "添加字段";
      }

      if (this.eventType === "edit") {
        return "修改字段";
      }

      if (this.eventType === "editBasic") {
        return "基本信息设置";
      }
      if (this.eventType === "confirm") {
        return "提示";
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