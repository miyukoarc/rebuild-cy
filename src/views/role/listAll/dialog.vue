<!--
 * @Author: your name
 * @Date: 2020-06-27 14:05:27
 * @LastEditTime: 2020-06-27 17:09:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\role\listAll\dialog.vue
--> 
<template>
    <div>
        <el-dialog :title="genTitle()" :visible.sync="dialogVisible" @close="close" :modal-append-to-body="false" append-to-body center width="600px" :close-on-click-modal="false">
            <div>
                <component :is="event" :transfer="transfer"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ChangeTemplate from './event-change'
import CreateTemplate from './event-create.vue'
import EditTemplate from './event-edit.vue'
import {mapState} from 'vuex'
export default {
components:{
    CreateTemplate,
    EditTemplate,
    ChangeTemplate
},
  data() {
    return {
      dialogVisible: false,
      event: '',
      eventType: '',
      transfer: {}
    };
  },
  watch:{
      eventType:{
          handler(newVal,oldVal){
              if(newVal){
                  this.genTitle()
                //   this.toggleComponent(newVal)
              }
          },
          immediate: true,
      }
  },
  computed:{
      ...mapState({

      })
  },
  mounted(){
      
      
  },
  updated(){

  },
  methods: {

      genTitle(){
          const type = this.eventType
          switch(type){
              case 'create':
                  return '创建模板'
              case 'edit': 
                  return '编辑模板'
              case 'change':
                  return '切换节点'
          }
        //   if(this.eventType==='create'){
        //       return '创建模板'
        //   }

        //   if(this.eventType==='edit'){
        //       return '编辑模板'
        //   }
      },
      close(){
          this.event=''
      }
    
  }
  
};
</script>

<style>
</style>