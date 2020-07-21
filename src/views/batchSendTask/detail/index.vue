<template>
  <div class="group-sent-message-warp app-container">
    <!-- 群发详情 -->
    <el-card class="content-spacing">
      <div class="group-sent-message-detail">
        <h4>群发详情</h4>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="创建者：">
            <el-tag>
              <i class="el-icon-user-solid"></i>
              <span>程开元</span>
            </el-tag>
          </el-form-item>
          <el-form-item label="群发消息1：">
            <span>超盈产品测试01</span>
          </el-form-item>
          <el-form-item label="群发消息2：">
            <el-popover placement="right" title trigger="hover">
              <el-image :src="defaultAvatar" style="width:400px;height:400px" />
              <el-image
                slot="reference"
                :src="defaultAvatar"
                alt
                style="max-height: 80px;max-width: 80px"
              />
            </el-popover>
          </el-form-item>
          <el-form-item label="群发类型：">
            <!-- <span>{{batchSendTaskListAllDetail.sendType =='wx'?"企业微信群发":'超盈群发' }}</span> -->
            <span>企业微信群发</span>
          </el-form-item>
          <el-form-item label="发送状态：">
            <!-- <span>{{batchAddTaskState[batchSendTaskListAllDetail.state]}}</span> -->
            <span>发送成功</span>
          </el-form-item>
          <el-form-item label="发送时间：">
            <!-- <span>{{batchSendTaskListAllDetail.updatedAt}}</span> -->
            <span>2020-07-20 10:13:29</span>
          </el-form-item>
          <p></p>
          <el-form-item label="群发对象：">
            <span>在陈开元、陆浩然里2个客户</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
    <!-- 数据统计 -->
    <el-card class="content-spacing">
      <div class="data-statistics">
        <h4>数据统计</h4>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8" class="data-box flex-between-alinecenter text-align-center">
            <div class="flex-1 border-right">
              <span class="blod">1 人</span>
              <p class="desc">已发送成员</p>
            </div>
            <div class="flex-1">
              <span class="blod">2 人</span>
              <p class="desc">送达用户</p>
            </div>
          </el-col>
          <el-col
            :span="8"
            class="data-box flex-between-alinecenter text-align-center"
            style="margin:0 20px"
          >
            <div class="flex-1 border-right">
              <span class="blod">0 人</span>
              <p class="desc">未发送成员</p>
            </div>
            <div class="flex-1">
              <span class="blod">0人</span>
              <p class="desc">
                未送达客户
                <el-tooltip placement="top">
                  <div slot="content">
                    <span class="font-exs">未发送的成员所拥有的所有客户数。</span>
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </p>
            </div>
          </el-col>
          <el-col :span="8" class="data-box flex-between-alinecenter text-align-center">
            <div class="flex-1 border-right">
              <span class="blod">0 人</span>
              <p class="desc">
                客户接收已达上限
                <el-tooltip placement="top">
                  <div slot="content">
                    <span class="font-exs">单客户一周只能接受任意客服的一条群发，如果超出则发送不成功，记为客户接受已达上限</span>
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </p>
            </div>
            <div class="flex-1">
              <span class="blod">0 人</span>
              <p class="desc">因不是好友发送失败</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 成员详情/客户详情 -->
    <div class="info-detail-warp display-flex justify-content-space-between">
      <el-card class="content-spacing flex-1" style="margin-right:10px">
        <div class="member-warp">
          <h4>成员详情</h4>
          <div>
            <el-tabs v-model="memberActiveName" @tab-click="handleClickMember">
              <el-tab-pane
                v-for="(tab,index) in memberTabs"
                :key="index"
                :label="tab.label"
                :name="tab.name"
              >
                <div class="total-warp display-flex align-items-center">
                  <i class="el-icon-s-comment" style="margin-right:5px;color:#555"></i>
                  <strong>共{{memberData.length}}位</strong>
                </div>
                <member-component :memberData="memberData"></member-component>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-card>
      <el-card class="content-spacing flex-1">
        <div class="client-warp">
          <h4>客户详情</h4>
          <el-tabs v-model="clientActiveName" @tab-click="handleClickClient">
            <el-tab-pane
              v-for="(tab,index) in clientTabs"
              :key="index"
              :label="tab.label"
              :name="tab.name"
            >
              <div class="total-warp display-flex align-items-center">
                <i class="el-icon-s-comment" style="margin-right:5px;color:#555"></i>
                <strong>共{{clientData.length}}位</strong>
              </div>
              <client-component :clientData="clientData"></client-component>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import defaultAvatar from "@/assets/no-menber-result.png";
import EventDialog from "./dialog";

import memberComponent from "./components/member";
import clientComponent from "./components/client";

