var getStyle = function(obj, styleName){
    return parseInt(window.getComputedStyle && window.getComputedStyle(obj, null)[styleName] || obj.currentStyle[styleName]);
};
var move = function(obj, endPoint, speed, dir, callback){
    switch(dir){
        case 1:
            dir = "left";
            break;
        case 2:
            dir = "top";
            break;
        default:
            dir = "left";
            break;
    }
    clearInterval(obj.time);
    var objdir = getStyle(obj, dir);
    if(objdir > endPoint){
        speed = -speed;
    }
    obj.time = setInterval(function(){
        objdir = getStyle(obj, dir);
        obj.style[dir] = objdir + speed + "px";
        if(speed < 0){
            if(objdir <= endPoint){
                obj.style[dir] = endPoint + "px";
                clearInterval(obj.time);
                callback && callback();
            }
        }else{
            if(objdir >= endPoint){
                obj.style[dir] = endPoint + "px";
                clearInterval(obj.time);
                callback && callback();
            }
        }
    }, 30);
};