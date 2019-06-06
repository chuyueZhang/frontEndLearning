# ECMAScript
## 介绍
* 一般来说ECMAScript可以认为是javascript
* javascript对ECMAScript进行了扩展
### javascript组成
* ECMAScript(核心)
* 扩展-->浏览器端
  * DOM
  * BOM
* 扩展-->服务器端
  * NODEJS
## ES版本变化
1. ES5 发布于2009年
2. ES6 发布于2015年
3. ES7 发布于2016年
## 回顾ES5
### 严格模式
#### 开启方式
* 以`use strict`开头来开启严格模式
#### 行为与特性
* 必须以var声明变量
* 自定义函数中的this不能指向window
* 给eval创建作用域
* 对象不能有重名属性
### JSON扩展
* JSON.stringify(obj/arr)
  * 将JS对象或数组转换成JSON对象或数组
* JSON.parse(str)
  * 将JSON对象或数组转换成JS对象或数组
### Object扩展
* Object.create(prototype,[descriptors])
    1. 作用：以第一个参数作为原型创建一个新的对象
    2. 为新的对象指定新的数据属性或访问器并修改它的描述，当设置了setter或getter时就只能设置访问器属性，在基本的对象数据结构中会有默认值
        * 数据属性
          1. value: 指定值, 默认值为undefined
          2. writable: 标识此属性是否可修改, 默认值为true
          3. configurable: 标识此属性是否可配置或删除，当设置此值为false时，除了writable的数据属性都不可再被修改, 默认值为true
          4. enumerable: 标识当前属性是否可被for in, Object.key(),JSON.stringify(), Object.assign()枚举, 默认值为true
        * 访问器属性
          1. get: 获取指定扩展属性时自动调用此函数，惰性加载，只有在触发时才执行此函数, 默认值为undefined
          2. set: 修改此属性时自动调用此函数并且将修改的值作为实参传递给此函数, 默认值为undefined
          3. enumerable: 标识当前属性是否可被for in, Object.key(),JSON.stringify(), Object.assign()枚举, 默认值为true
          4. configurable：标识此属性是否可配置或删除, 默认值为true
    3. 当调用此方法而不设置数据属性或访问器属性时，这些访问器属性会默认设置为false
```javascript
var obj1 = {}
var obj2 = Obect.create(obj1, {
    sex: {
        value: '男',
        writable: false,
        configurable: true,
        numerable: true
    }
})
```
* Object.defineProperties(prototype, key, [descriptors])
    1. 作用：给第一个对象扩展新属性
    2. 为原有对象添加新的数据属性或访问器属性并修改它的描述，当设置了setter或getter时就只能设置访问器属性
        * 数据属性
          1. value: 指定值, 默认值为undefined
          2. writable: 标识此属性是否可修改, 默认值为true
          3. configurable: 标识此属性是否可配置或删除，当设置此值为false时，除了writable的数据属性都不可再被修改, 默认值为true
          4. enumerable: 标识当前属性是否可被for in, Object.key(),JSON.stringify(), Object.assign()枚举, 默认值为true
        * 访问器属性
          1. get: 获取指定扩展属性时自动调用此函数，惰性加载，只有在触发时才执行此函数, 默认值为undefined
          2. set: 修改此属性时自动调用此函数并且将修改的值作为实参传递给此函数, 默认值为undefined
          3. enumerable: 标识当前属性是否可被for in, Object.key(),JSON.stringify(), Object.assign()枚举, 默认值为true
          4. configurable：标识此属性是否可配置或删除, 默认值为true
    3. 当调用此方法而不设置数据属性或访问器属性时，这些访问器属性会默认设置为false
```javascript
var obj1 = {firstname: 'aa', lastname: 'bb'}
var obj2 = Object.defineProperty(obj1, 'fullname', {
    configurable: false,
    get: function(){
        return this.firstname + ' ' + this.lastname
    },
    set: function(data){
        this.firstname = data.split(' ')[0]
        this.lastname = data.split(' ')[1]
    }
})
console.log(obj2.fullname)  //aa bb
obj2.fullname = "cc dd"
console.log(obj2.fullname)//cc dd
```
* Object.defineProperties(prototype,[descriptors])
    1. 区别：此方法能一次给多个属性设置描述
