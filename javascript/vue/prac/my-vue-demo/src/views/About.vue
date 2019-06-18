<template>
    <div>
        <ul class="nav nav-tabs">
            <li role="presentation">
                <router-link to="/about/news" >News</router-link>
            </li>
            <li role="presentation">
                <router-link to="/about/messages">Messages</router-link>
            </li>
            
        </ul>
        <router-view :items="items"></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                items: []
            }
        },
        mounted(){
            setTimeout(()=>{
                this.items = [
                    {id: 1, name: '11111', content: 'aaaa'},
                    {id: 2, name: '22222', content: 'bbbb'},
                    {id: 3, name: '33333', content: 'cccc'}
                ]
            }, 1000)
        }
    }
</script>

<style>

</style>