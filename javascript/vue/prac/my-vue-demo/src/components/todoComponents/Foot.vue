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
    export default {
        props: {
            todoLists: {
                type: Array,
                require: true
            }
        },
        computed: {
          completedNum(){
            return this.todoLists.reduce((prev, current)=> prev += current.completed ? 1 : 0, 0)
          },
          all: {
            get(){
              return this.completedNum===this.todoLists.length&&this.completedNum!==0 ? true : false
            },
            set(bool){
                this.todoLists.map((v)=> v.completed=bool)
            }
          }
        },
        methods: {
          clear(){
            this.$emit('clear')
          }
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