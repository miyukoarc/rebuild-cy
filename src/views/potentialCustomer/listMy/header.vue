<template>
  <el-form ref="searchForm" inline label-width="120px" class="run-way-list-all-header">
    <el-form-item label="客户名称：">
      <el-input v-model.trim="query.name" clearable></el-input>
    </el-form-item>

    <!-- <el-form-item label="所属员工：">
      <el-select filterable v-model="query.belongUuid" clearable>
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item> -->

    <el-form-item label="添加员工：">
      <el-select v-model="query.creatorUuid" clearable filterable>
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="添加时间：">
      <el-date-picker
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH:mm:ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleSelectedTime"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="添加次数：">
      <el-radio-group v-model="query.flag">
        <el-radio :label="1">全部客户</el-radio>
        <el-radio :label="0">未添加过的客户</el-radio>
        <el-radio :label="2">
          自定义添加客户的次数
          <span style="display:inline-block;width:50px;color:#000">
            <el-input
              ref="minInput"
              size="mini"
              v-model.trim="query.min"
              @input="inputMin($event)"
              @focus="focusInput"
              class="min"
            ></el-input>
            <span>--</span>
            <el-input
              size="mini"
              v-model.trim="query.max"
              @focus="focusInput"
              @input="inputMax($event)"
              class="max"
            ></el-input>
            <span>次</span>
          </span>
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <div class="handle-warp">
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: [],
      query: {
        name: "",
        belongUuid: "",
        creatorUuid: "",
        startTime: "",
        endTime: "",
        flag: 1,
        max: null,
        min: null
      },
      timer: null
    };
  },
  watch: {
    "query.flag": {
      handler(newVal, oldVal) {
        if (newVal != 2) {
          this.query.min = "";
          this.query.max = "";
        } else {
          this.$nextTick(() => {
            //DOM 更新了
            // document.getElementById("minInput").focus();
            this.$refs.minInput.focus();
          });
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      userListAll: state => state.user.listSelect
    })
  },
  methods: {
    handleSelectedTime(val) {
      this.query.startTime = this.value[0];
      this.query.endTime = this.value[1];
    //   this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit("handleSearch", this.query);
      }, 1000);
    },
    handleSelectedChange(val) {
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.query = this.$options.data().query;
      this.value = this.$options.data().value;
      this.$emit("handleRefresh");
    },
    inputMin(e) {
      if (this.query.min || this.query.max) {
        this.query.flag = 2;
      }
      let deg = /[^\d]/g;
      this.query.min = e.replace(deg, "");
      if (this.query.min == "" || this.query.min <= 0 || this.query.min > 99) {
        this.$message.warning("输入数字必须在0-100之间");
        this.query.min = 0;
      }
    },
    inputMax(e) {
      let deg = /[^\d]/g;
      this.query.max = e.replace(deg, "");
      if (this.query.max == "" || this.query.max < 0 || this.query.max > 100) {
        this.$message.warning("输入数字必须在0-100之间");
        this.query.max = 1;
      }
    },
    focusInput() {
      this.query.flag = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
.run-way-list-all-header {
  .tag-border {
    border: 1px solid #dcdfe6;
    padding: 1px 5px;
    border-radius: 4px;
  }

  .handle-warp .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
<style lang="scss">
// .min,
.max.el-input--mini .el-input__inner {
  text-align: center;
}
.min.el-input--mini .el-input__inner {
  text-align: center;
}
</style>