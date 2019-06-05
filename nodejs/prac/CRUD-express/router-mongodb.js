let express = require('express')
let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test1', {useNewUrlParser: true})
let studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String
    }
})
studentSchema.set('toJSON', {virtuals: true})
let students = mongoose.model('Student', studentSchema)
let router = express.Router()
router.get('/students', (req, res)=>{
    students.find((err, data)=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            let studentsData = {students: data}
            res.render('students.html', studentsData)
        }
    })
})
router.get('/new', (req, res)=>{
    res.render('new.html')
})
router.post('/new', (req, res)=>{
    new students(req.body).save(err=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.redirect(302, '/students')
        }
    })
})
router.get('/update', (req, res)=>{
    students.findById(req.query.id, (err, data)=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            console.log(JSON.stringify(data))
            res.render('update.html', data.toObject())
        }
    })
    
})
router.post('/update', (req, res)=>{
    students.findByIdAndUpdate(req.body.id,{
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
    students.findByIdAndDelete(req.query.id, err=>{
        if(err){
            console.log('500, server error')
            res.render('500.html')
        }else{
            res.redirect(302, '/students')
        }
    })
})
module.exports = router