<template>
    <div class="todo-footer">
        <label>
          <input type="checkbox" v-model="all"/>
        </label>
        <span>
          <span>已完成{{completedNum}}</span> / 全部{{todoLists.length}}
        </span>
        <button class="btn btn-danger" @click="clear">清除已完成任务</button>
    </div>
</template>

<script>

    import {mapState, mapActions, mapGetters} from 'vuex'
    export default {
        //原生方式
        // props: {
        //     todoLists: {
        //         type: Array,
        //         require: true
        //     }
        // },
        computed: {
          //原生方式
          // completedNum(){
          //   return this.todoLists.reduce((prev, current)=> prev += current.completed ? 1 : 0, 0)
          // },
          //vuex方式
          ...mapState(['todoLists']),
          ...mapGetters(['completedNum']),
          all: {
            get(){
              //原生方式
              // return this.completedNum===this.todoLists.length&&this.completedNum!==0 ? true : false
              //vuex方式
              return this.$store.getters.isAllSelected
            },
            set(bool){
              //原生方式
                // this.todoLists.map((v)=> v.completed=bool)
                //vuex
                this.$store.commit('setAllSelected', bool)
            }
          }
        },
        methods: {
          //原生方式
          // clear(){
          //   this.$emit('clear')
          // }
          //vuex方式
          ...mapActions(['clear'])
        }
    }
</script>

<style>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>