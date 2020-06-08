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

    router.get('/api/department/list', async ctx => {

        ctx.body = fs.readFileSync(__dirname+ '/virtual/department/departmentList.json').toString()
    })


    
    app.use(cors()).use(router.routes()).use(router.allowedMethods())
    
    app.listen(3000, _=>{
        console.log('Virtual server is running at port 3000')
    })
    
}
