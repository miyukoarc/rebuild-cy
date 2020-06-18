<template>
  <div>
      user/list
    <el-t-button type="primary" size="mini" v-show="permissionMap['user']['user_detail']">权限按钮user_detail</el-t-button>
    <el-t-button type="primary" size="mini" v-show="permissionMap['user']['user_none']">权限按钮user_none</el-t-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            permissionMap: state=> state.permission.permissionMap
        })
    },
    mounted(){
    },
    methods: {
    }
}
</script>

<style>

</style>