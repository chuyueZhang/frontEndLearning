# AJAX技术
* ajax是浏览器提供的一系列api，可供javascript调用，实现代码控制请求与相应，实现网络编程
## 快速上手
```javascript
let xhr = new XMLHttpRequest()  //类似于开启用户代理
//初始化，请求了代理对象
console.log(xhr.readyState) //0, UNSENT
xhr.open('get', '/text.php')    //类似于输入地址与方法
//调用了open方法，建立了客户端与服务端的特定端口的连接
console.log(xhr.readyState) //1, OPENED
xhr.send(null)  // 类似于按下确认键, 参数为请求体
//由于ajax请求可能需要花费比较长时间来获取响应数据，但是不能让用户等待，因此设计初衷就是异步，即类似用事件的形式
xhr.onreadystatechange = function(){
    switch(this.readyState){
        case 2: 
            //已经获取到了响应报文的响应头
            console.log(xhr.readyState) //2, HEADERS_RECEIVED
            console.log(xhr.getAllResponseHeaders)
            console.log(xhr.responseText)   //没有数据
            break
        case 3:
            //正在下载响应体中的数据
            console.log(xhr.readyState) //3, LOADING
            console.log(xhr.responseText)   //数据有可能完整也有可能不完整，与响应体大小跟网速有关
            break
        case 4:
            //响应体中的数据下载完成
            console.log(xhr.readyState) //4, LOADED
            console.log(xhr.responseText)   //数据完整
    }
}
xhr.onload = function(){    //HTML5, XHR v2.0发布事件
    console.log(xhr.readyState)     //4
}   
```
* `xhr.responseText`永远只会获取字符串形式的响应体
* `xhr.response`根据content-type的变化而变化
## 遵循http协议
```javascript
let xhr = new XMLHttpRequest()

console.log(xhr.readyState) 
xhr.open('post', '/text.php')    
//响应头中的content-type必须与请求体中的格式相同，否则服务端无法解析
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')  //设置响应头
xhr.send('name1=value1&name2=value2')   //设置urlencoded的请求体

xhr.onreadystatechange = function(){
    if(this.readyState != 4) return
    console.log(this.status)    //状态码
    console.log(this.responseText)
}

```
## 同步与异步
* `xhr.open`的第三个参数是async，默认为true，用来控制xhr是否以异步形式发送请求
* 当以同步形式调用时，javascript会在`xhr.send`执行后直到收到响应为止进行等待
## 响应数据格式
* 影响到客户端的javascript如何对服务端返回的数据进行解析
* 服务端需要设置合理的content-type来决定客户端如何对其进行解析
### XML
* 响应头为application/xml
* 从responseXML中获取，且能通过dom操作来操作xml
### JSON
* 响应头为application/json
## 兼容方案
* 对于IE5/6需要使用兼容方案
`xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('microsoft.XMLHTTP')`
## jQuery中的封装
### 快速入门
```javascript
//底层接口
$.ajax('text/php', {
    type: 'post'，    //method
    dataType: 'json',   //响应体格式, 与data参数无关
    data: obj,      //响应体
    beforeSend: function(xhr){
        //在open之前执行此回调
    },
    success: function(res){
        //res会自动根据服务端响应的content-type自动转换成对象
        //当设置了dataType时，不再由服务端决定而是按照dataType值来转换成对象
    },    //成功接收到响应体后回调，即status为200
    error: function(xhr){
        //当状态码不为200时执行
    },
    complete: function(xhr){
        //与状态码无关
    }

})
//get
$.get('test.json', [data], callback)
//post
$.post('test.json', [data], callback)
$.postJson('test.json', [data], callback)   //设置dataType="json"
```
#### $(selector).load(url, [data, [callback]])
* 载入远程 HTML 文件代码并插入至 DOM 中。
* 默认使用 GET 方式 - 传递附加参数时自动转换为 POST 方式。jQuery 1.2 中，可以指定选择符，来筛选载入的 HTML 文档，DOM 中将仅插入筛选出的 HTML 代码。语法形如 "url #some > selector"。
### ajax全局事件
* 当指定选择器中有ajax调用时则触发此事件
#### ajaxStart(callback)
#### ajaxSend(callback)
#### ajaxStop(callback)
#### ajaxError(callback)
#### ajaxComplete(callback)
#### ajaxSuccess(callback)
## 同源策略
* 两个url必须协议，域名，端口都相等才属于同源，由于安全问题，默认只有同源的地址才能通过ajax来访问
* 不同源地址之间如果需要相互请求，必须服务端与客户端配合
### 跨域请求
#### 在html中有几个标签可以自动发送请求: img, link, script, iframe
1. img
   * 可以发送不同源的请求
   * 无法拿到响应结果
2. link
   * 可以发送不同源的请求
   * 无法拿到响应结果
3. script
   * 可以发送不同源的请求
   * 无法拿到响应结果
   * 但是会将响应数据当做javascript代码进行执行
   * 可以利用这种特性来实现访问不同源的数据
4. iframe
   * 可以发送不同源的请求
   * 无法拿到响应结果
#### 封装JSONP
浏览器代码
```javascript
    function jsonp(src, data, callback){
    let script = document.createElement('script')
    let symbolCode = 'jsonp_' + Date.now() + (Math.random()+'').slice(2)
    let arr = []
    for(let name in data){
        arr.push(`${name}=${data[name]}`)
    }
    let obj = arr.join('&')
    script.src = src + '?'+ obj +'&callback=' + symbolCode 
    document.body.appendChild(script)
    window[symbolCode] = function(res){
      delete window[symbolCode] //删除用作jsonp的函数
      script.parentNode.removeChild(script) //删除用作jsonp的script标签
      callback(res)
    }
}
jsonp('http://localhost:4000',{'name': 'aaaa'}, res=>{
    console.log(res)
})
```
服务端代码
```javascript
let http = require('http')
let url = require('url')
http.createServer((req, res)=>{
    let parsedurl = url.parse(req.url, true)
    if(parsedurl.pathname === '/')
    res.setHeader('content-type', 'application/javascript')
    res.end(`${parsedurl.query.callback}(${JSON.stringify(parsedurl.query)})`)
}).listen(4000, err=>{
    if(err){
        res.end('500, server error')
        console.log('500, server error')
    }else{
        console.log('running at 4000...')
    }
})
```
#### 跨域资源共享CORS(cross origin resouce share)
* IE10及以上或者其他浏览器支持
* 需要开始只需要让服务端增加响应头access-control-allow-origin的值为`*`或者指定来源
* 当跨域请求为复杂请求时，会在正式通信前发出预检请求(preflight), 请求方法为option，服务器只有在这个请求的响应头中增加access-control-allow-origin才会允许跨域，否则浏览器报错