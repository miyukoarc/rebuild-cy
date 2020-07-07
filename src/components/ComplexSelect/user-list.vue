<template>
  <div class="list-container">
    <div v-if="loading">
      <i class="el-icon-loading"></i>
    </div>
    <div v-else>
      <div v-if="list.length">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="selects" @change="handleChange">
          <div v-for="item in list" :key="item.uuid" style="margin-bottom:3px;">
            <el-checkbox :label="item.uuid" >
              <el-tag size="mini" type="info">
                <i class="el-icon-user-solid"></i>
                {{item.name}}
              </el-tag>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div v-else>
        <el-divider>未分配员工</el-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      type: Number,
      default: null
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      optionsUuid: [],
      selects: [],
      isIndeterminate: false,
      checkAll: false,
      clearFlag: false
    }
  },
  watch: {
    uuid: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      }
    },
    clearFlag: {
        handler(newVal,oldVal){

            console.log('清空')
        }
    },
    selects:{
        handler(newVal,oldVal){
            // console.log(newVal,oldVal)
            const pick = (source,target) => source.filter(srcItem=>target.includes(srcItem.uuid))

            const arr = pick(this.list,newVal)

            if(newVal.length>oldVal.length){
                
                this.$emit('output',arr)
                console.log('output')
            }else {


                const intersection = oldVal.filter(item=>!newVal.includes(item))

                if(intersection.length<2){
                    console.log('单点删除')
                    this.$emit('cult',intersection[0])
                }else{
                    console.log('清空')
                    this.$emit('cult',intersection)
                }


            }
        }
    }
  },
  computed: {
    alterUuid() {
      return this.uuid
    }
  },
  mounted() {
    this.initData(this.alterUuid)
  },
  methods: {
    initData(uuid) {
      const payload = { departmentsUuid: uuid }
      this.loading = true
      this.$store
        .dispatch('user/getAllUserList', payload)
        .then(res => {
          this.list = res
          this.loading = false
          this.optionsUuid = res.map(item => {
            return item.uuid
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '加载失败'
          })
        })
    },
    handleCheckAllChange(val) {
    //   console.log(val)
        this.selects = val ? this.optionsUuid : [];
        this.isIndeterminate = false;
    //   this.$emit('output', this.selects)
    
    },
    handleChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.optionsUuid.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.optionsUuid.length
    }
  }
}
</script>

<style lang="scss">
.list-container {
  padding: 0 0 0 10px;
}
</style>