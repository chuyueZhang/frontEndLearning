let express = require('express')
let bodyParser = require('body-parser')
let app = express()
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
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())
app.get('/', (req, res, next)=>{
    res.render('index.html', obj)
    next()
})
app.use('/public/', express.static('./public/'))
app.get('/poster', (req, res, next)=>{
    res.render('poster.html')
    next()
})
app.post('/poster', (req, res, next)=>{
    let date = new Date()
    obj.contents.push({
        name: req.body.name,
        content: req.body.message,
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    })
    res.redirect(302, '/')
    next()
})
app.listen(5000, err=>{
    if(err){
        console.log('500')
    }else{
        console.log('running at port 5000...')
    }
})