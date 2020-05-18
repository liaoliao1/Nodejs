let express = require('express')
let router = new express.Router()
let { resolve } = require('path')
let userModel = require('../model/userModel.js')
//逻辑路由(注册)
router.post('/register', async (request, response) => {
    //1.获取用户输入
    const { email, nick_name, password, repassword } = request.body
    //2.检验数据合法性
    const emailReg = /^[a-zA-Z0-9_]{2,16}@[a-zA-Z0-9]{2,16}\.com$/
    const nickNameReg = /[\u4e00-\u9fa5]/
    const passwordReg = /^[a-zA-Z0-9_@#]{2,16}$/
    let errMsg = {}
    if (!emailReg.test(email)) {
        // response.send('邮箱不合法')
        errMsg.emailErr = '邮箱不合法'
    }
    if (!nickNameReg.test(nick_name)) {
        // response.send('昵称不合法')
        errMsg.nickNameErr = '昵称不合法'
    }
    if (!passwordReg.test(password)) {
        // response.send('密码不合法')
        errMsg.passwordErr = '密码不合法'
    }
    if (password !== repassword) {
        // response.send('两次密码不一致')
        errMsg.repasswordErr = '两次密码不一致'
    }
    if(JSON.stringify(errMsg)!=='{}'){
        response.render('register',{errMsg})
        return
    }
    try {
        let findResult = await userModel.findOne({ email: email })
        if (findResult) {
            // response.send(`邮箱注册失败，${email}邮箱已被注册`)
            // return
            errMsg.emailErr = `${email}邮箱已被注册`
            response.render('register',{errMsg})
        }
        await userModel.create({ email: email, nick_name: nick_name, password: password })
        console.log(`邮箱为${email}昵称为${nick_name}的用户注册成功`)
        // response.send('注册成功')
        response.redirect(`/login?email=${email}`)
    } catch (err) {
        console.log(err)
        // response.send('网络不稳定，请重试')
        errMsg.networkErr = '网络不稳定，请重试'
        response.render('register',{errMsg})
    }
})
//逻辑路由(登录)
router.post('/login', async (request, response) => {
    const { email, password } = request.body
    const emailReg = /^[a-zA-Z0-9_]{2,16}@[a-zA-Z0-9]{2,16}\.com$/
    const passwordReg = /^[a-zA-Z0-9_@#]{2,16}$/
    let errMsg = {}
    if (!emailReg.test(email)) {
        // response.send('邮箱输入不合法')
        // return
        errMsg.emailErr = '邮箱输入不合法'
    }
    if (!passwordReg.test(password)) {
        // response.send('密码输入不合法')
        // return
        errMsg.passwordErr = '密码输入不合法'
    }
    if(JSON.stringify(errMsg)!=='{}'){
        response.render('login',{errMsg})
        return
    }
    try {
        let findResult = await userModel.findOne({ email: email, password: password })
        // console.log(findResult);
        if (findResult) {
            response.redirect(`/usercenter?nick_name=${findResult.nick_name}`)
        } else {
            // response.send('登录失败，邮箱或密码错误')
            errMsg.loginErr = '登录失败，邮箱或密码错误'
            response.render('login',{errMsg})
        }
    } catch (err) {
        console.log(err);
        // response.send('网络繁忙，请稍后重试！')
        errMsg.networkErr = '网络繁忙，请稍后重试！'
        response.render('login',{errMsg})
    }
})

module.exports = router
