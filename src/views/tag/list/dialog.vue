<template>
  <div>
      <el-dialog :title="genTitle"  :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body width="600px" :close-on-click-modal="false" center destroy-on-close>
          <div>
              <component :is="eventType"></component>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import AddComponent from './event-add'
import EditComponent from './event-edit'
export default {
    components: {
        AddComponent,
        EditComponent,
    },
    data(){
        return {
            dialogVisible: false,
            eventType: 'AddComponent',//事件
            event: 'add',//当前组件
        }
    },
    computed: {
        genTitle(){
            if(this.event==='add'){
                return '新增标签组'
            }
            if(this.event==='edit'){
                return '编辑标签组'
            }
        }
    },
    mounted(){
        // this.$bus.$on('showDialog',payload=>{
            // console.log(payload)
        // })//监听主组件点击事件
    },
    beforeDestroy(){
        // this.$bus.$off('showDialog')

    },
    methods: {

    }

}
</script>

<style>

</style>