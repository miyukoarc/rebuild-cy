<template>
  <div>
    <el-select
      ref="saveTagInput"
      size="small"
      v-if="inputVisible"
      v-model="alterValue"
      filterable
      multiple
      placeholder="请选择"
      @change="handleInputConfirm"
    >
      <el-option v-for="item in listAll" :key="item.userId" :label="item.name" :value="item.userId"></el-option>
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
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.alterValue = newVal
      }
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
    handleClose(tag) {
      this.alterValue.splice(this.alterValue.indexOf(tag), 1)
      this.$emit('change', this.alterValue)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      this.$emit('change', this.alterValue)
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