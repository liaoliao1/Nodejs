let express = require('express')
let app = express()
app.use(express.urlencoded({extended:true}))

app.get('/test_get',(request,response)=>{
    console.log(request.query)
    response.set('Access-Control-Allow-Origin','*')
    let {callback} = request.query
    let arr = [{name:'jack',age:12},{name:'tom',age:22}]
    response.send(`${callback}(${JSON.stringify(arr)})`)
})

app.post('/test_post',(request,response)=>{
    console.log(request.body);
    response.set('Access-Control-Allow-Origin', '*');
    console.log('test_post路由被调用了')
    response.send('我是服务器返回的POST请求的信息')
  })

app.listen(3000,(err)=>{
    if(!err){console.log('服务器启动成功');}
    else {console.log(err);}
})
