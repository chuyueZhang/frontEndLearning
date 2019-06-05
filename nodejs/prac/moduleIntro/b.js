let foo = function(a,b){
    return a+b
}
let a = 1
exports.runFoo = (x, y)=>{
    console.log(a)
    return foo(x, y)
    
}