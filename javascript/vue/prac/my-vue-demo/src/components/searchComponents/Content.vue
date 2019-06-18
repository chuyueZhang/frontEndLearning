<template>
    <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
        <img :src="user.url" :alt="user.name">
        <div class="caption">
            <p class="text-center"><a :href="user.href">{{user.name}}</a></p>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style>
.thumbnail>img{
    width: 200px;
    height: 200px;
}
</style>