# 数据类型
## 基本(值)类型
* string: 任意字符串
* number: 任意数字
* boolean: true/false
* undefined: undefined
* null: null
## 对象类型
* object: 基本对象类型
* function: 特殊对象, 可以执行
* array: 特殊对象, 可通过下标执行, 内部有序
## 判断数据类型
* typeof  
    * 返回数据类型的字符串表达
    * 可以判断数值, 字符串, undefined, boolean, function
    * 不能判断null与object与array, 返回都是Object
* instanceof
    * 返回boolean值, 只能判断对象的具体类型, 即是普通对象, 函数还是基本类型
* ===(全等)
    * 可以判断undefined与null, 由于它们的值只有1个
## 相关问题
1. undefined与null的区别
   * undefined: 创建了变量未赋值
   * null: 创建了变量并赋值, 赋值为null
2. 什么时候赋值为null
   * 初始赋值为null, 表明将要赋值为对象
   * 最后赋值为null, 让这个变量原来指向的对象被垃圾回收机制回收
3. 严格区分变量类型与数据类型
   * 数据类型
        * 基本类型, 对象类型
   * 变量类型(内存值类型)
        * 基本类型, 引用类型
# 数据_内存_变量
1. 什么是数据
   * 存储在内存中并代表特定信息, 本质是0101...
   * 数据特点: 可传递, 可运算
   * 内存中所有可操作的目标
        * 算数运算
        * 逻辑运算
        * 赋值
        * 运行函数
2. 什么是内存
   * 内存条通电后产生可储存数据的临时空间
   * 内存产生与消失: 通电产生, 断电消失
   * 一块小内存中存在两种数据: 基本数据, 地址值
   * 内存两种类型: 栈空间(全局变量或局部变量), 堆空间(对象)
3. 变量
   * 可变化的量, 由变量名与变量值组成
   * 每个变量都对应一块小内存, 变量名用来查找对应的内存，变量值就是内存中保存的数据
4. 内存, 数据, 变量三者间的关系
   * 内存是用来存储数据的临时空间
   * 变量是内存的标识
## 相关问题
1. var a = xxx, a内存中保存的是什么
   * xxx是基本类型, 保存的是这个基本类型值
   * xxx是引用类型，保存的是这个引用类型的内存地址值
   * xxx是个变量，保存的是这个变量所存储的值(若是基本类型则就是这个值, 若是引用类型则是这个引用类型的内存地址值)
2. 引用变量赋值问题
   * 多个引用变量指向同一个对象, 通过一个变量修改这个对象的值, 另一个变量只能看到修改后的值
   * 两个引用变量指向同一个对象,将其中一个变量赋值为新对象, 另一个引用变量仍指向原对象
3. 在函数调用时是值传递还是引用传递
   * 理解1: 无论变量类型都是值(基本/地址值)传递
   * 理解2: 可能是值传递, 也可能是引用传递(地址值)
4. js如何管理内存
   * 内存生命周期
     1. 分配小内存空间, 得到它的使用权
     2. 存储数据, 可以重复使用
     3. 释放小内存空间
     4. 释放内存 
   * 释放内存
     1. 局部变量: 函数执行完自动释放
     2. 对象: 成为垃圾对象后在某个时间被垃圾处理机制释放
# 对象
1. 什么是对象
   * 多个数据的封装体
   * 用来保存多个数据的容器
   * 一个对象代表现实中的一个事物
2. 为什么要用对象
   * 统一管理多个数据
3. 对象的组成
   * 属性: 属性名(字符串)与属性值(任意类型)
   * 方法: 一种特别的属性(属性值是一个函数)
