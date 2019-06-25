import  {INCREMENT, DECREMENT, ADDITEM, CLEAR, INITIAL, DELETEITEM, SETALLSELECTED} from './mutation-type'
export default {
    [INCREMENT](state){
        state.count++
    },
    [DECREMENT](state){
        state.count--
    },
    [INITIAL](state, data){
        state.todoLists = data
    },
    [ADDITEM](state, data){
        state.todoLists.unshift(data)
    },
    [CLEAR](state, data){
        state.todoLists.splice(0, state.todoLists.length,...data)  
    },
    [DELETEITEM](state, index){
        state.todoLists.splice(index, 1)
    },
    [SETALLSELECTED](state, bool){
        state.todoLists.map((v)=> v.completed=bool)
    }
}