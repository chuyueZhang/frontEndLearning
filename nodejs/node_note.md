# 初识node
* 作者为ryan dahl
* nodejs不是一门语言
* 不是一个框架不是一个库
* 是javasscript运行时环境，运行在chromeV8引擎上
* 事件驱动
* 非阻塞IO模型
* 轻量级及高效
## 浏览器中的JS
* ECMAScript
 * DOM
 * BOM
## nodejs中的js
* ECMAScript
* 服务器级别的API
  * 文件读写
  * 网络服务构建
  * 网络通信
  * http服务器等处理...
## npm
* nodejs的包管理器，是世界上最大的开源库生态系统
## 用途
* web服务器后台
* 命令行工具
  * npm(node)
  * git(c语言)
  * ...
* 前端接触最多的是命令行工具
  * webpack
  * gulp
  * npm等
## 一些资源
* 深入浅出nodejs
  * 偏理论，没有实战性内容
  * 理解底层原理
* nodejs权威指南
  * API讲解
* [JavaScript标准参考教程](http://javascript.ruanyifeng.com/)
* [node入门](http://www.nodebegainer.org/index-zh-cn.html)
* [cnode社区](http://cnodejs.org)
* [cnode入门](http://cnodejs.org/getstart)
## 核心模块
* nodejs为JS创建了许多服务器级别的API，这些API绝大部分都被封装到具名的核心模块中，例如：
  * fs 操作文件
  * os 获取操作系统信息
  * path 编辑路径
  * http 服务器相关
  * ...
## 模块系统
* require是个方法用来加载模块与获取被加载模块导出的对象
* 模块有三种类型：
  1. 具名的核心模块
  2. 用户自定义的文件模块。相对路径以./开头，且可以省略后缀名
  3. 第三方模块，会先读取当前文件父目录下的node_modules里的模块，没有继续向父目录中的查找，一直到根目录为止
* 在node里没有全局作用域，只有模块作用域
  * 外部无法访问内部
  * 内部无法访问外部
  * 默认是封闭的
* 每个文件模块中都提供一个exports对象，默认是空对象
* require方法执行的返回值就是被引入模块中exports对象的值(可以使用闭包功能)
* 如果一个模块要直接导出某个成员而非挂载的方式，这时候必须使用对module.exports赋值的方式
### 模块化
* 文件作用域
* 通信规则
  * 加载require
  * 导出require
### commonJS模块化规范
#### nodejs
* commonJS
#### 浏览器中
* requirejs AMD
* seajs CMD
* ECMAScript 6 modules
#### 加载require
* 使用require来加载模块
* 获取模块导出的数据
* 如果是非路径形式则只加载核心模块与第三方模块
* 如果是以下路径形式， 则只加载自定义模块
  * `/xxx`
  * `./xxx`
  * `c:/ddd`
  * `../xxx`
  * 首位的`/`表示当前文件所属磁盘的根目录
  * `aaa/xxx`这种写法会报错，但是在文件路径中`./`前缀可以省略
* 如果是加载第三方模块，则加载顺序为：
  1. 先查找当前父目录下node_modules文件
  2. 寻找node_modules/xxx文件夹，xxx为加载的模块名称
  3. 寻找node_modules/xxx/package.json
  4. 寻找node_modules/xxx/package.json中main属性的文件名
  5. 按照main文件名加载指定入口文件
  6. 如果package.json或者main属性值没有指定，则尝试加载package.json所在目录下的index.js
  7. 没有找到则向上一级目录加载，然后循环1-7
  8. 到根目录还没有查找到，则报错： can not find module xxx
   * node_modules一般放在项目根目录下，不可能一个项目有多个node_modules文件夹
   * npm安装规则似乎也相似，只是package.json在node_modules文件夹父目录中而不是项目中的
```javascript
let foo = require('foo')
```
#### 导出require
* 使用exports
```javascript
//导出多个数据
exports.a = 'hello'
exports.b = 1
exports.c = {}
```
* 使用module.exports
```javascript
//导出单个数据
module.exports = 'hello'
//也可用来导出多个数据
module.exports = {
    a: 'hello',
    b: 1
}
```
#### 模块原理
* exports在node中是module.exports的引用
```javascript
/*  node模块化的底层实现
var module = {
    exports: {}
}
var exports = module.exports
*/
//开始执行文件中的代码
...code
/*
return modeule.exports
*/
```
* 由于是引用且返回值是modeule.exports，因此当给exports或者module.exports重新赋值时，引用的地址就会丢失，就无法导出exports中的值了
#### 优先从缓存中加载
* 当加载一个模块时node底层会判断这个模块是否被加载过，如果加载过就不再执行而是直接返回这个模块导出的结果
## NPM
* node pacakage management
### NPM网站
[npm官网](www.npmjs.com)
### 常用命令
  * npm init
    * npm init -y 跳过向导快速生成
  * npm install [包名] [--save]
  * npm uninstall [包名] [--save]
  * npm help 使用帮助
### 解决国外npm源速度慢的问题
* 使用cnpm代替npm，源为淘宝源
```powershell
npm install --global cnpm
```
* 修改npm的下载源
``` powershell
npm config set registry http://registry.taobao.org
```
## package.json
* 一般每个项目的根目录都要有一个package.json文件，来描述这个项目的各种基础或依赖信息
* 可以使用npm init来初始化描述文件
* 安装包时可以加上--save选项来将下载的包当做依赖添加进package.json中
* 使用npm install时，可以将package.json中的依赖项自动下载下来
* 在npm v5.x.x的版本之后，安装新模块会自动将依赖添加进package.json中
* 并且会在下载新模块时自动添加或者更新package-lock.json文件
  * 此文件会将新模块的所有嵌套依赖都包含进去，会加快从新下载模块的速度
  * 使用npm install从新下载新模块的时候不会像老版本默认会更新依赖项中的版本而是按照此文件中的依赖版本进行下载
## fs核心模块
* fs.readFile(dir, function(error, data){})
  * 成功时，data是数据，error是null
  * 失败时，data是undefined，error是错误对象
* fs.writeFile(dir, str, (error)=>{})
  * 成功时，error是null
  * 失败时返回错误对象
## http核心模块
* 创建服务器的简单流程
```javascript
let http = require('http')
let server = http.createServer()    //创建服务器实例
//注册事件时回调函数有两个参数
//请求对象request
//相应对象response
server.on('request', (req,res)=>{          //给服务器注册请求事件
    console.log('收到客户端请求'+req.url)   //url返回路径
    //response对象有个方法write可以向客户端发送响应流
    //write可以调用多次，但最后一定要用end结束，否则客户端一直等待
    res.write('hello')
    res.write(' world')
    res.end('aaa')  //可以只写这条语句表示将str写入流之后立即end
})
server.listen(3000, ()=>{       //监听3000端口号
    console.log('服务器开启成功')
})
```
## IP地址与端口号
* IP地址定位到计算机
* 端口号定位到特定的应用程序
## 响应内容类型 content-type
指定浏览器解析服务器返回文件的方式
* text/plain    普通文本
* text/html     html文本
* image/jpeg    图片
* charset       设置浏览器的编码解析格式，只对文本数据有效，也可以通过给html文件的meta设置charset来表示编码格式
* ...
* 可以通过[oschina网站](http://tool.oschina.net/commons)查看
## apache基本功能练习
### 字符串替换
1. 读取相应html文件
2. 将要修改的数据使用字符串编辑API进行修改
3. 将修改好的文件返回给浏览器，必要时指定http头content-type
### 模板引擎(以art-template为例)
* 模板引擎不关心除了特定格式的字符串以外的任何东西
* 模板引擎一开始是被用于服务端然后才在浏览器上流行开来
* 在浏览器中使用模板引擎的流程
  1. 引入template-web.js文件
  2. 新建script标签指定type为text/template
  3. 新建script使用template的API来操作模板，由于浏览器不支持文件操作因此需要文件名的地方底层默认使用document.getElementById代替
  4. 获取转换好的文本通过innerText或者innerHTML插入到指定位置中
* 在nodejs中使用模板引擎流程
  1. 引入模板模块
  2. 使用template将模板转化成文本
  3. 将文本发送给浏览器
#### 浏览器端渲染与服务端渲染
* 浏览器端渲染
  * 发起请求获取页面
  * 使用ajax请求数据
  * 将数据渲染给模板然后绘制页面
  * 不利于SEO搜索引擎优化
  * 异步获取数据，速度更快，用户体验更好
* 服务端渲染
  * 发起请求获取页面
  * 服务端响应后渲染指定页面并将页面返回
  * 浏览器端直接绘制页面
  * 利于SEO搜索引擎优化
  * 点击页面后再渲染速度比较慢
## 留言本练习
### 处理网站中的静态资源
* 为了让目录结构更加清晰，因此约定静态资源统一放入pubilc文件中
* 哪些资源能被访问哪些资源不能被访问都能被服务端代码所控制
* 当服务端向客户端返回html或者css等文件时，浏览器会自动从上到下依次执行，当遇到外链如：
  * img
  * iframe
  * link
  * script
  * audio
  * video等时，会自动向服务端发起请求，此时这些外链的src，href就是url地址而非文件地址
* 服务端可以通过检查字符串的方式将pubic地址开放给浏览器自由访问
* 对于get表单请求由于url是动态的，因此不可能通过直接判断url判断执行代码
* 有url模块用来解析url路径
  * url.parse(url, boolean) 第二个参数决定是否将查询字符串解析成对象
* 一次请求对应一次响应，响应结束请求也就结束了
### 资源重定向
* 当响应码为301(永久重定向)302(临时重定向)时，浏览器会自动检查响应头中的location的值并自动向此url发送新的请求，但是对于异步请求(ajax)重定向无效
* 永久重定向
  * 每次重定向时浏览器不会对重定向的url发送新的请求，而是从磁盘缓存中加载
* 临时重定向
  * 每次重定向时浏览器会对重定向的url发送新的请求
* 使用res.statusCode来设置响应码
## REPL
* 辅助API测试
* 在此控制台中核心模块被自动加载，不需要再引入即可使用
## 修改完代码自动重启
* 可以使用第三方命令行工具`nodemon`来监听文件修改，每次保存时会自动重启服务
```powershell
npm install --global nodemon
```
## express
* 作者为TJ
* 此框架作用是封装http模块，使其使用更加方便
### 安装
```powershell
npm install express --save
```
### 常用api
#### 基本路由
* express().get(rooter, func)
* express().use(rooter, func|express.static(path))  使用rooter别名访问path文件
#### 静态资源
```javascript
let express = require('express')
let app = express()
app.use(express.static('./public/'))//按照路由路径直接访问静态资源路径
app.use('/public/', express.static('./public/'))//按照/public/后的路由路径访问静态资源路径
```
* express().listen(port, func)
### 在express中配置art-template
安装
```powershell
npm install --save art-template express-art-template
```
配置
```javascript
let express = require('express')
let app = express()
app.engine('html', require('art-template-express'))//设置以html为扩展名的文件将启动模板引擎来渲染
app.get('/', (req, res)=>{
  res.render('index.html', {title: 'my template'})  //res默认没有render方法，当设置模板引擎后才会启用，第一个参数不能使用文件路径，express默认会从当前项目中的views文件夹中查找待渲染的文件
})
app.set('views', 'public')  //修改模板默认查找路径，第一个参数不能写错
```
### 在express中获取post请求体
安装
```powershell
npm install --save body-parse
```
配置
```javascript
let bodyParse = require('body-parse')
app.use(bodyParse.urlencoded({extend: false}))
app.use(bodyParse.json())
app.post('/poster', (req, res)=>{
  console.log(req.body) //返回值为请求体的对象
})
```
### 在express中配置没有设置的路由的响应
```javasceipt
app.use((req, res)=>{

})
```
## CRUD-express练习
### 回调函数
* 当要获取一个函数内部的异步操作时，必须使用回调函数的方式
```javascript
function add(x, y, callback){
  setTimeout(()=>{
    callback(x+y)
  })
}
add(1,2,res=>{
  console.log(res)
})
```
* 数组的遍历方法，都是对函数作为参数的应用
  * find
  * findIndex
  * every
  * some
  * map
  * reduce
### 路由设计
|功能|路由|get|post|备注|
|---|---|---|---|---|
|读取学生目录|/student|||读取文件，渲染文件中数据|
|添加学生目录|/new|||跳转到能添加目录的界面|
|发送添加请求|/new||id, name, age, gender, hobbies|发送编写的数据|
|修改学生目录|/update|id||跳转到能修改学生数据的页面|
|发送修改请求|/update||id, name, age, gender, hobbies|发送修改好的数据|
|删除学生目录|/delete|id||删除一条数据|
## MongoDB
* 由wordPress的开发团队进行开发
### 关系型数据库与非关系型数据库
* 表就是关系或者说表与表之间的关系
  * 所有关系型数据库都需要sql来操作
  * 所有关系型数据库在操作前都需要设计表结构
  * 数据库支持约束关系
    * 主键
    * 唯一
    * 必须
    * 等等
  *  非关系型数据库就非常灵活甚至有的数据库就是key-value
  * MongoDB是最像关系型数据库的非关系型数据库
  * MongoDB不需要设计表结构
  * 因此可以任意

|关系型数据库|MongoDB|
|---|---|
|数据库|数据库|
|表|集合(数组)|
|表纪录|文档对象|
### 配置过程
1. 下载
2. 安装
3. 配置环境变量
4. 控制台中输入mongod --version确保安装成功
#### 启动与关闭数据库
* 在控制台输入`mongod`会默认在控制台路径的根目录中的data文件来存放数据库数据, 没有此文件则报错
* 在控制台输入`mongod --dbpath=路径`可以指定db文件安装目录
* 再次输入`mongod`可以开启数据库
* 在控制台按下ctrl+c就能关闭数据库
#### 控制台连接数据库
* 在控制台输入`mongo`会默认连接本地数据库
* 输入`exit`能退出连接
#### 控制台操作数据库
* `show dbs` 显示当前所有的数据库，新数据库只有插入数据后才会显示
* `use testbd`  切换到指定数据库中
* `db`  查看当前所在数据库
* `db.students.insertOne({"name": "a", "age": "11"})` 在当前数据库中建立集合students并插入一条数据
* `show collections` 查看当前数据库中的所有集合
* `db.students.find()`  查看students集合中所有的文档对象
### 在nodejs中使用mongodb
* [使用mongodb官方包](http://mongodb.github.io/node-mongodb-native)
* [使用mongoose第三方包](http://mongoosejs.com)
### 使用mongoose
#### 起步
* 安装
`npm i mongoose`
* 使用
```javascript
let mongoose = require('mongoose')
//第一步：连接数据库
mongoose.connect('mongodb://localhost/test')
//第二步：创建文档结构
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
//第三步：将文档结构应用给文档模型
//第一个参数： 约定是使用第一个字母为大写的单数形式，mongoose会创建一个将此参数调整为小写的复数形式的集合
//第二个参数：需要应用的文档结构
let Users = mongoose.model('User', userSchema)
//第四步：通过模型新增文档对象
Users.create({
  name: '张三妹',
  password: '1223445',
  email: 'aaa@qq.com'
}, (err)=>{
  if(err){
    console.log('保存失败！')
  }else{
    console.log('保存成功！')
  }
})
//或者实例化模型生成文档实例，最后save来保存修改
let user = new Users({
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
```
* 查询
```javascript
//查询满足条件的所有文档对象
//model.find(匹配条件, 投影, 筛选条件, 回调函数)
//投影决定查询出来的字段，可以通过'字段1 -字段2'的形式决定显示与不显示的字段
//筛选条件可用skip，limit，sort等

//model.count(conditions, callback) 用来返回查询到的数据数
users.find({name: '张三妹'}, (err, ret)=>{
    if(err){
      console.log('查询失败！')
    }else{
      console.log('查询成功！', ret)
    }
  })
//查询满足条件的第一条文档对象
users.findOne({name: '张三妹'}, (err, ret)=>{
    if(err){
      console.log('查询失败！')
    }else{
      console.log('查询成功！', ret)
    }
  })
```
* 修改
```javascript
//model.update(conditions, obj, [options], [callback])
//options: multi:true
users.findByIdAndUpdate({'_id': '5cf4cbbce4837e1c10075aa7'}, {
    password: '1223'
  }, (err, ret)=>{
    if(err){
      console.log('修改失败！', err)
    }else{
      console.log('修改成功！', ret)  //ret值为查询到的文档对象修改前的数据
    }
  })
//通过递归修改
users.findById({'_id': '5cf4cbbce4837e1c10075aa7'}, (err, ret)=>{
    if(err){
      console.log('修改失败！', err)
    }else{
      ret.update({  //在查询到的文档基础上调用方法
        $set: {
          password: '1223'
        }
      },err=>{
        if(err) return
        console.log('修改成功！')
      })
      
    }
  })
```
* 删除
```javascript
//model.remove
//model.deleteOne
//model.deleteMany
users.findByIdAndDelete({'_id': '5cf4cbbce4837e1c10075aa7'}, (err, ret)=>{
    if(err){
      console.log('删除失败！', err)
    }else{
      console.log('删除成功！', ret)  //ret的值为删除前查询到的文档对象的数据
    }
  })
```
* mongoose模块化
将连接流程封装到一个文件中，将模型对象直接赋值给module.exports
#### 将CRUD改造成使用mongoDB数据库
修改版为文件夹CRUD-express中的router-mongodb.js
### 使用nodejs连接mysql数据库
* [参考mysql官方文档](https://www.npmjs.com/package/mysql#introduction)
```javascript
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
```
## Promise
* [参考文档](http://es6.ruanyifeng.com)
### 回调地狱
* 顺序编写异步函数执行顺序不确定
```javascript
fs.readFile('a.txt', (err, data)=>{
  if(err){
    //JS语法，抛出异常,两个作用：
    //1. 阻止程序继续执行
    //2. 将错误消息打印到控制台中
    throw err 
  }else{
    console.log('a')
  }
})
fs.readFile('b.txt', (err, data)=>{
  if(err){
    //JS语法，抛出异常,两个作用：
    //1. 阻止程序继续执行
    //2. 将错误消息打印到控制台中
    throw err 
  }else{
    console.log('b')
  }
})
fs.readFile('c.txt', (err, data)=>{
  if(err){
    //JS语法，抛出异常,两个作用：
    //1. 阻止程序继续执行
    //2. 将错误消息打印到控制台中
    throw err 
  }else{
    console.log('c')
  }
})
```
* 当需要异步操作按照顺序执行时只能使用回调函数嵌套的方式
```javascript
$.get('/a', (req, res)=>{
  setTimeout(()=>{
    $.post('/b', (req, res)=>{
      setTimeout(()=>{
          ...
      })
    })
  })
})
```
* 这种编码方式嵌套层数过多，且会难以维护
### 使用promise重写文件读取操作
```javascript
function pReadFile(filepath){
  return new Promise((resolve, reject)=>{
    fs.readFile(filepath, (err, data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}
pReadFile('a.txt')
.then(data=>{
  console.log(data)
//如果返回的是一个promise对象，则下一个then方法中的形参就是这个promise对象resolve
//如果不是，则下一个then方法中的形参就是这个返回的值
  return pReadFile('b.txt') 
}).then(data=>{
  console.log(data)
  return pReadFile('c.txt') 
}).then(data=>{
  console.log(data, 'end')
})
```
### 使用promise封装ajax
* 新版jQuery的ajax相关函数都支持promise的形式
```javascript
function pAjax(router， callback){
  return new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest()
    xhr.onload = function(data){
      callback&&callback(null, data)
      resolve(JSON.parse(data))
    }
    xhr.onerror = function(err){
      callback&&callback(err)
      reject(err)
    }
    xhr.open('get', router)
    xhr.send()
  })
}
pAjax('/a')
.then(data=>{
  console.log(data)
  return pAjax('/b')
}).then(data=>{
  console.log(data)
  return pAjax('/c')
}).catch(err=>{
  console.log(err)
})
```
## 多人社区案例
* blog文件夹
### path核心模块
* path.baseName 获取带后缀名的文件名
* path.dirName  获取目录路径
* path.extName  获取文件后缀名
* path.parse    以上方法的结合
* path.isAbsolute 判断是不是绝对路径
* path.join   //将多个路径转换成一个完整路径，会自动修复直接将路径相加时造成的错误
### __dirname与__filename
* __dirname 表示当前文件模块所处的绝对路径
* __filename 表示当前文件模块的绝对路径
* 在node中进行文件操作时，如果路径格式是相对路径，则node会自动按照执行node命令的命令行路径进行换算
* 为了避免没有按照预期路径读写文件，都可以使用`path.join(__dirname, './')`的形式来表示需要读写的文件路径
* 模块文件路径标识就是按照文件的相对路径进行加载，因此无需按照上面的规则加载
### 模板页
* [模板继承](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF)
* [子模板](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF)
### 目录结构
```
.
|---app.js
|---controller
|---models
|---node_modules      第三方模块
|---package.json      包描述文件
|---package-lock.json 第三方包版本锁定文件
|---public            静态资源文件
|---README.md         项目描述文件
|---routes            
|---views             存储视图目录
```
### session
* 将用户敏感数据保存在服务端中并给用户生成一个经过加密处理过的cookie字符串
* 每次访问时比对用户的cookie字符串来验证用户身份从而执行一系列操作
#### 在nodejs中配置express-session
1. 安装
```
npm install express-session
```
2. 引入
```javascript
let session = require('express-session')
```
3. 配置
```javascript
app.use(session({
  secret: 'aaaa',     //决定用户数据与什么字符串共同生成加密cookie，提高安全等级
  resave: false,      //决定是否重新更新当前session的生命周期当session过期时无论session数据有没有被修改过
  saveUninitialized: false    //决定是否要初始化session. 设置为false时，如果服务端没有保存过session数据则不会向客户端发送session的cookie
}))
```
4. 使用
```javascript
req.session.user = user //保存session数据
req.session.user  //获取session数据
```
## 中间件的概念
* 从请求到响应的过程中的一系列封装方法
* 每个封装方法就是中间件
* 由于这些封装方法在响应之前，因此顺序会有严格要求
* 甚至有些中间件会依赖其他中间件
* 同一次请求中的不同中间件中的req参数是同一个变量
### express中的中间件
* 当进入一个中间件时如果不调用next方法则会停留在这个中间件中
* 执行next方法会调用下一个匹配的中间件
* 在express中，对中间件有几种分类
#### 应用程序级别中间件
1. 不关心请求方法与请求路径的中间件，即任何请求都会进入这个中间件
```javascript
app.use((req, res, next)=>{
  next()    //此方法会调用下一个匹配到的中间件，如果没有则默认在页面显示not get (路径)
})
```
#### 路由级别中间件
1. 关心请求路径的中间件
```javascript
app.use('/', (req, res, next)=>{})
```
2. 严格匹配请求方法与请求路径的中间件
```javascript
app.get('/', (req, res, next)=>{})
app.post('/', (req, res, next)=>{})
```
#### 错误处理中间件
```javascript
app.use('/', (req, res, next)=>{
  let err = true
  if(err){
    next(new Error()) //当给next传入参数时，直接跳转到错误处理中间件
  }
})
app.use('/', (err, req, res, next)=>{ //必须为四个参数否则不是错误处理中间件
  console.log(err)  //err的值是上个next中传入的参数值
  res.send(404)
})
```