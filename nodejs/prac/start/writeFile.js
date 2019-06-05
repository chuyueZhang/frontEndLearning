let fs = require('fs')

fs.writeFile('./writeFile.md', 'aaa', (error, data)=>{
    console.log(error, data)
})