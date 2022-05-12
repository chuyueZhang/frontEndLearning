var getStyle = function(obj, styleName){
    return parseInt(window.getComputedStyle && window.getComputedStyle(obj, null)[styleName] || obj.currentStyle[styleName]);
};
/* 
 * @param {*要执行动画的对象} obj 
 * @param {*要执行动画的样式} attr 
 * @param {*执行动画的目标位置 } endPoint 
 * @param {*移动速度(正负不代表方向)} speed 
 * @param {*动画执行完成时的回调函数} callback 
 */
var move = function(obj, attr, endPoint, speed, callback){
    //清除上一个timer，作用是避免给一个对象挂载多个timer导致动画加速
    clearInterval(obj.timer);
    //获取对象指定属性的当前值
    var objAttrVal = parseInt(getStyle(obj, attr));
    //移动方向由当前位置与目标位置的关系决定，
    //如果当前位置大于目标位置，则往反方向移动(默认正方向为向右或向下)
    if(objAttrVal > endPoint){
        speed = -speed;
    }
    //给对象添加自定义属性timer，好处是每个对象管理自己的timer，同时不需要全局timer的管控
    obj.timer = setInterval(function(){
        objAttrVal = parseInt(getStyle(obj, attr));
        obj.style[attr] = objAttrVal + speed + "px";
        //判定对象是否到达目标位置
        if ((speed < 0 && objAttrVal <= endPoint) || (speed > 0 && objAttrVal >= endPoint)) {
            obj.style[attr] = endPoint + "px";
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
};