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
## vue的组件化编码
* 实现三个案例：
  1. comment
  2. todolist(需要注释bootstrap样式否则会产生冲突)
  3. search
### 使用vue-cli脚手架来进行组件化编码
* 安装
```
npx @vue/cli create vue_demo
```
* 运行
```
npm run serve
```
### 数据持久化保存
#### localStorage
1. window.localStorage.getItem(name)
   * 通过标识名从localStorage中获取一段字符串
   * 可以保存为json，通过JSON的方法进行转换
### 组件间通信
#### props属性
* 子组件中声明props属性可以获取到父组件传递过来的数据
* 一次只能从父组件传递给子组件，继续向下传递需要子组件的子组件声明props属性来获取
* 示例：
```javascript
    export default {
        props: {
            addComment: {
                type: Function,
                required: true
            }
        }
```
#### 自定义事件
* 在vue中有$on与$emit实例方法来监听和触发自定义事件
* 给同一个组件声明监听的自定义事件只有当前组件可以触发
* 声明方式可以是用this.$on
* 父组件给子组件标签设置@xxx
* 给子组件声明ref属性，在父组件中通过this.$refs来获取
#### 订阅与发布
* 通过使用pubsub-js第三方库来简化订阅与发布流程
* 通过在祖先组件中调用pubsub.subscribe(name, callback)来订阅事件
* 通过在后代组件中调用pubsub.publish(name, data)来发布事件
* 通过这种方式能够跨组件传递数据
#### slot插槽
* 通过slot可以将原本写在子组件中的内容写在父组件中
* 通过这种方式就减少了组件间通信的必要，在一定程度上充当了组件间通信的功能
### vue-ajax
#### vue-resource
* 广泛用于v1.x的版本
* 是promise形式的ajax封装插件
* 使用时通过vue来加载插件
* 加载后会在实例方法中新增$http对象
* 通过调用其中的get或者post方法来发ajax请求
```javascript
import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)
const vm = new Vue()
vm.$http.get(url)
.then(res=>{
    //请求成功的回调
}, res=>{
    //请求失败的回调
})
```
## UI组件库
* mint-UI(由饿了么开发的移动端vueUI库)
* Elment(饿了么开发的PC端vueUI库)
## vue路由
* 一个路由就是一种映射关系(key-value)
* key为路由路径，value为Function(后台路由)/Component(前台路由)
### 使用路由
1. 注册路由
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import a from './a.vue'
import b from './b.vue'
import aa from './aa.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/a',
            component: a,
            children: [             //嵌套路由
                {
                    path: 'a',
                    component: aa
                },
                {
                    path: '',
                    redirect: '/a/a'
                }
            ]
        },
        {
            path: '/b',
            component: b,
        },
        {
            path: '/',
            redirect: '/a'          //重定向
        }
    ]
})
```
2. 配置路由器
```javascript
import Vue from 'vue'
import router from './router'
new Vue({
    router
})
```
3. 使用`<router-link>`来配置路由链接
```javascript
<router-link to="/a">a</router-link>
```
4. 使用`<router-view>`来配置路由显示区域
```javascript
<router-view></router-view>
```
### 缓存路由组件
* 在每次切换路由时，原路由组件会被销毁
* 如果不想要路由组件被销毁可以在`<router-view>`外添加`<keep-alive>`来达到缓存的目的
```javascript
<keep-alive>
<router-view></router-view>
</keep-alive>
```
### 向路由组件传递数据
* 有时子路由需要获取上级组件中的数据
* 此时需要向路由组件传递数据
#### 通过路由的占位符实现
* 设置占位符
```javascript
<router-link to="/a:id">a</router-link>
```
* 从子路由中获取占位符中的参数
```javascript
const vm = new Vue({
    mounted(){
        console.log(this.$route.params.id)
    }
})
```
#### 通过`<router-view>`传递数据
* 传递数据
```javascript
<router-view msg="msg"></router-view>
```
* 从子路由中获取数据
```javascript
const vm = new Vue({
    props: ['msg']
})
```
### 编程式路由导航
* 通过js实现对路由的跳转回退等功能
* 对Vue实例使用`this.$router`中的一些方法来实现
```javascript
this.$router.push('/a')
this.$router.replace('/b')
this.$router.back()
this.$router.go(-1)
```
## vue源码分析
* 使用github上的mvvm库来分析vue中如何实现数据绑定等一系列mvvm行为
* 详细过程参考vueSrcCodeAnalysis文件夹
### 基础准备
* 为了看懂源码需要熟悉这些基础知识
#### 将伪数组转换成真数组
* `Array.prototype.slice.call()`    ES5方案
  * 使用数组上的原型链方法
* `Array.from(arrLike, mapfunc)`    ES6方案
  * 传入两个参数，第一个参数是伪数组，第二个参数是需要对伪数组每个元素执行的函数
#### 获取DOM节点类型
* `nodeType` 返回节点类型
* `getAttributeNode(attr)` 获取某个节点中的特定的属性节点
#### 对象相关
* `Object.defineProperty(obj, propertyname, describetors)`
* 在ES6笔记中有详细介绍
* 此为vue的核心语法，由于IE8及以下不支持此语法因此vue不支持IE8及以下
* `Object.keys(obj)`获取对象可枚举属性组成的数组
* `obj.hasOwnProperty(property)`判断某属性是不是不在这个对象的原型链上
#### documentFragment
* 高效批量更新多个节点
* document：对应显示页面，包含多个element，一旦更新其中的element则页面更新
* documentFragment: 包含多个element的容器对象，更新其中的element页面不会发生更新
* 通过一个例子来实现高效批量更新节点
```html
<!doctype html>
<html>
    <body>
        <ul id="test">
            <li>test</li>
            <li>test</li>
            <li>test</li>
        </ul>
    </body>
    <script>
        const ul = document.getElementById('test')
        const fragment = document.createDocumentFragment()
        let node
        while(node = ul.firstChild){    //一个子节点只可能拥有一个父节点
            fragment.appendChild(node)  //当这个子节点插入到别的节点中时，原父节点就不再拥有此子节点
        }
        [].slice.call(fragment.childNodes).forEach(node=>{  //将伪数组转换成真数组后遍历
            if(node.nodeType === 1){    //当节点为元素节点时才执行
                node.textContent = 'test1'
            }
        })
        ul.appendChild(fragment)
    </script>
