<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      center
      append-to-body
      width="600px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" :transfer="transfer" @handleRefresh="handleRefresh" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateGroupTemplate from './event-create-group.vue'
import EditGroupTemplate from './event-edit-group.vue'
import CreateTextTemplate from './event-create-text.vue'
import CreateImageTemplate from './event-create-image.vue'
import CreateFileTemplate from './event-create-file.vue'
// import CreateArticleTemplate from './event-create-article.vue'
import CreateVideoTemplate from './event-create-video.vue'

import EditTextTemplate from './event-edit-text'

import { mapState } from 'vuex'
export default {
  components: {
    CreateGroupTemplate,
    EditGroupTemplate,
    CreateTextTemplate,
    EditTextTemplate,
    CreateImageTemplate,
    CreateFileTemplate,
    CreateVideoTemplate
  },
  data() {
    return {
      dialogVisible: false,
      event: 'CreateGroupTemplate',
      eventType: '',
      transfer: {}
    }
  },
  watch: {
    eventType: {
      handler(newVal, oldVal) {
        //   console.log(newVal)
        if (newVal) {
          this.genTitle()
          //   this.toggleComponent(newVal)
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
      if (this.eventType === 'createGroup') {
        return '创建分组'
      }

      if (this.eventType === 'editGroup') {
        return '编辑分组'
      }

      if (this.eventType === 'createText') {
        return '新建文本素材'
      }

      if (this.eventType === 'editText') {
        return '编辑文本素材'
      }
    },
    handleRefresh(){
        this.$emit('handleRefresh')
    }
  }
}
</script>

<style>
</style>