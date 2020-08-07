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
      :before-close="handleClose"
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
    DetailTemplate,
  },
  data() {
    return {
      dialogVisible: false,
      event: '',
      eventType: '',
      transfer: {},
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
    handleClose(done) {
      if (this.eventType === 'setting') {
        this.$confirm('是否放弃设置审批人？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      }
      if (this.eventType === 'detail') {
        done()
      }
    },
    genTitle() {
      if (this.eventType === 'setting') {
        return '设置审批人员'
      }
      if (this.eventType === 'detail') {
        return '审批流程'
      }
    },
  },
}
</script>

<style>
</style>