```javascript
var obj1 = {firstname: 'aa', lastname: 'bb'}
var obj2 = Object.defineProperties(obj1, {
    fullname: {
        configurable: true,
        get: function(){
            return this.firstname + ' ' + this.lastname
        },
        set: function(data){
            this.firstname = data.split(' ')[0]
            this.lastname = data.split(' ')[1]
        }
    }
})
console.log(obj2.fullname)  //aa bb
obj2.fullname = "cc dd"
console.log(obj2.fullname)//cc dd
```
* 对象中也有两个隐藏方法set与get，作用与defineProperty相同
```javascript
var obj1 = {firstname: 'aa', lastname: 'bb',
    get fullname(){
            return this.firstname + ' ' + this.lastname
        },
    set fullname(data){
        this.firstname = data.split(' ')[0]
        this.lastname = data.split(' ')[1]
    }
}

console.log(obj1.fullname)  //aa bb
obj1.fullname = "cc dd"
console.log(obj1.fullname)//cc dd
```
  * 在IE9之前的版本中创建getter或setter使用__defineGetter__和__definesetter__,此时访问器属性中的configurable与enumerable不可设置
* Object.getOwnPropertyDescriptor(obj, key)
  * 作用: 读取属性的描述符对象

### 数组的扩展
* Array.prototype.indexOf(value)
  * 返回value在Array中第一次出现的下标
* Array.prototype.lastIndexOf(value)
  * 返回value在Array中第一次出现的下标
* Array.prototype.forEach(function(item, index, arr){})
  * 遍历整个数组
* Array.prototype.map(function(item, index){})
  * 遍历整个数组并将每个值按照回调函数的return的结果进行修改,返回值为修改好的数组 
* Array.prototype.filter(function(item, index){})
  * 遍历整个数组并将每个值按照回调函数的return的结果进行过滤,不满足则丢弃,返回值为修改好的数组 
### 函数的扩展
* Function.prototype.bind(obj)
  * 将函数内的this值修改为obj并将修改好的函数返回， 常用作为回调函数
* Function.prototype.call(obj, para1, para2...)
  * 立即调用函数并将函数内的this值修改为obj并将修改好的函数返回, 与apply区别在于参数不同
* Function.prototype.apply(obj, [para1, para2...])
  * 立即调用函数并将函数内的this值修改为obj并将修改好的函数返回
## ES6学习
### let
* 作用与var类似, 用于声明变量
* 特点：
  * 在块作用域里有效
  * 不能重复声明
  * 不会预处理, 不会发生提升
* 应用：
  * 循环遍历加监听
  * 取代var是趋势
### const
* 特点：
  * 值不能修改
  * 其余与let相同
* 应用：
  * 保存不需要修改的数据
### 变量的解构赋值
* 从对象或者数组中提取数据并将其赋值给变量(多个)
* 给对象解构赋值
  * `let {a,b} = {a: 'bbb', b: 'ccc'}`
  * 按照对象名来进行取值
* 给数组解构赋值
  * `let [a,b] = [1, 'aaaa']`
  * 按照下标顺序赋值
* 用途：
  * 给多个参数赋值
* 应用给函数形参与实参
```javascript
let obj = {username: 'aa', value: 'ccc'}
function foo({username, value}){
    console.log(username, value)
}
foo(obj)
```
### 模板字符串
* 简化字符串的拼接
* 使用``对字符串进行拼接
* 变量的部分使用${xxx}代替
### 对象的简写
* 属性值与属性名相同时可以只写属性名
* 函数的function可以省略
### 箭头函数
* 定义匿名函数
```javascript
//箭头函数体左边的情况
//1.没有形参时
let foo = () => console.log(111)
foo()
//2.一个形参且没有形参默认值时(小括号能够省略)
let foo = a => console.log(a)
foo('aa')
//3.两个及两个以上形参时，小括号不能省略
let foo = (a, b) => console.log(a, b)
foo('aa', 'bb')
//箭头函数体右边的情况
//1.函数只有一条语句或者表达式时{}可以省略, 此时会自动返回语句执行结果或者表达式的结果
let foo = (a, b) => a + b 
console.log(foo(1,2))//3
//2.函数不止一条语句或者表达式时
let foo = (a, b) => {
    a += 'a'
    b += 'b'
    return a + b
}
console.log(foo(1,2))//'1a2b'
```
* 特点：
  * 简洁
  * 箭头函数的this与谁调用无关，而是定义时所处对象的this
    * 扩展理解
      1. 先看箭头函数外层有没有函数，有则为普通函数的this，没有就是window
      2. 如果外层也是箭头函数继续重复第一步的操作
