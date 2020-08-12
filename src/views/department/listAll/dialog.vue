<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      center
      append-to-body
      width="600px"
      :close-on-click-modal="false"

    >
      <div>
        <component :is="event" :transfer="transfer"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateTemplate from './event-create.vue'
import EditTemplate from './event-edit.vue'
import ChangeTemplate from './event-change.vue'
import { mapState } from 'vuex'
export default {
  components: {
    CreateTemplate,
    EditTemplate,
    ChangeTemplate,
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
          //   this.toggleComponent(newVal)
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({}),
  },
  mounted() {},
  updated() {
    //   console.warn(this.genTitle())
  },
  methods: {
    //   toggleComponent(type){
    //       if(type=='edit'){
    //           this.event = 'EditTemplate'
    //       }
    //       if(type=='create'){
    //           this.event = 'CreateTemplate'
    //       }
    //   },
    genTitle() {
      if (this.eventType === 'create') {
        return '创建创建'
      }

      if (this.eventType === 'edit') {
        return '编辑部门'
      }

      if (this.eventType === 'change') {
        return '变更部门'
      }
    },
  },
}
</script>

<style>
</style>