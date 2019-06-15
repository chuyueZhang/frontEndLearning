# vue
* [官方网站](https://cn.vuejs.org)
* 遵循MVVM的模式
* 编码简洁
* 本身只关注UI，可以轻松引入vue插件或其他第三方库
* 借鉴angular的模板与数据绑定
* 借鉴react的组件与虚拟DOM
## vue的一些常用插件
* vue-cli               vue脚手架
* vue-resource(axios)   ajax请求
* vue-router            路由
* vuex                  状态管理
* vue-lazyload          图片懒加载
* vue-scroller          页面滑动相关
* mint-ui               基于vue的UI组件库(移动端)
* element-ui            基于vue的UI组件库(PC端)
## 基本用法
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <input type="text" name="username" v-model="username"><br>
        <p>hello {{username}}</p>
    </div>
    <script src="./js//vue.js"></script>
    <script>
        const vm = new Vue({        //view model部分本质是vue的实例，包含两个核心，DOM监听与数据绑定
            el: '#app',         //view部分，也就是模板页面
            data: {                 //model部分，是个普通js数据对象
                username: 'aaa'
            }
        })
    </script>
</body>
</html>
```
## 模板语法
1. 双大括号
   * 括号中为js语法，可以调用js原生函数
   * 默认是调用innerText，与指令v-text相同
   * 可以使用指令v-html来调用innerHTML
2. 指令一：强制绑定
   * 可简写成:
3. 指令二：数据监听
   * 可简写成@
   * 可以传递参数
   * 不传递参数时第一个参数就是事件名
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p>1. 双大括号</p>
        <p>hello {{username}}</p>
        <p>hello {{username.toUpperCase()}}</p>
        <p>hello {{label}}</p>
        <p>hello <span v-text="label"></span></p>
        <p>hello <span v-html="label"></span></p>
        <p>2. 强制绑定</p>
        <img v-bind:src="imgurl"><img :src="imgurl">
        <p>3. 事件监听</p>
        <button v-on:click="test">test</button><button @click="test()">test</button><br>
        <button v-on:click="test('username')">test</button><button @click="test(username)">test</button>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                username: 'aaa',
                label: '<a href="https://cn.vuejs.org/v2/guide/syntax.html">aaa</a>',
                imgurl: 'https://cn.vuejs.org/images/logo.png'
            },
            methods: {
                test(content){
                    content&&alert(content)
                    alert('hello!')
                }
            }
        })
    </script>
</body>
</html>
```
## 计算属性
* 底层通过get与set来控制数据的变化
* computed属性用来监听某个属性，当属性直接当做函数时默认调用了getter
* computed中的每个属性可以设置getter与setter，getter当获取此属性时调用，setter当给此属性赋值时调用
* 使用computed监视某个属性时会将这个属性的get函数中使用的变量缓存下来，一旦这些变量值与缓存中不同就会重新调用get函数
* 当创建vue实例时会调用一次get函数，如果之后缓存中的变量没有发生改变则不会调用get函数，直接返回上次计算的值
* getter对应get函数
* setter对应set函数
* watch属性用来监听某个属性的变化，当变化时执行指定回调函数
* 可以使用vm.$watch在构造函数之外监听某个属性
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        姓<input type="text" v-model="firstname"><br>
        名<input type="text" v-model="lastname"><br>
        全名1<input type="text" v-model="fullname1"><br>
        全名2<input type="text" v-model="fullname2"><br>
        全名3<input type="text" v-model="fullname3"><br>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                firstname: 'a',
                lastname: 'b',
                fullname2: 'a b'
            },
            computed: {
                fullname1(){
                    return this.firstname + ' ' + this.lastname
                },
                fullname3:{
                    get(){
                        return this.firstname + ' ' + this.lastname
                    },
                    set(){
                        const arr = value.split(' ')
                        this.firstname = arr[0]
                        this.lastname = arr[1]
                    }
                }
            },
            watch:{
                firstname(value){
                    this.fullname2 = value + ' ' + this.lastname
                }
            }
        })
        vm.$watch('lastname', (value)=>{
            vm.fullname2 = vm.firstname + ' ' + value
        })
    </script>
