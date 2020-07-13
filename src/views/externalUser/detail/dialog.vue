<!--
 * @Author: your name
 * @Date: 2020-06-27 22:34:57
 * @LastEditTime: 2020-07-11 15:38:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\externalUser\detail\dialog.vue
--> 
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      min-width="600px"
      center
      @close="close"
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" :transfer="transfer" :uuid="uuid" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateTemplate from "./event-create.vue";
import EditTemplate from "./event-edit.vue";
import EditTagsTemplate from "./event-editTags.vue";
import { mapState } from "vuex";
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    EditTagsTemplate
  },
  data() {
    return {
      dialogVisible: false,
      event: "CreateTemplate",
      eventType: "",
      transfer: "",
      uuid: ""
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
  updated() {},
  methods: {
    genTitle() {
      if (this.eventType === "create") {
        return "添加动态";
      }

      if (this.eventType === "edit") {
        return "编辑动态";
      }

      if (this.eventType === "distribute") {
        return "添加动态";
      }

      if (this.eventType === "editTags") {
        return "标签编辑";
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