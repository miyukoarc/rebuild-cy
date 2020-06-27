<template>
    <div>
        <el-dialog :title="genTitle()" :visible.sync="dialogVisible" :modal-append-to-body="false" center append-to-body width="600px" :close-on-click-modal="false">
            <div>
                <component :is="event" />
            </div>
        </el-dialog>
    </div>
</template>

<script>

import CreateGroupTemplate from './event-create-group.vue'
import EditGroupTemplate from './event-edit-group.vue'
import {mapState} from 'vuex'
export default {
components:{
    CreateGroupTemplate,
    EditGroupTemplate
},
  data() {
    return {
      dialogVisible: false,
      event: 'CreateGroupTemplate',
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
  },
  methods: {
      genTitle(){
          if(this.eventType==='createGroup'){
              return '创建分组'
          }

          if(this.eventType==='editGroup'){
              return '编辑分组'
          }
          
          
      },
  }
  
};
</script>

<style>
</style>