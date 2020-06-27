<template>
  <div>
      <div class="btn-container">
          <el-t-button size="mini" :auth="permissionMap['media']['media_add']">上传素材</el-t-button>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            permissionMap: state => state.permission.permissionMap
        })
    }
}
</script>

<style lang="scss" scoped>
.btn-container{

}
</style>