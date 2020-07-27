let express = require('express')
let app = express()
app.disable('x-powered-by')
app.use(express.urlencoded({extended:true}))

app.get('/test_get',(request,response)=>{
    console.log(request.query)
    let {callback} = request.query
    console.log(callback);
    let arr = [{name:'jack',age:12},{name:'tom',age:22}]
    response.send(`${callback}(${JSON.stringify(arr)})`)
})

app.listen(3000,(err)=>{
    if(!err){console.log('服务器启动成功');}
    else {console.log(err);}
})
