<template>
    <div class="container-fluid">
        <header><h1 class="container">react comment</h1></header>
        <div class="container">
            <div class="row">
                <Add :addComment="addComment" :comments="comments"/>
                <List :comments="comments" :deleteComment="deleteComment"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Add from './components/commentsComponents/Add.vue'
    import List from './components/commentsComponents/List.vue'
    export default {
      data(){
        return {
          comments: [
            {name: 'bob', content: 'hahaha'},
            {name: 'jerry', content: 'haha'},
            {name: 'jack', content: 'ha'}
          ]
        }
      },
      methods: {
        addComment(comment){
          for(let value in comment){
            value = value.trim()
          }
          const {name, content} = comment
          if(!name || !content){
            return alert('姓名与内容不能为空')
          }
          this.comments.unshift({
            name,
            content
          })
        },
        deleteComment(index){
          index*=1
          if(confirm('是否要删除此项评论?')){
            this.comments.splice(index, 1)
          }
        }
      },
      components: {
        Add,
        List
      }
    }
</script>

<style>
header{
    height: 300px;
    background-color: #ddd;
    line-height: 300px;
    text-align: center;
}
header>h1{
    display: inline-block;
}
</style>