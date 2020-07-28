<template>
  <div>
      <div id="qrcode">qrcode</div>
  </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    mounted(){
        console.log(this.$route)
        const tenantId = this.$route.query.tenantId
        this.$nextTick(()=>{

            new WwLogin({
              id: 'qrcode',
              appid: 'wwa266cd2b968ae008',
              agentid: '1000019',
              redirect_uri: `http://sidebar.cyscrm.com/api/wxlogin/${tenantId}`,
              state: '123456',
              href: '',
            })
        })
    },
    methods:{

    }
}
</script>

<style>

</style>