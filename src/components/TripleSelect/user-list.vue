<template>
  <p v-if="!userList.length" class="text-align-center">
    <span class="tips font-es color-info user-select-none">暂无数据</span>
  </p>
  <ul class="user-list" v-else-if="userList.length&& !loading">
    <!-- <el-checkbox-group v-model="users" @change="handleCheck" > -->
    <label class="label">
      <el-button type="text" size="mini" @click="handleClickChange">全选</el-button>
    </label>
    <el-divider></el-divider>
    <li v-for="(item) in userList" :key="item.uuid">
      <!-- <el-checkbox :label="item.uuid" @click="handleClick">{{item.name}}</el-checkbox> -->
      <label class="label">
        <div class="customer-input">
          <input
            class
            type="checkbox"
            :value="item"
            ref="checkbox"
            v-model="users"
            @click="handleClick(item)"
          />
          <span>{{item.name}}</span>
        </div>
      </label>
    </li>
    <!-- </el-checkbox-group> -->
  </ul>

  <div v-else-if="loading" class="text-align-center" style="height:100%;display:flex;">
    <i class="el-icon-loading" style="margin:auto;"></i>
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      userList: [],
      //   userUuids: [],
      users: [],
      selectedUsers: [],
      selectedUuids: [],

      checkAll: false,
      checkAllState: false,
    }
  },
  watch: {
    checkAllState: {
      handler(newVal, oldVal) {
        if (newVal) {
        }
      },
    },
    uuid: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          //   console.log(newVal)
          this.initFramework(newVal)
        }
      },
    },
    users: {
      handler(newVal, oldVal) {
        // const intersection = this.userList.filter((item) => {
        //   return newVal.includes(item.uuid)
        // })
        // this.selectedUsers = intersection
        // this.selectedUuids = intersection.map((item)=>{return item.uuid})
        this.$bus.$emit('transfer-users', newVal)
        // console.log(intersection)
      },
    },
  },
  mounted() {},
  methods: {
    initFramework(uuid) {
      const payload = { departmentsUuid: uuid }
      this.loading = true
      //   console.log(uuid)
      this.$store
        .dispatch('user/listSelectAll', payload)
        .then((res) => {
          this.userList = res
          //   this.userUuids = res.map(item=>{return item.uuid})
          this.loading = false
          //   this.optionsUuid = res.map((item) => {
          //     return item.uuid
          //   })
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '加载失败',
          })
        })
    },
    //改变当前部门员工选项
    handleCheck(val) {
      // console.log(val)
      this.$emit('change-user', { uuids: val })
    },
    handleClick(item) {
      this.$nextTick(() => {
        // let arr = this.$refs['checkbox']
        //   .filter((item) => {
        //     return !!item.checked
        //   })
        //   .map((item) => {
        //     return item._value
        //   })
        // console.log(arr)
        // this.selectedUsers = arr
        const emptyFlag = this.$refs['checkbox'].every((item) => {
          return item.checked == false
        })

        // if(!emptyFlag){
        //     this.checkAll = true
        //     console.log('!!')
        // }else {
        //     this.checkAll = false 
        // }

        console.log(emptyFlag)
      })
    },
    handleClickChange() {
    //   console.log(this.$refs['elbox'])

      const checkAllFlag = this.$refs['checkbox'].every((item) => {
        return item.checked == true
      })

      const emptyFlag = this.$refs['checkbox'].every((item) => {
        return item.checked == false
      })

      //全选
      if (checkAllFlag) {
        console.log('全选')
        this.$refs['checkbox'].forEach((item) => {
          let ev = new MouseEvent('click')
          item.dispatchEvent(ev)
        })
      }
      //非全选
      if (!checkAllFlag) {
        if (emptyFlag) {
          console.log('空选')
          this.$refs['checkbox'].forEach((item) => {
            let ev = new MouseEvent('click')
            item.dispatchEvent(ev)
          })
        } else {
          console.log('半选')
          this.$refs['checkbox'].forEach((item) => {
            if (!item.checked) {
              let ev = new MouseEvent('click')
              item.dispatchEvent(ev)
            }
          })
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.check-all-tips {
  color: #606266;
  margin: 5px;
}
.label {
  font-weight: 500;
  .customer-input {
    line-height: 20px;
    height: 20px;
  }
}
</style>

<style lang="scss">
.user-list {
  .el-divider.el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>