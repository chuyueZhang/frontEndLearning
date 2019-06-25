import  {INCREMENT, DECREMENT, ADDITEM, CLEAR, INITIAL, DELETEITEM} from './mutation-type'
import {getData} from '../util/storageUtil'
export default {
    increment({commit}){
        commit(INCREMENT)
    },
    decrement({commit}){
        commit(DECREMENT)
    },
    increseWhenOdd({commit, getters}){
        getters.isOddOrNot?commit(INCREMENT): ''
    },
    increseAsync({commit}){
        setTimeout(()=>commit(INCREMENT), 1000)
    },
    initial({commit}){
        const data = getData();
        commit(INITIAL, data)
    },
    addItem({commit}, list){
        if(!list.content){
            return alert('不能为空！')
        }
        const{content ,completed} = list
        commit(ADDITEM, {content, completed})
    },
    clear({commit, state}){
        const a = state.todoLists.filter(v=>v.completed!==true)
        commit(CLEAR, a)
    },
    [DELETEITEM]({commit, state}, index){
        if(confirm(`是否要删除${state.todoLists[index].content}？`)){
            commit(DELETEITEM, index)
        }
    }
}