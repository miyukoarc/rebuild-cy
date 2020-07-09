<!--
 * @Author: your name
 * @Date: 2020-07-06 22:10:56
 * @LastEditTime: 2020-07-09 17:54:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\zeness.vue
--> 
<template>
  <div>
    <div class="insert-btn">
      <el-button
        type="text"
        class="clickable no-select"
        :disabled="!insertName"
        @click="insertionMember(memberNick)"
      >[插入客户昵称]</el-button>
    </div>
    <inputEdit ref="chatInput" v-model="editorText"  />
    <!-- <div
      class="main-content"
      v-html="ruleForm.welcomeContent"
      contenteditable="true"
      placeholder="请输入内容"
      id="content"
      @input="insertionMemberName($event)"
    ></div> -->
  </div>
</template>

<script>


import inputEdit from '@/components/inputEdit'
export default {
  components: {
    inputEdit
  },
  data() {
    return {
      editorText:'',
      insertName: true,
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
  methods: {
    insertionMember(memberNick) {
      console.log(memberNick,'888')
      // this.$nextTick(() => {
      this.editorText =this.editorText+ `<span class="reduuu">${memberNick}</span>&#8203;`;
      // });
      console.log(this.ruleForm.welcomeContent, "99");
    },
    insertionMemberName(e) {
      this.ruleForm.welcomeContent = e.target.innerHTML;
      this.$nextTick(() => {
        this.keepLastIndex(e.target);
      });
    },
    keepLastIndex(obj) {
      console.log(obj);
      console.log(window.getSelection);
      console.log(document.selection);
      if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象 //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    }
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
  color: #aaa ;
}
// .main-content:empty:not(:focus):before {
//   content: attr(placeholder);
//   color: #aaa;
// }
</style>