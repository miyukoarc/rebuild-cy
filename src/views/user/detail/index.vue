
<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <el-row>
        <el-col :span="24">
          <div class="box-card left-top-info">
            <div class="info-name">
              <img :src="userDetail.avatar" />
              <div>
                <div>{{userDetail.name}}</div>
                <!-- <span>共{{tableData.length}}位客户</span> -->
              </div>
              <el-tag effect="plain" size="small" v-if="userDetail.role">{{userDetail.role.name}}</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="content-spacing">
      <div slot="header" class="clearfix">
        <div>
          <span>联系客户统计</span>
        </div>
        <div class="mt-20">
          <el-radio-group v-model="flag" @change="changeDate">
            <el-radio-button label="1">昨天</el-radio-button>
            <el-radio-button label="2">七天内</el-radio-button>
            <el-radio-button label="3">近30天</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="value"
            style="float:right"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
            value-format="yyyy-MM-dd hh:mm:ss"
            :picker-options="timeoption"
          ></el-date-picker>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="10">
          <grid :grid-data="GridData1" />
        </el-col>
        <el-col :span="14">
          <grid :grid-data="GridData2" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grid from './components/grid'
import dayjs from 'dayjs'
export default {
  components: {
    Grid
  },
  data() {
    return {
      value: '',
      timeoption: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime()
          if (maxDate) {
            this.pickerMinDate = ''
          }
        },
        disabledDate: time => {
          if (this.pickerMinDate !== '') {
            const day30 = (30 - 1) * 24 * 3600 * 1000
            let maxTime = this.pickerMinDate + day30
            if (maxTime > new Date()) {
              maxTime = new Date()
            }
            return time.getTime() > maxTime
          }
          return time.getTime() > Date.now()
        }
      },
      GridData1: [
        {
          num: 0,
          type: '新增客户数(人)'
        },
        {
          num: 0,
          type: '主动添加客户数(人)'
        },
        {
          num: 0,
          type: '拉黑/删除客户数(人)'
        }
      ],
      GridData2: [
        {
          num: 0,
          type: '聊天总数(条)'
        },
        {
          num: 0,
          type: '发送消息数(条)'
        },
        {
          num: 0,
          type: '已回复聊天占比'
        },
        {
          num: 0,
          type: '平局首次回复时长'
        }
      ],

      flag: 1,

      postQuery: {
        end: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        sta: dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD HH:mm:ss'),
        userid: [] //string
      }
    }
  },
  computed: {
    ...mapState({
      userDetail: state => state.user.userDetail
    })
  },
  async created() {
    // console.log(this.$route.query.uuid)
    await this.initData(this.$route.query.uuid)
    this.initGrid(this.postQuery)
  },
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    initData(uuid) {
      const _this = this
      return new Promise((resolve, reject) => {
        _this.$store
          .dispatch('user/getDetail', uuid)
          .then(() => {
            _this.postQuery.userid.push(_this.userDetail.userId)
            resolve()
          })
          .catch(err => {
            _this.$message({
              type: 'error',
              message: '初始化失败'
            })
            reject()
          })
      })
    },
    initGrid(payload) {
      this.$store
        .dispatch('externalUser/getCustomerStatistics', payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    changeDate() {},
    changeTime() {}
  }
}
</script>

<style lang="scss" scoped>
.left-top-info {
  .info-name {
    display: flex;

    img {
      width: 64px;
      height: 64px;
    }
    > div {
      line-height: 22px;
      font-size: 18px;
      margin: 0 10px;
      span {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>