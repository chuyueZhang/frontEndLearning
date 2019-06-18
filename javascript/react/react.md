# react
* [react参考文档](https://react.docschina.org/)
## react基本认识
* 声明式编程
* 组件化编程
* 跨平台编程
* 高效
  * 虚拟dom，不总是修改dom，可以减少更新次数
  * dom diff算法，最小化更新的dom数量
## 从demo学习
* 通过一些demo的案列来逐渐了解react中的思想
### react的hello world
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <!--默认将jsx语法转换成js语法 -->
     <script type="text/babel">          
        var vDom = <h1>hello world</h1>
        ReactDOM.render(vDom, document.getElementById('test1'))
    </script>
</body>
</html>
```
### jsx的基本认识
* 全称为javascriptXML
* 本质是react创建的类似于XML的js扩展
* 由于标签名与属性名任意所以叫做XML
* react提供一些api来创建一些*特别*的一般js对象
  * js语法 `var vDom = React.createElement('h1', {id: name.toLowerCase()}, content.toLowerCase())`
  * jsx语法 `var vDom = <h1 id={name.toLowerCase()}>content.toLowerCase()</h1>`
* 通过调用api会将虚拟DOM转换成真实的DOM
* 编码时只需要操作虚拟DOM对象，react会将其变化转换成真实DOM的变化
* 当标签内的变量是数组时，会被自动遍历返回数组内所有的值
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header><h1>javascript框架</h1></header>
    <div id="frame"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script type="text/babel">
        var arr = ['jquery', 'angular', 'vue', 'react', 'zepto']
        var vDom = <ul>{arr.map((item, index)=><li id={index}>{item}</li>)}</ul>
        ReactDOM.render(vDom, document.getElementById('frame'))
    </script>
</body>
</html>
```
### 组件
* jsx是面向组件编程
* 组件有两种创建方式
  1. 工厂函数简单组件，即一个返回值是标签的函数
  2. 类复杂组件，即一个继承自React.component的构造函数，子类的render方法返回值也是标签
* 在组件中返回的内容最上一层必须只有一个标签
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <div id="test2"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script type="text/babel">
        function MyComponent(){
            return <h2>工厂函数组件(简单组件)</h2>
        }
        class MyComponent1 extends React.Component{
            render(){
                return <h2>类组件(复杂组件)</h2>
            }
        }
        ReactDOM.render(<MyComponent />, document.getElementById('test1'))
        ReactDOM.render(<MyComponent1 />, document.getElementById('test2'))
    </script>
</body>
</html>
```
#### 组件的关键属性state
* state属性是一个对象，react通过监听这个属性的变化来修改虚拟DOM中的内容
* 在react想要更新虚拟DOM时是通过调用类组件的setState属性完成的
* 因此当组件涉及到state时就必须使用类组件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script type="text/babel">
        class MyComponent extends React.Component{
            constructor(props) {
                super(props)
                this.state = {
                    islike: true
                }
                this.handleClick = this.handleClick.bind(this)  //使用bind函数修改触发函数内的this值
            }
            handleClick() {
                console.log(this)       //默认为undefined
                var islike = !this.state.islike
                this.setState({islike: islike}) //只有通过这种方式修改的state才会重新加载虚拟DOM
            }
            render() {
                return <h1 onClick={this.handleClick}>{this.state.islike?'你喜欢我':'我喜欢你'}</h1>
            }
        }
        ReactDOM.render(<MyComponent />, document.getElementById('test1'))
    </script>
</body>
</html>
```
#### prop属性
* 当想要自定义组件内的数据时需要用到prop属性
* 当想给自定义属性设置默认值时需要用到组件的defaultProps属性
* 当给自定义属性添加变量检查时需要引入prop-types的包并且配置组件的propTypes属性
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script src="../lib/prop-types.js"></script>
    <script type="text/babel">
        let p = {
            name: 'aaa',
            age: 17,
            sex: '女'
        }
        Person.defaultProps = {
            age: 18,
            sex: '男'
        }
        Person.propTypes = {
            name: PropTypes.string.isRequired,  //设置此属性是string并且是必须的
            age: PropTypes.number,
            sex: PropTypes.string
        }
        function Person(props){
            return <ul><li>姓名：{props.name}</li><li>年龄：{props.age}</li><li>性别：{props.sex}</li></ul>
        }
        ReactDOM.render(<Person {...p} />, document.getElementById('test1'))    //使用三点运算符对对象进行解包操作，普通的对象没有迭代器不能如此操作
        ReactDOM.render(<Person name={'bbb'} />, document.getElementById('test1'))
    </script>
</body>
</html>
```
#### refs属性
* 用来标识虚拟DOM的元素
* 通过回调函数的形式将当前元素传递给回调函数
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script src="../lib/prop-types.js"></script>
    <script type="text/babel">
        class MyComponent extends React.Component{
            constructor(props){
                super(props)
                this.handleClick = this.handleClick.bind(this)
            }
            handleClick(){
                alert(this.input.value)
            }
            blur(e){
                alert(e.target.value)       //此事件是react按照W3C的规定封装的，与兼容性无关，如果要阻止此事件的默认行为必须调用e.preventDefault()来进行
            }
            render(){
                return (<div>
                    <input type='text' ref={input=>this.input=input}/>
                    &nbsp;&nbsp;<button onClick={this.handleClick}>点击触发事件</button>&nbsp;&nbsp;
                    <input type='text' onBlur={this.blur} spaceholder='失去焦点提示内容'/>
                    </div>)
                
            }
        }
        ReactDOM.render(<MyComponent />, document.getElementById('test1'))
    </script>
</body>
</html>
```
#### 功能界面的组件编码流程
1. 拆分组件：拆分界面抽取组件
2. 实现静态组件：使用组件实现静态化页面效果
3. 实现动态组件
   * 动态显示初始化界面
   * 交互功能(从绑定事件监听开始)
##### 状态数据保存位置
* 当只有一个组件使用这个数据时，将数据保存在这个组件中
* 当有多个组件使用时，保存在上一级的父组件中
##### 在子组件中改变父组件的状态
* 将父组件的状态传递给子组件中
* 状态在哪个组件，更新状态的行为就应该定义在哪个组件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script src="../lib/prop-types.js"></script>
    <script type="text/babel">
        class App extends React.Component{
            constructor(props){
                super(props)
                this.state = {
                    todos: ['吃饭', '睡觉', '打代码'],
                }
                this.add = this.add.bind(this)
            }
            add(value){     //将修改当前组件状态的代码封装到当前组件的方法中
                let {todos} = this.state
                todos.push(value)
                this.setState({todos})  //通过setState方法设置状态变化，否则无法生效
            }
            render(){
                //将父组件的数据传递给子组件
                return (
                    <div>
                        <h1>component TODO list</h1>
                        <Add todos={this.state.todos} add={this.add}/>  
                        <List todos={this.state.todos}/>
                    </div>
                )
            }
        }
        class Add extends React.Component{
            constructor(props){     //子组件通过props从父组件取得数据
                super(props)
                this.todos = props.todos
                this.add = props.add
                this.handleClick = this.handleClick.bind(this)
            }
            handleClick(){
                var inputValue = this.input.value.trim()        //对用户输入数据的整理与检查
                if(!inputValue){
                    alert('不能为空值')
                    return
                }else{
                    this.add(inputValue)        //调用封装到父组件中的方法
                    this.input.value = ''
                }
            }
            render(){
                return (
                    <div>
                        <input type="text" ref={input=>this.input = input}/>&nbsp;&nbsp;
                        <button onClick={this.handleClick}>add #{this.todos.length+1}</button>
                    </div>
                )
            }
        }
        Add.propTypes = {
                    todos: PropTypes.array.isRequired,
                    add: PropTypes.func.isRequired
                }
        class List extends React.Component{
            constructor(props){
                super(props)
                this.todos = props.todos
            }
            
            render(){
                return (
                    <ul>
                        {this.todos.map((item, index)=><li key={index}>{item}</li>)}
                    </ul>
                )
            }
        }
        List.propTypes = {
                    todos: PropTypes.array.isRequired
                }
        ReactDOM.render(<App />, document.getElementById('test1'))
    </script>
</body>
</html>
```
### 表单操作
* 在表单中有两种方法控制表单中元素的内容，第一种是通过操作DOM来实现叫做非受控组件，第二种是通过实时更新state来实现叫做受控组件
#### 非受控组件
* 核心在于通过ref属性来获取虚拟DOM中特定的DOM元素，然后对此DOM元素进行一系列操作，与原生或者jQuery的思想相同
#### 受控组件
* 核心在于通过给元素绑定事件，在每次进行各种操作时实时修改组件的状态来达到重新渲染组件的目的
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script src="../lib/prop-types.js"></script>
    <script type="text/babel">
        class FormComponent extends React.Component{
            constructor(props){
                super(props)
                this.handleClick = this.handleClick.bind(this)
                this.handleChange = this.handleChange.bind(this)
                this.state = {
                    pwd: ''
                }
            }
            handleClick(e){
                alert(`用户名为${this.input.value}，密码为${this.state.pwd}`)
                e.preventDefault()
            }
            handleChange(e){
                this.setState({     //实时更新state
                    pwd: e.target.value
                })
            }
            render(){
                //第一个input为非受控组件
                //第二个input为受控组件
                return (
                    <form action="test" method="GET">
                        <label htmlFor="user">用户名：</label><input id="user" type="text" placeholder="用户名" ref={input=>this.input=input}/>     
                        <label htmlFor="password">密码：</label><input id="password" type="text" placeholder="密码" onChange={this.handleChange}/>
                        <button onClick={this.handleClick}>提交</button>
                    </form>
                )
            }
        }
        ReactDOM.render(<FormComponent />, document.getElementById('test1'))
    </script>
</body>
</html>
```
### react的生命周期
* react的组件从创建，更新到销毁会有一系列的钩子函数被执行，这整个过程被称为生命周期
* 这些钩子函数已经被封装到`React.Component`中，因此子组件是否重写钩子函数是可选的
#### 生命周期的流程
1. 创建组件时(ReactDOM.render)
   1. constructor
   2. getDerivedStatesFromProps
   3. render
   4. componentDidMount
2. 更新组件时
   1. getDerivedStatesFromProps
   2. shouldComponentUpdate
   3. render
   4. componentDidUpdate
3. 销毁组件时(ReactDOM.unmountComponentAtNode)
   1. componentWillUnmount
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script src="../lib/prop-types.js"></script>
    <script type="text/babel">
        class Life extends React.Component{
            constructor(props){
                super(props)
                this.state = {
                    opacity: 1
                }
                this.interval = setInterval(() => {     //组件创建时初始化定时器
                    console.log('执行...')
                    if(this.state.opacity<=0) return this.setState({opacity: 1})
                    this.setState({opacity: this.state.opacity-0.1})
                }, 200);
            }
            handleClick(){
                ReactDOM.unmountComponentAtNode(document.getElementById('test1'))   //销毁组件
            }
            componentWillUnmount(){         //当组件将要销毁时执行此钩子，清除定时器
                clearInterval(this.interval)        
            }
            render(){
                let opacity = this.state.opacity
                //可以使用js对象来给元素定义样式
                return (
                    <div>
                    <h2 style={{opacity}}>{this.props.title}</h2>   
                    <button onClick={this.handleClick}>bye!</button>
                    </div>
                )
            }
        }
        Life.propTypes = {
            title: PropTypes.string.isRequired
        }
        ReactDOM.render(<Life title="hello!!"/>, document.getElementById('test1'))
    </script>
</body>
</html>
```
##虚拟DOM与Diff算法
* react效率高的两种原因
### react渲染页面的流程
1. 创建虚拟DOM树
2. 生成DOM树
3. 渲染页面
   1. 通过setState修改组件状态
   2. 生成新的虚拟DOM树
   3. 通过Diff算法比较新旧虚拟DOM树的区别
   4. 更新虚拟DOM树中的差异DOM到DOM树中
   5. 重新渲染页面
## react应用脚手架
* 通过使用脚手架能够快速构建基于某种库的模板项目
  * 包含了所有需要的配置
  * 包含了所有依赖
  * 可以安装/编译/运行一些简单的效果
* react提供了用来创建react项目的脚手架库:create+react+app
### 项目根目录下的package.json
* 分为三个核心部分
  1. 标识(name,version等)
     * 用来标记当前项目的一些信息
  2. 依赖(dependencies与devDependencies)
     * 用来记录当前项目使用了哪些依赖
  3. 运行脚本(scripts)
     * 用来给一些命令脚本创建成简单的别名，可以通过`npm [run] [命令]`来进行快速运行
## react的ajax请求
* react只关注界面，本身不带跟ajax相关的api
* 只能额外引入第三方库来完成ajax请求
### 常用的ajax第三方库
* jQuery： 比较大，如果只是用ajax部分不推荐引入
* axios：轻量级，建议使用
  * 本质是使用XMLHttpRequest
  * 是一种promise的形式
* fetch: 原生的一种异步请求
  * 老版本浏览器不支持
  * 可以使用fetch.js来进行浏览器兼容
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test1"></div>
    <script src="../lib/react.development.js"></script>
    <script src="../lib/react-dom.development.js"></script>
    <script src="../lib/babel.min.js"></script>
    <script src="../lib/prop-types.js"></script>
    <script src="../lib/axios.js"></script>
    <script type="text/babel">
        class MyComponent extends React.Component{
            constructor(props){
                super(props)
                this.state = {
                    name: '',
                    html_url: ''
                }
            }
            componentDidMount(){
                // axios.get('https://api.github.com/search/repositories?q=re&sort=stars')      //使用axios实现
                // .then(res=>{
                //     const {name, html_url} = res.data.items[0]
                //     console.log(name, html_url)
                //     this.setState({
                //         name,
                //         html_url
                //     })
                // }).catch(err=>{
                //     alert(err.message)
                // })
                fetch('https://api.github.com/search/repositories?q=re&sort=stars')         //使用fetch实现
                .then(res=>{
                    return res.json()
                }).then(data=>{
                    const {name, html_url} = data.items[0]
                    console.log(name, html_url)
                    this.setState({
                        name,
                        html_url
                    })
                }).catch(err=>{
                    alert(err.message)
                })
            }
            render(){
                if(!this.state.html_url){
                    return <h2>loading...</h2>
                }else{
                    return <h2>the most popular resposity is <a href={this.state.html_url}>{this.state.name}</a></h2>
                }
            }
        }
        ReactDOM.render(<MyComponent />, document.getElementById('test1'))
    </script>
</body>
</html>
```
## 组件间通信
* 实现两个案例：
  1. comment
  2. counter-react
  3. search
### 通过props传递
1. 共同的数据放在最近的父组件中，特有数据放在子组件中
2. 通过props可以传递一般数据与函数数据，只能一层层的传递
3. 一般数据用于父组件向子组件传递数据，子组件要读取父组件的数据
4. 函数数据用于子组件向父组件传递数据，父组件对读取到的子组件数据从函数中进行操作
### 使用消息订阅(subscribe)-发布(publish)传递
1. 可用PubSubjs第三方库来实现
2. 本质是事件监听与事件触发
### 通过redux来传递
...后面补充
## react-router
* react的一个插件库
* 常用来制作SPA
* 实现一个案例：
  1. router
### 路由的理解
* 一个路由就是一种映射关系(key-value)
* key为路由路径，value为Function(后台路由)/Component(前台路由)
#### 后台路由
* 接收到对应路由路径的请求时对客户端发来的数据进行处理并返回响应
#### 前台路由
* 接收到对应路由路径的请求时，浏览器不会发送http请求，但界面会更新对应的组件
### 创建路由的方式
1. 使用BrowserRouter/HashRouter创建自定义路由组件
2. 使用Link或者NavLink来创建路由链接
3. 使用Switch来在一个固定的位置只展示一个路由组件
4. 使用Route或者Redirect来指定自定义路由映射, 在path的属性中可以使用/index:path来让path成为占位符，可以使其在子组件的props.match.params中获取到
## react-UI
1. Material-UI
2. ant-Design-UI
## redux
* redux是一个专门用于状态管理的库，不是react库
* 可以用在vue，angular，react，但主要用于react
* 作用：管理react应用中多个组件共享的状态
* 将组件案例comment使用redux重写
### 运行机制
* react组件从Store中读取state
* react组件通过Action creators创建action然后dispatch产生的action
* Store将发布的previous state与action传递给Reducers
* Reducers产生newstate然后传递给store
### 使用redux的情况
* 尽量少用，但是基本都会使用，由于大项目使用会轻松
* 某个组件的状态需要共享
* 某个状态要在任何地方都能拿到
* 一个组件需要改变全局的状态
* 一个组件需要改变另一个组件的状态
### redux的三个核心对象
#### action
* 标识要执行行为的对象
* 包含两个方面的属性
  * type    标识属性，必选
  * data    传递的数据，可选
* 例子：
```javascript
const action = {
    type: 'INCREMENT',
    data: 2
}
```
* Action creator(创建action的工厂函数)
```javascript
const icrement = (number)=>({type: 'INCREMENT'， data: number})
```
#### reducer
* 根据老的state和action, 产生新的state的函数
```javascript
export default function counter(state=0, action){
    switch(action.type){
        case 'INCREMENT': return state+action.data
        case 'DECREMENT': return state-action.data
        default: return  state
    }
}
```
* 要返回一个新的状态
* 不能修改原有的状态
#### store
* 将state，action和reducer联系到一起的对象
* 得到store对象
```javascript
import {createStore} from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
```
* 三个核心方法
  * dispatch(action)
  * createStore(reducer)
  * subscribe(render)
### react插件react-redux
* 用来减轻redux在react中的耦合度
#### 核心api
* Provider
  * 让所有组件都可以得到state的数据
```jsx
ReactDOM.render(<Provider store={store}><app /></Provider>, document.getElementById('app'))
```
* connect
  * 连接redux与UI组件之间的数据关系
  * 用于包装UI组件生成容器组件
```jsx
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```
### redux异步编程
* 使用redux中间件实现异步编程
* 安装
```
install i redux-thunk
```
* 配置中间件
```javascript
import {createStore, applyMiddleware} from 'redux'
createStore(
    reducer, //内部会第一次调用reducer来初始化state
applyMiddleware(thunk)
)
```
* 使用
```javascript
export function incrementAsnyc(number){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch({type: 'INCRMENT', data: number})
        }, 1000)
    }
} 
```
### redux调试工具
* 安装
  1. 安装chrome插件
  2. 安装依赖
```
install i redux-devtools-extension
```
* 配置
```jsx
import {composeWithDevtools} from 'redux-devtools-extension'
createStore(
    reducer, //内部会第一次调用reducer来初始化state
composeWithDevtools(applyMiddleware(thunk))
)
```
### 使用redux管理多个reducer
* 使用redux的combineReducers将需要管理的属性封装成一个对象
```jsx
export default combineReducers({
    counter,
    comments
})
```
