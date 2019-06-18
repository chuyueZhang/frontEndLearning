<template>
    <div class="item">
        <h3>{{comment.name}}说:</h3>
        <div>{{comment.content}}</div>
        <button class="btn btn-default btn-sm" @click="deleteComment(key)">删除</button>
    </div>
</template>

<script>
    export default {
        props: {
            comment: {
                type: Object,
                required: true
            },
            key: {
                type: Number,
                required: true
            },
            deleteComment: {
                type: Function,
                required: true
            }
        }
    }
</script>

<style>
.item{
    position: relative;
    width: 100%;
    height: 100px;
    padding-left: 10px;
    border: 1px solid rgb(209, 209, 209);
}
.item button{
    position: absolute;
    right: 20px;
    top: 0;
    color: rgb(111, 111, 255);
}
</style>