<template>
  <div>
    <section class="contact-way-detail app-container">
      <div class="contact-way-detail-warp">
        <el-form ref="form" :model="form" label-width="120px" label-position="left">
          <div>
            <h5>基本信息</h5>
            <el-form-item label="选择群发类型：">
              <el-radio-group v-model="form.sendType">
                <el-radio :label="'WX'">
                  企业微信群发
                  <el-tooltip placement="right">
                    <div slot="content">添加成为用户后，将自动打上预设标签</div>
                    <i class="el-icon-question tip"></i>
                  </el-tooltip>
                </el-radio>
                <el-radio :label="'MY'">
                  超盈群发
                  <el-tooltip placement="right">
                    <div slot="content">添加成为用户后，将自动打上预设标签</div>
                    <i class="el-icon-question tip"></i>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label=" ">
              <span>同一个企业每个自然月内仅可针对一个客户/客户群发4条消息，超过限制的用户将会被忽略。</span>
            </el-form-item>
            <el-form-item label="选择群发账号：">
              <el-select v-model="form.userUuid" placeholder="请选择">
                <el-option
                  v-for="item in userListAll"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择群发客户：">
              <el-radio v-model="radio" :label="true">全部客户</el-radio>
              <el-radio v-model="radio" :label="false">标签筛选</el-radio>
            </el-form-item>

            <transition name="fade">
              <el-form-item label=" " v-if="radio == false">
                <el-collapse-transition>
                  <div class="tag-warp">
                    <div v-for="(tagGroup,index) in tagData" :key="index" class="tag-list-warp">
                      <el-row :gutter="20" type="flex" justify="center">
                        <el-col :span="5">
                          <span class="lg-42">{{ tagGroup.groupName }}</span>
                        </el-col>
                        <el-col :span="19">
                          <div class="tag-list display-flex align-items-center flex-wrap">
                            <el-checkbox-group
                              v-model="checkboxGroup"
                              size="small"
                              @change="handleCheckedTagsChange(tagGroup,index)"
                            >
                              <el-checkbox
                                v-for="(tag,idx) in tagGroup.tagList"
                                :key="idx"
                                :label="tag.uuid"
                                border
                              >{{ tag.tagName }}</el-checkbox>
                            </el-checkbox-group>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="is-show" @click="isShow = !isShow">
                      <span>{{ isShow?'收起':'展开' }}</span>
                      <i
                        class="el-icon--right"
                        :class="isShow? 'el-icon-arrow-up':'el-icon-arrow-down '"
                      />
                    </div>
                  </div>
                </el-collapse-transition>
              </el-form-item>
            </transition>
            <h5>编辑群发消息</h5>
            <el-form-item label="文字消息：">
              <el-input
                class="text-content"
                type="textarea"
                :autosize="{minRows: 3}"
                placeholder="请输入内容"
                v-model="form.text"
              ></el-input>
            </el-form-item>

            <el-form-item label="图片/链接：">
              <el-input
                class="text-content"
                type="textarea"
                :autosize="{minRows: 3}"
                placeholder="请输入内容"
                v-model="form.text"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      radio: true,
      isShow: false,
      checkboxGroup: [],
      form: {
        articleUuid: "",
        externalUserUuids: "",
        mediaUuid: "",
        sendType: "MY",
        tagUuids: "",
        text: "",
        userUuid: "",
        batchTaskNumber: "",
        tagNames: ""
      }
    };
  },
  computed: {
    ...mapState({
      tagListSelect: state => state.tag.tagListSelect,
      userListAll: state => state.user.listSelect,
      articleListSelect: state => state.media.articleListSelects
    }),
    tagData() {
      if (!this.isShow) {
        return this.tagListSelect.filter((item, index) => {
          return index < 3;
        });
      } else {
        return this.tagListSelect;
      }
    }
  },
  methods: {
    handleCheckedTagsChange(tag, index) {}
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.contact-way-detail {
  .contact-way-detail-warp {
    h5 {
      line-height: 40px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ececec;
    }

    .tag-warp {
      position: relative;
      max-width: 60%;
      min-height: 50px;
      background: #fbfbfb;
      border-radius: 4px;
      border: 1px solid #eee;
      padding: 14px 18px;
      .is-show {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      .tag-list-warp {
        .lg-42 {
          line-height: 32px;
        }
        .tag-list {
          .add-tag {
            margin-right: 10px;
          }
        }
      }
    }

    .text-content {
      max-width: 60%;
    }
  }
}
</style>