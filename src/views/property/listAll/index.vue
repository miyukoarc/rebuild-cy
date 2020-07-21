<!--
 * @Author: your name
 * @Date: 2020-07-21 10:48:49
 * @LastEditTime: 2020-07-21 14:22:13
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
          <span>
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
              v-for="(field,index) in fieldData"
              :key="index"
            >
              <div class="field">
                <span class="icon-warp">
                  <i class="el-icon-success color-primary"></i>
                  <span>{{field.name}}</span>
                </span>
              </div>
              <div class="tool-menu">
                <span @click="editField(field)">
                  <i class="el-icon-edit"></i>修改
                </span>
                <span @click="deleteField(field)">
                  <i class="el-icon-delete"></i>删除
                </span>
                <span @click="moveUp(field)" :class="{'disabled': index == 0}">
                  <i class="el-icon-sort-up"></i>上移
                </span>
                <span @click="moveDown(field)" :class="{'disabled': index == fieldData.length-1}">
                  <i class="el-icon-sort-down"></i>下移
                </span>
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

export default {
  name: "propertyListAll",
  components: {
    FormDialog
  },
  data() {
    return {
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
      isShow: false,
      fieldData: [
        {
          name: "自定义字段1",
          id: "1"
        },
        {
          name: "字段2",
          id: "2"
        },
        {
          name: "自定义字段3",
          id: "1"
        },
        {
          name: "字段4",
          id: "2"
        }
      ]
    };
  },
  methods: {
    handleAddField() {
      this.$refs["formDialog"].eventType = "create";
      this.$refs["formDialog"].event = "CreateTemplate";
      this.$refs["formDialog"].dialogVisible = true;
      // let _this = this;
      // _this.fieldData.push({}); // 置空
    },
    editField(item) {},
    moveUp(item) {
      console.log(item);
      console.log(this.fieldData);
      let index = this.fieldData.indexOf(item); // 获取的index。或者通过v-for 遍历传过的index，可以简化此步骤。
      if (this.fieldData.length > 1 && index !== 0) {
        var temp = this.fieldData[index - 1].name; // 这三行的含义可见上面示意图
        this.fieldData[index - 1].name = this.fieldData[index].name;
        this.fieldData[index].name = temp;
      }
    },
    // 下移
    moveDown(item) {
      let index = this.fieldData.indexOf(item);
      console.log(index, "333", item);
      if (this.fieldData.length > 1 && index != this.fieldData.length - 1) {
        var temp = this.fieldData[index + 1].name; // 以c为基点
        this.fieldData[index + 1].name = this.fieldData[index].name;
        this.fieldData[index].name = temp;
      }
    },
    // 删除
    deleteField(item) {
      this.isShow = false;
      let index = this.fieldData.indexOf(item);
      if (index > -1) {
        this.fieldData.splice(index, 1);
      }
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
      margin-top: 15px;
      font-size: 14px;
      .field {
        width: 115px;
        font-size: 13px;
        margin-right: 15px;
        height: 30px;
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
        height: 30px;
        line-height: 30px;
        span {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 20px;
          margin-right: 25px;
          position: relative;
          display: inline-block;
          cursor: pointer;
          i {
            margin-right: 5px;
          }
        }
        span:hover {
          color: $main-color;
        }
        span.disabled {
          color: rgba(0, 0, 0, 0.25);
          background: transparent;
          cursor: default;
        }
        span:not(:last-child)::after {
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