### 三点运算符
* 又名Rest可变参数，常用来代替arguments(arguments.callee指函数本身)
* 它的值是真数组，与伪数组arguments不同
```javascript
function foo(...value){
    console.log(value)
}
foo(1,2,3,4,5)  //1,2,3,4,5
//当可变参数前也声明了形参时会自动从自己里剔除相应数量形参
function foo(a, ...value){
    console.log(value)
}
foo(1,2,3,4,5)  //2,3,4,5
```
* 扩展用法
```javascript
let a = [1,6]
let b = [2,3,4,5]
a = [1, ...b, 6]
console.log(a)  //[1,2,3,4,5,6]
```
### 形参默认值
* 当未传入参数时使用形参里的默认值
```javascript
let foo1 = (a=1) => console.log(a)
let foo2 = a => console.log(a)
foo1()  //1
foo2()  //undefined
```
### promise对象
* promise对象: 代表了将来某个将要发生的事件(通常是异步操作)
* 有了promise对象，可以将异步操作以同步的流程表达出来，避免了层层嵌套的回调函数
* ES6的Promise是个构造函数，用来生成promise实例
* 参数函数resolve的参数可以是另一个promise，此时当前promise会等待另一个promise状态发生改变时才继续执行
* promise共有三个状态：
  * pendding    初始化状态
  * fullfilled  成功状态
  * rejected    失败状态
* 基本步骤
```javascript
// 1. 创建promise的实例
let url = ''
function getNews(url){
    let xmlRequest = new XMLHttpRequest(url)
    let promise = new Promise((resolve, reject)=>{
    // promise处于初始化状态
        xmlRequest.onreadystatechange = ()=>{
            if(xmlRequest.readystate === 4){
                if(xmlRequest.state === 200){
                    xmlRequest.open('get', url)
                    console.log(xmlRequest.responseText)
                    //  2. 指定进入成功状态时的回调函数的逻辑
                    resolve(xmlRequest.responseText)
                }else{
                    //  3. 指定进入失败状态时的回调函数的逻辑
                    reject('失败了')
                }
            }
        }
    })
    // 返回promise以创建下一条链式调用
    return promise
}
getNews(url)
    .then((data)=>{
        // fullfilled状态，步骤2中的回调函数
        let {newUrl} = JSON.parse(data)
    // 返回promise以继续创建下一条链式调用
        return getNews(newUrl)  // 重新创建了新的promise来重复执行函数getNews
    }, (error)=>{
        // rejected状态，步骤3中的回调函数
        console.log(error)
    })
    .then((data)=>{
        // fullfilled状态，步骤2中的回调函数
        console.log('完成')
    }, (error)=>{
        // rejected状态，步骤3中的回调函数
        console.log(error)
    })
    .catch(error=>{ //通常不会给then指定第二个错误回调，而是使用catch方法来捕获错误
        console.log(error)
    })
    .finally(()=>{}) //在执行完then或者catch回调后就执行，本质两者回调中的逻辑交集，发布于ES8
```
### symbol
* 在ES5中由于对象的属性名是个字符串，可能造成命名冲突
  * 比如想给别人创建的对象添加新属性时，新属性名可能与原属性名冲突，此时可用symbol解决
* 在ES6中新增加的基本类型
* 表示一个独一无二的值，无法与其他值进行运算包括拼串
* 创建时不使用new运算符，因为它不是对象而是一个原始类型的值
* 不会被for in 与for of遍历到
```javascript
let symbol = Symbol()
console.log(symbol) //symbol()
//可以传参作为它的标识符
let symbol1 = Symbol('one')
console.log(symbol) //symbol(one)
//如果传入参数是一个对象则调用toString方法来作为标识符
let obj = {
    toString(){
        return 'abc'
    }
}
let symbol2 = Symbol(obj)
console.log(symbol) //symbol(abc)
```
### iterator遍历器
* 是一个接口机制，为各种不同的数据结构提供统一的访问机制
* 作用：
  * 为各种数据结构提供一种统一简洁的接口
  * 使得数据结构能按一定次序排列
  * ES6创造一种新的遍历方式for of，带有iterator接口的数据才能被遍历
