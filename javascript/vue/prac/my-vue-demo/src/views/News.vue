<template>
    <div>
        <h3>hello inner router!</h3>
        <ul>
            <li v-for="(item, index) in items" :key="index">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['items']
    }
</script>

<style>

</style>