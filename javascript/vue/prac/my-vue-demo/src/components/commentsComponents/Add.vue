<template>
    <div class="col-xs-12 col-md-5">
        <form action="/">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" class="form-control" id="username" placeholder="用户名" v-model="name"/>
            </div>
            <div class="form-group">
                <label for="comment">评论内容</label>
                <textarea class="form-control" rows="6" id="comment" placeholder="评论内容" v-model="content"></textarea>
            </div>
            <button class="btn btn-default" @click.prevent="add">提交</button>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            addComment: {
                type: Function,
                required: true
            }
        },
        data(){
            return {
                name: '',
                content: ''
            }
        },
        methods: {
            add(){
                const {name, content} = this
                this.addComment({name, content})
                this.name = ''
                this.content = ''
            }
        }
    }
</script>

<style>
button{
    float: right;
}
</style>