let express = require('express')
let path = require('path')
let app = express()
app.engine('html', require('express-art-template'))
app.set('./views/', path.join(__dirname, './views/'))
app.get('/', (req, res)=>{
    console.log('start')
    res.render('index.html')
})
app.listen('5000', err=>{
    if(err){
        console.log('500, server err')
    }else{
        console.log('running at 5000...')
    }
})