<!--
 * @Author: your name
 * @Date: 2020-07-06 22:10:56
 * @LastEditTime: 2020-07-11 15:56:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\zeness.vue
--> 
<template>
  <div>
    <!-- <div class="insert-btn">
      <el-button
        type="text"
        class="clickable no-select"
        :disabled="!insertName"
        @click="insertionMember(memberNick)"
      >[插入客户昵称]</el-button>
    </div>-->
    <!-- <inputEdit ref="chatInput" v-model="editorText" /> -->
    <!-- <div
      class="main-content"
      v-html="ruleForm.welcomeContent"
      contenteditable="true"
      placeholder="请输入内容"
      id="content"
      @input="insertionMemberName($event)"
    ></div>-->
    <!-- </div> -->
    <!-- <div> -->
    <el-form ref="form">
      <!-- <div class="tag-warp">
      <div v-for="(tagGroup,index) in newTagsList" :key="index" class="tag-list-warp">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="8">
            <span class="lg-42">{{ tagGroup.groupName }}</span>
          </el-col>
          <el-col :span="16">
            <div class="tag-list display-flex align-items-center flex-wrap">
              <el-checkbox-group
                v-model="checkboxGroup"
                size="small"
                @change="handleCheckedTagsChange"
              >
                <el-checkbox
                  v-for="(tag,idx) in tagGroup.tagList"
                  :key="idx"
                  :label="tag.tagId"
                  border
                  style="margin-bottom:5px"
                >{{ tag.tagName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
      </div>-->
      <tags-selected
        @change="handleCheckedTagsChange"
        :tagListSelect="a"
        :checkboxGroup="checkboxGroup"
      ></tags-selected>
      <div class="text-align-center">
        <!-- <el-t-button size="small" @click="handleCancel">取消</el-t-button> -->
        <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import TagsSelected from "@/components/TagsSelected";
// import inputEdit from "@/components/inputEdit";
export default {
  components: {
    // inputEdit
    TagsSelected
  },
  data() {
    return {
      checkboxGroup: [
        "etrbZlEAAAmiAZyhQsRgruCmc_-AG6gw",
        "etrbZlEAAA0Ws44SPBcZUYgfzWIiHV6A",
        "etrbZlEAAAx8eN-ccsjI9-TG3c_o-IlQ",
        "etrbZlEAAApOjeaX1uRn8J8ksodDra7A",
        "etrbZlEAAAvDfELLCC1z6vTowWg8hECQ",
        "etrbZlEAAApZixdC64rHWPUiWDpF3qiw"
      ],
      delTags: [],
      addTags: [],
      newTagsList: [],
      a: [
        {
          groupId: "etrbZlEAAAsJbXm-y9ukrN0o61wJW1Mw",
          groupName: "测试1",
          tagList: [
            {
              uuid: 17,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAAb3feMDvKXbLureB-SNr2BA",
              tagName: "测试1",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            }
          ],
          sort: null,
          oldTagGroupName: null
        },
        {
          groupId: "etrbZlEAAAYpd5HtetZTbegPtao1F4LA",
          groupName: "大威天龙",
          tagList: [
            {
              uuid: 16,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAApZixdC64rHWPUiWDpF3qiw",
              tagName: "般若诸佛",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 15,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAAvDfELLCC1z6vTowWg8hECQ",
              tagName: "般若巴嘛空",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 14,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAAeqZXMNVv1BTm9iiA2x2pxw",
              tagName: "世尊地藏",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            }
          ],
          sort: null,
          oldTagGroupName: null
        },
        {
          groupId: "etrbZlEAAAMnAZNvG9_LDt8NllB0M-YQ",
          groupName: "金庸",
          tagList: [
            {
              uuid: 13,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAApOjeaX1uRn8J8ksodDra7A",
              tagName: "鹿鼎记",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 12,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAAx8eN-ccsjI9-TG3c_o-IlQ",
              tagName: "雪山飞狐",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 11,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAA0Ws44SPBcZUYgfzWIiHV6A",
              tagName: "笑傲江湖",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 10,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAAmiAZyhQsRgruCmc_-AG6gw",
              tagName: "天龙八部",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            }
          ],
          sort: null,
          oldTagGroupName: null
        },
        {
          groupId: "etrbZlEAAArs5TWK1thFj8nNyrJFvG9g",
          groupName: "测试",
          tagList: [
            {
              uuid: 9,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAA89CEEZG0paqsN4Fjf8oFwg",
              tagName: "中",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 8,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAAIh7oNIpbc_u8fac7xCDdVA",
              tagName: "下",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            },
            {
              uuid: 7,
              groupId: null,
              groupName: null,
              tagId: "etrbZlEAAA61F3BQVcEUyezfad3cjQeQ",
              tagName: "上",
              type: null,
              sort: null,
              creator: null,
              deleted: false,
              createdAt: null,
              updatedAt: null,
              version: null,
              relationships: null,
              audits: null,
              auditState: "APPROVED",
              contactWay: null,
              medias: null
            }
          ],
          sort: null,
          oldTagGroupName: null
        }
      ]
      // editorText: "",
      // insertName: true,
      // memberNick: "客户昵称",
      // ruleForm: {
      //   name: "",
      //   member: [],
      //   options: [],
      //   autoAddFriend: true,
      //   openTime: "1",
      //   welComeType: "MYWEL",
      //   welcomeContent: "",
      //   welComeMediaType: "IMG",
      //   link: ""
      // }
    };
  },
  methods: {
    // 选择标签
    handleCheckedTagsChange(tag, index) {
      console.log(tag, "tag");
      this.checkboxGroup = tag;
    },
    del(arr1, arr2) {
      return arr1.filter(v => {
        return arr2.indexOf(v) == -1; //第一个数组在第二个数组中不同的项
      });
    },
    add(arr2, arr1) {
      return arr2.filter(v => {
        return arr1.indexOf(v) == -1; //第二个数组在第一个数组中不同的项
      });
    },
    // 确认提交修改标签
    handleConfirm() {
      this.delTags = this.del(this.editTagsUuid, this.checkboxGroup);
      this.addTags = this.add(this.checkboxGroup, this.editTagsUuid);
      console.log("删除", this.delTags, "新增", this.addTags);
      const payload = {
        addTags: this.addTags,
        externalUserUuid: this.uuid,
        removeTags: this.delTags
      };
      console.log(payload, "99");
      // this.$store
      //   .dispatch("externalUser/externalUserUpdateTag", payload)
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "操作成功"
      //     });
      //     this.handleCancel();
      //     this.refresh();
      //   })
      //   .catch(err => {
      //     this.$message({
      //       type: "error",
      //       message: "操作失败"
      //     });
      //   });
    }
    //   insertionMember(memberNick) {
    //     console.log(memberNick, "888");
    //     // this.$nextTick(() => {
    //     this.editorText =
    //       this.editorText + `<span class="reduuu">${memberNick}</span>&#8203;`;
    //     // });
    //     console.log(this.ruleForm.welcomeContent, "99");
    //   },
    //   insertionMemberName(e) {
    //     this.ruleForm.welcomeContent = e.target.innerHTML;
    //     this.$nextTick(() => {
    //       this.keepLastIndex(e.target);
    //     });
    //   },
    //   keepLastIndex(obj) {
    //     console.log(obj);
    //     console.log(window.getSelection);
    //     console.log(document.selection);
    //     if (window.getSelection) {
    //       //ie11 10 9 ff safari
    //       obj.focus(); //解决ff不获取焦点无法定位问题
    //       var range = window.getSelection(); //创建range
    //       range.selectAllChildren(obj); //range 选择obj下所有子内容
    //       range.collapseToEnd(); //光标移至最后
    //     } else if (document.selection) {
    //       //ie10 9 8 7 6 5
    //       var range = document.selection.createRange(); //创建选择对象 //var range = document.body.createTextRange();
    //       range.moveToElementText(obj); //range定位到obj
    //       range.collapse(false); //光标移至最后
    //       range.select();
    //     }
    //   }
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  background: none;
  outline: none;
  padding: 10px 10px 30px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  word-wrap: break-word;
  word-break: break-all;
  -webkit-user-modify: read-write-plaintext-only;
}
.main-content:empty::before {
  content: attr(placeholder);
  color: #cdcdcd;
}

div[contenteditable]:empty:not(:focus):before {
  content: attr(placeholder);
  color: #aaa;
}
// .main-content:empty:not(:focus):before {
//   content: attr(placeholder);
//   color: #aaa;
// }
</style>