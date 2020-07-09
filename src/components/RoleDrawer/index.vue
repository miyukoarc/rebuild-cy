<template>
  <div class="role-drawer">
      <el-tag style="margin-right:3px;" size="small" type="primary" v-for="role in alterRoles" :key="role.uuid"><i class="el-icon-user-solid"></i><span class="font-exs">{{role.name}}</span></el-tag>
      <div class="text-align-center">
                      <span class="font-exs color-info">共{{total}}个角色</span>
        <el-button v-if="roles.length>3" type="text" size="mini" @click="curly=!curly">{{'展开'}} <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i></el-button>

      </div>
  </div>
</template>

<script>
export default {
    props:{
        roles: {
            type: Array,
            default: ()=>{
                return []
            }
        }
    },
    data(){
        return {
            curly: false
        }
    },
    watch:{
        roles: {
          handler(newVal,oldVal){

            this.curly = newVal.length>3?true:false
          },    
          immediate: true
        }
    },
    computed:{
        total(){
            return this.roles.length
        },
        alterRoles(){
            return this.curly?this.roles.slice(0,3):this.roles
        }
    }

}
</script>

<style lang="scss" scoped>
.role-drawer{
    display: inline-block;

}
</style>