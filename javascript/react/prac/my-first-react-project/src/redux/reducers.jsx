import {INCREMENT, DECREMENT, ADDCOMMENT, DELETECOMMENT, GETCOMMENT} from './actionTypes'

export function counter(state=0, action){
    switch(action.type){
        case INCREMENT: return state + action.data
        case DECREMENT: return state - action.data
        default: return state
    }
}
export function comments(state=[], action){
    switch(action.type){
        case ADDCOMMENT: return [action.data, ...state]
        case DELETECOMMENT: {
            console.log(action.data) 
            return state.filter((comment, index)=>index!==action.data*1)
        }
        case GETCOMMENT: return action.data
        default: return state
    }
}