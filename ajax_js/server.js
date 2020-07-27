let express = require('express')
let app=express()
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/test_get',(request,response)=>{
    response.set('Access-Control-Allow-Origin','*')
    console.log('GET请求为',request.query);
    response.send('我是服务器响应get的信息')
})

app.post('/test_post',(request,response)=>{
    response.set('Access-Control-Allow-Origin','*')
    console.log('POST请求为',request.body);
    response.send('我是服务器响应post的信息')
})

app.listen(3000,(err)=>{
    if(!err){
        console.log('服务器启动成功');
    }else{
        console.log(err);
    }
})
