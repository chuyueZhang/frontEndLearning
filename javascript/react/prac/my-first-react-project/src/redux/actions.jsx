import {INCREMENT, DECREMENT, ADDCOMMENT, DELETECOMMENT, GETCOMMENT} from './actionTypes'

export function increment(number){
    return {type: INCREMENT, data: number}
} 
export function decrement(number){
    return {type: DECREMENT, data: number}
}
export function incrementAsync(number){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment(number))
        }, 1000)
    }
}
export function addComment(comment){
    return {type: ADDCOMMENT, data: comment}
} 
export function deleteComment(index){
    return {type: DELETECOMMENT, data: index}
}
function getComment(comments){
    return {type: GETCOMMENT, data: comments}
}
export function getCommentAsync(comments){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(getComment(comments))
        }, 1000)
    }
}