export default {
    isOddOrNot(state){
        return state.count%2===1 ? true : false
    },
    completedNum(state){
        return state.todoLists.reduce((prev, current)=> prev += current.completed ? 1 : 0, 0)
    },
    isAllSelected(state, getters){
        return getters.completedNum===state.todoLists.length&&getters.completedNum!==0 ? true : false
    }
}