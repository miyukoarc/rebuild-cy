<template>
  <div class="tooltip-container" @mouseleave="handleHide" @mouseenter="handleShow">
    <el-tooltip placement="right" manual :value="isShow">
      <!-- <slot name="tips" slot="content"></slot> -->
      <div slot="content">
          <slot></slot>
      </div>
      <span>
        <i :class="`el-icon-warning${alterIcon}`"></i>
      </span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'dark'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    alterIcon() {
      if (this.type === 'light') {
        return '-outline'
      }
      if (this.type === 'dark') {
        return ''
      }
    }
  },
  methods: {
    handleShow() {
      this.isShow = true
    },
    handleHide() {
      this.isShow = false
    }
  }
  //   render(){
  //       const {handleHide,handleShow,alterIcon,isShow} = this
  //       const {content} = this.$slots
  //       return (
  //           <div class="tooltip-container" onMouseleave={handleHide} onMouseenter={handleShow}>
  //             <el-tooltip placement="right" manual value={isShow}>
  //                 <div>
  //                     <slot name="tips" slot={content}></slot>
  //                 </div>
  //                 <span>
  //                     <i class={`el-icon-warning${alterIcon}`}></i>
  //                 </span>
  //             </el-tooltip>
  //           </div>
  //       )
  //   }
}
</script>

<style lang="scss" scoped>
.tooltip-container {
  display: inline-block;
}
</style>