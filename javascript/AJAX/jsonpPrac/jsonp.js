let http = require('http')
let url = require('url')

http.createServer((req, res)=>{
    let parsedurl = url.parse(req.url, true)
    if(parsedurl.pathname === '/')
    res.setHeader('content-type', 'application/javascript')
    res.end(`${parsedurl.query.callback}(${JSON.stringify(parsedurl.query)})`)
}).listen(4000, err=>{
    if(err){
        res.end('500, server error')
        console.log('500, server error')
    }else{
        console.log('running at 4000...')
    }
})