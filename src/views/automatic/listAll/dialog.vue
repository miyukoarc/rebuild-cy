<!--
 * @Author: your name
 * @Date: 2020-07-17 23:18:57
 * @LastEditTime: 2020-08-03 16:10:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\automatic\listAll\dialog.vue
--> 
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      @close="close"
      append-to-body
      width="700px"
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
import CreateTemplate from "./event-create.vue";
import CreateSetTemplate from "./event-createSet.vue";
import EditTemplate from "./event-edit.vue";
import DetailTemplate from "./event-detail.vue";
import DistributeTemplate from "./event-distribute";
import ChangeTemplate from "./event-change";
import { mapState } from "vuex";
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    DetailTemplate,
    DistributeTemplate,
    ChangeTemplate,
    CreateSetTemplate,
  },
  data() {
    return {
      dialogVisible: false,
      event: "",
      eventType: "",
      transfer: {},
    };
  },
  watch: {
    eventType: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.genTitle();
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({}),
  },
  mounted() {},
  updated() {},
  methods: {
    genTitle() {
      if (this.eventType === "create") {
        return "新建回复内容";
      }
      if (this.eventType === "createSet") {
        return "全局设置";
      }

      if (this.eventType === "edit") {
        return "编辑自动回复";
      }
      if (this.eventType === "detail") {
        return "详情";
      }

      if (this.eventType === "change") {
        return "修改通知人";
      }
    },
    close() {
      this.event = "";
    },
  },
};
</script>

<style>
</style>