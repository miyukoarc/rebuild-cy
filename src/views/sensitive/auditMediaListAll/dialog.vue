<template>
    <div>
        <el-dialog :title="genTitle()" destroy-on-close :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body width="600px" center :close-on-click-modal="false">
            <div>
                <component :is="event" :transfer="transfer"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import AuditTemplate from './event-audit'
import {mapState} from 'vuex'
export default {
components:{
    AuditTemplate
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

          if(this.eventType==='audit'){
              return '审核详情'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>