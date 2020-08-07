<!--
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-08-06 15:48:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\contactWay\listAll\dialog.vue
--> 
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      width="600px"
      center
      @close="close"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" :transfer="transfer" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DetailTemplate from "./event-detail.vue";
import DefaultWelcomeTemplate from "./event-defaultWelcome.vue";

import { mapState } from "vuex";
export default {
  components: {
    DetailTemplate,
    DefaultWelcomeTemplate,
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
          console.log(newVal, "dddd");
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
      //   if(this.eventType==='create'){
      //       return '创建模板'
      //   }

      if (this.eventType === "defaultWelcome") {
        return "设置默认欢迎语";
      }

      if (this.eventType === "distribute") {
        return "分配部门";
      }
      if (this.eventType === "detail") {
        return "渠道详情";
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