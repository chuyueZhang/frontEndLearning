# 初识jQuery
## what
* 一个优秀js函数库
* 使用了jQuery的网站超过90%
* 中大型WEB项目开发首选
* write less, do more
## why
* HTML元素选取(选择器)
* HTML元素操作
* CSS操作
* HTML事件处理
* JS动画效果
* 链式调用(每个方法返回值为this)
* 读写合一(读是针对第一个，写针对是所有)
* 浏览器兼容
* 隐式遍历
* 易扩展插件
* ajax封装
* ...
## how
1. 引入jq库
2. 使用jq文件
* jQuery核心函数:   `$/jQuery`
* jQuery核心对象:   执行`$()`返回的对象
* 区别两种js库库文件
* 开发版
* 生产版
* 区别两种引入js库库文件的方式
* 本地引入库
* CDN库远程引入
    * 减轻自己服务器的压力
* jQuery的不同版本
* 1.X
    * 兼容老版本IE
    * 文件更大
* 2.X
    * 部分API不支持IE8及以下版本
    * 文件小且执行效率高
* 3.X
    * 完全不再支持IE8及以下版本
    * 提供了一些新的API
    * 提供不包含ajax/动画API的版本
# jQuery两把利器
## jQuery核心函数
* 简称: jQuery函数(`$/jQuery`)
* jQuery库向外暴露的只有`$/jQuery`
  * 当函数用\$()
    * 参数为函数: 当dom加载完成后执行此回调函数
    * 参数为选择器字符串：查找匹配的标签并将它封装成jQuery对象
    * 参数为dom对象：将dom对象封装成jQuery对象
    * 参数为html标签字符串：创建标签对象并将其封装成jQuery对象
```javascript
//点击按钮后获取一个id为msg1的文本框的值并显示
//显示后新增一个文本框到dom树种
$(function(){
    var msg1 = $('#msg1');
    $('#btn').onclick(function(){
        console.log(this);  //在jq事件的回调函数中, this值与原生js相同都是dom对象
        alert(msg.val());
        $('<input type="text" id="msg3">').appendTo('div');
    })
});
```
  * 当对象用`$.()`
    * `$.each`
    * `$.trim`
```javascript
//隐式循环遍历数组
var arr = [1,2,3,4,5];
$.each(function(index, item){
    console.log('索引：'+index+' 值：' +item);
});
```
## jQuery核心对象
* 简称: jQuery对象
* 得到jQuery对象: 执行jQuery函数后返回的就是对象
### 理解
* jq对象内部包含所有匹配的任意多个dom元素对象的伪数组(可能只有一个元素)
* jq对象拥有许多有用的属性与方法来方便操作dom
### 基本行为
* `size()/length`   返回包含的dom元素对象数量
* `[index]/get(index)`  通过index来查找第index个dom对象
* `each()`  通过传入回调函数来遍历dom对象
```javascript
//读取dom元素方法1
var $buttons = $('button');
$buttons.each(function(index, domele){
    console.log(domele.innerHTML);
});
//读取dom元素方法2
var $buttons = $('button');
$buttons.each(function(){
    console.log(this.innerHTML);    //在回调函数中的this指当前遍历中的dom元素
});
```
* `index()` 返回当前jq对象在所在兄弟元素中的位置下标
## 伪数组
* 是Object对象
* length属性
* 数组下标属性
* 没有数组的特别方法，如foreach, concat等
## 选择器
### $(selector)
* 就是css选择器的格式
* 返回封装好的jq对象
### 基本选择器
`$('#div').css('background', 'red')`

`$('#div').css({background: 'red'})`
### 层次选择器
`$('#div div').css('background', 'red')`
### 过滤选择器
`$('input[name="div1"]').css('background', 'red')`

`$('#div:no(.box)').css({background: 'red'})`   //只要class不为box就被选中, 包括没有class

`$('input:gt(0):lt(2)').css('background', 'red')`   //多个过滤选择器是按顺序执行不是同时执行，此结果为第2个与第3个元素