export default {
  components: {
    EventDialog,
    memberComponent,
    clientComponent
  },
  data() {
    return {
      defaultAvatar: defaultAvatar,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },
      query: {
        uuid: ""
      },
      memberActiveName: "all",
      memberTabs: [
        {
          label: "本次推送全部成员",
          name: "all"
        },
        {
          label: "已发送成员",
          name: "1"
        },
        {
          label: "未发送成员",
          name: "2"
        },
        {
          label: "发送失败",
          name: "3"
        }
      ],
      memberData: [
        {
          name: "陈开元",
          img:
            "http://wework.qpic.cn/bizmail/VcUTR8AmXd8Eoeicj9SUOGCj7IBTQy5AkgaHzeBJh8jaicxVvicg0v77w/0",
          length: "13"
        }
      ],

      clientActiveName: "all",
      clientTabs: [
        {
          label: "本次推送全部客户",
          name: "all"
        },
        {
          label: "已送达",
          name: "1"
        },
        {
          label: "未送达客户",
          name: "2"
        },
        {
          label: "客户接收达上限",
          name: "3"
        },
        {
          label: "已不是好友客户",
          name: "4"
        }
      ],
      clientData: [
        {
          name: "陈开元",
          img:
            "http://wework.qpic.cn/bizmail/VcUTR8AmXd8Eoeicj9SUOGCj7IBTQy5AkgaHzeBJh8jaicxVvicg0v77w/0",
          length: "13"
        },
        {
          name: "陆浩然",
          img:
            " http://wework.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs1CTrX18wQ9JrSmyhm8dh60HicOr3bNBoHaM1mB9iaNXrY99mCXfrFNBE/0",
          length: "21"
        }
      ]
    };
  },
  watch: {},
  computed: {
    ...mapState({
      batchSendTaskListAllDetail: state =>
        state.batchSendTask.batchSendTaskListAllDetail,
      batchAddTaskState: state => state.enum.batchAddTaskState
    })
  },
  created() {
    this.query.uuid = this.$route.params.uuid;
    this.initDetail(this.query.uuid);
    // let params = {
    //   batchSendTaskUuid: "",
    //   page: this.pageConfig.pageNumber,
    //   sendResult: ""
    // };
    // this.initBatchSendTaskResult();
  },
  mounted() {
    console.log(this.batchSendTaskListAllDetail, "batchSendTaskListAllDetail");
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    // 初始化详情数据
    initDetail(payload) {
      this.$store
        .dispatch("batchSendTask/getBatchSendTaskDetail", payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    initBatchSendTaskResult(payload) {
      this.$store
        .dispatch("getListBatchSendTaskResult", payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: err || "初始化失败"
          });
        });
    },
    handleClickMember(val, event) {
      console.log(this.memberActiveName, "memberActiveName");
      if (this.memberActiveName == "all") {
        this.memberData = [
          {
            name: "陈开元",
            img:
              "http://wework.qpic.cn/bizmail/VcUTR8AmXd8Eoeicj9SUOGCj7IBTQy5AkgaHzeBJh8jaicxVvicg0v77w/0",
            length: "13"
          }
        ];
      }
      if (this.memberActiveName == 1) {
        this.memberData = [
          {
            name: "陈开元",
            img:
              "http://wework.qpic.cn/bizmail/VcUTR8AmXd8Eoeicj9SUOGCj7IBTQy5AkgaHzeBJh8jaicxVvicg0v77w/0",
            length: "13"
          }
        ];
      }
      if (this.memberActiveName == 2) {
        this.memberData = [];
      }
      if (this.memberActiveName == 3) {
        this.memberData = [];
      }
    },
    handleClickClient() {
      if (this.clientActiveName == "all") {
        this.clientData = [
          {
            name: "陈开元",
            img:
              "http://wework.qpic.cn/bizmail/VcUTR8AmXd8Eoeicj9SUOGCj7IBTQy5AkgaHzeBJh8jaicxVvicg0v77w/0",
            length: "13"
          },
          {
            name: "陆浩然",
            img:
              " http://wework.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs1CTrX18wQ9JrSmyhm8dh60HicOr3bNBoHaM1mB9iaNXrY99mCXfrFNBE/0",
            length: "21"
          }
        ];
      }
      if (this.clientActiveName == 1) {
        this.clientData = [
          {
            name: "陈开元",
            img:
              "http://wework.qpic.cn/bizmail/VcUTR8AmXd8Eoeicj9SUOGCj7IBTQy5AkgaHzeBJh8jaicxVvicg0v77w/0",
            length: "13"
          },
          {
            name: "陆浩然",
            img:
              " http://wework.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs1CTrX18wQ9JrSmyhm8dh60HicOr3bNBoHaM1mB9iaNXrY99mCXfrFNBE/0",
            length: "21"
          }
        ];
      }
      if (this.clientActiveName == 2) {
        this.clientData = [];
      }
      if (this.clientActiveName == 3) {
        this.clientData = [];
      }
      if (this.clientActiveName == 4) {
        this.clientData = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.group-sent-message-warp {
  .group-sent-message-detail {
    > h4 {
      margin-bottom: 30px;
    }
    p {
      border-bottom: 1px dashed #eee;
      margin-bottom: 20px;
    }
  }
  .data-statistics {
    > h4 {
      margin-bottom: 30px;
    }
    .data-box {
      background: #fbfdff;
      border: 1px solid #daedff;
      height: 118px;
    }
    .blod {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 33px;
      margin-bottom: 5px;
    }
    .desc {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.85);
      opacity: 0.65;
      line-height: 18px;
    }
    .border-right {
      border-right: 1px solid #eee;
    }
  }
  .info-detail-warp {
    .member-warp {
      > h4 {
        margin-bottom: 30px;
      }
      .total-warp {
        height: 32px;
        font-size: 13px;
        line-height: 14px;
        margin-bottom: 10px;
      }
    }
    .client-warp {
      > h4 {
        margin-bottom: 30px;
      }
      .total-warp {
        height: 32px;
        font-size: 13px;
        line-height: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>