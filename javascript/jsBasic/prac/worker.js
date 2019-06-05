
function fibolachi(n){
    return n <=2 ? 1 : fibolachi(n-2) + fibolachi(n-1);
}
onmessage = function(event){
    var result = fibolachi(event.data);
    postMessage(result);
}