* 工作原理：
  * 创建一个指针对象(遍历器对象)，指向数据结构的起始位置
  * 调用next方法，指针自动指向数据结构的第一个成员
  * 继续调用next方法，指针指向下一个成员直到指向最后一个成员
  * 每调用一个next方法返回一个对象包含value与done
    * value表示当前的值，done表示是否遍历完成，布尔值
    * 当遍历结束时(最后一个值的next)value为undefined，done返回true
```javascript
//模拟遍历器接口
let arr = [1,2,3,4,5]
let iterator = (arr)=>{
    let index = 0
    return index >= arr.length?{value: arr[index], done: false}:{value: undefined, done: true}
}
```
* 将iterator接口部署到指定数据结构上，可以使用for of遍历
* 数组，字符串，arguments，map容器，set容器自带iterator接口
```javascript
let arr = [1,2,3,4,5]
for(let i of arr){
    console.log(i)
}
//1,2,3,4,5
let str = 'abcdefg'
for(let i of str){
    console.log(i)
}
//a,b,c,d,f,g
function foo(a,b,c,d){
    for(let i of arguments){
        console.log(i)
    }
}
foo(1,2,3,4)//1,2,3,4
```
* 对对象使用for of时会调用对象内Symbol.iterator的函数
```javascript
//给对象添加模拟遍历器
obj = {
    [Symbol.iterator](){ 
        return { index: 0,
                next:function(){
                return this.index<=3?{value: this.index++, done: false}:{value: undefined, done: true}
        }}
    }
}
```
### generator函数
* ES6提供的解决异步编程的方案
* 它是个状态机，封装了各个阶段的数据
* 用来生成遍历器对象
* 创建时在function与函数名之间加星号表示generator函数
* 惰性加载，执行next才执行到函数内的yield语句处
```javascript
function* myGenerator(){
    console.log('开始执行')
    let step1 = yield 'step1'
    console.log(step1)
    console.log('中断后重新执行')
    yield console.log('step2')
    console.log('完成')
    return 'end'
}
//执行generator函数返回一个遍历器对象, 指向初始位置 
let iterator = myGenerator()    
//执行next方法使遍历器对象指向第一个yield处，yield语句的表达式结果就是value值
console.log(iterator.next())    //'开始执行'    {value: 'step1', done: false}
//执行next方法使遍历器对象指向下一个yield处，yield语句的表达式结果就是value值
//可以给next传递实参，这个实参会赋值给执行此next方法时遍历器对象指向的起始yield语句的返回值，此处就是变量step1
console.log(iterator.next('aaa'))//'aaa'    '中断后重新执行'  'step2'  {value: 'undefined', done: false}
//继续执行next会使返回的value与函数内return的表达式值相同
console.log(iterator.next())//'完成' {value: 'end', done: true}
```
* 加深generator函数是生成遍历器对象的印象
```javascript
let obj = {
    *[Symbol.iterator](){
        yield 1
        yield 2
        yield 3
    }
}
for(let i of obj){
    console.log(i)
}
```
### async函数
* ES7语法
* 真正意义上解决异步回调，同步流程表达异步操作
* 本质是generator的语法糖
* async函数返回值为promise
```javascript
async function foo(){
    await 异步操作
    await 异步操作
}
```
* 例子
```javascript
function getNews(url){
    let promise = new Promise((resolve, reject)=>{
        if(url === 'aaa'){
            resolve(url)
        }else{
            //参数函数的执行不会终止后续逻辑但是由于状态只会转变一次，因此回调需要二选一
            resolve(false)  //此种回调可以让失败的逻辑交给async函数本身处理
            reject('普通函数失败')  //此种回调可以让失败逻辑交给async函数的then方法来执行
        }
    })
    return promise
}

async function test(){
    let result = await getNews('bbb')   //await后的函数只有promise为成功状态才会继续执行
    //此处的if判断是建立在上个函数调用resolve的基础上
    if(result===false){ //可以借用给resolve传递false来表示promise实际为fullfilled状态
        console.log('async函数失败') //针对fullfilled状态需要执行的逻辑
    }else{
        console.log(result) //成功状态执行的逻辑
    }
    result = await getNews('aaa')
    console.log(result)
    return 'async函数成功'
}
//处理异步执行过程中发生的成功或者失败的逻辑
test().then((data)=>{   
    console.log(data)   //成功执行此处，data的值为async函数return的值
},(error)=>{
    console.log(error)  //失败执行此处
})
```
### class
* 通过class定义类/实现类的继承
* 在类中使用constructor来实现类的属性继承
* 使用函数简写的形式给类添加一个方法
* 子类使用extends继承父类
* 子类在constructor中使用super来调用父类继承的属性
* 子类可以通过父类的方法重写来实现调用自己的方法
```javascript
class Person{
    constructor(name, age){ //属性继承
        this.name = name
        this.age = age
    }
    getName(){  //创建父类方法
        console.log(this.name, this.age)
    }
}
class SalaryPerson extends Person{
    constructor(name, age, salary){
        super(name, age)    //继承父类属性
        this.salary = salary
    }
    getName(){  //重写父类方法
        console.log(this.name, this.age, this.salary)
    }
}
let aPerson = new SalaryPerson('aa', 16,2000)
console.log(aPerson)
```
* 本质是组合继承(构造函数继承+寄生继承)
### 字符串扩展
* `str.includes(str)` 判断是否包含指定字符串
* `str.startWith(str)` 判断是否以指定字符串开头
* `str.endWith(str)` 判断是否以指定字符串结尾
* `str.repeat(count)`   返回重复了指定次数的字符串
### 数值扩展
* 二进制与八进制表示法：0b开头表示二进制，0o表示八进制
* `number.isFinite(i)` 判断是否是有限数
* `number.isNaN(i)` 判断是否是NaN
* `number.parseInt(str)` 字符串转化为整数
* `number.isInteger(i)` 判断是否是整数
* `Math.trunc(i)`   小数转化为整数
### 数组对象的扩展
* `Array.from(v)` 将伪数组转化为真数组
* `Array.of(v1,v2,v3)`  将一系列数据转化为数组
* `Array.find(function(item, index, arr){})`    找到满足条件的第一个值
```javascript
//尝试实现底层
Array.prototype.myfind = function(condition){
    for(let i = 0; i < this.length; i++){
        if(condition(this[i], i)){
            return this[i]
        }
    }
}
```
* `Array.findIndex(function(item, index, arr){})`   找到满足条件的第一个值的下标
```javascript
//尝试实现底层
Array.prototype.myfindIndex = function(condition){
    for(let i = 0; i < this.length; i++){
        if(condition(this[i], i)){
            return i
        }
    }
}
```
### 对象的扩展
* `Object.is(v1, v2)`   判断两个数据是否相等，底层是判断字符串
* `Object.assign(target, source, [source, source])` 将源对象的属性添加到目标对象上
* 从ES6开始__proto__可以被操作
### 深度克隆
* 拷贝数据：
  * 基本数据类型
    * 拷贝后生成一份新的数据，修改新数据不会改变原数据的值
  * 对象/数组
    * 拷贝后是传递原数据的引用地址，修改新数据会改变原数据的值
