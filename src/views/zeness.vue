<!--
 * @Author: your name
 * @Date: 2020-05-12 15:34:16
 * @LastEditTime: 2020-07-22 10:33:12
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
          <!-- <el-input
                  contenteditable="true"
                  type="textarea"
                  :rows="6"
                  maxlength="1000"
                  show-word-limit
                  placeholder="请输入内容"
                  v-model="ruleForm.welcomeContent"
          ></el-input>-->
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import inputEdit from "@/components/inputEdit";

export default {
  name: "ListSingleAll",
  components: {
    inputEdit
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
        link: ""
      }
    };
  },
  watch: {
    "ruleForm.welcomeContent": {
      handler(newVal, oldVal) {
        console.log(newVal, "1111", oldVal, "222");
        if (newVal.indexOf('<span class="nickName">客户昵称</span>&#8203') > -1) {
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
      }
      // immediate: true
    }
  },
  computed: {
    ...mapState({
      // singleListAll: state => state.message.singleListAll,
      // singleListPage: state => state.message.singleListPage
    })
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
    }
  }
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
