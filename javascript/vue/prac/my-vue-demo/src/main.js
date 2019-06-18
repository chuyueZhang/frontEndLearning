import Vue from 'vue'
// import App from './CommentsApp.vue'
// import App from './TodoApp.vue'
// import App from './SearchApp.vue'
import App from './RouterApp.vue'
import router from './router/VueRouter'
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />',
  router
})