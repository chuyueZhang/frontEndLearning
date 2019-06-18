import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Messages from '../views/Messages.vue'
import Item from '../views/Item.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About,
            children: [
                {
                    path: '/about/news',
                    component: News
                },
                {
                    path: '/about/messages',
                    component: Messages,
                    children: [
                        {
                            path: '/about/messages/:id',
                            component: Item
                        }
                    ]
                },
                {
                    path: '/about',
                    redirect: '/about/news'
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ]
})