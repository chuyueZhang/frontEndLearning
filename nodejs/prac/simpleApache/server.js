let http = require('http')
let fs = require('fs')
let template = require('art-template')
let server = http.createServer()
server.on('request', (req, res)=>{
    let url = req.url
    let baseUrl = '/www'+url
    if(baseUrl === '/www/'){
        fs.readdir('.' + baseUrl, (error, filenames)=>{
            console.log('请求目录： '+ baseUrl)
            if(error){
                res.setHeader('content-type', 'charset=UTF-8')
                res.end('读取目录失败， 没有目录：' + '.' + baseUrl)
                console.log(error)
            }else{
                fs.readFile('.' + baseUrl + 'template2.html', (error, data)=>{
                    if(error){
                        res.setHeader('content-type', 'charset=UTF-8')
                        res.end('读取文件失败， 没有文件：' + baseUrl)
                        console.log(error)
                    }else{
                        let tpl = template(data.toString(), {
                            filenames: filenames
                        })
                        res.end(tpl)
                    }
                })
            }
        })
    }
})
server.listen(80, error=>{
    if(error){
        console.log('无法启动服务器')
    }else{
        console.log('服务器启动成功')
    }
})