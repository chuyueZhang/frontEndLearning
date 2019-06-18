<template>
    <div>
        <ul class="todo-main">
            <Item v-for="(todoList, index) in todoLists" :key="index" :index="index" :todoList="todoList"/>
        </ul>
    </div>
</template>

<script>
import Item from './Item'
    export default {
        props:{
            todoLists: {
                type: Array,
                require: true
            }
        },
        data(){
            return {}
        },
        components: {
            Item
        }
    }
</script>

<style>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>