`$('input:contains("a")').css('background', 'red')`   //选中内容为a的input元素
### 表单选择器
`$(':text:disabled').css('bakcground', 'red')`  //选中不可用的单行文本框
`$(':checkbox:checked').css('bakcground', 'red')`   //选中已经被选择的多选按钮
## 工具方法
### $.each(obj, fn)
### $.trim(str)
### $.type(obj)
### $.isArray(obj)
### $.isFunction(obj)
### $.parseJSON(JSON)   //转化为js对象/数组
## 属性
### $('div').attr('name')   //读取name属性
### $('div').attr('name', 'a')  //设置name属性
### $('checkbox').prop('checked', true)  //设置checked布尔值属性, 设置布尔值必须用prop方法
### $('div').removeAttr('name')  //移除name属性
### $('div').addClass('a')  //添加class属性
### $('div').removeClass('a')  //移除class属性
### $('div>li:last').html()  //得到最后一个li的标签体文本
### $('div>li:last').html('<li>aaaaa</li>')  //设置最后一个li的标签体文本
# CSS模块
## CSS
### $('#div').css('background')    //读取css样式
### $('#div').css('background', 'red')`   //设置css样式
### $('#div').css({background: red, width: 30, height: 30})   //设置多个样式
## 位置
### offset([obj])
* 不加参数返回相对页面左上角的偏移量
* 加参数设置偏移量, 必须同时top和left
### position()
* 相对父元素左上角的偏移量
* 不能设置偏移量
* 返回值是有left与right属性的对象
### scrollTop([val])
* 不设置参数获取元素的垂直滚动像素
* 设置参数设置元素的垂直滚动像素
* 在chrome与火狐中, 浏览器滚动条的滚动像素在body上
* 在IE中, 浏览器滚动条的滚动像素在html上
### scrollLeft([val])
* 与垂直滚动类似
## 尺寸
* width()/height()  //内容区, 可加参数设置长宽
* innerWidth()/innerHeight()    //内容区加内边距
* * outerWidth()/outerHeight()  //内容区加内边距加边框
* outerWidth(true)/outerHeight(true)    //内容区加内边距加边框加外边距
# 筛选
## 过滤
### $('li').first().css('background', 'red')    //li中的第一个jq对象
### $('li').last().css('background', 'red')    //li中的最后一个jq对象
### $('li').eq(1).css('background', 'red')    //li中的第二个jq对象
### $('li').filter('[title][title="a"]').css('background', 'red')    //li中的有title属性且为a的jq对象
### $('li').filter('[title]').filter('[title="a"]').css('background', 'red')    //li中的有title属性且为a的jq对象
### $('li').has('span').css('background', 'red')    //li的后代元素中至少有一个span子元素的
### $('li').not('[title]').css('background', 'red')    //没有title属性的li标签
## 查找
### $('ul').children('span:eq(1)')  //ul中的第二个span子元素
### $('ul').find('span:eq(1)')  //ul中的第二个span后代元素
### $('ul').parent()  //ul的父元素
### $('ul').siblings()  //ul的所有兄弟元素
### $('ul').prevAll()  //ul的所有在它前面的兄弟元素, 从最近一个开始倒序查找
### $('ul').nextAll()  //ul的所有在它后面的兄弟元素
# 文档处理
## 内部插入
### `$('ul').append('<p>a</p>')`  //向ul中的最后插入p标签
### `$('<p>a</p>').appendTo($('ul'))`  //将p标签插到ul中的最后
### `$('ul').prepend('<p>a</p>')`  //向ul中的最前插入p标签
### `$('<p>a</p>').appendTo($('ul'))`  //将p标签插到ul中的最前
## 外部插入
### `$('ul').before(htmlString | Element | Array | jQuery)`  //向ul的前面插入元素
### `(htmlString | Element | Array | jQuery).insertBefore($('ul'))`  //将元素插入到ul标签之前
### `$('ul').after(htmlString | Element | Array | jQuery)`  //向ul的后面插入元素
### `(htmlString | Element | Array | jQuery).insertAfter($('ul'))`  //将元素插入到ul标签之后
## 替换
### `$('ul').replaceWith('<p>a</p>')`  //用p标签替换ul标签
### `$('ul').replaceAll(Selector | jQuery | Array | Element)`  //用匹配到的元素替换ul标签
## 移除
### $('ul').empty()  //清空ul内部子节点
### $('ul').remove('li')  //清空ul内部li标签
# 事件
## 页面载入
* ready(fn)
## 事件处理
* `.event()`
* .on(event, [selector, ][data, ]fn)
* .off([event,][selector, ][fn])
## mouseover与mouseenter的区别
* mouseover对应mouseout
    
    内部有子元素时, 移入子元素会触发父元素的mouseout事件
* mouseenter对应mouseleave

    内部有无子元素时没有区别
## 事件委托
* delegate()    //老方法
* on()      //新方法
## 事件坐标
* event.offsetX     //距离当前元素左上角
* event.clientX     //距离视图左上角
* event.pageX       //距离页面左上角
## 事件相关
* 停止冒泡
  
  stopPropagation()
* 阻止默认行为
  preventDefault()
##内置动画  
### 改变透明度
* fadeOut([speed][,easing][,fn]) //淡出
* fadeIn([speed][,easing][,fn]) //淡入
* fadeTaggle([speed][,easing][,fn]) //切换淡入淡出
* fadeTo([speed]opacity[,easing][,fn]) //指定透明度
### 改变高度
* slideDown([speed],[easing],[fn]) //收缩
* slideUp([speed][,easing][,fn]) //展开
* slideTaggle([speed][,easing][,fn]) //切换
### 改变透明度和宽高, 默认没有动画
* show([speed],[easing],[fn]) //收缩
* hiden([speed][,easing][,fn]) //展开
* taggle([speed][,easing][,fn]) //切换
### 自定义动画
* animate(params,[speed],[easing],[fn]) //链式调用可以指定先后效果, 在参数中设置'+=n'或者'-=n'是调整属性变化值
## 多库共存
让jQuery将变量$的控制权让渡给别的实现它的库
* jQuery.noConflict([extreme])
```javascript
var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {  //当参数为true时将jQuery也释放
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};
```
# onload与ready的区别
* onload在图片加载完后执行并且只能绑定一个监听回调
* ready在页面加载完后执行, 比较快并且可以绑定多个监听回调
# 自定义jq插件
## 扩展插件
### 扩展jQuery函数的工具对象
* `$.extend(obj)`
### 扩展jQuery对象的工具对象
* `$.fn.extend(obj)`
## jQuery-validation
### 表单验证
* 参考源码里的例子
* 给标签添加属性来制定验证规则
* 使用$().validate(obj)来开启验证
## jQuery UI
### 大型jQuery插件包含各种子插件
## laydate