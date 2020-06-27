<template>
    <div>
        <el-dialog :title="genTitle()" :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body width="600px" center :close-on-click-modal="false">
            <div>
                <component :is="event" :transfer="transfer"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import CreateTemplate from './event-create.vue'
import EditTemplate from './event-edit.vue'
// import DistributeTemplate from './event-distribute'
import {mapState} from 'vuex'
export default {
components:{
    CreateTemplate,
    EditTemplate,
    // DistributeTemplate
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
              return '添加动态'
          }

          if(this.eventType==='edit'){
              return '编辑动态'
          }

          if(this.eventType==='distribute'){
              return '添加动态'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>