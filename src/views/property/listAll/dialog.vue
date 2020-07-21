<!--
 * @Author: your name
 * @Date: 2020-07-21 14:21:29
 * @LastEditTime: 2020-07-21 14:25:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\property\listAll\dialog.vue
--> 
<template>
    <div>
        <el-dialog :title="genTitle()" :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body width="600px" center :close-on-click-modal="false">
            <div>
                <component :is="event" />
            </div>
        </el-dialog>
    </div>
</template>

<script>

import CreateTemplate from './event-create.vue'
import EditTemplate from './event-edit.vue'
import DistributeTemplate from './event-distribute'
import {mapState} from 'vuex'
export default {
components:{
    CreateTemplate,
    EditTemplate,
    DistributeTemplate
},
  data() {
    return {
      dialogVisible: false,
      event: 'EditTemplate',
      eventType: ''
    };
  },
  watch:{
      eventType:{
          handler(newVal,oldVal){
              if(newVal){
                  this.genTitle()

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
              return '添加字段'
          }

          if(this.eventType==='edit'){
              return '编辑模板'
          }

          if(this.eventType==='distribute'){
              return '分配部门'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>