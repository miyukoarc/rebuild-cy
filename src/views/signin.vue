<template>
  <div v-if="isElectron" class="login-container">
    <div class="btn-container">
      <close-button></close-button>
    </div>
    <div class="login-warp">
      <transition name="fade">
        <div v-if="!tipsFlag" class="qrcode-container">
          <div v-if="loading" class="loading">
            <i class="el-icon-loading color-info"></i>
          </div>
          <div id="browser"></div>
          <webview ref="webview" id="webview"></webview>
        </div>
      </transition>

      <div v-if="tipsFlag" class="text-align-center">
        <h3 class="tips">选择单位获取登录二维码</h3>
      </div>
      <div class="container">
        <div class="choice" v-for="item in loginList" :key="item.tenantId">
          <el-radio
            v-model="tenantId"
            size="small"
            @change="changeCorp(item)"
            :label="item.tenantId"
          >{{item.name}}</el-radio>
        </div>
        <div class="text-align-center">
          <el-button ref="btn" type="primary" size="small" @click="handleLogin">获取二维码</el-button>
        </div>
      </div>
      <div class="version-warp display-flex align-items-center">
        <span class="left-liner"></span>
        <span class="ml-5 mr-5">超盈SCRM·国信{{publicVersion?publicVersion:''}}</span>
        <span class="right-liner"></span>
      </div>
    </div>
  </div>
  <div v-else>
    <div style="height:100vh;text-align:center;line-height:100vh;">请下载客户端</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '@/components/CloseButton'

const isDevelopment = process.env.NODE_ENV !== 'production'
export default {
  name: 'Login',
  components: {
    CloseButton,
  },
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
      tenantId: '',
      tipsFlag: true,
      loading: false,
      isElectron: false,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true,
    },
    tenantId: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.$refs?.btn?.handleClick()
        }
      },
    },
  },
  computed: {
    ...mapState({
      loginList: (state) => state.auth.loginList,
      publicVersion: (state) => state.auth.publicVersion,
    }),
  },
  created() {
    if (isDevelopment) {
      this.initDataList()
        .then(() => {
          const tenantId = this.loginList[0].tenantId
          this.tenantId = this.loginList[0].tenantId

          const id = this.tenantId
        })
        .catch((err) => {
          console.error(err)
        })
      this.getpublicVersion()
    }
    if (this.$isElectron()) {
      this.isElectron = true
      this.initDataList()
        .then(() => {
          const tenantId = this.loginList[0].tenantId
          this.tenantId = this.loginList[0].tenantId

          const id = this.tenantId
        })
        .catch((err) => {
          console.error(err)
        })
      this.getpublicVersion()
    }
    //正式发布就把如下代码注释
    if (isDevelopment) {
      this.isElectron = true
    }
  },
  methods: {
    getpublicVersion() {
      this.$store
        .dispatch('auth/publicVersion')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化错误',
          })
        })
    },
    getQrCode(id, target) {
      this.$nextTick(() => {
        return new WwLogin({
          id: target,
          appid: 'wwa266cd2b968ae008',
          agentid: '1000019',
          redirect_uri: `http://sidebar.cyscrm.com/api/wxlogin/${id}`,
          state: '123456',
          href: '',
        })
      })
    },
    // getWxlogin(payload) {
    //   this.$nextTick(async () => {
    //     const res = await wxLogin(payload)
    //     if (res) {
    //       this.wxQrCode = res
    //       const style =
    //         '<style>#login{width:100%;margin: 20px auto; text-align:center}</style>'
    //       document.write(this.addStr(this.wxQrCode, style))
    //     }
    //   })
    // },
    addStr(str, style) {
      const arr = str.split('</head>')
      return `${arr[0]}${style}</head>${arr[1]}`
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    changeCorp(val) {
      window.localStorage.setItem('corp', JSON.stringify(val))
    },
    initDataList() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('auth/getLoginList')
          .then(() => {
            resolve()
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: err || '初始化错误',
            })
            reject(err)
          })
      })
    },
    handleLogin() {
      if (this.tenantId) {
        this.tipsFlag = false
        const tenantId = this.tenantId + ''

        this.loading = true

        // if (this.$isElectron()) {
        //   const ipcRenderer = window.electron.ipcRenderer
        //   ipcRenderer.send('qrcode-window', this.tenantId)

        //   this.loading = false
        // } else {
        this.getQrCode(tenantId, 'browser')
        this.loading = false
        // }
      } else {
        this.$message({
          type: 'warning',
          message: '请选择组织！',
        })
      }
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
#login {
  width: 100%;
  margin: 20px auto;
  text-align: center;
  -webkit-app-region: drag;
  iframe {
    -webkit-app-region: no-drag;
  }
}

/* reset element-ui css */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
  .login-warp {
    min-width: 25%;
    min-height: 35%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    color: #333;
    -webkit-app-region: no-drag;
    .version-warp {
      margin: 20px 0;
      font-size: 14px;
      color: #909090;
    }
  }
  #webview {
    -webkit-app-region: no-drag;
  }
  .qrcode-container {
    -webkit-app-region: no-drag;
  }
  .container {
    -webkit-app-region: no-drag;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.left-liner {
  width: 30px;
  height: 2px;
  display: inline-block;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    #909090
  );
}

.right-liner {
  width: 30px;
  height: 2px;
  display: inline-block;
  background-image: linear-gradient(
    to right,
    #909090,
    rgba(255, 255, 255, 0.1)
  );
}
#browser {
  width: 300px;
  height: 400px;
  iframe {
    display: block;
  }
}

.outer {
  -webkit-app-region: drag;
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  // background: url(../assets/2.jpg) repeat center;
  overflow: hidden;
  height: 100%;
  background-color: #2d3a4b;
  position: relative;
  top: 0;
  left: 0;

  .btn-container {
    position: absolute;
    right: 2px;
    top: 2px;
    -webkit-app-region: no-drag;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.choice {
  margin-bottom: 20px;
}
.iframe-container {
  width: 300px;
  height: 500px;
}
.text-align-center {
  .tips {
    margin-bottom: 20px;
    margin-top: 20px;
  }
}

.loading {
  width: 335.6px;
  height: 300px;
  text-align: center;
  line-height: 330px;
  font-size: 50px;
}
</style>