</html>
```
### 数据代理
* 通过一个对象代理另一个对象中属性的操作(读写)
* vue中的数据代理: 通过vm对象来代理data对象中所有属性的操作
* 好处: 更方便的操作data中的数据
* 基本实现流程:
  1. 通过Object.defineProperty来给vm绑定与data中同名的属性值
  2. 定义getter与setter来操作data中对应的属性
```javascript
function MVVM(option){
    this._data = option.data
    let me = this
    Object.keys(this._data).forEach(item=>{
        me._proxy(item)
    })
}
MVVM.prototype._proxy = function(item){
    let me = this
    Object.defineProperty(me, item, {
        configurable: false,
        enumerable: true,
        get: function(){
            return me._data[item]
        },
        set: function(newValue){
            me._data[item] = newValue
        }
    })
}
```
### 模板解析
* 核心包括三个部分，分别是双大括号解析，事件指令与普通指令
#### 双大括号解析
1. 通过正则匹配到双大括号中的变量
2. 将变量替换成vm._data中的值
3. 将替换后的值赋值给当前节点的textContent
#### 事件指令
1. 获取事件指令
2. 从事件指令中取得事件名
3. 根据指令的值从methods中取得对应的回调函数
4. 使用addListenEvent绑定事件与回调函数并将回调函数的this使用bind方法强制绑定为vm
5. 移除事件指令
#### 一般指令
1. 获取一般指令的指令名与指令值
2. 将指令值转换成vm._data对应的值
3. 根据指令名确定需要操作元素节点什么属性
   * v-text textContent
   * v-html innerHTML
   * v-class className
4. 移除普通指令
### 数据绑定
* 涉及两个方面: 数据绑定与数据劫持
1. 数据绑定
   * 一旦更新了data中的某个值，则页面中间接或者直接使用了这个属性值的节点会发生更新
2. 数据劫持
   * 数据劫持是vue使用的用来实现数据绑定的技术
   * 基本思想: 通过defineProperty来监视data中所有属性的变化(任意层次)，一旦变化就是更新界面
* 初始化流程
  1. 实例化MVVM/Vue
  2. 在实例化MVVM的过程中实例化Observer
  3. 在Observer中给data中任意层次的每一个属性值都创建一个Dep实例
  4. 给每个属性值重新定义get与set方法，get用来绑定watcher与dep，set用来监听数据的变化
  5. 在实例化MVVM的过程中实例化Compile
  6. compile使用内部的update方法初始化界面
  7. 实例化Watcher并通过触发data中属性值的get方法来绑定watcher与dep
  8. 实例化Watcher时将update方法作为回调函数的一部分传递给Watcher
* 更新流程
  1. vm._data中的数据发生变化
  2. 触发dep的set方法并通知watcher
  3. watcher触发初始化时接收的回调函数来更新界面
### 双向绑定
* 使用v-model能够实现双向绑定，此节简述双向绑定的基本流程
* 使用v-model指令时解析模板的流程
  1. 在模板解析时判断某个节点使用的是v-model指令则进入相应的函数中
  2. 通过原生的事件监听`addListenEvent`来将这个节点监听input事件
  3. 每次触发input事件时则去修改vm._data中的数据，从而触发数据绑定，最终实现了双向绑定效果
## vuex
* 是一个vue的插件，用来对vue中多个组件的共享状态进行统一管理
### 状态自管理应用
* 单向数据流view->actions->state->view
1. state 驱动应用的数据源
2. view 以声明方式将数据映射到页面上
3. actions 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)
### 多组件共享状态
1. 多个视图依赖于同一个状态
2. 来个多个视图的行为要操作这个状态
3. 基础的解决办法
   1. 将数据以及操作这些数据的行为都定义在父组件中
   2. 将数据与行为通过组件传递的方式传递给子组件(可能有多级传递的问题)
4. vuex就是一个统一管理这些状态的容器
### vuex核心概念与API
* 不需要共享的状态不应该使用这个技术
#### 状态管理流程
1. vue component调用dispatch来触发action从而间接更新状态
2. action调用commit来触发mutation从而直接更新状态，其中与后台的交互在action中执行
3. 开发工具只能监听mutation改变状态的行为，mutation直接修改state中的数据
4. state的更新导致getter中计算属性的更新
5. state与getter共同渲染vue component中的页面
#### store
* 所有用vuex管理的组件中都多了一个属性$store，它就是一个store对象
* 属性：
  * state: 注册好的state对象
  * getter: 注册好的getter对象
* 方法:
  * dispatch(actionname, data): 分发调用action
  * commit(mutationname, {data}): 直接调用mutation,第二个参数必须是对象
#### state对象
* 包含状态的对象
#### mutations对象
* 包含多个直接更新状态的函数的对象
* 第一个形参是state，第二个形参是commit传入的data
#### actions对象
* 包含多个对应事件回调函数的对象
* 通过使用函数中的第一个参数commit来调用对应的mutation来间接实现更新
* 第二个形参是state，第三个形参是dispatch传入的data
#### getter对象
* 包含多个getter计算属性函数的对象
* 函数中的第一个形参是state
### 使用vuex
```javascript
//store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//通常以下四个部分是存放于其他四个同名文件中
const state = {count: 0}
const mutations = {}
const actions = {}
const getters = {isOddOrNot1(state){return state.count%2===1 ? true : false}}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
//app.vue
import store from './store'
new Vue({
    computed: {
        isOddOrNot: this.$store.getters.isOddOrNot1
    }
    store
})
```
### 简化组件内使用
* vuex中有`mapState, mapGetters, mapActions`几个组件绑定的辅助函数
* 这些函数的返回值是一个对象，这些对象包含了与传入这些函数的参数同名的函数
```javascript
import {mapGetters} from ''vuex
import store from './store'
new Vue({
    computed: {
        ...mapGetters({isOddOrNot: 'isOddOrNot1'}) //当vuex与组件内命名不统一时要使用对象作为传入的参数，否则可以使用数组作为参数...mapGetters(['isOddOrNot'])
    }
    store
})
```