const Koa =require('koa')//koa主模块
const Router =require('koa-router')//koa路由
const cors =require('koa2-cors')//跨域
const fs = require('fs')



module.exports = app=>{
    app = new Koa()

    const router = new Router()

    router.get('/api/getData', async ctx => {

        ctx.body = fs.readFileSync(__dirname+'/virtual/data.json').toString()
    })
    /**
     * department
     */
    router.get('/api/department/list', async ctx => {

        ctx.body = fs.readFileSync(__dirname+ '/virtual/department/departmentList.json').toString()
    })

    /**
     * role
     */
    router.get('/api/role/1', async ctx => {

        ctx.body = fs.readFileSync(__dirname+ '/virtual/role/roleDetail.json').toString()
    })

    router.get('/api/role/list', async ctx => {

        ctx.body = fs.readFileSync(__dirname+ '/virtual/role/roleList.json').toString()
    })

    /**
     * myInfo
     */

    router.get('/api/myInfo/detail', async ctx => {

        ctx.body = fs.readFileSync(__dirname+ '/virtual/myInfo/detail.json').toString()
    })

    /**
     * permission
     */

    router.get('/api/permission/listRole', async ctx => {

        if(ctx.request.query){
            if(ctx.request.query.roleCode==='super'){
                ctx.body = fs.readFileSync(__dirname+ '/virtual/permission/permissionSuper.json').toString()
            }
        }else{
            ctx.body = "123"
        }

       

    })

    /**
     * menu
     */
    router.get('/api/menu/list', async ctx => {


        ctx.body = fs.readFileSync(__dirname+ '/virtual/menu/menuList.json').toString()

    })
     

    



    
    app.use(cors()).use(router.routes()).use(router.allowedMethods())
    
    app.listen(3000, _=>{
        console.log('Virtual server is running at port 3000')
    })
    
}
