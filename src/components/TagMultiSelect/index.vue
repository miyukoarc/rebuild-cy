<template>
  <div class="tag-select-container">
    <div v-for="(group,groupIndex) in alterArr" :key="group.groupId" class="tag-group">
      <el-row>
        <el-col class="tips" :span="8">
          <span class="font-exs color-info">{{group.groupName}}</span>
        </el-col>
        <el-col class="tags" :span="16">
          <div v-for="(tag,index) in group.tagList" :key="tag.uuid" class="tag-container">
            <el-tag
              size="small"
              :class="alterType(groupIndex,index,tag.uuid)"
              style="margin-right:3px;"
              @click="handleToggle(groupIndex,tag,index)"
            >
              <span class="color-info font-es">{{tag.tagName}}</span>
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="text-align-center" @click="curly = !curly">
      <el-button type="text" size="mini">
        {{ curly?'展开':'收起' }}
        <i
          class="el-icon--right"
          :class="curly? 'el-icon-arrow-up':'el-icon-arrow-down '"
        />
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagSelectFix",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  model: {
    props: "value",
    event: "change",
  },
  data() {
    return {
      originArr: [], //rawdata 负责渲染
      fullArr: [], //全选状态
      curly: false, //折叠状态
      stateArr: [], //响应式状态
    };
  },
  computed: {
    alterArr() {
      return this.curly ? this.originArr.slice(0, 2) : this.originArr;
    },
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.stateArr = this.$options.data().stateArr;
        this.fullArr.forEach((row, rowIndex) => {
          this.stateArr.push([]);
          row.forEach((col, colIndex) => {
            if (newVal.includes(col)) {
              this.stateArr[rowIndex].push(col);
            }
          });
        });

        this.$emit("select-change", "select-change");
      },
      //   immediate: true
    },
  },
  created() {
    this.initData()
      .then(() => {
        this.fullArr.forEach((row, rowIndex) => {
          row.forEach((col, colIndex) => {
            if (this.value.includes(col)) {
              //   console.log(rowIndex, colIndex)
              this.stateArr[rowIndex].push(col);
            }
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  updated() {
    // console.log(this.value, this.fullArr)
  },
  methods: {
    initData() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("tag/getListSelect")
          .then((res) => {
            this.originArr = res;
            res.forEach((item) => {
              let temp = item.tagList.map((tag) => {
                return tag.uuid;
              });
              this.fullArr.push(temp);
              this.stateArr.push([]);
            });
            this.curly = res.length > 2 && true;

            resolve();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    },
    alterType(groupId, index, uuid) {
      if (this.stateArr.length) {
        return this.stateArr[groupId].includes(uuid)
          ? "selected"
          : " unselected";
      } else {
        return "unselected";
      }
    },
    handleToggle(groupIndex, tag, index) {
      const temp = this.stateArr[groupIndex];

      const multiTemp = this.stateArr;

      if (temp.includes(tag.uuid)) {
        temp.splice(
          temp.findIndex((item) => {
            return item == tag.uuid;
          }),
          1
        );

        multiTemp.splice(groupIndex, 1, temp);
      } else {
        temp.push(tag.uuid);

        multiTemp.splice(groupIndex, 1, temp);
      }

      const output = multiTemp.reduce((sum, curr) => {
        return sum.concat(curr);
      }, []);


      this.$emit("change", output);
    },
  },
};
</script>

<style lang="scss">
.tag-select-container {
  .tag-group {
    .tips {
      height: 26px;
      line-height: 26px;
    }
    .tags {
      line-height: 26px;
      user-select: none;
      .tag-container {
        cursor: pointer;
        display: inline-block;
        margin-bottom: 3px;
        .tag {
          height: 20px;
          padding: 0 5px;
          line-height: 19px;
          border-width: 1px;
          border-style: solid;
          border-radius: 4px;
          display: inline-block;
          box-sizing: border-box;
          white-space: nowrap;
        }
      }
    }
  }
  .unselected {
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 12px 20px;
    font-size: 14px;
    line-height: 0px;
    border-radius: 0;
  }
  .selected {
    cursor: pointer;
    background: #409eff;
    border-color: #409eff;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 12px 20px;
    font-size: 14px;
    line-height: 0px;
    border-radius: 0;
    .color-info {
      color: #fff;
    }
  }
}
</style>