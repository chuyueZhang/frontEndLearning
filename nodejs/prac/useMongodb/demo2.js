let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')
let userSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    email : {
      type: String,
      require: false
    }
  })
let users = mongoose.model('User', userSchema)
users.find({name: '张三妹'}, (err, ret)=>{
    if(err){
      console.log('查询失败！')
    }else{
      console.log('查询成功！', ret)
    }
  })