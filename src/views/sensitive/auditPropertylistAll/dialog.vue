<template>
  <div>
    <el-dialog
      :title="genTitle()"
      destroy-on-close
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
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
import DetailTemplate from './event-detail'
import SettingTemplate from './event-setting'
import { mapState } from 'vuex'
export default {
  components: {
    SettingTemplate,
    DetailTemplate
  },
  data() {
    return {
      dialogVisible: false,
      event: '',
      eventType: '',
      transfer: {}
    }
  },
  watch: {
    eventType: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.genTitle()
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
      if (this.eventType === 'setting') {
        return '设置审批人员'
      }
      if (this.eventType === 'detail') {
        return '审批流程'
      }
    }
  }
}
</script>

<style>
</style>