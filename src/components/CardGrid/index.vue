<template>
  <div class="card-container">
    <el-checkbox-group v-if="listAll.length" v-model="checked" @change="handleChangeCheck">
      <div class="row" v-for="(row) in complexList" :key="row[0].uuid">
        <div class="item-container" v-for="item in row" :key="item.uuid">
          <div class="grid-item" v-if="Object.keys(item).length">
            <el-card>
              <div class="card-inner">
                <div class="content-container">
                  <div class="text-inner" v-if="item.type==='TEXT'">
                    <span>{{item.content}}</span>
                  </div>
                  <div
                    v-if="item.type==='IMAGE'"
                    @click="handleViewImage(item.localId)"
                    style="cursor: pointer;"
                  >
                    <el-image fit="cover" :src="`/api/public/file/${item.localId}`"></el-image>
                    <div class="cover">
                      <i class="el-icon-picture-outline icon"></i>
                    </div>
                  </div>
                  <div v-if="item.type==='ARTICLE'">
                    <div>
                      <h5 class="text-align-center">{{item.title}}</h5>
                      <div>
                        <span class="color-info font-exs">{{item.description}}</span>
                      </div>
                      <div v-html="item.articleContent"></div>
                    </div>
                  </div>
                  <div v-if="item.type==='FILE'">
                    <div class="file">
                      <i class="el-icon-document color-info"></i>
                      <span class="font-exs color-info user-select-none">{{item.fileName}}</span>
                    </div>
                  </div>

                  <div
                    v-if="item.type==='VIDEO'"
                    @click="handleViewVideo(item.localId)"
                    style="cursor: pointer;"
                  >
                    <div>
                      <video-cover :url="item.localId"></video-cover>
                    </div>
                    <div class="cover">
                      <i class="el-icon-video-play icon"></i>
                    </div>
                  </div>
                </div>
                <div class="info-container">
                  <div class="creator">
                    <span class="font-exs color-info" v-if="item.creator">{{item.creator.name}}</span>
                    <span class="font-exs color-info">{{item.updateAt}}</span>
                  </div>
                  <div class="operator">
                    <el-checkbox
                      :disabled="item.auditStateForOperation==='UNDER_REVCIEW'"
                      :key="item.uuid"
                      :label="item.uuid"
                    >{{item.uuid?'':''}}</el-checkbox>
                    <el-t-button type="text" @click="handleViewTags(item.toTags)">适用标签</el-t-button>
                    <div class="operator-icon">
                      <span
                        class="color-primary font-exs"
                        v-if="item.auditStateForOperation==='UNDER_REVCIEW'"
                      >审核中</span>
                      <el-t-button v-else type="text" @click="handleDelete(item.uuid)">
                        <i class="el-icon-delete"></i>
                      </el-t-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </el-checkbox-group>

    <div v-else class="text-align-center">
      <span class="tips font-exs color-info user-select-none">暂无数据</span>
    </div>
    <!-- 预览框 -->
    <el-dialog :visible.sync="dialogVisible" :width="width" center title="适用标签" destroy-on-close>
      <el-image v-if="view==='image'" :src="`/api/public/file/${imageUrl}`" @load="onLoad"></el-image>
      <video
        v-if="view==='video'"
        ref="videoPlay"
        width="600"
        height="400"
        controls
        :src="`/api/public/file/${videoUrl}`"
        @canplay="onCanplay"
      ></video>
      <div v-if="view==='tags'">
        <div v-if="shownTags.length">
          <div class="tagGroup" v-for="group in shownTags" :key="group.groupId">
            <div class="group-container">
              <div class="group-name">
                <span class="font-exs color-info">{{group.groupName}}</span>
              </div>
              <div class="tags">
                <el-tag v-for="tag in group.tags" :key="tag.uuid" size="mini">{{tag.tagName}}</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-align-center" style="line-height:30px;">
          <span class="font-exs color-info">未设置</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VideoCover from './video-cover'
