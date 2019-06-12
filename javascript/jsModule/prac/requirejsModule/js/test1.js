
define(['test2'], test2=>{
    function sayHello(){
        console.log('this is test1')
    }
    return {
        test2SayHello: test2.sayHello,
        test1SayHello: sayHello
    }
})