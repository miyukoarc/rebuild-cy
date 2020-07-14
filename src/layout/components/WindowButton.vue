<template>
  <div>
    <div class="button-container">
      <div class="btn-min" @click="handleMinimize">
        <svg-icon icon-class="winfo-min" class />
      </div>
      <div class="btn-restore" v-if="maximumFlag" @click="handleRestore">
        <svg-icon icon-class="winfo-restore" class />
      </div>
      <div class="btn-max" v-else @click="handleMaximize">
        <svg-icon icon-class="winfo-max" class />
      </div>
      <div class="btn-close" @click="handleClose">
        <svg-icon icon-class="winfo-close" class />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      strategy: {
        handleMinimize: 'minimizeWindow',
        handleMaximize: 'maximizeWindow',
        handleClose: 'closeWindow',
        handleRestore: 'restoreWindow'
      },
      maximumFlag: false
    }
  },
  computed: {
    ...mapState({
    //   maximumFlag: state => state.app.maximumFlag
    })
  },
  methods: {
    handleMinimize() {
      const event = this.strategy['handleMinimize']
      this.handleIpcRenderer(event)
    },
    handleMaximize() {
        this.maximumFlag = !this.maximumFlag
      const event = this.strategy['handleMaximize']
      this.handleIpcRenderer(event)
    },
    handleClose() {
      const event = this.strategy['handleClose']
      this.handleIpcRenderer(event)
    },
    handleRestore() {
        this.maximumFlag = !this.maximumFlag
      const event = this.strategy['handleRestore']
      this.handleIpcRenderer(event)
    },
    handleIpcRenderer(event) {
      if (this.$isElectron()) {
        const { ipcRenderer } = window.electron
        ipcRenderer.send(event)
      } else {
        this.$message({
          type: 'warning',
          message: '需要electron环境'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  div {
    width: 48px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #000;
  }
  .btn-min:hover {
    background: #f5f7fa;
  }
  .btn-restore:hover {
    background: #f5f7fa;
  }
  .btn-max:hover {
    background: #f5f7fa;
  }
  .btn-close:hover {
    color: #fff;
    background: #d51325;
  }
}
</style>