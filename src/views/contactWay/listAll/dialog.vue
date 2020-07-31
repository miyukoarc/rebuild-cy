<!--
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-06-27 23:09:05
 * @LastEditors: your name
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
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DetailTemplate from './event-detail'
import { mapState } from 'vuex'
export default {
  components: {
    DetailTemplate,
  },
  data() {
    return {
      dialogVisible: false,
      event: '',
      eventType: '',
    }
  },
  watch: {
    eventType: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.genTitle()
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

      if (this.eventType === 'distribute') {
        return '分配部门'
      }
      if (this.eventType === 'detail') {
        return '渠道详情'
      }
    },
  },
}
</script>

<style>
</style>