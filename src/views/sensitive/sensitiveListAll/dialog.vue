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
import DistributeTemplate from './event-distribute'
import ChangeTemplate from './event-change'
import {mapState} from 'vuex'
export default {
components:{
    CreateTemplate,
    EditTemplate,
    DistributeTemplate,
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
              return '新建敏感词'
          }

          if(this.eventType==='edit'){
              return '编辑敏感词'
          }

          if(this.eventType==='change'){
              return '修改通知人'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>