<template>
  <div class="login-container">
  </div>
</template>

<script>;

import { wxLogin } from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
      wxQrCode: null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {

  },
  mounted() {
    this.getWxlogin();

  },
  methods: {
    getWxlogin() {
      this.$nextTick(async () => {
        const res = await wxLogin();
        if (res) {
          this.wxQrCode = res;
          const style =
            "<style>#login{width:100%;margin: 20px auto; text-align:center}</style>";

          document.write(this.addStr(this.wxQrCode, style));
        }
      });
    },
    addStr(str, style) {
      const arr = str.split("</head>");
      return `${arr[0]}${style}</head>${arr[1]}`;
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  }
};
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
}
// .login-warp {
//   background-color: #fff;
//   .el-tabs__nav-scroll {
//     background-color: #fff;
//     padding: 5px 10px 0 10px;
//   }
//   .qywx {
//     background-color: #fff;
//     text-align: center;
//   }

//   .el-form-item__content {
//     background-color: #2d3a4b;
//   }
//   .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
//     color: #1890ff;
//     cursor: pointer;
//   }
//   .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
//     color: #1890ff;
//     cursor: pointer;
//   }
//   .login-container .el-form-item {
//     background-color: #283443;
//   }
//   .yhdl {
//     padding: 20px 20px;
//   }
// }

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
</style>
