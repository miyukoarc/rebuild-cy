<template>
  <div>
      <!-- <div class="cascader-container" v-click-outside="close">
        <div class="trigger" @click="toggle">
            <slot></slot>
        </div> -->

        <div class="content" v-if="isVisible">
            <div class="content-left">
                <div v-for="(item,key) in options" :key="key">
                    <div @click="select(item)">{{item.name}}</div>
                </div>
            </div>
            <div class="content-right">
                <div v-for="(item,key) in lists" :key="key">
                    <div>{{item.name}}</div>
                </div>

            </div>

            <!-- --显示面板 -->
        </div>

      <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'Cascader',
  directives: {
      clickOutside:{
          inserted(el,bingdings){//只在插入时绑定事件
            document.addEventListener('click',e=>{
                if(e.target===el||el.contains(e.target)){
                    return;
                }
                bingdings.value()
            })
          }
      }
  },
  data(){
      return {
          isVisible: true,
          currentSelect: null
      }
  },
  computed: {
      lists(){
          return this.currentSelect&&this.currentSelect.children
      }

  },
  methods:{
      select(item){

          this.currentSelect = item
      },
      close(){
          this.isVisible = false
      },
      toggle(){
          this.isVisible = !this.isVisible
      }
  },
  props:{
      options:{
          type: Array,
          default:()=>[]
      }
  }
}
</script>
<style lang="scss" scoped>
.trigger{
    width: 150px;
    height:25px;
    border: 1px solid #ccc
}
.cascader-container{
    display: flex;
    
}
.content{
    display: flex;
}
</style>