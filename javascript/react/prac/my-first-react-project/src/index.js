import React from 'react'
import ReactDOM from 'react-dom'
// import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
// 评论练习
import App from './components/comment/comment-app/comment-app'
// 查找github头像练习
// import App from './components/search/search-app/search-app'
// 路由练习
// import App from './components/router/router-app/router-app'
// redux的加减练习
import {store} from './redux/store'
// import App from './components/counter-react/counter-app/counter-app'
// 纯redux重新渲染
// function render(){
//     ReactDOM.render(<BrowserRouter><App store={store}/></BrowserRouter>, document.getElementById('app'))
// }
// render()
// store.subscribe(render)
// 用react-redux
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))