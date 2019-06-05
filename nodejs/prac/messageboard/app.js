let http = require('http')
let fs = require('fs')
let url = require('url')
let template = require('art-template')
let bodyParser = require('body-parser')
let obj = {
    contents: [{name: 'aaaa1',
    content: 'zzzzzzzzz',
    date:'2016-02-13'},
    {name: 'aaaa2',
    content: 'zzzzzzzzz',
    date:'2016-02-13'},
    {name: 'aaaa3',
    content: 'zzzzzzzzz',
    date:'2016-02-13'}]
}
http.createServer((req, res)=>{
    let url_obj = url.parse(req.url, true)
    let arr = []
    req.on('data', chunk=>{
        arr.push(chunk)
    }).on('end', ()=>{
        arr = Buffer.concat(arr).toString()
        console.log(`--${arr}--`)
    })
    async function entire(){
        if(url_obj.pathname === '/'){
            await readFileAndTransform('./views/index.html')

        }
        if(url_obj.pathname.indexOf('/public/') === 0){

            await readFile('.' + url_obj.pathname)

        }
        if(url_obj.pathname==='/poster'){

            await readFile('./views/poster.html')

        }
        if(url_obj.pathname==="/message"){
            let date = new Date()
            obj.contents.unshift({
                name: url_obj.query.name,
                content: url_obj.query.message,
                date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            })
            res.statusCode = 302
            res.setHeader('location', '/')
            res.end()
        }
        await readFile('./views/404.html')
    }
    entire()
    .catch(err=>{
        console.log(err)
    })

    function readFileAndTransform(path){
        let promise = new Promise((resolve, reject)=>{
            fs.readFile(path, (err, data)=>{
                if(err){
                    res.end('not find, 404')
                    reject(`not find ${path}, 404`)
                }else{
                    res.setHeader('content-type', 'text/html; charset="utf-8"')
                    res.end(template.render(data.toString(), obj))
                    resolve(true)
                }
            })
        })
        return promise
    }
    function readFile(path){
        return new Promise((resolve, reject)=>{
            fs.readFile(path, (err, data)=>{
                if(err){
                    res.end('not find, 404')
                    reject(`not find ${path}, 404`)
                }else{
                    res.end(data.toString())
                    resolve(true)
                }
            })
        })
    }
}).listen(5000, err=>{
    if(err){
        console.log('500')
    }else{
        console.log('running...')
    }
})