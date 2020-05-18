//引入数据库模块
let db = require('./db/db')
//引入模型模块
let user = require('./model/userModel')

; (async () => {
    await db;
    let result = user.create({email:'zqwen@qq.com',nick_name:'张三',password:'456789'},
    (err,data)=>{
        if(!err){console.log('插入数据成功'+data);}
        else{console.log(err);}
    })
})()
