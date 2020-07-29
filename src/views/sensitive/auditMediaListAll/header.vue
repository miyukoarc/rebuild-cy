<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="审批人：">
      <el-select v-model="query.handlerId" clearable filterable>
        <el-option
          v-for="item in userListSelect"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="审批状态：">
      <el-select v-model="query.auditConfirmation" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="提起人：">
      <el-select v-model="query.submitterId" clearable filterable>
        <el-option
          v-for="item in userListSelect"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <div>
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      options: [
        {
          label: '待审核',
          value: 'TO_BE_REVIEWED',
        },
        {
          label: '审核通过',
          value: 'APPROVED',
        },
        {
          label: '审核不通过',
          value: 'AUDIT_FAILED',
        },
      ],
      query: {
        handlerId: '',
        auditConfirmation: '',
        submitterId: '',
      },
    }
  },
  computed: {
    ...mapState({
      userListSelect: (state) => state.user.listSelect,
    }),
  },
  methods: {
    handleChangeFirst(val) {
      this.$emit('handleSearch', this.query)
    },
    handleChangeSecond(val) {
      this.$emit('handleSearch', this.query)
    },
    handleChangeThird(val) {
      this.$emit('handleSearch', this.query)
    },
    handleSearch() {
      this.$emit('handleSearch', this.query)
    },
    handleRefresh() {
      this.$emit('handleRefresh')
      this.query = this.$options.data().query
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>