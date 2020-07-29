<!--
 * @Author: your name
 * @Date: 2020-05-12 15:34:16
 * @LastEditTime: 2020-07-28 22:15:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\listSingle.vue
 -->
<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="欢迎语1:">
        <div class="msg-textarea-box full-w">
          <div class="insert-btn">
            <el-button
              type="text"
              class="clickable no-select"
              :disabled="!insertName"
              @click="insertionMemberName(memberNick)"
            >[插入客户昵称]</el-button>
          </div>
          <inputEdit ref="chatInput" v-model="ruleForm.welcomeContent" style="height:200px" />
        </div>
      </el-form-item>
    </el-form>

    <div>
      <!-- 地图 -->
      <div v-for="(list,listIndex) in singleListAllData" :key="listIndex" class="allChat clearfix">
        <!-- :is="list.msgType+'Component'" -->
        <!-- :is="currentView" -->
        <component
          :is="list.msgType+'Component'"
          :key="listIndex"
          :item="list"
          :to-user-id="toUserId"
          :from-user-id="fromUserId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import inputEdit from "@/components/inputEdit";

import locationComponent from "../views/message/singleListAll/messageTypeComponent/locationComponent";

export default {
  name: "ListSingleAll",
  components: {
    inputEdit,
    locationComponent,
  },
  data() {
    return {
      // 设置欢迎语
      messageImage: "",
      mediaId: "",
      mediaUuid: "",
      insertName: true,
      welcomecontentT: {},
      memberNick: "客户昵称",
      ruleForm: {
        name: "",
        member: [],
        options: [],
        autoAddFriend: true,
        openTime: "1",
        welComeType: "MYWEL",
        welcomeContent: "",
        welComeMediaType: "IMG",
        link: "",
      },
      // 地图
      toUserId: "zeness",
      fromUserId: "wmrbZlEAAAlTeSPul6DvsYxfPmAcYPbw",
      singleListAllData: [
        {
          createdAt: null,
          msgId: "9527797354379316370_1595838688",
          chatType: "SINGLE",
          groupChatId: null,
          groupName: null,
          action: "send",
          msgTime: "2020-07-27 16:31:28",
          msgType: "location",
          msgContent: null,
          msgSeq: 5823,
          fromUser: "zeness",
          fromAvatar:
            "http://wework.qpic.cn/bizmail/5dcW92x29ovbPRNibgMO4LAsibRxpsU6TdAvCnztytvGm0DTp2Gc4E8A/0",
          toAvatar:
            "http://wx.qlogo.cn/mmhead/W8TOZKIHduZeYhGRSaPUfXvicuspRCNZDYSIEjBzcmgc/0",
          toName: "ZENESS",
          fromName: "朱余朋",
          toUser: "wmrbZlEAAAlTeSPul6DvsYxfPmAcYPbw",
          messageMedias: [
            {
              msgType: "location",
              address: "杭州市创伟科技园(杭州市滨江区聚工路11号)",
              agreeTime: null,
              attendeeName: null,
              content: null,
              corpName: null,
              corpUserAvatar: null,
              corpUserName: null,
              corpUserType: null,
              createTime: null,
              creator: null,
              creatorName: null,
              description: null,
              details: null,
              displayName: null,
              docCreator: null,
              docCreatorName: null,
              endTime: null,
              fileExt: null,
              fileName: null,
              fileSize: null,
              fileFileSize: null,
              fromChatroom: false,
              height: null,
              imageUrl: null,
              imageSize: null,
              itemId: null,
              latitude: 30.180083,
              linkUrl: null,
              longitude: 120.213201,
              md5sum: null,
              meetingId: null,
              meetingType: null,
              msgTime: null,
              revokeContent: null,
              picUrl: null,
              place: null,
              playLength: null,
              preMsgid: null,
              remarks: null,
              roomName: null,
              sdkfileId: null,
              startTime: null,
              status: null,
              title: "创伟科技园(杭州市滨江区聚工路11号)",
              topic: null,
              totalAmount: null,
              totalCnt: null,
              emotionType: null,
              itemType: null,
              collectType: null,
              redpacketType: null,
              url: null,
              userId: null,
              userName: null,
              voiceSize: null,
              voiceMediaId: null,
              voiceContent: null,
              voteId: null,
              voteItem: null,
              voteTitle: null,
              voteType: null,
              width: null,
              wish: null,
              zoom: 15,
              file: null,
              chatrecordType: null,
              voiceid: null,
              demooperator: null,
              demofilename: null,
              demostarttime: null,
              demoendtime: null,
              share: null,
              sharestarttime: null,
              shareendtime: null,
              voipid: null,
            },
          ],
          tenantId: null,
          title: null,
          revokeType: false,
        },
        // {
        //   createdAt: null,
        //   msgId: "9527797354379316370_1595838688",
        //   chatType: "SINGLE",
        //   groupChatId: null,
        //   groupName: null,
        //   action: "send",
        //   msgTime: "2020-07-27 16:31:28",
        //   msgType: "location",
        //   msgContent: null,
        //   msgSeq: 5823,
        //   fromUser: "wmrbZlEAAAlTeSPul6DvsYxfPmAcYPbw",
        //   fromAvatar:
        //     "http://wework.qpic.cn/bizmail/5dcW92x29ovbPRNibgMO4LAsibRxpsU6TdAvCnztytvGm0DTp2Gc4E8A/0",
        //   toAvatar:
        //     "http://wx.qlogo.cn/mmhead/W8TOZKIHduZeYhGRSaPUfXvicuspRCNZDYSIEjBzcmgc/0",
        //   toName: "ZENESS",
        //   fromName: "朱余朋",
        //   toUser: "zeness",
        //   messageMedias: [
        //     {
        //       msgType: "location",
        //       address: "杭州市创伟科技园(杭州市滨江区聚工路11号)",
        //       agreeTime: null,
        //       attendeeName: null,
        //       content: null,
        //       corpName: null,
        //       corpUserAvatar: null,
        //       corpUserName: null,
        //       corpUserType: null,
        //       createTime: null,
        //       creator: null,
        //       creatorName: null,
        //       description: null,
        //       details: null,
        //       displayName: null,
        //       docCreator: null,
        //       docCreatorName: null,
        //       endTime: null,
        //       fileExt: null,
        //       fileName: null,
        //       fileSize: null,
        //       fileFileSize: null,
        //       fromChatroom: false,
        //       height: null,
        //       imageUrl: null,
        //       imageSize: null,
        //       itemId: null,
        //       latitude: 30.180083,
        //       linkUrl: null,
        //       longitude: 120.213201,
        //       md5sum: null,
        //       meetingId: null,
        //       meetingType: null,
        //       msgTime: null,
        //       revokeContent: null,
        //       picUrl: null,
        //       place: null,
        //       playLength: null,
        //       preMsgid: null,
        //       remarks: null,
        //       roomName: null,
        //       sdkfileId: null,
        //       startTime: null,
        //       status: null,
        //       title: "创伟科技园(杭州市滨江区聚工路11号)",
        //       topic: null,
        //       totalAmount: null,
        //       totalCnt: null,
        //       emotionType: null,
        //       itemType: null,
        //       collectType: null,
        //       redpacketType: null,
        //       url: null,
        //       userId: null,
        //       userName: null,
        //       voiceSize: null,
        //       voiceMediaId: null,
        //       voiceContent: null,
        //       voteId: null,
        //       voteItem: null,
        //       voteTitle: null,
        //       voteType: null,
        //       width: null,
        //       wish: null,
        //       zoom: 15,
        //       file: null,
        //       chatrecordType: null,
        //       voiceid: null,
        //       demooperator: null,
        //       demofilename: null,
        //       demostarttime: null,
        //       demoendtime: null,
        //       share: null,
        //       sharestarttime: null,
        //       shareendtime: null,
        //       voipid: null,
        //     },
        //   ],
        //   tenantId: null,
        //   title: null,
        //   revokeType: false,
        // },
        // {
        //   createdAt: null,
        //   msgId: "9527797354379316370_1595838688",
        //   chatType: "SINGLE",
        //   groupChatId: null,
        //   groupName: null,
        //   action: "send",
        //   msgTime: "2020-07-27 16:31:28",
        //   msgType: "location",
        //   msgContent: null,
        //   msgSeq: 5823,
        //   fromUser: "zeness",
        //   fromAvatar:
        //     "http://wework.qpic.cn/bizmail/5dcW92x29ovbPRNibgMO4LAsibRxpsU6TdAvCnztytvGm0DTp2Gc4E8A/0",
        //   toAvatar:
        //     "http://wx.qlogo.cn/mmhead/W8TOZKIHduZeYhGRSaPUfXvicuspRCNZDYSIEjBzcmgc/0",
        //   toName: "ZENESS",
        //   fromName: "朱余朋",
        //   toUser: "wmrbZlEAAAlTeSPul6DvsYxfPmAcYPbw",
        //   messageMedias: [
        //     {
        //       msgType: "location",
        //       address: "杭州市创伟科技园(杭州市滨江区聚工路11号)",
        //       agreeTime: null,
        //       attendeeName: null,
        //       content: null,
        //       corpName: null,
        //       corpUserAvatar: null,
        //       corpUserName: null,
        //       corpUserType: null,
        //       createTime: null,
        //       creator: null,
        //       creatorName: null,
        //       description: null,
        //       details: null,
        //       displayName: null,
        //       docCreator: null,
        //       docCreatorName: null,
        //       endTime: null,
        //       fileExt: null,
        //       fileName: null,
        //       fileSize: null,
        //       fileFileSize: null,
        //       fromChatroom: false,
        //       height: null,
        //       imageUrl: null,
        //       imageSize: null,
        //       itemId: null,
        //       latitude: 30.180083,
        //       linkUrl: null,
        //       longitude: 120.213201,
        //       md5sum: null,
        //       meetingId: null,
        //       meetingType: null,
        //       msgTime: null,
        //       revokeContent: null,
        //       picUrl: null,
        //       place: null,
        //       playLength: null,
        //       preMsgid: null,
        //       remarks: null,
        //       roomName: null,
        //       sdkfileId: null,
        //       startTime: null,
        //       status: null,
        //       title: "创伟科技园(杭州市滨江区聚工路11号)",
        //       topic: null,
        //       totalAmount: null,
        //       totalCnt: null,
        //       emotionType: null,
        //       itemType: null,
        //       collectType: null,
        //       redpacketType: null,
        //       url: null,
        //       userId: null,
        //       userName: null,
        //       voiceSize: null,
        //       voiceMediaId: null,
        //       voiceContent: null,
        //       voteId: null,
        //       voteItem: null,
        //       voteTitle: null,
        //       voteType: null,
        //       width: null,
        //       wish: null,
        //       zoom: 15,
        //       file: null,
        //       chatrecordType: null,
        //       voiceid: null,
        //       demooperator: null,
        //       demofilename: null,
        //       demostarttime: null,
        //       demoendtime: null,
        //       share: null,
        //       sharestarttime: null,
        //       shareendtime: null,
        //       voipid: null,
        //     },
        //   ],
        //   tenantId: null,
        //   title: null,
        //   revokeType: false,
        // },
        // {
        //   createdAt: null,
        //   msgId: "2839201288980301561_1595849120",
        //   chatType: "SINGLE",
        //   groupChatId: null,
        //   groupName: null,
        //   action: "send",
        //   msgTime: "2020-07-27 19:25:20",
        //   msgType: "location",
        //   msgContent: null,
        //   msgSeq: 5862,
        //   fromUser: "wmrbZlEAAAlTeSPul6DvsYxfPmAcYPbw",
        //   fromAvatar:
        //     "http://wework.qpic.cn/bizmail/5dcW92x29ovbPRNibgMO4LAsibRxpsU6TdAvCnztytvGm0DTp2Gc4E8A/0",
        //   toAvatar:
        //     "http://wx.qlogo.cn/mmhead/W8TOZKIHduZeYhGRSaPUfXvicuspRCNZDYSIEjBzcmgc/0",
        //   toName: "ZENESS",
        //   fromName: "朱余朋",
        //   toUser: "zeness",
        //   messageMedias: [
        //     {
        //       msgType: "location",
        //       address: "杭州市创伟科技园(杭州市滨江区聚工路11号)",
        //       agreeTime: null,
        //       attendeeName: null,
        //       content: null,
        //       corpName: null,
        //       corpUserAvatar: null,
        //       corpUserName: null,
        //       corpUserType: null,
        //       createTime: null,
        //       creator: null,
        //       creatorName: null,
        //       description: null,
        //       details: null,
        //       displayName: null,
        //       docCreator: null,
        //       docCreatorName: null,
        //       endTime: null,
        //       fileExt: null,
        //       fileName: null,
        //       fileSize: null,
        //       fileFileSize: null,
        //       fromChatroom: false,
        //       height: null,
        //       imageUrl: null,
        //       imageSize: null,
        //       itemId: null,
        //       latitude: 30.180095,
        //       linkUrl: null,
        //       longitude: 120.21324,
        //       md5sum: null,
        //       meetingId: null,
        //       meetingType: null,
        //       msgTime: null,
        //       revokeContent: null,
        //       picUrl: null,
        //       place: null,
        //       playLength: null,
        //       preMsgid: null,
        //       remarks: null,
        //       roomName: null,
        //       sdkfileId: null,
        //       startTime: null,
        //       status: null,
        //       title: "创伟科技园(杭州市滨江区聚工路11号)",
        //       topic: null,
        //       totalAmount: null,
        //       totalCnt: null,
        //       emotionType: null,
        //       itemType: null,
        //       collectType: null,
        //       redpacketType: null,
        //       url: null,
        //       userId: null,
        //       userName: null,
        //       voiceSize: null,
        //       voiceMediaId: null,
        //       voiceContent: null,
        //       voteId: null,
        //       voteItem: null,
        //       voteTitle: null,
        //       voteType: null,
        //       width: null,
        //       wish: null,
        //       zoom: 15,
        //       file: null,
        //       chatrecordType: null,
        //       voiceid: null,
        //       demooperator: null,
        //       demofilename: null,
        //       demostarttime: null,
        //       demoendtime: null,
        //       share: null,
        //       sharestarttime: null,
        //       shareendtime: null,
        //       voipid: null,
        //     },
        //   ],
        //   tenantId: null,
        //   title: null,
        //   revokeType: false,
        // },
        // {
        //   createdAt: null,
        //   msgId: "3337502535735809173_1595903914",
        //   chatType: "SINGLE",
        //   groupChatId: null,
        //   groupName: null,
        //   action: "send",
        //   msgTime: "2020-07-28 10:38:34",
        //   msgType: "location",
        //   msgContent: null,
        //   msgSeq: 5903,
        //   fromUser: "zeness",
        //   fromAvatar:
        //     "http://wework.qpic.cn/bizmail/5dcW92x29ovbPRNibgMO4LAsibRxpsU6TdAvCnztytvGm0DTp2Gc4E8A/0",
        //   toAvatar:
        //     "http://wx.qlogo.cn/mmhead/W8TOZKIHduZeYhGRSaPUfXvicuspRCNZDYSIEjBzcmgc/0",
        //   toName: "ZENESS",
        //   fromName: "朱余朋",
        //   toUser: "wmrbZlEAAAlTeSPul6DvsYxfPmAcYPbw",
        //   messageMedias: [
        //     {
        //       msgType: "location",
        //       address: "杭州市江陵路",
        //       agreeTime: null,
        //       attendeeName: null,
        //       content: null,
        //       corpName: null,
        //       corpUserAvatar: null,
        //       corpUserName: null,
        //       corpUserType: null,
        //       createTime: null,
        //       creator: null,
        //       creatorName: null,
        //       description: null,
        //       details: null,
        //       displayName: null,
        //       docCreator: null,
        //       docCreatorName: null,
        //       endTime: null,
        //       fileExt: null,
        //       fileName: null,
        //       fileSize: null,
        //       fileFileSize: null,
        //       fromChatroom: false,
        //       height: null,
        //       imageUrl: null,
        //       imageSize: null,
        //       itemId: null,
        //       latitude: 30.194803,
        //       linkUrl: null,
        //       longitude: 120.218003,
        //       md5sum: null,
        //       meetingId: null,
        //       meetingType: null,
        //       msgTime: null,
        //       revokeContent: null,
        //       picUrl: null,
        //       place: null,
        //       playLength: null,
        //       preMsgid: null,
        //       remarks: null,
        //       roomName: null,
        //       sdkfileId: null,
        //       startTime: null,
        //       status: null,
        //       title: "江陵路",
        //       topic: null,
        //       totalAmount: null,
        //       totalCnt: null,
        //       emotionType: null,
        //       itemType: null,
        //       collectType: null,
        //       redpacketType: null,
        //       url: null,
        //       userId: null,
        //       userName: null,
        //       voiceSize: null,
        //       voiceMediaId: null,
        //       voiceContent: null,
        //       voteId: null,
        //       voteItem: null,
        //       voteTitle: null,
        //       voteType: null,
        //       width: null,
        //       wish: null,
        //       zoom: 15,
        //       file: null,
        //       chatrecordType: null,
        //       voiceid: null,
        //       demooperator: null,
        //       demofilename: null,
        //       demostarttime: null,
        //       demoendtime: null,
        //       share: null,
        //       sharestarttime: null,
        //       shareendtime: null,
        //       voipid: null,
        //     },
        //   ],
        //   tenantId: null,
        //   title: null,
        //   revokeType: false,
        // },
      ],
    };
  },
  watch: {
    "ruleForm.welcomeContent": {
      handler(newVal, oldVal) {
        console.log(newVal, "1111", oldVal, "222");
        if (
          newVal.indexOf('<span class="nickName">客户昵称</span>&#8203') > -1
        ) {
          this.insertName = false;
        } else {
          // if(newVal.length<oldVal.length && oldVal.includes('客户昵称') && oldVal.split('客户昵称')[1]==='</span>'){
          console.log(oldVal.indexOf("</span>") > -1, "555");
          if (oldVal.indexOf("</span>") > -1) {
            console.log("3333333");
            this.ruleForm.welcomeContent = newVal.split("<span")[0];
          } else {
            console.log("44444");
            this.ruleForm.welcomeContent = newVal.split("<span")[0];
          }

          this.$refs.chatInput.haldSet(this.ruleForm.welcomeContent);
          // let str=oldVal.split(newVal);
          // if('<span class="nickName">客户昵称</span>'.includes(str) && newVal)
          // newVal=newVal.split('<span>')[0]
          // console.log(str)
          // }

          // this.ruleForm.welcomeContent = newVal.replace(
          //   newVal.substr(index),
          //   ""
          // );
          this.insertName = true;
        }
      },
      // immediate: true
    },
  },
  computed: {
    ...mapState({
      // singleListAll: state => state.message.singleListAll,
      // singleListPage: state => state.message.singleListPage
    }),
  },
  created() {},
  methods: {
    insertionMemberName(memberNick) {
      this.insertName = false;
      this.ruleForm.welcomeContent =
        this.ruleForm.welcomeContent +
        `&#8203<span class="nickName">${memberNick}</span>&#8203;`;
      // this.ruleForm.welcomeContent = this.ruleForm.welcomeContent + val;
      // this.welcomecontentT = "#" + val + "#";
      // let start = this.ruleForm.welcomeContent.indexOf("ddd");
      // this.ruleForm.welcomeContent.substring(start, start + "ddd".length);
      // console.log(
      //   this.ruleForm.welcomeContent,
      //   "000",
      //   start,
      //   this.ruleForm.welcomeContent.substring(start, start + "ddd".length)
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.single-list-all {
  .right {
    border: 1px solid #eee;
    padding: 0 20px;
    .chat-content {
      height: calc(70vh + 40px);
    }
  }
}
</style>

<style lang="scss">
</style>
