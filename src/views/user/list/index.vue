<template>
  <div>
      user/list
    <t-button type="primary" size="mini" v-show="permissionMap['user']['user_detail']">权限按钮user_detail</t-button>
    <t-button type="primary" size="mini" v-show="permissionMap['user']['user_none']">权限按钮user_none</t-button>
  </div>
</template>

<script>
import ThrottleButton from '@/components/ThrottleButton'
import { mapState } from 'vuex'
export default {
    components: {
        't-button':ThrottleButton
    },
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