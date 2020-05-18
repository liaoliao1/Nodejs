let express = require('express')
let router = new express.Router()
let {resolve} = require('path')

    //UI路由
    router.get('/', (request, response) => {
        response.send('这是首页')
    })
    router.get('/register', (request, response) => {
        let filePath = resolve(__dirname,'../public/register.html')
        response.sendFile(filePath)
    })
    router.get('/login', (request, response) => {
        let filePath = resolve(__dirname,'../public/login.html')
        response.sendFile(filePath)
    })

    module.exports=router

