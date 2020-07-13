<template>
  <div>
    <div class="process-container">
      <el-steps v-if="mode=='COMPLEX'" :active="process[mode]" align-center>
        <el-step title="基础信息" description></el-step>
        <el-step title="关联企微" description></el-step>
        <el-step title="角色配置" description></el-step>
        <el-step title="审核通知人" description></el-step>
      </el-steps>

      <el-steps v-if="mode=='SIMPLE'" :active="process[mode]" align-center>
        <el-step title="基础信息" description></el-step>
        <el-step title="角色配置" description></el-step>
        <el-step title="审核通知人" description></el-step>
      </el-steps>

      <el-steps v-if="mode=='NONE'" :active="process[mode]" align-center>
        <el-step title="基础信息" description></el-step>
        <el-step title="审核通知人" description></el-step>
      </el-steps>
    </div>
    <transition-group name="fade-transform">
      <el-form
        key="form"
        v-if="process[mode]==1"
        :model="form"
        ref="form"
        :rules="rules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="新建方式"></el-form-item>

        <div style="margin-bottom:20px;" v-if="type!=='NORMAL'">
          <div class="radio-container">
            <div class="radio-item">
              <el-radio v-model="mode" label="SIMPLE">
                <span class="title">上级所在的企业微信中添加</span>
                <br />
                <span class="radio-tips">在上级所在的企业微信中，直接创建新的组织或部门</span>
              </el-radio>
            </div>
            <div class="radio-item">
              <el-radio v-model="mode" label="COMPLEX">
                <span class="title">以新的企业微信号关联</span>
                <br />
                <span
                  class="radio-tips"
                >若新建的组织或部门已有自己的企业微信账号，请选择该方式进行关联。同时该企业微信管理员需要参考文档对该企业微信后台进行配置。</span>
              </el-radio>
            </div>
          </div>
        </div>
        <el-form-item label="上级" prop="parentUuid">
          <el-select-tree
            :default-expand-all="true"
            :multiple="false"
            :placeholder="'请选择组织/部门'"
            :popover-min-width="100"
            :data="departmentList"
            :props="{value:'uuid',children:'children',label:'name'}"
            :check-strictly="true"
            v-model="form.parentUuid"
          ></el-select-tree>

        </el-form-item>

        <el-form-item label="创建类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in orgTypes"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>

        <!-- <div class="text-align-center" style="margin-top">
          <el-button size="small" @click="handleCancel">取消</el-button>

          <el-button type="primary" size="small" @click="handleConfirm">下一步</el-button>
        </div>-->
      </el-form>

      <el-form
        key="formNext"
        v-if="process['COMPLEX']==2"
        :model="formNext"
        ref="formNext"
        :rules="rulesNext"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="通讯录EncodingAESKey">
          <el-input v-model.trim="formNext.addressBookEncodingAESKey"></el-input>
        </el-form-item>
        <el-form-item label="通讯录应用secret">
          <el-input v-model.trim="formNext.addressBookSecret"></el-input>
        </el-form-item>
        <el-form-item label="通讯录token">
          <el-input v-model.trim="formNext.addressBookToken"></el-input>
        </el-form-item>
        <el-form-item label="主应用id">
          <el-input v-model.trim="formNext.chaoyingAgentId"></el-input>
        </el-form-item>
        <el-form-item label="主应用secret">
          <el-input v-model.trim="formNext.chaoyingAgentSecret"></el-input>
        </el-form-item>
        <el-form-item label="CorpId">
          <el-input v-model.trim="formNext.corpId"></el-input>
        </el-form-item>
        <el-form-item label="外部联系人EncodingAESKey">
          <el-input v-model.trim="formNext.externalUserEncodingAESKey"></el-input>
        </el-form-item>
        <el-form-item label="客户应用secret">
          <el-input v-model.trim="formNext.externalUserSecret"></el-input>
        </el-form-item>
        <el-form-item label="外部联系人token">
          <el-input v-model.trim="formNext.externalUserToken"></el-input>
        </el-form-item>
        <el-form-item label="是否只允许内网使用">
          <el-input v-model.trim="formNext.localNetwork" type="number"></el-input>
        </el-form-item>
        <el-form-item label="会话存档secret">
          <el-input v-model.trim="formNext.messageArchiveSecret"></el-input>
        </el-form-item>
        <el-form-item label="消息加密">
          <el-input v-model.trim="formNext.msgSeq"></el-input>
        </el-form-item>
        <el-form-item label="上级的uuid">
          <el-input v-model.trim="formNext.parentUuid" disabled></el-input>
        </el-form-item>

        <el-form-item label="会话存档私钥">
          <el-input v-model.trim="formNext.privateKey"></el-input>
        </el-form-item>

        <el-form-item label="公网地址">
          <el-input v-model.trim="formNext.publicIp"></el-input>
        </el-form-item>

        <el-form-item label="侧边栏url">
          <el-input v-model.trim="formNext.sidebarUrl"></el-input>
        </el-form-item>

        <el-form-item label="预设超级管理员的userid">
          <el-input v-model.trim="formNext.superUserId"></el-input>
        </el-form-item>
      </el-form>

      <el-form
        key="formNext"
        v-if="process[mode]==4"
        :model="formNext"
        ref="formNext"
        :rules="rulesNext"
        label-width="150px"
        label-position="left"
      >
        <el-form-item label="通知审核人"></el-form-item>
      </el-form>

      <el-form
        key="formRole"
        v-if="process['SIMPLE']==2||process['COMPLEX']==3"
        :model="formRole"
        ref="formRole"
        :roles="rulesRole"
        label-position="left"
        label-width="150px"
      >
        <el-form-item label="角色模板">
          <el-select multiple v-model="formRole.roleUuidSet">
            <el-option
              v-for="item in roleTemplates"
              :key="item.uuid"
              :value="item.uuid"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </transition-group>

    <div class="text-align-center">
      <el-button size="small" @click="handlePrev">{{process[mode]==1?'取消':'返回'}}</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleConfirm"
      >{{process['NEW']==4||process['SIMPLE']==3?'确定':'下一步'}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  inject: ['reload'],
  data() {
    return {
      process: {
        SIMPLE: 1,//DEPT
        COMPLEX: 1, //BRANCH||BUSSINESS
        NONE:1
      },
      mode: 'NONE', //new //old
      orgTypes: [
          {
              code: 'BRANCH',
              label: '分公司'
          },
          {
              code: 'BUSINESS',
              label: '营业部'
          },{
              code: 'DEPT',
              label: '普通部门'
          }
      ],
      form: {
        name: '',
        orgNode: false,
        parentUuid: '',
        type: ''
      },
      formNext: {
        addressBookEncodingAESKey: '', //通讯录EncodingAESKey
        addressBookSecret: '', //通讯录应用secret
        addressBookToken: '', //通讯录token
        chaoyingAgentId: '', //主应用id
        chaoyingAgentSecret: '', //主应用secret
        corpId: '', //CorpId
        externalUserEncodingAESKey: '', //外部联系人EncodingAESKey
        externalUserSecret: '', //客户应用secret
        externalUserToken: '', //外部联系人token
        localNetwork: '', //是否只允许内网使用
        messageArchiveSecret: '', //会话存档secret
        msgSeq: '', //消息加密
        parentUuid: '', //上级的uuid
        privateKey: '', //会话存档私钥
        publicIp: '', //公网地址
        sidebarUrl: '', //侧边栏url
        superUserId: '' //预设超级管理员的userid
      },
      formRole: {
        roleUuidSet: []
      },
      rulesNext: {},
      type: 'WX',
      types: [
        {
          code: 'WX',
          label: '分公司/营业部'
        },
        {
          code: 'NORMAL',
          label: '部门'
        }
      ],
      rulesRole: {},
      rules: {
        parentUuid: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.type': {
      handler(newVal, oldVal) {
          console.log(newVal)
          if(newVal=='NONE'){
              this.form.orgNode = false
              this.mode='NONE'

          }
        if (newVal === 'NORMAL') {
          this.mode = 'SIMPLE'
          this.type = 'NORMAL'
            this.$delete(this.form, 'type')
        }
        if (newVal === 'WX') {
          this.form.orgNode = true


            this.$set(this.form, 'type', 'BRANCH')
          this.mode = 'SIMPLE'
        }
      },
      immediate: true
    },
    parentUuid: {
      handler(newVal, oldVal) {
        this.formNext.parentUuid = newVal
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      listSelect: state => state.department.listSelect, //list
      departmentList: state => state.department.departmentList, //tree
      roleTemplates: state => state.roleTemplate.listAll
    }),
    parentUuid() {
      return this.form.parentUuid
    }
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData() {
      this.$store
        .dispatch('roleTemplate/getListAll')
        .then(() => {})
        .catch(err => {
          console.error(err)
        })
    },
    handlePrev() {
      if (this.process[this.mode] == 1) {
        this.handleCancel()
      }
      if (this.process['COMPLEX'] != 1 || this.process['SIMPLE'] != 1) {
        this.process[this.mode]--
      }
    },
    handleConfirm() {
      if (this.process['COMPLEX'] == 4 || this.process['SIMPLE'] == 3) {
          //创建普通部门
        if (this.mode == 'SIMPLE' && this.type == 'NORMAL') {
          const roleUuidSet = this.formRole.roleUuidSet
          const payload = { ...this.form, roleUuidSet, type: 'DEPT' }
          this.$store
            .dispatch('department/addDepartment', payload)
            .then(() => {})
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        }
        //创建营业部/分公司
        if(this.mode=='SIMPLE'&&this.type=='WX'){
            // const roleUuidSet = this.formRole.roleUuidSet
          const payload = { ...this.form, type: 'DEPT' }
        }
      }
      if (this.process['COMPLEX'] != 4 && this.process['SIMPLE'] != 3) {
        if (this.process[this.mode] == 1) {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.process[this.mode]++
            } else {
              this.$message({
                type: 'error',
                message: '请检查输入'
              })
            }
          })
        } else {
          this.process[this.mode]++
        }
      }
    },
    createWx() {},
    createNormal() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('department/addDepartment', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    handleConfirmNext() {
      const payload = this.formNext
      this.$refs['formNext'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('department/addWxDepartment', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    refresh() {
      this.$store
        .dispatch('department/getDepartmentListAll')
        .then(() => {
          //   this.reload()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-container {
  display: flex;
  justify-content: space-between;
  .radio-item {
    width: 240px;
    height: 180px;
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    .title {
      font-weight: 700;
    }
    .radio-tips {
      word-wrap: break-word;
      white-space: normal;
    }
  }
}

.process-container {
  margin-bottom: 20px;
}
</style>