
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'dark'
    }
  },
  data(){
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
        console.log(this.isShow)
        this.isShow = true
    },
    handleHide() {
                console.log(this.isShow)

        this.isShow = false

    }
  },
  render(){
      const {handleHide,handleShow,alterIcon,isShow} = this
      return (
          <div class="tooltip-container" onMouseleave={handleHide} onMouseenter={handleShow}>
            <el-tooltip placement="right" manual value={isShow}>
                <div slot="content">
                    <slot name="tips"></slot>
                </div>
                <span>
                    <i class={`el-icon-warning${alterIcon}`}></i>
                </span>
            </el-tooltip>
          </div>
      )
  }
}
</script>

<style lang="scss" scoped>
.tooltip-container {
  display: inline-block;
}
</style>