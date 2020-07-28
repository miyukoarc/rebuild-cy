/*
 * @Author: your name
 * @Date: 2020-07-08 23:50:36
 * @LastEditTime: 2020-07-08 23:50:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\components\zeness\index.js
 */ 
<!-- vue实现contenteditable功能 -->

<template>
  <div
    ref="editor"
    class="editor"
    contenteditable="true"
    v-html="editorText"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  ></div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: "" }
  },
  data() {
    return {
      editorText: this.value,
      isChange: true
    };
  },
  watch: {
    value() {
      if (this.isChange) {
        this.editorText = this.value;
      }
    }
  },
  methods: {
    haldSet(val) {
      this.editorText = val;
      this.$nextTick(() => {
        let obj = this.$refs.editor;
        if (window.getSelection) {
          //ie11 10 9 ff safari
          obj.focus(); //解决ff不获取焦点无法定位问题
          var range = window.getSelection(); //创建range
          range.selectAllChildren(obj); //range 选择obj下所有子内容
          range.collapseToEnd(); //光标移至最后
        } else if (document.selection) {
          //ie10 9 8 7 6 5
          var range = document.selection.createRange(); //创建选择对象
          //var range = document.body.createTextRange();
          range.moveToElementText(obj); //range定位到obj
          range.collapse(false); //光标移至最后
          range.select();
        }
      });
    },
    handleInput() {
      this.$emit("input", this.$el.innerHTML);
    },
    // 清空编辑器
    handleClear() {
      this.$refs.editor.innerHTML = "";
      this.$refs.editor.focus();
    },

    // 获取焦点
    handleFocus() {
      this.isChange = false;
      this.$emit("focusFn");
    },
    // 失去焦点
    handleBlur() {
      this.isChange = true;
      this.$emit("blurFn");
    },

    /**
     * 光标处插入内容
     * @param html 需要插入的内容
     */
    insertHtmlAtCaret(html) {
      let sel, range;
      if (!this.$refs.editor.childNodes.length) {
        this.$refs.editor.focus();
      }
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          let el = document.createElement("div");
          el.appendChild(html);
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }

      this.handleInput();
    }
  }
};
</script>

<style>
.editor {
  margin: 10px;
}
</style>