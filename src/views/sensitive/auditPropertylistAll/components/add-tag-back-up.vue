<template>
  <div>
    <div
      class="user-tag-container"
      v-for="(tag,index) in alterValue.map(item=>{return genParse(item)})"
      :key="tag.uuid"
    >
      <el-tag closable :disable-transitions="false" @close="handleClose(index)">{{tag.name}}</el-tag>
    </div>
    <!-- <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>-->
    <el-select
      ref="saveTagInput"
      size="small"
      v-if="inputVisible"
      v-model="alterValue"
      filterable
      multiple
      collapse-tags
      placeholder="请选择"
      @change="handleChange"
    >
      <el-option
        v-for="item in listAll"
        :key="item.userId"
        :label="item.name"
        :value="genStringify(item)"
      ></el-option>
    </el-select>
    <el-button v-else class="button-new-tag" size="mini" @click="showInput">添加用户</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      inputVisible: false,
      inputValue: [],
      alterValue: this.value
    }
  },
  computed: {
    ...mapState({
      listAll: state => state.user.listSelect
    })
  },
  created() {
    this.initFilter()
  },
  methods: {
    initFilter() {
      this.$store
        .dispatch('user/getUserListSelect')
        .then(() => {})
        .catch(err => {
          console.error(err)
        })
    },
    handleClose(index) {
      this.alterValue.splice(index, 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.value.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleChange(val) {
      const arr = val.map(item => {
        return JSON.parse(item)
      })
      // console.log(arr)
      this.$emit('change', arr)
    },
    genStringify(obj) {
      return JSON.stringify(obj)
    },
    genParse(str) {
      return JSON.parse(str)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-tag-container {
  margin-bottom: 10px;
}
</style>