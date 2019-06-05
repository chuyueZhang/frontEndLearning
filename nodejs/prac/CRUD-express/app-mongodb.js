let express = require('express')
let bodyParser = require('body-parser')
let router = require('./router-mongodb')

let app = express()

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/static/', express.static('./static/'))
app.use('/public/', express.static('./public/'))
app.use(router)


app.listen(4000, err=>{
    if(err){
        console.log('500, server error')
    }else{
        console.log('running at 4000...')
    }
})