let express = require('express')
let app=express()
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


app.get('/get_code',(request,response)=>{
    console.log('客户端发来了获取验证码的请求',request.query)
    setTimeout(function () {
      let code =Math.floor(Math.random()*1000) 
      response.send(code.toString())
    },2000)
  })

app.listen(3000,(err)=>{
    if(!err){
        console.log('服务器启动成功');
    }else{
        console.log(err);
    }
})
