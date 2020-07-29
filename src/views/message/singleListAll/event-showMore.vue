<!--
 * @Author: your name
 * @Date: 2020-07-29 20:57:15
 * @LastEditTime: 2020-07-29 21:16:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\event-showMore.vue
--> 
<template>
  <div class="show-more">
    <ul>
      <li v-for="(msg,index) in transfer.messageMedias" class="display-flex">
        <!-- <span>：</span> -->
        <p
          class="text-over-2"
        >{{ msg.msgType =='text' ? msg.content:msg.fileName + chatContentType[msg.msgType]}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {
        {
        }
      },
    },
  },
  data() {
    return {
      form: {
        departmentsUuid: 0,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.currentRowUserList,
      departments: (state) => state.department.departments,
    }),
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleCancel() {
      this.closeDialog();
    },
    handleConfrim() {},
  },
};
</script>

<style lang="scss" scoped>
.show-more {
  padding: 0 20px;
  ul {
    margin-bottom: 5px;
    li {
      // width: 260px;
      color: #b2b2b2;
      font-size: 14px;
      line-height: 18px;
      p {
        // max-height: 32px;
        // width: 200px;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
}
</style>