<template>
    <div>
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <router-link :to="'/about/messages/'+item.id">{{item.name}}</router-link>
                <button @click="push(item.id)" class="btn btn-default btn-sm">push</button>
                <button @click="replace(item.id)" class="btn btn-default btn-sm">replace</button>
            </li>
        </ul>
        <button @click="back" class="btn btn-default btn-sm">back</button>
        <router-view :items="items"></router-view>
    </div>
</template>

<script>
    export default {
        props: ['items'],
        data(){
            return {

            }
        },
        methods: {
            push(id){
                this.$router.push('/about/messages/'+id)
            },
            replace(id){
                this.$router.replace('/about/messages/'+id)
            },
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style>

</style>