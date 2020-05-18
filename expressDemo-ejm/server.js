let express = require('express')
let app = express()
let db = require('./db/db.js')
let uiRouter = require('./router/uiRouter')
let businessRouter = require('./router/businessRouter')

//设置模板引擎
app.set('view engine','ejs')
//设置模板目录
app.set('views','./views')

db.then(() => {
    //使用内置中间件获取post请求体参数
    app.use(express.urlencoded({ extended: true }))
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