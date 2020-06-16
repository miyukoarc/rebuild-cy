const Koa = require('koa') //koa主模块
const Router = require('koa-router') //koa路由
const cors = require('koa2-cors') //跨域
const fs = require('fs')
const Koa_Session = require('koa-session'); // 导入koa-session     
// 配置




module.exports = app => {
  app = new Koa()

  const router = new Router()

//   const session_signed_key = ["some secret hurr"]; // 这个是配合signed属性的签名key
//   const session_config = {
//     key: 'koa:sess',
//     /**  cookie的key。 (默认是 koa:sess) */
//     maxAge: 4000,
//     /**  session 过期时间，以毫秒ms为单位计算 。*/
//     autoCommit: true,
//     /** 自动提交到响应头。(默认是 true) */
//     overwrite: true,
//     /** 是否允许重写 。(默认是 true) */
//     httpOnly: true,
//     /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
//     signed: true,
//     /** 是否签名。(默认是 true) */
//     rolling: true,
//     /** 是否每次响应时刷新Session的有效期。(默认是 false) */
//     renew: false,
//     /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
//   };

//   const session = Koa_Session(session_config, app)
//   app.keys = session_signed_key;

//   app.use(session);

//   app.use(ctx => {
//       const databaseUserName = "testSession";
//       const databaseUserPasswd = "noDatabaseTest";
//       // 对/favicon.ico网站图标请求忽略
//       if (ctx.path === '/favicon.ico') return;
//       console.log(databaseUserName,
//         databaseUserPasswd)
//       }
//   )

  router.get('/api/getData', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/data.json').toString()
  })
  /**
   * department
   */
  router.get('/api/department/list', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/department/departmentList.json').toString()
  })

  /**
   * role
   */
  router.get('/api/role/1', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/role/roleDetail.json').toString()
  })

  router.get('/api/role/list', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/role/roleList.json').toString()
  })

  /**
   * myInfo
   */

  router.get('/api/myInfo/detail', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/myInfo/detail.json').toString()
  })

  /**
   * permission
   */

  router.get('/api/permission/listRole', async ctx => {

    if (ctx.request.query) {
      if (ctx.request.query.roleCode === 'super') {
        ctx.body = fs.readFileSync(__dirname + '/virtual/permission/permissionSuper.json').toString()
      }
    } else {
      ctx.body = "123"
    }



  })

  /**
   * menu
   */
  router.get('/api/menu/list', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/menu/menuList.json').toString()

  })







  app.use(cors()).use(router.routes()).use(router.allowedMethods())

  app.listen(3000, _ => {
    console.log('Virtual server is running at port 3000')
  })

}
