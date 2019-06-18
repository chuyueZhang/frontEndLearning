<template>
    <div>
        <ul>
            <li>id: {{item.id}}</li>
            <li>name: {{item.name}}</li>
            <li>content: {{item.content}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['items'],
        data(){
            return {
                item: {}
            }
        },
        watch: {
            $route(value){
                this.item = this.items.find(item=>item.id===value.params.id*1)
            }
        },
        mounted(){
            this.id = this.$route.params.id
            this.item = this.items.find(item=>item.id===this.id*1)
        }
    }
</script>

<style>

</style>