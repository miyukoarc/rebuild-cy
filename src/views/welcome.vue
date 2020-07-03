<template>
      <!-- <div v-for="item in loginList" :key="item.tenantId"><el-button size="small"></el-button></div> -->
      <div class="container">
          <!-- <el-radio-group v-model="tenantId" size="small" @change="changeCorp">
              <div class="choice" v-for="item in loginList" :key="item.tenantId">
                <el-radio :label="item.tenantId">{{item.name}}</el-radio>
              </div>
          </el-radio-group>
          <div>
              <el-button size="small" @click="handleLogin">进入</el-button>
          </div> -->
          <h1>SocialCRM</h1>
          <h5>把您的企业服务建立到微信上</h5>
          <div class="text-align-center">
              <el-button size="small" @click="handleEnter" type="primary">进入</el-button>
          </div>


      </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            // tenantId:''
        }
    },
    computed:{
        // ...mapState({
        //     loginList:state => state.auth.loginList
        // })
    },
    created(){
        // this.initDataList()
    },
    methods:{
        // changeCorp(val){
        //     this.$store.commit('auth/SAVE_LOGGEDCORP',val)
        // },
        // initDataList(){
        //     this.$store.dispatch('auth/getLoginList').then(()=>{

        //     })
        //     .catch(err=>{
        //         this.$message({
        //             type:'error',
        //             message:  err||'初始化错误'
        //         })
        //     })
        // },
        // handleLogin(){
        //     const tenantId = this.tenantId+''
        //     this.$router.push({
        //         path:'/login',
        //         query: {tenantId}
        //     })
        // },
        handleEnter(){
            this.$router.push({
                path: '/dashboard'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .welcome{
        width: 400px;
        height: 400px;
        outline: 1px;
    }
}
</style>