* 深拷贝：
  * 拷贝的不是引用地址
* 浅拷贝：
  * 拷贝的是引用地址
* 几种拷贝方法：
  1. 直接赋值   浅拷贝
  2. Object.assign()    浅拷贝
  3. Array.prototype.concat() 浅拷贝
  4. Array.prototype.slice() 浅拷贝
  5. JSON.parse(JSON.stringify())   深拷贝, 但是内容中不能包括函数，否则是null
* 深拷贝的实现要求
  * 拷贝的内容里不能有对象/数组
* 深拷贝的实现
```javascript
function clone(target){
    let value = null
    if(checkedType(target) === 'Object'){
        value = {}  //如果形参为对象则创建对象字面量
    }else if(checkedType(target) === 'Array'){
        value = []  //如果形参为数组则创建数组字面量
    }else{
        return target
    }
    for(let i in target){   //遍历对象或者数组
        value[i] = arguments.callee(target[i])  //递归调用判断对象或者数组中的值
    }
    return value
    function checkedType(obj){
        return Object.prototype.toString.call(obj).slice(8, -1) //调用原型上纯净的方法
    }
}
```
### set与map容器
#### set容器
* 无序的不可重复的多个value的集合体
* Set(array)    将数组转化为set容器
* set.add() 
* set.delete() 
* set.has() 
* set.clear() 
  
可用来解决数组内数据重复问题
#### map容器
* 无序的key不重复的多个key-value的集合体
* Map(array)    将两维数组转化为map容器
* map.set(key, value) 
* map.get(key) 
* map.delete(key) 
* map.has(key) 
* map.clear() 
* map.size
## ES7新增
* 指数运算符`**`
* Array.prototype.includes(value)   判断某个值是否在数组内