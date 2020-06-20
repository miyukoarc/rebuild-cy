const Koa = require('koa') //koa主模块
const Router = require('koa-router') //koa路由
const cors = require('koa2-cors') //跨域
const fs = require('fs')
   
// 配置




module.exports = app => {
  app = new Koa()

  const router = new Router()


  router.get('/api/getData', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/data.json').toString()
  })
  /**
   * department
   */
  router.get('/api/department/list', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/department/departmentList.json').toString()
  })

  router.get('/api/department/listDep', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/department/listDep.json').toString()
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

  router.get('/api/permission/listMy', async ctx => {


        ctx.body = fs.readFileSync(__dirname + '/virtual/permission/listMy.json').toString()

  })

  /**
   * menu
   */
  router.get('/api/menu/list', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/menu/menuList.json').toString()

  })

  router.get('/api/menu/listMy', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/menu/listMy.json').toString()

  })
  
  /**
   * tag
   */

  router.get('/api/tag/list', async ctx => {

    if(ctx.request.query){
        console.log(ctx.request.query)
    }


    ctx.body = fs.readFileSync(__dirname + '/virtual/tag/tagList.json').toString()

  })

  router.get('/api/tag/listAllTag', async ctx => {

    if(ctx.request.query){
        console.log(ctx.request.query)
    }
    ctx.body = fs.readFileSync(__dirname + '/virtual/tag/listAllTag.json').toString()

  })

  /**
   * user
   */
  router.get('/api/user/list', async ctx => {

    if(ctx.request.query){
        console.log(ctx.request.query)
    }


    ctx.body = fs.readFileSync(__dirname + '/virtual/user/userList.json').toString()

  })

  router.get('/api/user/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/user/userListAll.json').toString()

  })

  router.get('/api/user/:uuid', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/user/detail.json').toString()

  })

  /**
   * sensitive
   */

  router.get('/api/sensitive/auditTaglist', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/auditTaglist.json').toString()

  })

  router.get('/api/sensitive/auditPermissionlist', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/auditPermissionlist.json').toString()

  })

  router.get('/api/sensitive/list', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/list.json').toString()

  })

  



  /**
   * log
   */
  router.get('/api/log/logAll', async ctx => {

    if(ctx.request.query){
        console.log(ctx.request.query)
    }


    ctx.body = fs.readFileSync(__dirname + '/virtual/log/logAll.json').toString()

  })

  /**
   * externalUser
   */
  router.post('/api/externalUser/customerStatistics', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/customerStatistics.json').toString()

  })


  router.get('/api/externalUser/listMy', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/listMy.json').toString()

  })

  router.get('/api/externalUser/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/listAll.json').toString()

  })

  router.get('/api/externalUser/runWayList', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/runWayList.json').toString()

  })

  router.get('/api/externalUser/runWayListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/runWayListAll.json').toString()

  })

  router.get('/api/externalUser/listGroup', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/listGroup.json').toString()

  })
  
  router.get('/api/externalUser/listOwner', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/listOwner.json').toString()

  })

  router.get('/api/externalUser/quitUserRelationExUserList', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/quitUserRelationExUserList.json').toString()

  })








  app.use(cors()).use(router.routes()).use(router.allowedMethods())

  app.listen(3000, _ => {
    console.log('Virtual server is running at port 3000')
  })

}
