let express = require('express')
let students = require('./students')

let router = express.Router()
router.get('/students', (req, res)=>{
    students.find((err, data)=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.render('students.html', data)
        }
    })
})
router.get('/new', (req, res)=>{
    res.render('new.html')
})
router.post('/new', (req, res)=>{
    students.new({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        hobbies: req.body.hobbies
    }, err=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.redirect(302, '/students')
        }
    })
})
router.get('/update', (req, res)=>{
    students.updateById(req.query.id, (err, data)=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.render('update.html', data)
        }
    })
    
})
router.post('/update', (req, res)=>{
    students.update({
        id: req.body.id,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        hobbies: req.body.hobbies
    }, err=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.redirect(302, '/students')
        }
    })
})
router.get('/delete', (req, res)=>{
    students.delete(req.query.id, err=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.redirect(302, '/students')
        }
    })
})
module.exports = router