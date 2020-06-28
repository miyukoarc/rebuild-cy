<template>
  <div>
    <div class="dialog-detail display-flex">
      <div class="detail-left">
        <img :src="contactWayDetailRow.qrCode" alt />
        <p>{{ contactWayDetailRow.remark }}</p>
        <el-button type="primary" size="mini" @click="downLoad(contactWayDetailRow)">下载活码</el-button>
        <el-button size="mini" @click="handleEdit(contactWayDetailRow)">修改</el-button>
      </div>

      <div class="detail-right">
        <div class="detail-item-title">
          <span class="item-title">创建时间：</span>
          <span class="date">{{ contactWayDetailRow.createdAt }}</span>
        </div>
        <div class="detail-item-title">
          <span class="item-title">使用成员：</span>
          <ul class="owner-list">
            <li
              v-for="(item,index) in contactWayDetailRow.serviceUsers"
              :key="index"
              class="owner"
            >{{ item.name }}</li>
          </ul>
        </div>
        <div class="detail-item-title">
          <span class="item-title">客户标签：</span>
          <ul class="tag-list">
            <li
              v-for="(item,index) in contactWayDetailRow.servicesTags"
              :key="index"
              class="tag"
            >{{ item.tagName }}</li>
          </ul>
        </div>
        <div class="detail-item-title">
          <span class="item-title">自动通过好友：</span>
          <span>{{ contactWayDetailRow.skipVerify? '全天开启':'时间段' }}</span>
        </div>
        <!-- <div class="detail-item-title">
            <span class="item-title">欢迎语1：</span>
            <span style="word-break: break-all;">阿巴阿巴</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState({
      contactWayDetailRow: state => state.contactWay.contactWayDetailRow
    })
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    // 编辑渠道码
    handleEdit(item) {
      this.$router.push({
        path: `/contactWay/detail`,
        query: { way: "edit", uuid: item.uuid }
      });
    },
    // 下载渠道码
    downLoad(row) {
      console.log(row, "下载");
      this.downloadIamge(row.qrCode, row.remark);
    },
    downloadIamge(imgsrc, name) {
      // 下载图片地址和图片名
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png"); // 得到图片的base64编码数据
        const a = document.createElement("a"); // 生成一个a元素
        const event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-detail {
  padding-bottom: 34px;
  min-height: 359px;
  .detail-left {
    padding: 26px 39px 37px 9px;
    border-right: 1px solid #e8e8e8;
    display: -webkit-box;
    display: flex;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    .el-button {
      width: 152px;
      height: 32px;
      margin-left: 0;
      margin-bottom: 20px;
    }
    > img {
      width: 133px;
      height: 133px;
      margin-bottom: 16px;
    }
    > p {
      font-size: 14px;
      color: #222;
      line-height: 20px;
      margin-bottom: 17px;
    }
  }
  .detail-right {
    display: -webkit-box;
    display: flex;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 15px;
    padding-top: 13px;
    height: 100%;
    overflow-y: auto;
    .detail-item-title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
      margin-bottom: 16px;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: baseline;
      align-items: baseline;
      .item-title {
        color: rgba(0, 0, 0, 0.45);
        word-break: keep-all;
        white-space: nowrap;
        min-width: 98px;
        text-align: right;
        line-height: 22px;
        height: 22px;
      }
      .date {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }
      .owner-list {
        margin: 0;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
        .owner {
          list-style:none;
          padding: 5px 10px;
          background: #f7fbff;
          border: 1px solid #b4cbf8;
          box-sizing: border-box;
          border-radius: 2px;
          color: #222;
          font-size: 14px;
          margin-right: 6px;
          margin-bottom: 6px;
        }
      }
      .tag-list {
        margin: 0;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
        .tag {
          font-size: 13px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.65);
          background: #f7f7f7;
          border: 1px solid #e9e9e9;
          border-radius: 2px;
          padding: 2px 8px;
          margin-right: 7px;
          margin-bottom: 8px;
          display: inline-block;
        }
      }
    }
  }
}
</style>