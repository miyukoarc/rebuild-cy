<template>
  <div>
      <h3>{{detail.title}}</h3>
      <div class="article-container">
          <div class="font-exs color-info" v-html="detail.articleContent"></div>
      </div>
      
  </div>
</template>

<script>
export default {
    props: {
        uuid: {
            type: Number,
            default: 0
        }
    },
    data (){
        return {
            detail: {}
        }
    },
    created(){
        this.initData(this.uuid)
    },
    methods:{
        initData(payload){
            this.$store.dispatch('media/getArticleDetail',payload).then(res=>{
                this.detail = res
            })
            .catch(err=>{
                console.error(err)
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.article-container{
    width: 400px;
    height: 400px;
    overflow-y: scroll;
}
</style>