import { upgrade } from '@/utils/common'
export default {
  name: 'CardGrid',
  components: {
    VideoCover,
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      width: '',
      tagsWidth: '640px',
      imageWidth: '',
      videoWidth: '640px',
      dialogVisible: false,
      checked: this.value,
      view: 'video', //video//image
      videoUrl: '',
      imageUrl: '',
      shownTags: [],
      complexList: [],
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        // if (newVal.length) {
        //   newVal.forEach(item => {
        //     this.checked.push(item)
        //   })
        // }
        
        this.checked = newVal
      },
      //   immediate: true
    },
    options: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.complexList = this.upgrade(newVal)
        }
      },
      immediate: true,
    },
  },
  computed: {
    listAll() {
      return this.options
    },
    alterValue() {
      return this.value
    },
  },
  updated() {
  },
  created() {},
  mounted() {},
  methods: {
    upgrade(arr) {
      return upgrade(arr)
    },
    handleEdit(val) {
      this.$emit('handleEdit', val)
    },
    handleDelete(val) {
      this.$emit('handleDelete', val)
    },
    handleChangeCheck(val) {
      this.$emit('change', val)
    },
    handleViewVideo(val) {
      this.videoUrl = val
      this.view = 'video'
      //   this.width = this.videoWidth
      this.dialogVisible = true
    },
    handleViewTags(list) {
      this.view = 'tags'
      //   this.width = this.tagsWidth
      this.shownTags = this.grouping(list)
      this.dialogVisible = true
      // console.log(this.grouping(list))
    },
    grouping(list) {
      if (Object.keys(list).length) {
        return list.reduce((groups, item) => {
          let groupFound = groups.find(
            (foundItem) => item.groupId === foundItem.groupId
          )
          if (groupFound) {
            groupFound.tags.push(item)
          } else {
            let newGroup = {
              groupId: item.groupId,
              groupName: item.groupName,
              tags: [item],
            }

            groups.push(newGroup)
          }

          return groups
        }, [])
      } else {
        return []
      }
    },
    handleViewImage(val) {
      this.imageUrl = val
      this.view = 'image'
      //   this.width = await this.imageWidth
      this.dialogVisible = true
    },
    handleCheckAll() {
      let arr = []
      if (this.checked.length === this.listAll.length) {
        this.checked = []
      } else if (this.checked.length < this.listAll.length) {
        this.checked = []
        arr = this.listAll.map((item) => {
          return item.uuid
        })
        arr.forEach((item) => {
          this.checked.push(item)
        })
      } else {
      }
      this.$emit('change', arr)
    },

    onLoad(e) {
      const img = e.target
      let width = 0
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40
      }
      this.width = width + 'px'
    },
    onCanplay(e) {
      this.width = 640 + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
.card-container {
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    .item-container {
      //   flex: 1 0 0%;
      flex: 1;
    }
  }
  .grid-item {
    .card-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content-container {
        position: relative;
        left: 0;
        top: 0;
        height: 220px;
        // width: 177.8px;
        overflow: hidden;

        &:hover .cover {
          background-color: rgba($color: #fff, $alpha: 0.2);
          .icon {
            opacity: 1;
          }
        }
        .cover {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          line-height: 260px;
          text-align: center;
          .icon {
            font-size: 50px;
            color: rgba($color: #fff, $alpha: 0.7);
            opacity: 0;
          }
        }
        .file {
          font-size: 50px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .info-container {
        margin: 0 10px 10px 10px;
        .creator {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }
        .operator {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .operator-icon {
            display: inline-block;
          }
        }
      }
    }
  }
}
.group-container {
  display: flex;
  justify-content: space-between;
  line-height: 28px;
  .group-name {
    min-width: 180px;
  }
  .tags {
    flex: 1;
  }
}

.text-inner{
    overflow-y: scroll;
}
</style>

<style lang="scss">
.grid-item {
  .el-card__body {
    height: 100%;
    padding: 0;
  }
}
.card-container {
  .el-checkbox-group {
    font: initial;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    flex-direction: column;
  }
  .tips {
    line-height: 30px;
  }
}
.el-table__empty-text{
    user-select: none;
}
</style>