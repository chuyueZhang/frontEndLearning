(function(){
    function add(num1, num2){
        return num1+num2
    }
    console.log(add(1,2))
})()
;(function(){
    var arr= [1,2,3,4,5,6].map(function(item){
        return item+10
    })
    console.log(arr)
})()