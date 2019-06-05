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
users.findByIdAndUpdate({'_id': '5cf4cbbce4837e1c10075aa7'}, {
    password: '1223'
  }, (err, ret)=>{
    if(err){
      console.log('修改失败！', err)
    }else{
      console.log('修改成功！', ret)
    }
  })