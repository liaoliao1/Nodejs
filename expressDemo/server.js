let express = require('express')
let app = express()
let db = require('./db/db.js')
let uiRouter = require('./router/uiRouter')
let businessRouter = require('./router/businessRouter')


db.then(() => {
    //使用内置中间件获取post请求体参数
    app.use(express.urlencoded({ extended: true }))
    //暴露静态资源
    app.use(express.static('public'))
    //使用businessRouter中间件
    app.use(businessRouter)
    //使用uiRouter中间件
    app.use(uiRouter)
}).catch((err) => {
    console.log('数据库连接失败', err);
})


app.listen(3000, (err) => {
    if (!err) { console.log('服务器启动成功'); }
    else { console.log(err); }
})