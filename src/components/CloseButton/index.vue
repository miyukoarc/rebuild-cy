<template>
  <div>
    <div class="button-container">
      <!-- <div class="btn-min" @click="handleMinimize">
        <svg-icon icon-class="winfo-min" class />
      </div>
      <div class="btn-restore" v-if="maximumFlag" @click="handleRestore">
        <svg-icon icon-class="winfo-restore" class />
      </div>
      <div class="btn-max" v-else @click="handleMaximize">
        <svg-icon icon-class="winfo-max" class />
      </div> -->
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
  created(){
      if(this.$isElectron()){
          const {ipcRenderer} = window.electron
          ipcRenderer.on('maximizeWindow',(e,args)=>{
              console.log(args)
              this.maximumFlag = args
          })
          ipcRenderer.on('unmaximizeWindow',(e,args)=>{
              console.log(args)
              this.maximumFlag = args
          })
          this.$once('hook:beforeDestroy',()=>{
              ipcRenderer.removeListener('maximizeWindow')
              ipcRenderer.removeListener('unmaximizeWindow')
          })
      }
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
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: rgba(255,255,255,0.8);
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
    // background: #d51325;
  }
}
</style>