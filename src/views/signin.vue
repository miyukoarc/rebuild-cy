<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Keep Calm and</h3>
        <h4 class="title">Make Epic shit</h4>
      </div>

      <el-container class="qrcode-container">
        <!-- <div id="wx_qrcode">
          <iframe :srcdoc="loginPage" frameborder="0"></iframe>
        </div> -->
        <div class="iframe-container">
          <iframe
            src="http://10.10.10.159/login"
            style="height:400px;width:400px;"
            frameborder="0"
          ></iframe>
        </div>
      </el-container>

      <div style="text-align:center;" v-if="env==='offline'">
        <el-t-button size="mini" @click="handleVirtualLogin">模拟登录</el-t-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { setToken } from '@/utils/auth'
import { wxLogin } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginPage: null,
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      wxQrCode: null
    }
  },
  computed: {
    env() {
      return process.env.VUE_APP_WORK
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      // handler(newVal,oldVal){
      //     console.log(newVal)
      // },
      immediate: true
    }
  },
  created() {
 
  },
  mounted() {
    // if (process.env.VUE_APP_WORK !== 'offline') {
    //   this.getWxlogin()
    // }
    // window.WwLogin({
    //   id: 'wx_qrcode',
    //   appid: 'wwa266cd2b968ae008',
    //   agentid: '1000019',
    //   redirect_uri: 'http://sidebar.cyscrm.com/api/wxlogin',
    //   state: '123456',
    //   href: ''
    // })
  },
  methods: {
    getWxlogin() {
      this.$nextTick(async () => {
        const res = await wxLogin()
        if (res) {
          this.wxQrCode = res
          const style =
            '<style>#login{width:100%;margin: 20px auto; text-align:center}</style>'

          document.write(this.addStr(this.wxQrCode, style))
        }
      })
    },
    addStr(str, style) {
      const arr = str.split('</head>')
      return `${arr[0]}${style}</head>${arr[1]}`
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleVirtualLogin() {
      this.setToken('123')
      this.$router.push({ path: '/dashboard' })
    },
    setToken(token) {
      return setToken(token)
    }
  }
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

/* reset element-ui css */
.login-container {
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

.qrcode-container {
  display: flex;
  justify-content: center;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

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
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
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
}
</style>
