<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar :hasExport="false" @handleExport="doExport" :msg="`共${pageConfig.total}个客户`">
        <div slot="right">
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['contactWay']['contactWay_add']"
            @click.stop="newChannelCode"
          >新建活码</el-t-button>
          <el-t-button type="primary" @click.stop="setdefaultwelcomeSpeech">设置默认欢迎语</el-t-button>
        </div>
      </tool-bar>
    </el-card>
    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="listAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          fit
          highlight-current-row
          header-row-class-name="el-table-header"
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="二维码" align="left">
            <template slot-scope="scope">
              <img
                :src="scope.row.qrCode"
                alt
                id="qrcode"
                style="width:40px;height:40px;margin-right:10px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="remark" align="left"></el-table-column>
          <el-table-column label="添加好友人数" prop="joinNumber" align="left"></el-table-column>
          <el-table-column label="创建时间" prop="createdAt" align="left"></el-table-column>
          <el-table-column label="使用成员" align="left">
            <template slot-scope="scope">
              <el-tag
                v-for="(user,index) in scope.row.serviceUsers"
                :key="index"
                type="info"
                style="margin-right:5px;margin-bottom:5px"
              >
                <span v-if="user">{{ user.name }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="标签" align="left">
            <template slot-scope="scope">
              <div v-if="scope.row.servicesTags.length>0">
                <el-tag
                  v-for="(tag,index) in scope.row.servicesTags"
                  :key="index"
                  type="info"
                  style="margin-right:5px;margin-bottom:5px"
                >
                  <span v-if="tag">{{ tag.tagName }}</span>
                </el-tag>
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-t-button
                :popAuth="true"
                :auth="permissionMap['contactWay']['contactWay_detail']"
                type="text"
                class="button-s"
                @click.stop="handleDetail(scope.$index,scope.row)"
              >详情</el-t-button>
              <el-divider direction="vertical"></el-divider>

              <el-t-button type="text" class="button-s" @click.stop="downLoad(scope.row)">下载</el-t-button>
              <el-divider direction="vertical"></el-divider>

              <el-t-button
                :popAuth="true"
                :auth="permissionMap['contactWay']['contactWay_update']"
                type="text"
                class="button-s"
                @click.stop="handleEdit(scope.row)"
              >编辑</el-t-button>
              <el-divider direction="vertical"></el-divider>

              <el-t-button
                :popAuth="true"
                :auth="permissionMap['contactWay']['contactWay_delete']"
                type="text"
                size="mini"
                class="button-s"
                @click.stop="handleDelete(scope.row)"
              >删除</el-t-button>
            </template>
          </el-table-column>
        </el-table>
        <customer-pagination
          :pageConfig="pageConfig"
          @current-change="changePage"
          @size-change="changeSize"
        ></customer-pagination>
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from "./header.vue";
import FormDialog from "./dialog";
import ToolBar from "@/components/ToolBar";
import CustomerPagination from "@/components/CustomerPagination";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    CustomerPagination,
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },

      query: {
        page: 0,
        size: 10,
        remark: "",
      },
    };
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,

      loading: (state) => state.contactWay.loading,
      listAll: (state) => state.contactWay.list,
      page: (state) => state.contactWay.listPage,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query);
    this.initFilter();
  },
  methods: {
    doExport(val) {
      console.log(val);
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch("media/getArticleListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch("contactWay/getList", payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1;
          this.pageConfig.total = this.page.total;
          console.log(this.pageConfig, "pageconfig");
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    // 详情弹出框
    handleDetail(index, row) {
      this.$refs["formDialog"].event = "DetailTemplate";
      this.$refs["formDialog"].eventType = "detail";
      this.$refs["formDialog"].dialogVisible = true;
      this.$store.commit("contactWay/SAVE_CONTACTWAYDETAILROW", row);
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
      image.onload = function () {
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
    },
    handleSearch(val) {
      const { remark } = val;
      this.query.remark = remark ? remark : this.query.remark;
      this.query.page = 0;
      this.initDataList(this.query);
    },
    handleRefresh() {
      this.query = this.$options.data().query;
      this.initDataList(this.query);
    },
    changePage(key) {
      this.query.page = key - 1;
      this.pageConfig.pageNumber = key - 1;
      this.initDataList(this.query);
    },
    // 新建渠道码
    newChannelCode() {
      this.$router.push({
        path: `/contactWay/detail`,
      });
    },
    setdefaultwelcomeSpeech() {
      this.$refs["formDialog"].event = "DefaultWelcomeTemplate";
      this.$refs["formDialog"].eventType = "defaultWelcome";
      this.$refs["formDialog"].dialogVisible = true;
      this.$store
        .dispatch("contactWay/contactWayDefaulWel")
        .then((res) => {
          this.$refs["formDialog"].transfer = res;
        })
        .catch((err) => {});
    },
    handleEdit(row) {
      this.$router.push({
        path: `/contactWay/detail`,
        query: { uuid: row.uuid },
      });
    },
    // 删除渠道码
    handleDelete(row) {
      this.$confirm("删除后不可恢复, 确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const params = {
            configId: row.configId,
          };
          this.$store
            .dispatch("contactWay/deleteContactWay", params)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initDataList(this.query);
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    changeSize(val) {
      this.query.size = val;
      this.initDataList(this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
.button-s {
  margin-bottom: 5px;
  margin-left: 0px;
  margin-right: 10px;
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}

// .app-container {
//   border-top: 1px solid #e9e9e9;
//   background: white;
//   .roles-table {
//     margin-top: 30px;
//   }
//   .permission-tree {
//     margin-bottom: 30px;
//   }
// }
// header .el-header button {
//   margin-right: 5px;
// }
</style>