</body>
</html>
```
## class与style绑定
* 有些元素的样式是需要动态变化的
* 可以通过强制绑定class与style来实现样式的动态改变
* 绑定class时不同参数：
  1. 普通变量   将变量对应的值充当元素的类
  2. 对象       将对象中值为true的属性名充当元素的类
  3. 数组       将数组中的所有数据都充当元素的类
* 绑定style
  * style的值是一个键值对，属性名要对应驼峰命名法
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .class1{
        color: red;
    }
    .class2{
        color: blue;
    }
</style>
<body>
    <div id="app">
        <p :class="class1">绑定{class1}</p>
        <p :class="class2">绑定{class2}</p>
        <p :class="class3">绑定{class3}</p>
        <p :style="{color: clorvalue, backgroundColor: bgc}">绑定style</p>
        <button @click="updateClass">更新绑定class</button>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                class1: 'class1',
                class2: {class1: true, class2: false},
                class3: ['class1', 'class2'],
                clorvalue: 'blue',
                bgc: 'green'
            },
            methods: {
                updateClass(){
                    this.class1 = 'class2'
                    this.class2.class2 = true
                    this.bgc = 'yellow'
                }
            }
        })
    </script>
</body>
</html>
```
## 条件渲染
1. v-if
2. v-else
3. v-show
* 使用v-if会删除创建DOM，使用v-show是使用display:none来隐藏
* 当需要频繁切换时最好用v-show
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .class1{
        color: red;
    }
    .class2{
        color: blue;
    }
</style>
<body>
    <div id="app">
        <p v-if="ok">成功</p>
        <p v-else>失败</p>
        <p v-show="ok">成功</p>
        <p v-show="!ok">失败</p>
        <button @click="ok=!ok">update</button>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                ok: true
            }
        })
    </script>
</body>
</html>
```
## 列表渲染
### 使用v-for遍历数组
* vue中监听数组时只监听这个数组的变量本身是否发生改变，不关心数组内部的数据是否发生改变
* vue重写了数组中的所有方法，使其在执行原本操作后还能更新视图
* 遍历数组时返回的参数分别为item, index
### 使用v-for遍历对象
* 遍历对象时返回的参数分别为value, key
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <input type="text" v-model="searchname">
        <ul>
            <li v-for="(item, index) in searchedArr" :key="index">{{index}}----{{item}}</li>
        </ul>
        <button @click="order(1)">升序</button>
        <button @click="order(2)">降序</button>
        <button @click="order(0)">原始</button>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                searchname: '',
                orderType: 0,
                arr: [
                    {name: 'tom', age: 12},
                    {name: 'jack', age: 15},
                    {name: 'tomi', age: 11},
                    {name: 'jerry', age: 13}
                ]
            },
            computed: {
                searchedArr: {
                    get(){
                        const {searchname, arr, orderType} = this
                        let newarr = arr.filter(item=>{
                            return item.name.indexOf(searchname)!==-1
                        })
                        if(orderType===1){
                            newarr.sort((p, l)=>{
                            return p.age-l.age
                        })
                        }else if(orderType===2){
                            newarr.sort((p, l)=>{
                            return l.age-p.age
                        })
                        }
                        return newarr
                    }
                }
            },
            methods: {
                order(type){
                    this.orderType = type
                }
            }
        })
    </script>
</body>
</html>
```
## 事件处理
### 事件绑定
1. 无参数的回调函数，默认参数为event
```html
<button @click="test">test</button>
```
2. 有参数的回调函数，参数为传入值
```html
<button @click="test()">test</button>
<button @click="test(a,b)">test</button>
```
### 事件描述符
* 使用事件描述符可以方便的阻止冒泡与阻止默认行为
```html
<div @click="test()">
    out
    <div @click.stop="test()">in</div>
</div>
<a href="www.baidu.com" @click.prevent="test(a,b)">test</a>
```
### 按键描述符
* 通过按键描述符可以方便监听某个键盘按键的行为，只有少数按键拥有描述符,没有描述符的可以使用keyCode代替
```html
<input @keyup.13="alert('a')" />
<input @keyup.enter="alert('a')" />
```
## vue的生命周期
* vue生命周期分为3个部分，每个部分都对应一些钩子函数
### 初始化(只执行一次)
1. beforeCreate()
2. 观察数据
3. 初始化事件
4. created()
5. 判断是否有el属性，没有就等待vm.$el的调用再继续执行
6. 判断是否有template任选项，没有就引入el指定的innerHTML，有则将template引入render function
7. beforeMount()
8. 创建vm.$el代替属性中的el
9. mounted()
10. 执行mount
### 更新(会执行多次)
1. 观察到数据发生变化
2. beforeUpdate()
3. 虚拟DOM的再渲染与分发
4. updated()
### 死亡(只执行一次)
1. 当vm.$detroy调用时
2. 执行detroy
3. detroyed()
### 常用钩子函数
#### mounted
* 执行ajax或者启动定时器等一些异步函数
#### beforeDestroy
* 进行收尾工作，如清除定时器等防止内存泄露
## vue动画
* 本质是操作css中的transition与aniamtion
* 过渡动画的编码流程
  1. 使用transition标签包裹需要动画的元素
  2. transition的name属性指定class的前缀
  3. 使用类xxx-enter-active,xxx-leave-active编写过渡动画基本属性,可以使用animation与transition
  4. 当动画基本属性设置为transition时要使用类xxx-enter,xxx-leave-to编写动画完成时的效果
