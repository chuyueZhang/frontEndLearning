<template>
    <div class="row">
        <form class="form-inline">
            <div class="form-group">
                <input type="text" class="form-control" name="name" v-model="name">
                <button class="btn btn-default" @click.prevent="search(name)">搜索</button>
            </div>
        </form>
    </div>
</template>

<script>
import Pubsub from 'pubsub-js'
    export default {
        data(){
            return {
                name: ''
            }
        },
        methods: {
            search(name){
                Pubsub.publish('search', name)
            }
        }
    }
</script>

<style>
.form-group>input{
    width: 200px !important;
}
</style>