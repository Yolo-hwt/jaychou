const express = require('express')
const errorWare = require('./error-ware/deal-error.js')
const cors = require('cors')
const gloabl = require('./gloabl/gloablParam')
//创建应用
const app = express()
const port = gloabl.port
const hostname = gloabl.hostname
app.use(express.static('./public'))
//cors中间件注册
app.use(cors())
//路由导入
const musicRouter = require('./router/music')
const picRouter = require('./router/picture')
//注册路由
app.use(gloabl.routerHeader, musicRouter)
app.use(gloabl.routerHeader, picRouter)
//注册错误中间件
app.use(errorWare)
//监听本地5000端口
app.listen(port, () => {
    console.log(`server is running at http://${hostname}:${port}`);
})