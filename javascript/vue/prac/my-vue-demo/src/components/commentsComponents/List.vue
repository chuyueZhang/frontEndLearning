<template>
    <div class="col-xs-12 col-md-7">
        <h2>评论回复:</h2>
        <h3 v-show="comments.length===0">暂无评论，点击左侧添加！！</h3>
        <Item v-for="(comment, index) in comments" :comment="comment" :key="index" :deleteComment="deleteComment"/>
    </div>
</template>

<script>
    import Item from './Item.vue'
    export default {
        props: {
            comments: {
                type: Array,
                required: true
            },
            deleteComment: {
                type: Function,
                required: true
            }
        },
        components: {
            Item
        }
    }
</script>

<style>

</style>