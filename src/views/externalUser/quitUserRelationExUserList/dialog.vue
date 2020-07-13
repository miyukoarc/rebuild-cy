<!--
 * @Author: your name
 * @Date: 2020-06-27 14:05:27
 * @LastEditTime: 2020-07-13 11:24:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\externalUser\quitUserRelationExUserList\dialog.vue
--> 
<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      destroy-on-close
      width="600px"
      center
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" :selectData="selectedAllData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateTemplate from "./event-create.vue";
import EditTemplate from "./event-edit.vue";
import DistributeTemplate from "./event-distribute";
import { mapState } from "vuex";
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    DistributeTemplate
  },
  data() {
    return {
      dialogVisible: false,
      event: "DistributeTemplate",
      eventType: "distribute",
      selectedAllData: []
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
        return "分配模板";
      }
    }
  }
};
</script>

<style>
</style>