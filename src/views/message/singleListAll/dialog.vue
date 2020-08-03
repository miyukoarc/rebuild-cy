<!--
 * @Author: your name
 * @Date: 2020-07-29 20:56:22
 * @LastEditTime: 2020-07-29 21:03:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\dialog.vue
--> 
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      width="600px"
      @close="close"
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
import ShowMoreTemplate from "./event-showMore";
import { mapState } from "vuex";
export default {
  components: {
    ShowMoreTemplate,
  },
  data() {
    return {
      dialogVisible: false,
      event: "ShowMoreTemplate",
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
      //   if(this.eventType==='create'){
      //       return '创建模板'
      //   }

      //   if(this.eventType==='edit'){
      //       return '编辑模板'
      //   }

      if (this.eventType === "showMore") {
        return "聊天记录";
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