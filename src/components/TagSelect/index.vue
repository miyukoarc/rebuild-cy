<template>
  <div class="tag-select-container">
    <div v-for="(group,groupIndex) in alterArr" :key="group.groupId" class="tag-group">
      <el-row>
        <el-col class="tips" :span="8">
          <span class="font-exs color-info">{{group.groupName}}</span>
        </el-col>
        <el-col class="tags" :span="16" v-if="value.length">
          <div v-for="(tag,index) in group.tagList" :key="tag.uuid" class="tag-container">
            <el-tag
              size="mini"
              :type="alterType(groupIndex,index,tag.uuid)"
              style="margin-right:3px;"
              @click="handleToggle(groupIndex,tag,index)"
            >{{tag.tagName}}</el-tag>
            <!-- <span class="tag"></span> -->
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="text-align-center" @click="curly = !curly">
      <el-button type="text" size="mini">{{ curly?'展开':'收起' }}<i class="el-icon--right" :class="curly? 'el-icon-arrow-up':'el-icon-arrow-down '" /></el-button>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  model: {
      props: 'value',
      event: 'change'
  },
  data() {
    return {
      curly: false,
      tagsState: {},
      stateArr: []
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.curly = newVal.length > 2 ? true : false
        this.initTagsState()
      },
      immediate: true
    }
  },
  computed: {
    alterArr() {
      return this.curly ? this.options.slice(0, 2) : this.options
    }
  },
  methods: {
    initTagsState() {
        const temp = []
      this.options.forEach(item => {
        // this.$set(
        //   this.tagsState,
        //   item.groupId,
        //   []
        // )
        temp.push([])
        // this.result.push([])
      })
        this.$emit('change',temp)
    },
    alterType(groupId, index, uuid) {
      //   console.log(this.tagsState[groupId][index] ? 'primary':'info')
    //   return this.tagsState[groupId].includes(uuid) ? 'primary' : 'info'
      return this.value[groupId].includes(uuid)?'primary':'info'
    },
    handleToggle(groupIndex, tag, index) {
        // console.log(groupIndex)
        // console.log(this.stateArr[groupIndex])

        /**
         * stateArr
         */

        const temp = this.value[groupIndex]

        const multiTemp = this.value

      if (temp.includes(tag.uuid)) {

          temp.splice(temp.findIndex(item=>{return item==tag.uuid}),1)

          multiTemp.splice(groupIndex,1,temp)

          
            
        // this.result[groupIndex].splice(this.result[groupIndex].findIndex(item=>{return item==tag.uuid}), 1)
      } else {

          temp.push(tag.uuid)

          multiTemp.splice(groupIndex,1,temp)

        // this.result[groupIndex].push(tag.uuid)
      }
    //   console.log(temp,multiTemp)



      this.$emit('change',multiTemp)

    },
    flatten(){

    }
  }
}
</script>

<style lang="scss">
.tag-select-container {
  .tag-group {
    .tips {
      height: 26px;
      line-height: 26px;
    }
    .tags {
      line-height: 26px;
      user-select: none;
      .tag-container {
        cursor: pointer;
        display: inline-block;
        .tag {
          height: 20px;
          padding: 0 5px;
          line-height: 19px;
          border-width: 1px;
          border-style: solid;
          border-radius: 4px;
          display: inline-block;
          box-sizing: border-box;
          white-space: nowrap;
        }
      }

    }
  }
}
</style>