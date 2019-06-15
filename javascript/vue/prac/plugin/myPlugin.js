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
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
          console.log('myPlugin实例方法')
        }
    }
    window.myPlugin = myPlugin
})()