# JS模块化
## 模块化历史
### 原始写法
* 直接将需要声明的变量写在全局中
```javascript
function foo1(){}
function foo2(){}
foo1()
foo2()
```
* 污染全局
### namespace方式
* 将需要声明的变量封装到一个函数中
```javascript
let module = {
    foo1(){},
    foo2(){}
}
module.foo1()
module.foo2()
```
* 本质是对象，可以随时获取内部数据，不安全
### IIFE方式
* 通过闭包的方式，只暴露想要暴露的数据或方法
```javascript
let Module = (function module(){
    var __private = 'save now'
    function foo(){}
    return {foo: foo}
})()
Module.foo()
Module.__private    //undefined
```
* 函数是唯一的local scope
### 引入依赖
* 通过给闭包函数引入参数的形式来传递依赖
```javascript
let Module = (function module($){
    var __private = 'save now'
    $('#test').hide()
    function foo(){}
    return {foo: foo}
})($)
```
* 这就是模块模式
* 现代模块化的基石
## 为什么要模块化
1. 现代网页更像一个web app
2. 代码复杂度逐渐上升
3. 需要高解耦性的js文件
4. 需要部署一种最大优化http数量的网站
## 模块化的好处
1. 避免命名冲突
2. 更好的分离，按需加载
3. 更高复用性
4. 高可维护性
## 通过页面引入script的方式
1. 提高了http数量，降低网站性能
2. 引入顺序改变会导致报错   
3. 依赖关系模糊
4. 难以维护
## 模块化规范
### commonjs
* 每个文件都可以当做一个模块
* 服务器端模块加载是同步的
* 浏览器端需要提前编译打包
#### 基于服务器端
* 文件目录：
```
project
  |---modules
  |---node_modules
  |---app.js
  |---0package.json
```
* 基本语法
  1. module.exports
  2. exports
  3. require
#### 基于浏览器端
* 文件目录：
```
project
  |---js
      |---dist         打包后的文件目录
      |---src          源码所在目录
          |---modules
          |---app.js
  |---node_modules
  |---index.html
  |---package.json
```
* 使用browerify打包
  * npm install -g browserify
  * npm install --save-dev browserify
  * browerify src.js -o destination.js
### AMD
* 异步模块定义
* 专门用于浏览器端，模块的加载是异步的
* **没有文件作用域，在define与require函数外部共用全局作用域**
#### 基本语法
* 定义没有依赖的模块
```javascript
define(function(){})
```
* 定义有依赖的模块
```javascript
define([module1, module2],function(module1, module2){    //显式声明，依赖注入
    return {}       //将想要暴露的模块对象直接返回
})  
```
* 引入使用模块
```javascript
require([module1, module2],function(module1, module2){})
```
#### 使用
1. 引入[requirejs](http://requirejs.org)
```html
<script data-main="./js/main.js" src="./js/libs/require.js"></script>
```
2. 项目目录：
```
.js
  |---libs
      |---require.js
      |---angular.js
  |---modules
      |---module1.js
      |---module2.js
  |---main.js
|---index.html
```
3. 使用requirejs
```javascript
(function(){
    requirejs.config({
        baseUrl: 'js/',     //设置根目录
        paths:{
            module1: 'modules/module1', //后缀js会自动添加，所以不能手动加.js后缀
            module2: 'modules/module2',
            angular: 'libs/angular'
        },
        shim:{
            angular:{
                exports: 'angular'  //对于原生不支持AMD的将第三方对象暴露给window对象的第三方模块需要手动配置暴露的对象名
            }
        }
    })
    requirejs(['module1', 'module2', 'angular'], (m1, m2, angular)=>{})
})()
```
### ES6模块化规范
* 依赖模块需要编译打包处理
#### 文档结构
```
project
  |---js
      |---src
      |---build
      |---dist
  |---index.html
  |---.babelrc
```
#### 编译过程
1. 安装babel-cli babel-reset-es2015 browerify
```
npm install -g babel-cli browerify
npm install --save-dev babel-preset-es2015
```
2. 在项目根目录自定义.babelrc文件
```json
{
    "presets": ["es2015"]
}
```
3. 编写es6模块化语法
##### 常规暴露
* 在src文件夹新建module1.js
* `export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系，因此单独暴露时不能只传递变量名
```javascript
export function foo(){      //单独暴露
    console.log('我是module1')
}
/*
*export {foo}    //统一暴露
*
*/
```
* 在src文件夹新建main.js
```javascript
/*
*import foo from './module1.js'  //单独暴露时
*import {foo} from './module1.js'   //统一暴露时
*
*/
foo()   //'我是module1'
```
##### 默认暴露
* 在src文件夹新建module1.js
```javascript
function foo(){
    console.log('我是module1')
}
/*
*export default foo         //引入时可以是任意声明变量来引入暴露出去的数据类型
*/
```
* 在src文件夹新建main.js
```javascript
/*
*import a from './module1.js'
*
*/
a()   //'我是module1'
```
4. 在项目根目录使用babel将ES6语法转换成ES5语法
```
babel ./src -d ./build
```
5. 在项目根目录使用browerify将ES5语法中的commonjs转换成普通ES5语法
```
browerify ./build/main.js -o ./dist/bundle.js
```
6. 在index.html中引入最终编译好的js文件
```html
<script src="./js/dist/bundle.js"></script>
```