<template>
    <div>
        <el-dialog :title="genTitle()" :visible.sync="dialogVisible" :modal-append-to-body="false" append-to-body width="600px" :close-on-click-modal="false">
            <div>
                <component :is="event" />
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
      eventType: ''
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
    //   console.warn(this.genTitle())
  },
  methods: {
    //   toggleComponent(type){
    //       if(type=='edit'){
    //           this.event = 'EditTemplate'
    //       }
    //       if(type=='create'){
    //           this.event = 'CreateTemplate'
    //       }
    //   },
      genTitle(){
          if(this.eventType==='create'){
              return '创建模板'
          }

          if(this.eventType==='edit'){
              return '编辑模板'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>