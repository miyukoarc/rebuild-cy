<template>
  <div>
      <div class="btn-container">
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