## 过滤器
* 使用Vue.fiter(name, fallback)来自定义过滤器
* 使用例子
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p>没有过滤器：{{time}}</p>
        <p>过滤器1：{{time | formatTime}}</p>
        <p>过滤器2：{{time | formatTime('getHours')}}</p>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        Vue.filter('formatTime',(value, params)=>{
            return value[params||'getDate']()
        })
        const vm = new Vue({
            el: '#app',
            data: {
                time: new Date()
            }
            })
    </script>
</body>
</html>
```
## 其他指令
### ref
* 用来标识一个元素，可以通过实例的$refs来获取这个元素
### v-cloak
* 在没有实例化某个模板时，这个模板内的模板语法会按照原样显示
* 将这个指令与css配合可以防止闪现，即在没有实例化这个模板前会隐藏这个元素
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        [v-cloak]{
            display: none;
        }
    </style>
</head>
<body>
    <div id="app">
        <p v-cloak>过滤器2：{{time | formatTime('getHours')}}</p>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        alert('------')         //此时当此语句执行时p元素不会显示
        Vue.filter('formatTime',(value, params)=>{
            return value[params||'getDate']()
        })
        const vm = new Vue({
            el: '#app',
            data: {
                time: new Date()
            }
            })
    </script>
</body>
</html>
```
## 自定义指令
* 可以用来扩展自己的指令
### 定义全局指令
* `Vue.directive(name, callback)`
* name表示想要自定义指令的名字，vue会自动添加vue-
* callback可以有两个参数el, bind，第一个参数是绑定这个指令的DOM元素对象，第二个参数是带有vue相关属性的对象
### 定义局部指令
* `directives: {name(el, bind){}}`
* 在Vue的实例中定义属性对象directives，在此属性中自定义局部指令
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p v-my-directive1="value1">app v-my-directive1</p>
        <p v-my-directive2="value2">app v-my-directive2</p>
    </div>
    <div id="app1">
        <p v-my-directive1>app1 v-my-directive1</p>
        <p v-my-directive2>app1 v-my-directive2</p>
    </div>
    <script src="../js/vue.js"></script>
    <script>
        Vue.directive('my-directive1', (el, bind)=>{
            console.log(el, bind, '--------')
        })
        const vm = new Vue({
            el: '#app',
            data: {
                value1: 'aaa',
                value2: 'bbb'
            },
            directives: {
                'my-directive2'(el, bind){
                    console.log(el, bind) 
                }
            }
        })
    </script>
</body>
</html>
```
## vue插件
* 通过自定义vue插件并在vue后引入，可以扩展全局方法，实例方法与自定义指令
```javascript
(function(){
    const myPlugin = {}
    myPlugin.install = (Vue, options)=>{
        Vue.myGlobalMethod = ()=>{
            console.log('myPlugin全局方法')
        }
        Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
            // 逻辑...
            console.log(el, binding)
          }
        })
        // 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
          console.log('myPlugin实例方法')
        }
    }
    window.myPlugin = myPlugin
})()
```
* 使用自定义插件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
    </div>
    <script src="../js/vue.js"></script>
    <script src="./myPlugin.js"></script>
    <script>
        Vue.use(myPlugin)
        Vue.myGlobalMethod()
        const vm = new Vue({
            el: '#app'
        })
        vm.$myMethod()
    </script>
</body>
</html>
```