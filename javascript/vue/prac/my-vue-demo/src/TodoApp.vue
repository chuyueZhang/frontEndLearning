<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Head/>
            <!-- 原生方式
            <List :todoLists="todoLists"/>
            <Foot :todoLists="todoLists" @clear="clear"/> -->
            <!-- vuex -->
            <List/>
            <Foot/>
        </div>
    </div>
</template>

<script>
// 通过订阅发布控制状态
// import Pubsub from 'pubsub-js'
import Head from './components/todoComponents/Head.vue'
import List from './components/todoComponents/List.vue'
import Foot from './components/todoComponents/Foot.vue'
import {setData} from './util/storageUtil'
    import {mapState} from 'vuex'
    export default {
        //原生方式
        // data(){
        //     return {
        //         todoLists: getData()
        //     }
        // },
        //vuex方式
        computed: {
            ...mapState(['todoLists'])
        },
        watch: {
            todoLists: {
                deep: true,
                handler: setData
            }
        },
        methods: {
            //原生方式
            // addList(list){
            //     if(!list.content){
            //         return alert('不能为空！')
            //     }
            //     const{content ,completed} = list
            //     this.todoLists.unshift({content, completed})
            // },
            // clear(){
            //     const a = this.todoLists.filter(v=>v.completed!==true)
            //     this.todoLists.splice(0, this.todoLists.length, ...a)  
            // }
        },
        components: {
            Head,
            List,
            Foot
        },
        mounted(){
        // 通过订阅发布管理状态
        //     Pubsub.subscribe('deleteItem', (msg, index)=>{
        //         if(confirm(`是否要删除${this.todoLists[index].content}？`)){
        //             this.todoLists.splice(index, 1)
        //         }
        //     })
        // }
        this.$store.dispatch('initial')
        }
    }
</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>