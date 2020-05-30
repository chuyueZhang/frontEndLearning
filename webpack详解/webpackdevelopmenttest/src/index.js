import './index.css'
import './index.less'
import './iconfont.css'
import print from './print'

let add = (a, b) => a+b
console.log('加载index.js')
console.log(add(2,3))
console.log(add(4,3))
print()
if(module.hot) {
    module.hot.accept('./print.js', () => {
        console.log('启动print.js HMR')
    })
}