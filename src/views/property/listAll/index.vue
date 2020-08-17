<!--
 * @Author: your name
 * @Date: 2020-07-21 10:48:49
 * @LastEditTime: 2020-07-23 11:03:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\property\listAll\index.vue
--> 
<template>
  <section class="property-listAll app-container">
    <el-card>
      <div class="basic-information">
        <h5>
          基本信息
          <span @click="handleEditBasicInformation">
            <i class="el-icon-edit-outline"></i> 修改
          </span>
        </h5>
        <div class="show-info">
          <p>显示的基本信息</p>
          <ul class="display-flex align-items-center">
            <li
              class="show-info-item display-flex justify-content-center align-items-center"
              v-for="(item,index) in showInformationData"
              :key="index"
            >
              <span class="icon-warp">
                <i class="el-icon-success color-primary"></i>
              </span>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="unshow-info">
          <p>不显示的基本信息</p>
          <ul class="display-flex align-items-center">
            <li
              class="show-info-item display-flex justify-content-center align-items-center"
              v-for="(item,index) in unshowInformationData"
              :key="index"
            >
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="custom-field">
        <h5>自定义字段</h5>
        <div>
          <el-button type="primary" plain icon="el-icon-plus" @click="handleAddField">添加</el-button>
          <ul>
            <li
              class="custon-field-item display-flex align-items-center"
              v-for="(field,index) in propertyListAll"
              :key="index"
            >
              <div class="field">
                <span class="icon-warp">
                  <i class="el-icon-success color-primary"></i>
                  <span>{{field.label}}</span>
                </span>
              </div>
              <div class="tool-menu">
                <el-button type="text" @click="editField(field)" class="button-text">
                  <i class="el-icon-edit"></i>修改
                </el-button>
                <el-button type="text" @click="deleteField(field)" class="button-text">
                  <i class="el-icon-delete"></i>删除
                </el-button>
                <el-button
                  type="text"
                  @click="moveUp(field)"
                  :disabled="index == 0"
                  :class="{'disabled': index == 0}"
                  class="button-text"
                >
                  <i class="el-icon-sort-up"></i>上移
                </el-button>
                <el-button
                  type="text"
                  @click="moveDown(field)"
                  :class="{'disabled': index == propertyListAll.length-1}"
                  class="button-text"
                >
                  <i class="el-icon-sort-down"></i>下移
                </el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <form-dialog ref="formDialog"></form-dialog>
  </section>
</template>

