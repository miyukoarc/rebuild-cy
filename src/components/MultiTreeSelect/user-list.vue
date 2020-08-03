<template>
  <div class="list-container">
    <div v-if="loading">
      <i class="el-icon-loading"></i>
    </div>
    <div v-else>
      <div v-if="list.length">
        <div v-if="multiple">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >
            <span class="color-info font-exs">全选</span>
          </el-checkbox>
          <el-checkbox-group v-model="selects" @change="handleChange">
            <div v-for="(item,index) in list" :key="index" style="margin-bottom:3px;">
              <el-checkbox :label="item.uuid">
                <el-tag size="mini" type="info">
                  <i class="el-icon-user-solid"></i>
                  {{item.name}}
                </el-tag>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <div v-else>
          <div v-for="(item,index) in list" :key="index">
            <el-radio v-model="selects[0]" :label="item.uuid" style="margin-bottom:3px;">
              <el-tag size="mini" type="info">
                <i class="el-icon-user-solid"></i>
                {{item.name}}
              </el-tag>
            </el-radio>
          </div>
        </div>
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
      default: null,
    },
    index: {
      type: Number,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      optionsUuid: [],
      selects: [],
      isIndeterminate: false,
      checkAll: false,
      clearFlag: false,
    }
  },
  watch: {
    uuid: {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal)
      },
    },
    clearFlag: {
      handler(newVal, oldVal) {
        // console.log('清空')
      },
    },
    selects: {
      handler(newVal, oldVal) {
        const pick = (source, target) =>
          source.filter((srcItem) => target.includes(srcItem.uuid))

        const arr = pick(this.list, newVal)

        if (newVal.length > oldVal.length) {
          this.$emit('output', arr)
        } else if (newVal.length < oldVal.length) {
          const intersection = oldVal.filter((item) => !newVal.includes(item))

          if (intersection.length < 2) {
            this.$emit('cult', intersection[0])
          } else {
            this.$emit('cult', intersection)
          }
        } else {
          // if(!this.multiple){

        //   console.log(newVal)
          const arr = pick(this.list, newVal)
          this.$emit('single', arr)
          // this.$emit('output', newVal)
          // }
          //   const intersection = this.list.filter(
          //     item => !newVal.includes(item.uuid)
          //   )
        }
      },
    },
  },
  computed: {
    alterUuid() {
      return this.uuid
    },
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
        .then((res) => {
          this.list = res
          this.loading = false
          this.optionsUuid = res.map((item) => {
            return item.uuid
          })
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '加载失败',
          })
        })
    },
    handleCheckAllChange(val) {
      this.selects = val ? this.optionsUuid : []
      this.isIndeterminate = false
    },
    handleChange() {
      let checkedCount = this.selects.length
      this.checkAll = checkedCount === this.optionsUuid.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.optionsUuid.length
    },
  },
}
</script>

<style lang="scss">
.list-container {
  padding: 0 0 0 10px;
}
</style>