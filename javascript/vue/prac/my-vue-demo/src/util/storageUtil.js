export function getData(){
    return JSON.parse(window.localStorage.getItem('list_key'))||[]
}
export function setData(value){
    window.localStorage.setItem('list_key', JSON.stringify(value))
}