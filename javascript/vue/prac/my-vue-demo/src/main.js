import Vue from 'vue'
// import App from './CommentsApp.vue'
import App from './TodoApp.vue'
// import App from './SearchApp.vue'
// import App from './RouterApp.vue'
// import router from './router/VueRouter'
// import App from './CounterApp.vue'
import store from './store'
new Vue({
  el: '#app',
  render: r=>r(App),
  store
  // router
})