<template>
    <div class="container">
        <header>
            <h3 class="text-center">search github</h3>
            <Search></Search>
        </header>
        <div class="row">
            <div v-if="firstAccess">请输入用户名开始搜索</div>
            <div v-if="!firstAccess&&!loading&&items.length===0">无对应用户名</div>
            <div v-if="loading">loading...</div>
            <Content v-for="(user, index) in items" :key="index" :user="user"></Content>
        </div>
    </div>
</template>

<script>
import Pubsub from 'pubsub-js'
import axios from 'axios'
import Search from './components/searchComponents/Search.vue'
import Content from './components/searchComponents/Content.vue'
    export default {
        data(){
            return {
                firstAccess: true,
                loading: false,
                items: []
            }
        },
        components: {
            Search,
            Content
        },
        mounted(){
            Pubsub.subscribe('search', ()=>{
                this.firstAccess = false
                this.loading = true
                axios.get(`https://api.github.com/search/users?q=${this.name}`)
                .then(res=>{
                    let items = res.data.items
                    items = items.map(item=>({name: item.login, url: item.avatar_url, href: item.html_url}))
                    this.items = items
                    
                    this.loading = false
                })
            })
        }
    }
</script>

<style>
header{
    padding: 30px 0 0 20px;
    background-color: #aaa;
}
</style>