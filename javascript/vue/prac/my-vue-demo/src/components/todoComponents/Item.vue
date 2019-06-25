<template>
    <li>
        <label>
            <input type="checkbox" v-model="todoList.completed"/>
            <span>{{todoList.content}}</span>
        </label>
        <button class="btn btn-danger" style="display:none" @click="deleteItem(index)">删除</button>
    </li>
</template>

<script>
// 订阅发布方式
// import Pubsub from 'pubsub-js'
    export default {
        props:{
            todoList: {
                type: Object,
                require: true
            },
            index: {
                type: Number,
                require: true
            }
        },
        data(){
            return {
                display: {dislay: 'none', backgroundColor: 'white'}
            }
        },
        methods: {
            //原生方式
            // delteItem(index){
            //     Pubsub.publish('deleteItem', index)
            // }
            //vuex方式
            deleteItem(index){
                this.$store.dispatch('deleteItem', index)
            }
        }
    }
</script>

<style>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li:hover{
    background-color: #aaa;
}
li:hover button{
    display: inline-block!important;
}
li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

</style>