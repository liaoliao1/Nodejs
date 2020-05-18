let express = require('express')
let router = new express.Router()
let {resolve} = require('path')

    //UI路由
    router.get('/', (request, response) => {
        response.send('这是首页')
    })
    router.get('/register', (request, response) => {
        // let filePath = resolve(__dirname,'../public/register.html')
        // response.sendFile(filePath)
        response.render('register',{errMsg:{}})
    })
    router.get('/login', (request, response) => {
        // let filePath = resolve(__dirname,'../public/login.html')
        // response.sendFile(filePath)
        let {email} = request.query
        response.render('login',{errMsg:{email}})
    })

    router.get('/usercenter', (request, response) => {
        let {nick_name} = request.query
        response.render('usercenter',{nickName:nick_name})
    })

    module.exports=router

