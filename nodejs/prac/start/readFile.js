let fs = require('fs')
fs.readFile('./readFil.js', (error, data)=>{
    console.log(error, data)
})