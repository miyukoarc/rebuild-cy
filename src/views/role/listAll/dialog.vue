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
// import EventDisable from './event-disable.vue'
// import EventEnable from './event-enable.vue'
// import EventKick from './event-kick.vue'
import CreateTemplate from './event-create.vue'
import EditTemplate from './event-edit.vue'
import {mapState} from 'vuex'
export default {
components:{
    CreateTemplate,
    EditTemplate
},
  data() {
    return {
      dialogVisible: false,
      event: 'CreateTemplate',
      eventType: '',
      transfer: {}
    };
  },
  watch:{
      eventType:{
          handler(newVal,oldVal){
            //   console.log(newVal)
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
          if(this.eventType==='create'){
              return '创建模板'
          }

          if(this.eventType==='edit'){
              return '编辑模板'
          }
      },
      close(){
          this.event=''
      }
    
  }
  
};
</script>

<style>
</style>