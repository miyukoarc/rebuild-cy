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
      event: 'DistributeTemplate',
      eventType: 'distribute'
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
        //   if(this.eventType==='create'){
        //       return '创建模板'
        //   }

        //   if(this.eventType==='edit'){
        //       return '编辑模板'
        //   }

          if(this.eventType==='distribute'){
              return '分配模板'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>