<script>
import FormDialog from "./dialog";
import { mapState } from "vuex";
export default {
  name: "property_listAll",
  components: {
    FormDialog
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },
      showInformationData: [
        {
          name: "电话",
          id: "1"
        },
        {
          name: "地址",
          id: "2"
        }
      ],
      unshowInformationData: [
        {
          name: "电话",
          id: "1"
        },
        {
          name: "地址",
          id: "2"
        }
      ],
      // 自定义字段
      isShow: false
    };
  },
  computed: {
    ...mapState({
      propertyListAll: state => state.externalUser.propertyListAll,
      propertyListAllPage: state => state.externalUser.propertyListAllPage
    })
  },
  created() {
    this.initDataList();
  },
  methods: {
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch("externalUser/getPropertyListAll")
        .then(() => {
          //初始化分页
          // this.pageConfig.pageNumber = this.propertyListAllPage.pageNumber + 1;
          // this.pageConfig.total = this.propertyListAllPage.total;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },
    handleEditBasicInformation(){
      this.$refs["formDialog"].eventType = "editBasic";
      this.$refs["formDialog"].event = "EditBasicTemplate";
      this.$refs["formDialog"].dialogVisible = true;
    },
    handleAddField() {
      this.$refs["formDialog"].eventType = "create";
      this.$refs["formDialog"].event = "CreateTemplate";
      this.$refs["formDialog"].dialogVisible = true;
      // let _this = this;
      // _this.propertyListAll.push({}); // 置空
    },
    editField(item) {
      console.log(item, "item");
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = item;
    },
    moveUp(item) {
      let index = this.propertyListAll.indexOf(item);
      console.log(index, "333", item);
      if (
        this.propertyListAll.length > 1 &&
        index != this.propertyListAll.length - 1
      ) {
        // 以c为基点
        var next = this.propertyListAll[index - 1];
        console.log(item, "temp", next);
        // this.propertyListAll[index].name = temp;
        let payload = {
          sortList: [
            {
              propertyUuid: next.uuid,
              sort: item.sort
            },
            {
              propertyUuid: item.uuid,
              sort: next.sort
            }
          ]
        };
        this.$store
          .dispatch("externalUser/propertyUpdatePropertySort", payload)
          .then(() => {
            this.initDataList();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 下移
    moveDown(item) {
      let index = this.propertyListAll.indexOf(item);
      console.log(index, "333", item);
      if (
        this.propertyListAll.length > 1 &&
        index != this.propertyListAll.length - 1
      ) {
        // 以c为基点
        var next = this.propertyListAll[index + 1];
        console.log(item, "temp", next);
        // this.propertyListAll[index].name = temp;
        let payload = {
          sortList: [
            {
              propertyUuid: next.uuid,
              sort: item.sort
            },
            {
              propertyUuid: item.uuid,
              sort: next.sort
            }
          ]
        };
        this.$store
          .dispatch("externalUser/propertyUpdatePropertySort", payload)
          .then(() => {
            this.initDataList();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 删除
    deleteField(item) {
      console.log(item, "item");
      this.$refs["formDialog"].eventType = "confirm";
      this.$refs["formDialog"].event = "ConfirmTemplate";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = item;
      // let payload = {
      //   uuid: item.uuid
      // };

      // this.$store
      //   .dispatch("externalUser/propertyDelete", payload)
      //   .then(() => {
      //     this.initDataList();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // this.isShow = false;
      // let index = this.propertyListAll.indexOf(item);
      // if (index > -1) {
      //   this.propertyListAll.splice(index, 1);
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.property-listAll {
  .basic-information {
    margin-bottom: 30px;
    border-bottom: 1px solid #ececec;
    h5 {
      font-size: 15px;
      margin-bottom: 30px;
      span {
        font-size: 14px;
        color: $main-color;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .show-info,
    .unshow-info {
      font-size: 14px;
      margin-bottom: 30px;
      p {
        margin-bottom: 15px;
      }
    }
    .show-info,
    .unshow-info {
      .show-info-item {
        font-size: 13px;
        height: 30px;
        padding: 0 10px;
        background: #f6f6f6;
        border-radius: 4px;
        border: 1px solid #eee;
        margin-right: 10px;
        margin-bottom: 12px;
        .icon-warp {
          margin-right: 5px;
          position: relative;
          top: 1px;
        }
      }
    }
    .unshow-info {
    }
  }
  .custom-field {
    h5 {
      font-size: 15px;
      margin-bottom: 20px;
    }
    .custon-field-item {
      margin-top: 10px;
      font-size: 14px;
      .field {
        width: 115px;
        height: 30px;
        margin-right: 15px;
        font-size: 13px;
        .icon-warp {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          background: #f6f6f6;
          border-radius: 4px;
          border: 1px solid #eee;
        }
      }

      .tool-menu {
        // height: 30px;
        // line-height: 30px;
        .button-text {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 20px;
          margin-right: 10px;
          position: relative;
          display: inline-block;
          cursor: pointer;
          i {
            margin-right: 5px;
          }
        }
        .button-text:hover {
          color: $main-color;
        }
        .button-text.disabled {
          color: rgba(0, 0, 0, 0.25);
          background: transparent;
          cursor: default;
        }
        .button-text:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -12.5px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          width: 1px;
          height: 14px;
          background: #eee;
        }
      }
    }
  }
}
</style>