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

  router.get('/api/department/:uuid', async ctx => {

    if (ctx.params.uuid === 'listSelect') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/department/listSelect.json').toString()

    } else if (ctx.params.uuid === 'listAll') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/department/listAll.json').toString()

    } else {
      ctx.body = fs.readFileSync(__dirname + '/virtual/department/detail.json').toString()

    }

  })

  // router.get('/api/department/listAll', async ctx => {

  // })

  // router.get('/api/department/listSelect', async ctx => {

  // })
  /**
   * role
   */
  router.get('/api/role/:uuid', async ctx => {

    console.log()
    if (ctx.params.uuid === 'listAll') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/role/listAll.json').toString()
    } else {

      ctx.body = fs.readFileSync(__dirname + '/virtual/role/detail.json').toString()
    }

  })

  // router.get('/api/role/listAll', async ctx => {

  // })

  /**
   * myInfo
   */

  router.get('/api/myInfo/detail', async ctx => {

    ctx.body = fs.readFileSync(__dirname + '/virtual/myInfo/detail.json').toString()
  })

  /**
   * permission
   */

  router.get('/api/permission/listSelect', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/permission/listSelect.json').toString()

  })


  router.get('/api/permission/listMy', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/permission/listMy.json').toString()

  })

  router.get('/api/permission/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/permission/listAll.json').toString()

  })

  router.get('/api/permission/rolePermissionList', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/permission/rolePermissionList.json').toString()

  })

  /**
   * menu
   */
  router.get('/api/menu/:uuid', async ctx => {
    if (ctx.params.uuid === 'listAll') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/menu/listAll.json').toString()

    } else if (ctx.params.uuid === 'listMy') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/menu/listMy.json').toString()
    } else {

      ctx.body = fs.readFileSync(__dirname + '/virtual/menu/detail.json').toString()
    }



  })

  // router.get('/api/menu/listAll', async ctx => {



  // })

  // router.get('/api/menu/listMy', async ctx => {



  // })

  /**
   * media
   */

  router.get('/api/media/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/menu/listAll.json').toString()

  })

  router.get('/api/media/article/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/menu/articleListAll.json').toString()

  })

  /**
   * mediaGroup
   */

  router.get('/api/mediaGroup/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/mediaGroup/listAll.json').toString()

  })

  /**
   * tag
   */

  router.get('/api/tag/listMy', async ctx => {

    if (ctx.request.query) {
      console.log(ctx.request.query)
    }


    ctx.body = fs.readFileSync(__dirname + '/virtual/tag/listMy.json').toString()

  })

  router.get('/api/tag/listAll', async ctx => {

    if (ctx.request.query) {
      console.log(ctx.request.query)
    }
    ctx.body = fs.readFileSync(__dirname + '/virtual/tag/listAll.json').toString()

  })

  router.get('/api/tag/listSelect', async ctx => {

    if (ctx.request.query) {
      console.log(ctx.request.query)
    }
    ctx.body = fs.readFileSync(__dirname + '/virtual/tag/listSelect.json').toString()

  })

  /**
   * user
   */

  router.get('/api/user/:uuid', async ctx => {

    if (ctx.params.uuid === 'listAll') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/user/listAll.json').toString()


    } else if (ctx.params.uuid === 'listSelect') {
      ctx.body = fs.readFileSync(__dirname + '/virtual/user/listSelect.json').toString()
    } else {
      ctx.body = fs.readFileSync(__dirname + '/virtual/user/detail.json').toString()

    }



  })

  // router.get('/api/user/listAll', async ctx => {

  // })



  // router.get('/api/user/listSelect', async ctx => {

  // })

  /**
   * sensitive
   */

  router.get('/api/riskManagement/auditTaglistAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/auditTaglistAll.json').toString()

  })

  router.get('/api/riskManagement/auditPermissionlistAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/auditPermissionlistAll.json').toString()

  })

  router.get('/api/riskManagement/auditBatchSendTaklistAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/auditBatchSendTaklistAll.json').toString()

  })

  router.get('/api/riskManagement/auditListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/auditListAll.json').toString()

  })

  router.get('/api/riskManagement/sensitiveListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/sensitiveListAll.json').toString()

  })

  router.get('/api/riskManagement/sensitiveLogListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/sensitiveLogListAll.json').toString()

  })

  router.get('/api/riskManagement/actionListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/sensitive/actionListAll.json').toString()

  })





  /**
   * log
   */
  router.get('/api/log/logListAll', async ctx => {

    if (ctx.request.query) {
      console.log(ctx.request.query)
    }


    ctx.body = fs.readFileSync(__dirname + '/virtual/log/logListAll.json').toString()

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

  router.get('/api/externalUser/runWayListMy', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/runWayListMy.json').toString()

  })

  router.get('/api/externalUser/runWayListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/runWayListAll.json').toString()

  })

  router.get('/api/externalUser/groupChatListAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/groupChatListAll.json').toString()

  })

  router.get('/api/externalUser/groupChatOwnerListSelect', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/groupChatOwnerListSelect.json').toString()

  })

  router.get('/api/externalUser/quitUserRelationExUserList', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/externalUser/quitUserRelationExUserList.json').toString()

  })

  /**
   * potentialCustomer
   */

  router.get('/api/potentialCustomer/listMy', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/potentialCustomer/listMy.json').toString()

  })

  router.get('/api/potentialCustomer/listAll', async ctx => {


    ctx.body = fs.readFileSync(__dirname + '/virtual/potentialCustomer/listAll.json').toString()

  })

  /**
   * batchSendTask
   */








  app.use(cors()).use(router.routes()).use(router.allowedMethods())

  app.listen(3000, _ => {
    console.log('Virtual server is running at port 3000')
  })

}
