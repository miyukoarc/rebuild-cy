<!--
 * @Author: your name
 * @Date: 2020-07-17 18:24:26
 * @LastEditTime: 2020-07-17 23:13:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\batchSendTask\detail\components\member.vue
--> 
<template>
  <div class="member-detail-content detail-content flex-col">
    <div v-if="memberData.length>0">
      <div class="detail-content-inner" v-for="(item,index) in memberData" :key="index">
        <div class="no-send-box member-detail-item detail-item">
          <div class="left display-flex">
            <img :src="item.img" class="avatar-img" />
            <div class="nickname-friends">
              <div class="nickname display-flex">
                <h5>{{item.name}}</h5>
                <div class="fail-send-box display-flex align-items-center">
                  <!-- <span class="tips-wrap">
                    <span>
                      未收到群发任务
                      <el-tooltip placement="top">
                        <div slot="content">
                          <span class="font-exs">该成员满足筛选条件的客户接受消息都已达上线。</span>
                        </div>
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </span>
                  </span> -->
                </div>
              </div>
              <div class="friends">
                <p>共{{item.length}}个好友</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="unvisible loading-hint full-w flex-row align-center">
          <div
            id
            class="ant-spin ant-spin-spinning ant-table-with-pagination ant-table-spin-holder"
            style
          >
            <span class="ant-spin-dot ant-spin-dot-spin">
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
            </span>
          </div>
          <span style="margin-left: 10px;">加载中...</span>
        </div>
        <div class="hide no-more-box full-w text-center">没有更多了~</div>-->
      </div>
    </div>

    <div v-else class="flex-column-center-alinecenter">
      <img :src="noMember" alt style="width:136px;height:136px" />
      <div class="font-s" style="line-height:28px">没有相关客户哦~</div>
    </div>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/no-menber-result.png";

export default {
  props: {
    memberData: Array
  },
  data() {
    return {
      noMember: defaultAvatar
    };
  }
};
</script>

<style lang="scss" scoped>
.member-detail-content {
  .nickname-friends {
    .nickname {
      line-height: 20px;
      margin-bottom: 5px;
      h5 {
        margin-right: 5px;
      }
      .fail-send-box {
        background: #ffd4b6;
        border-radius: 2px;
        .tips-wrap {
          font-size: 13px;
          padding: 0 5px;
          line-height: 15px;
        }
      }
    }
  }
}
.detail-item {
  width: 100%;
  padding: 27px 24px 27px 19px;
  background: #fbfdff;
  border: 1px solid #cfe8ff;
  margin-bottom: 20px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.avatar {
  margin-right: 15px;
  width: 54px;
  height: 54px;
  border-radius: 4px;
  font-size: 24px;
}
.friends {
  height: 28px;
  font-size: 15px;
  color: #888;
  line-height: 28px;
}
.avatar-img {
  margin-right: 15px;
  width: 54px;
  height: 54px;
  border-radius: 4px;
}
</style>