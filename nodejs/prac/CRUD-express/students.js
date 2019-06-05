let fs = require('fs')

exports.find = function(callback){
    fs.readFile('./data.json', 'utf-8', (err, data)=>{
        if(err){
            callback(err)
        }else{
            callback(null, JSON.parse(data))
        }
    })
}
exports.new = function(obj, callback){
    fs.readFile('./data.json', 'utf-8', (err, data)=>{
        if(err){
            callback(err)
        }else{
            let parsedData = JSON.parse(data)
            let students = parsedData.students
            let stu = {}
            obj.id = Number.parseInt(students[students.length-1].id)+1
            obj.gender = Number.parseInt(obj.gender)
            obj.age = Number.parseInt(obj.age)
            for(let key in obj){
                stu[key] = obj[key]
            }
            students.push(stu)
            fs.writeFile('./data.json', JSON.stringify(parsedData), err=>{
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
            })
        }
    })
}
exports.updateById = function(id, callback){
    fs.readFile('./data.json', 'utf-8', (err, data)=>{
        if(err){
            callback(err)
        }else{
            let parsedData = JSON.parse(data)
            id = Number.parseInt(id)
            let student = parsedData.students.find((item, index)=>{
                return item.id === id
            })
            callback(null, student)
        }
    })
}
exports.update = function(obj, callback){
    fs.readFile('./data.json', 'utf-8', (err, data)=>{
        if(err){
            callback(err)
        }else{
            let parsedData = JSON.parse(data)
            let students = parsedData.students
            obj.id = Number.parseInt(obj.id)
            obj.gender = Number.parseInt(obj.gender)
            obj.age = Number.parseInt(obj.age)
            console.log(obj)
            let index = students.findIndex((item, index)=>{
                return item.id === obj.id
            })
            
            for(let key in obj){
                students[index][key] = obj[key]
            }
            students[index]
            fs.writeFile('./data.json', JSON.stringify(parsedData), err=>{
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
            })
        }
    })
}
exports.delete = function(id, callback){
    fs.readFile('./data.json', 'utf-8', (err, data)=>{
        if(err){
            callback(err)
        }else{
            id = Number.parseInt(id)
            let parsedData = JSON.parse(data)
            let students = parsedData.students
            let index = students.findIndex((item, index)=>{
                return item.id === id
            })
            students.splice(index, 1)
            console.log(students)
            fs.writeFile('./data.json', JSON.stringify(parsedData), err=>{
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
            })
        }
    })
}