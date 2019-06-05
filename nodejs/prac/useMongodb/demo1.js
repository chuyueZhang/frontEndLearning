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
let user = new users({
    name: '张三妹',
    password: '1223445',
    email: 'aaa@qq.com'
  })
  user.save((err, ret)=>{
    if(err){
      console.log('保存失败！')
    }else{
      console.log('保存成功！', ret)
    }
  })