4. 如何访问对象内部数据
   * .属性名    编码简单, 有时无法使用
   * [\'属性名\'] 编码复杂, 但能随意使用
5. 什么时候必须使用[\'属性名\']
   * 属性名包含特殊字符, 如-. 空格
   * 属性名不确定时, 使用的是变量的值
# 函数 
1. 什么是函数
   * 实现特定功能的n条语句的封装体
   * 只有函数可以执行, 其他类型的数据不能执行
2. 为什么要用函数
   * 提高代码复用
   * 便于阅读交流
3. 如何定义函数
   * 函数声明
   * 表达式
4. 如何调用(执行)函数
   * 直接调用: test()
   * 通过对象调用: obj.test()
   * new调用: new test()
   * test.call/apply(obj): 临时让test函数变成obj的方法进行调用
# 回调函数
1. 什么函数属于回调函数
   * 自己定义过的
   * 自己没有调用的
   * 能被执行的(某个时刻或者某种条件下)
2. 常见的回调函数
   * dom事件回调函数-->发生事件的dom元素
   * 定时器回调函数-->window
   * ajax回调函数-->
   * 生命周期回调函数
# IIFE(立即调用函数表达式)
## 形式
```javascript
(function(){

})()
```
## 作用
* 隐藏实现
* 不会污染外部作用域

用法示例:
```javascript
(function(){
    var a = 0;
    function test(){
        console.log(++a);
    }
    window.$ = function(){
        return {test: test};
    }
})();
$().test()
//输出为1
```
# this
1. this是什么
   * 任何函数本质都是通过某个对象来调用的, 如果没有指定就是window
   * 所有函数内部都有一个变量this
   * 它的值是调用函数时的当前对象
2. 如何确定this的值
   * test() window
   * p.test() p
   * new test() 新创建的对象
   * p.call(obj) obj
# 原型与原型链
## 函数的prototype属性
* 每个函数都有一个prototype, 默认指向一个object空实例对象(原型对象), 但是Object除外, 它的prototype为null
* 原型对象有个constructor, 指向函数对象
```javascript
func.prototype.constructor === func;    //true
```
## 显式原型与隐式原型
* 每个函数function都有一个prototype, 即显式原型
* 每个实例对象都有一个__proto__, 即隐式原型
* 能够直接操作prototype但不能直接操作__prototype__(ES6之前)
```javascript
var Func = function(){
};
var func = new Func();
func.__proto__ === Func.prototype   //true
```
## 原型链
  别名：隐式原型链

作用：查找对象属性(方法)
1. 查找函数自身内部的方法
2. 如果函数自身内部没有这个方法就去找这个函数__proto__内的方法
3. 没有找到就沿着__proto__向上查找
4. Object的显式原型的隐式原型为null, 即原型链的尽头
### 构造函数/原型/实例对象的关系
* 对于每一个函数, 包括Oject构造函数, 都有一个隐式原型指向Function构造函数的显式原型, 即每一个函数都是Function构造函数的实例
* Function也是一个构造函数, 因此它的隐式原型指向它自己的显式原型, 即Function也是自己的实例
* prototype也是一个对象, 因此它的隐式原型指向Oject构造函数的显式原型, 即所有的prototype是Object构造函数的实例
* Object的显式原型也有隐式原型, 由于它已经是原型链的尽头所以值为null
## instance
1. instance是如何判断的
    * 表达式: `A instanceof B`
    * 如果B函数的显式原型在A函数的原型链上则返回true否则返回false
2. Function是通过new自己产生的实例
### 例子
```javascript
Function instanceof Object  //true  Function.__proto__.__proto__ === Object.prototype 
Object instanceof Object    //true  Object.__proto__.__proto__ === Object.prototype
Object instanceof Functon   //true  Object.__proto__ === Function.prototype
Function instanceof Function    //true  Function.__proto__ === Function.prototype
function foo(){}
Object instanceof foo   //false
```
## 面试题
测试题1
```javascript
var A = function(){};
A.prototype.n = 1;
var b = new A();
A.prototype = {
    n:2,
    m:3
}
var c = new A();
console.log(b.n,b.m,c.n,c.m);   //1 undefined 2 3
```
测试题2
```javascript
function F(){}
Object.prototype.a = function(){
    console.log("a");
}
Function.prototype.b = function(){
    console.log("b");
}
var f = new F();
f.a();  //a 
f.b();  //f.b() is not a function
F.a();  //a
F.b();  //b
```
# 执行上下文与执行上下文栈
1. 变量声明提升
   * 通过var定义的变量在这行定义语句前就能访问到
   * 值: undefined
2. 函数声明提升
   * 通过function声明的函数在声明之前就能访问到
   * 值: 通过function定义的函数本身
   * 先变量提升再函数提升
   * 在函数中使用未声明的变量会自动声明成全局变量
3. 执行上下文
   1. 代码分类
        * 全局代码
        * 函数代码
   2. 全局执行上下文
        * 在执行全局代码前将window确定为全局执行上下文
        * 对全局数据进行预处理
            * var定义的全局变量-->undefined, 添加为window的属性
            * function声明的全局函数-->赋值为这个函数, 将全局函数添加为window的方法
            * this-->赋值为window
        * 开始执行全局代码
    3. 函数执行上下文
        * 在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象
        * 对局部数据进行预处理
            * 声明形参变量-->赋值为实参-->添加为执行上下文的属性
            * arguments-->赋值为实参列表, 添加为执行上下文属性
            * var定义的局部变量-->赋值为undefined, 添加为执行上下文属性
            * function声明的函数-->赋值为这个函数本身, 添加为执行上下文方法
            * this-->赋值为调用这个函数的对象
        * 开始执行函数上下文
4. 执行上下文栈
    1. 全局代码执行前, JS引擎会创建一个上下文栈来存储管理执行上下文
    2. 在全局执行上下文(window)确定后, 将其添加到栈中
    3. 在函数执行上下文创建后, 将其添加到栈中
    4. 在当前函数执行完后, 将栈顶对象移除
    5. 当所有代码执行完毕后栈中只剩下window
5. 面试题
```javascript
var c = 1;
function c(c){
    console.log(c);
}
c(2);
```
# 作用域与作用域链
1. 分类
    * 全局作用域
    * 函数作用域
    * 没有块作用域(ES6有了)
2. 作用
    * 隔离变量
## 作用域与执行上下文
* 区别1
   * 函数作用域在函数定义时创建而非函数调用时
   * 全局执行上下文在全局作用域创建之后, JS代码执行之前创建
   * 函数执行上下文在调用函数时, 函数体代码未执行前创建
* 区别2
   * 作用域是静态的, 只要函数定义好后就一直存在且不会变化
   * 执行上下文是动态的, 调用函数时创建, 函数执行完成后自动销毁
* 联系
   * 作用域从属于所在的执行上下文
   * 全局作用域-->全局执行上下文
   * 函数作用域-->函数执行上下文
## 作用域链
1. 理解
   * 多个上下级关系的作用域形成的链的方向是从内向外的
   * 查找变量时是沿着作用域链来查找的
2. 查找上一个变量的查找规则
   1. 在当前作用域下的上下文中查找对应属性, 有则返回没有进入2
   2. 在上一级作用下的上下文中查找对应属性, 有则返回没有进入3
   3. 依次执行2直到处在全局作用域中, 在全局上下文中查找对应属性, 有则返回没有报错
# 闭包
1. 如何产生闭包
   * 当一个嵌套的内部函数引入了外部函数的变量就产生闭包, 与外部变量的值无关
2. 闭包是什么
   * 使用chrome调试, 可以看到的包含了被引用变量的对象Closure
3. 产生闭包的条件
   * 函数嵌套
   * 内部函数引用了外部函数的数据且已经被定义(函数表达式与函数声明存在区别)
   * 外部函数执行
4. 常见闭包
   * 将内部函数作为外部函数的返回值进行返回
   * 将函数作为一个实参传给另一个函数
5. 闭包的作用
   * 外部函数在执行完毕后能使它的内部变量仍然存留在内存中, 即延长了变量的生命周期
   * 未成为闭包中的变量会在外部函数执行完毕后被释放
   * 让函数外部可以操作到函数内部的数据但并非将变量直接暴露给外部
6. 闭包的生命周期
   * 在嵌套的内部函数定义时产生
   * 在嵌套的内部函数成为垃圾对象时
7. 闭包的应用
   1. 自定义js模块
        * 具有特定功能的js文件
        * 将所有数据和功能封装到函数内部
        * 只向外暴露一个有n个方法的函数或对象
        * 模块的使用者, 只需要通过模块暴露的函数或对象来使用模块的功能
```javascript
//方法1
function Mymodule(){
    var msg = "My test";
    function toUpperCase(){
        console.log(msg.toUppercase());
    }
    function toLowerCase(){
        console.log(msg.toLowerCase());
    }
    return {toUpperCase:toUpperCase, toLowerCase:toLowerCase};
}
var mymodule = Mymodule();
mymodule.toUpperCase();
mymodule.toLowerCase();
//方法2
(function(){
    var msg = "My test";
    function toUpperCase(){
        console.log(msg.toUppercase());
    }
    function toLowerCase(){
        console.log(msg.toLowerCase());
    }
    window.mymodule1 = {toUpperCase:toUpperCase, toLowerCase:toLowerCase};
})();
mymodule1.toUpperCase();
mymodule1.toLowerCase();
```
8. 闭包的缺点及解决办法
    * 缺点
        * 函数执行完后函数内的局部变量没有释放, 占用内存时间会变长
        * 容易造成内存泄露
    * 解决办法
        * 尽量不使用闭包
        * 尽早释放
9. 内存溢出
    * 程序运行时出现错误
    * 当程序需要的内存超出内存剩余的内存时
10. 内存泄露
    * 占用的内存没有及时释放
    * 内存泄露过多容易导致内存溢出
    * 常见的内存泄露
      * 意外的全局变量
      * 没有及时处理的计时器或回调函数
      * 闭包
11. 面试题
```javascript
//题目1
var name = "window";
var object = {
    name: "object",
    fn: function(){
        return function(){
        console.log(this.name);
        }
    }
}
object.fn()();  //"window"
var name = "window";
var object = {
    name: "object",
    fn: function(){
        var that = this;
        return function(){
        console.log(that.name);
        }
    }
}
object.fn()();  //"object"
//题目2
```
# 对象创建模式
## 方法1: Object构造函数模式
* 套路: 先new来创建空对象, 再动态添加新的属性/方法
* 使用场景: 起始时不知道对象内部的数据
* 问题: 语句太多
```javascript
var obj = new Object();
obj.name = "a";
obj.age = "1";
obj.setname = function(){
    this.name = "b";
};
```
## 方法2: 对象字面量模式
* 套路: 使用{}创建空对象, 再动态添加新的属性/方法
* 使用场景: 起始时已知对象内部的数据
* 问题: 如果创建多个对象, 代码会重复
```javascript
var obj = {
    name: "a",
    age: 1,
    setname: function(){
    this.name = "b";
    }
};
```
## 方法3: 工厂模式
* 套路: 使用工厂函数动态创建对象并返回
* 使用场景: 需要创建多个对象
* 问题: 对象没有具体类型, 都是Object
```javascript
function createPerson(name, age){
    var obj = new Object();
    obj.name = "a";
    obj.age = "1";
    obj.setname = function(){
    this.name = "b";
    };
    return obj;
}
```
## 方法4: 自定义构造函数
* 套路: 自定义构造函数, 使用new创建
* 使用场景: 需要创建多个类型确定的对象
* 问题: 如果实例化多次会使同样的方法重复占用内存空间
```javascript
function createPerson(name, age){
    this.name = "a";
    this.age = "1";
    this.setname = function(){
    this.name = "b";
};
}
```
## 方法5: 自定义构造函数+原型对象组合使用
* 套路: 自定义构造函数, 使用new创建, 添加方法时使用原型对象来添加
* 使用场景: 需要创建多个类型确定的对象
```javascript
function createPerson(name, age){
    this.name = "a";
    this.age = "1";
}
createPerson.prototype = {
    getname: function(){
    this.name = "b";
    }
}
```
# 继承模式
## 原型继承
**缺点是如果父函数有一个变量为引用类型, 任意一个实例修改这个变量会导致所有实例的相关属性被修改**

套路：
1. 构造父函数
2. 给父函数的原型添加新方法
3. 构造子函数
4. 使子函数的原型对象成为父函数的实例(关键一步, 此处使原型链能够继承)
5. 给子函数的原型对象添加新方法
```javascript
var sup = function(){
    var supP = "sup";
}
sup.prototype.showSup = function(){
    console.log(this.supP);
};
var sub = function(){
    var subP = "sub";
}
Sub.prototype = new Sup();  //sub.prototype.__proto__ = sup.prototype
console.log(Sub.prototype.constructor); //function sup(){...}, 不符合事实
Sub.prototype.constructor = Sub;    //修正constructor属性
Sub.prototype.showSub = function(){
    console.log(this.subP);
};
var sub = new Sub();
sub.showSup();  //"sup"
sub/showSub();  //"sub"
```
## 借用构造函数继承(假继承, 没有继承父类型方法)
**缺点是父类有方法时会被创建多次**

套路:
1. 创建父类型构造函数
2. 创建子类型构造函数
3. 在子类型构造函数中使用call/apply调用父类型构造函数
```javascript
var Person = function(name, age){
    this.name = name;
    this.age = age;
};
var student = function(name, age, price){
    Person.call(this, name, age);
    this.price = price;
}
var aa= new student('aa',11, 12)
```
## 寄生式继承
**缺点是方法没有放到原型中无法复用**

套路:
1. 创建父类型构造函数
2. 创建子类型构造函数
3. 在子类型构造函数中使用call/apply调用父类型构造函数
```javascript
var Person = function(o){
    var obj = Object.create(o); //返回一个隐式原型为o的实例
    obj.class = "student";
    obj.say = function(){
        console.log(this.name);
    }
    return obj;
};
var aman = {
    name: "tom",
    age: 16
}
var student = new Person(aman);
```
## 组合继承(借用构造函数继承+原型继承)
**缺点是构造函数执行了两次**

套路:
1. 创建父类型构造函数
2. 创建子类型构造函数
3. 在子类型构造函数中使用call/apply调用父类型构造函数
```javascript
var Person = function(name, age){
    this.name = name;
    this.age = age;
};
Person.prototype.setName = function(name){
    this.name = name;
};
Person.prototype.setAge = function(age){
    this.age = age;
};
var Student = function(name, age, price){
    Person.call(this, name, age);
    this.price = price;
}
Student.prototype = new Person("tom", 12);
Student.prototype.constructor = Student;
Student.prototype.setPrice = function(price){
    this.price = price;
};
var student = new Student('aa',1,2)
console.log(student)
```
# 进程与线程
## 进程
* 程序的一次执行, 在内存中占用一片独立的内存空间
## 线程
* 是进程里的一个独立执行单元
* 是程序执行的一个完整的流程
* 是CPU的最小调度
## 相关知识
* 应用程序必须运行在某个进程的某个线程上
* 一个进程中至少有一个运行的线程: 主线程, 进程启动后自动创建
* 一个进程中也可以同时运行多个线程
* 一个进程内的数据可以让其中多个线程共享
* 多个进程之间的数据是相互独立的
* 线程池: 保存多个线程对象的容器, 实现线程对象重复利用
## 比较单线程与多线程
* 多线程优点
    * CPU利用效率高
* 多线程缺点
    * 创建多线程开销
    * 线程间切换开销
    * 死锁与状态同步问题
* 单线程优点
    * 顺序编程简单易懂
* 单线程缺点
    * 效率低
## JS的单线程与多线程
* js单线程运行
* 使用H5的Web Workers可以多线程运行
## 浏览器运行是单线程还是多线程
多线程
## 浏览器运行是单进程还是多进程
有单进程如火狐与老版IE
也有多进程如chrome与新版IE
# 浏览器内核
* 支撑浏览器运行的最核心的程序
* 不同浏览器可能不一样
    * chrome, safari: webket
    * firefox: Gecko
    * IE: Trident
* 内核由多个模块组成
  
    **主线程模块**
    * js引擎模块, 负责js的编译与运行
    * html, css文档解析模块, 负责页面文本的解析
    * DOM/CSS模块, 负责DOM/CSS在内存中的相关处理
    * 布局和渲染模块, 负责页面的布局与效果的绘制
    * ...

    **分线程模块**
    * 定时器模块, 负责定时器管理
    * 事件响应模块, 负责事件的管理
    * 网络请求模块, 负责ajax请求
# 启动定时器
1. 定时器真的是定时执行吗
   * 无法保证真正定时执行
   * 一般会延迟一点, 也可能延迟很长时间
2. 定时器的回调函数是在分线程执行的吗
   * 不是, js是单线程的
3. 定时器如何实现的
   * 事件循环模型
# js的单线程执行
1. 如何证明js执行是单线程的
   * setTimeout()函数是在主线程执行的
   * 定时器回调代码只有在运行栈中的代码全部执行完后才执行
2. 为什么js要用单线程模式而不是多线程模式
   * 作为浏览器脚本语言主要用途在于与用户互动及操作DOM, 这决定必须为单线程执行, 否则有严重的同步问题
3. 代码分类
   * 初始化代码
   * 回调代码
4. js引擎执行代码的基本流程
   * 先执行初始化代码, 包含一些特殊代码
       * 设置定时器
       * 绑定监听
       * 发送ajax请求
   * 某个时刻后再执行回调代码
**使用alert()能暂停主线程执行与定时器计时**
# 事件循环模型
## 相关概念
* 执行栈
* 浏览器内核
* 回调队列
  * 消息队列
  * 任务队列
  * 事件队列
* 事件轮询(主线程队列与回调队列的事件执行顺序)
* 事件驱动模型(同步与异步的执行)
* 请求响应模型
# H5 Web Workers多线程
## 介绍
* Web Workers是HTML5的多线程解决方案
* 可以将一些大计算量的代码交由Web Workers运行而不冻结用户界面
* 但是子线程完全受主线程控制且不能操作DOM, 因此没有改变JS是单线程的属性
## 使用
* 创建在分线程执行的js函数
* 向主线程的js中发消息并执行回调
## 不足
* 慢
* 不能跨域加载js
* worker内代码不能操作dom
* 不是每个浏览器都支持
