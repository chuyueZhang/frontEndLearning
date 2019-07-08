# attribute与property
## attribute属性
* HTML中的预定义与自定义属性, 在js中被一个叫做attributes的property所维护
## property属性
* JS原生对象的直接属性
## 两者间的转换关系
### 对非布尔值属性而言
* 实时同步
### 对布尔值属性而言
* property永远不会同步attribute
  #### 没有修改过property时
  * attribute会同步property
  #### 修改过property时
  * attribute不会再同步property
* 在浏览器中被识别的和用户所操作的都是property
# H5中的一些小功能
## class
* 由于class是关键字因此JS可以通过className属性来访问标签的class值
* 直接使用className来添加删除class不够方便, H5新增了classlist对象属性
* classlist是个伪数组, 其中有add, remove, toggle方法来增删class
## 自定义属性
* 在H4中只能通过setAttribute方法来修改自定义HTML属性
* 在H5中新增dataset对象来保存自定义的HTML属性
* 想要将自定义属性添加到dataset对象时需要以data-开头, 自定义HTML属性使用-分隔单词(`data-my-test`)
* 在dataset对象中, 自定义HTML属性以驼峰命名法表示(`myTest`)
## 文本可编辑
* 新增HTML属性contentEditable, 值必须为true否则无法开启
## HTML解析器相关
* 这些方法的兼容性都非常高
* 每次调用都会需要创建与销毁html解析器，虽然性能比用js直接创建节点要快，但是尽可能减少直接操作这些属性的可能性
* innerHTML
  * 返回内部html代码
* outerHTML
  * 返回包括当前节点的html字符串
  * 给这个属性赋值等同于使用replace
* insertAdjacentHTML()
  * 接收两个参数，第一个参数值是字符串，beforebegin，afterbegegin，beforeend，afterend，第二个参数是需要被插入的html字符串
# HTML5
* HTML5是定义HTML标准的最新版本, 表示两种概念
  * 它是一个新版本的HTML语言, 具有新的元素, 属性和行为
  * 它有个更大的技术集, 允许更多样化和强大的网站和应用程序
## H5优势
* 跨平台
* 快速迭代
* 降低成本
* 导流入口多
* 分发效率高
## H4与H5的差别
1. DOCTYPE, 或者称为Document type declaration, 文档类型声明, 缩写为DTD
2. document.combatMode 返回浏览器的渲染模式
   * css1Combat     标准模式
   * css1Combat     近似标准模式
   * backCombat     怪异模式
3. 在IE9以上或者其他浏览器在三种渲染模式中几乎没有区别
4. 在IE7,8,9中理论上存在怪异模式，但实际只有标准模式
5. 在IE6中怪异模式与标准模式区别最大
6. 在IE5中只有怪异模式
7. html与head标签中HTML5内嵌了H4的许多属性
8. head中的meta标签指定了http的头消息
## 语义化标签
1. hgroup   包裹多个h1，h2...等
2. nav      导航栏
3. header   表示标题栏, 如果hgroup能够表现语义可以不使用
4. section   单独的模块
5. footer   脚注
6. article  单独的文章
7. aside    文章附属内容
## canvas
* 可以使用闭合和成对标签，不推荐使用闭合标签
* canvas是HTML5新增的元素，可以使用js脚本来绘制图片，最早由apple引入webkit
* 默认width为300，height为150，背景颜色默认继承
* 不能使用css来为canvas设置高宽，否则会在绘制时出错，会被拉伸
* 在canvas标签中添加内容可以使这些内容在浏览器不支持canvas时显示
* 获取canvas节点后只有width, height属性, getContext,isPointInPath,toDataURL方法可以使用
* 获取渲染上下文
```javascript
var canvasNode = document.querySelector('canvas')   //此api只能获取当前页面的快照节点
if(canvasNode.getContext){      //检查兼容性
    context = canvasNode.getContext('2d')       //只有一个参数为2d，3d图形需要webGL
}
```
### 绘制矩形
#### 同步绘制, 所得即所见
#### canvas的基本图形为矩形，只调用一个api只能绘制一个矩形
  * 绘制实心矩形`context.fillRect(x轴, y轴，宽，高)`    
  * 绘制空心矩形`context.strokeRect(x轴, y轴，宽，高)`
    * canvas在实现绘制空心矩形时会在指定位置的上下/左右各绘制0.5px的边框，但是浏览器渲染时会向上取整实际成为2px的边框。
    * 如果只想要绘制1px边框需要给x轴与y轴的实际位置多0.5
    * 若想在距离画布左或上100px的位置绘制图形，则`context.strokeRect(100.5, 100.5，100，100)`
  * 绘制实心的透明矩形`context.clearRect(x轴, y轴，宽，高)`  
  * 设置实心矩形的颜色`context.fillStyle = string`  可以使用rgba
  * 设置空心矩形的边框颜色`context.strokeStyle = string`  可以使用rgba
  * 设置空心矩形的边框宽度`context.lineWidth = number`, 会给边框的左右/上下同时设置为lineWidth一半的值, 参数不可为负值
  * 设置两条线交汇时的形状`context.lineJoin = string`, 参数为miter(默认)，round(圆角)，bevel(斜角)
#### canvas的基本元素为路径
* 绘制直线
  * beginPath()     //清除路径容器中的内容
  * moveTo(x, y)    //将画笔抬起移至指定路径
  * lineTo(x, y)    //将路径从上一个位置平移至指定路径
  * closePath()     //使路径自动形成闭环
  * stroke()        //按照路径绘制直线, 绘制规则同strokeRect不会自动执行closePath
  * fill()          //按照路径自动填充内部, 会自动执行closePath
  * rect(x, y, width, height)   //创建一个矩形路径
  * lineCap=butt(默认值)| round(圆角) | square(矩形)  //指定线段的两端样式, 除第一种参数外都会增加线段的长度
* 绘制圆形
  * `arc(x, y, radius, start, end)`    起始位置为画布x轴, end与start只能是弧度, 绘制方向为顺时针
  * `arcTo(x1, y1, x2, y2, radius)`     需要先用moveTo指定一个起始点，再加上参数中两个点来表示一个角的路径, 最后用半径为radius的圆去与这个角相切得到的路径即为绘制后的结果
  * `quadraticCurveTo(x1, y1, x2, y2)`    开始点与arcTo相同, 参数用来指定二次贝塞尔曲线的控制点与结束点
  * `bezierCurveTo(x1, y1, x2, y2， x3, y3)`  三次贝塞尔曲线，前两种参数指定两个控制点位置，最后一种参数指定结束点的位置
#### save()与restore()    
* 路径容器
  * 堆结构
  * 每次调用路径api时会向路径容器添加路径信息
  * 调用beginPath时清空
* 样式容器
  * 堆结构
  * 每次调用样式api时在样式容器中覆盖原样式
  * 调用save()时向样式堆压栈, 没有调用过样式api时保存的是初始化样式
* 样式栈
  * 栈结构
  * 调用restore()时会弹栈，并且将弹出栈的样式应用给样式容器
* 样式栈中会保存样式属性与变换位置
```javascript
//使用canvas的标准格式
context.save()  //压入样式栈, 保存的是初始化样式
context.strokeStyle('pink') //覆盖样式容器
context.beginPath() //清空路径容器
context.stroke()    //绘制
context.restore()   //弹出样式栈
context.save()  //压入样式栈, 保存的是初始化样式
context.strokeStyle('green')    //覆盖样式容器
context.beginPath() //清空路径容器
context.stroke()    //绘制
context.restore()   //弹出样式栈
```
#### canvas变换
##### canvas中的变换都为累加操作, 不会覆盖
##### 整个canvas公用一个原点
* tanslate(x, y)
  * 移动画布的坐标轴原点
* rotate(arc)
  * 旋转画布的坐标轴
  * 参数为弧度
* scale(x, y)
  * 放大缩小画布中像素所占面积
  * x和y控制在画布中的1像素的长宽实际在画布中占用的像素大小, 例如scale(2, 2), 画布中设定的1像素长宽会变为2像素
  * 需要注意在css中的像素是一个抽象概念, 面积可以变大缩小, 默认1像素就是长宽为1像素的大小
### 使用图片
* drawImg(img, x, y, width, height)
* 使用图片与渐变应用给canvas, 需要将返回值赋值给fillStyle才会生效
  * createPattern(img, [repeat|no-repeat|repeat-x|repeat-y])
  * `createLinearGradient(x1, y1, x2, y2)`    指定渐变方向
    * `gradient.addColorStop(0, 'red')`    添加渐变颜色，gradient是createLinearGradient的返回值
  * `createRadialGradient(x1, y1, radius1, x2, y2, radius2)`    指定渐变方向
    * `gradient.addColorStop(0, 'red')`    添加渐变颜色，gradient是createRadialGradient的返回值
### 绘制文本
* `fillText(text, x, y)`绘制字体
* `font='size family'`  大小字体缺一不可
* `strokeText(text, x, y)`绘制字体边框
* `textAlign = 'center|left|right'`决定字体与x, y原点的关系
* `textBaseline = 'middle|top|bottom'`  决定字体与基线的关系
* `measureText()` 返回字体在画布上的宽度
* `shadowOffsetX = float`
* `shadowOffsetY = float`
* `shadowBlur = float` 
* `shadowColor = color`
* canvas的字体垂直水平居中
```javascript
ct.font = '60px sans-serif'
ct.fillText('aaa', 0, 0)
var a = ct.measureText('aaa')
ct.fillText('aaa', canvas.width/2 - a/2, canvas.height/2 - 60/2)
```
### 像素操作
* getImageData(x1, y1, x2, y2)    获取指定范围内的像素数据，返回值为imageData
  * imageData
    * width     水平方向上的像素数量
    * height    垂直方向上的像素数量
    * data  数组，每一个像素点的rgba的数据
* putImageData(imageData, x, y)   将指定像素数据绘制到canvas上
* createImageData(x, y)   创建一块像素信息
### canvas合成
* 全局透明度 globalAlpha = value  设置整个画布的透明度
* globalCompositeOperation  source源指新图片，destination指老图片
  * source-over 使源置于目标之上
  * source-in 只显示源与目标重叠的源那部分
  * source-out  只显示源与目标没有重叠的源那部分
  * source-atop 在source-over基础上不显示源超出目标的那部分
  * destination-over  使目标置于源之上
  * destination-in  只显示目标与源重叠的目标那部分
  * destination-out 只显示目标与源没有重叠的目标那部分
  * destination-atop  在destination-over的基础上不显示目标超出的那部分
## 音视频
|主流视频文件格式|主流音频文件格式|
|---|---|
|MPEG-4 通常以.mp4格式命名|MPEG-3 通常以.mp3格式命名|
|FLASH视频 通常以.flv命名|aac音频 .aac|
|OGG 通常以.ogv格式命名|ogg音频 通常以.ogg格式命名|
|webM 通常以.webm格式命名||
|音视频交错 通常以.avi格式命名||
### 编解码器
|视频解码器|音频解码器|
|---|---|
|H.264|AAC|
|VP8|MPEG-3|
|Ogg Theora|Ogg vorbis|
制作视频的流程

* 制作一个ogg容器，使用Theora视频与Vorbis音频版本
* 制作webM容器，使用VP8视频和vorbis音频版本
* 制作MP4容器，使用H.264基本配置和ACC低配的音频
* 连接上述3个文件到同一个video, 向前兼容制作flash版本
#### video
##### HTML中的attribute
公共部分
* src
* controls  布尔值属性
* width
* height
* source 写在video内部，内有src与type属性
  * `type="video/ogg codecs='Theora'"`等
  * 当浏览器支持type中指定的格式时才从src路径加载视频
  * 当使用source时不要给video标签添加src
* autoplay 自动播放
* loop 自动循环
* muted 是否禁音
* preload
  * none  不预加载视频
  * metadata  只预加载基本数据如长度时间等
  * auto  预先加载
  * 空字符串  与auto相同

视频特有部分
* poster  指定视频未播放显示的图片
##### js相关(若是js属性不会在api后加小括号)
公共部分
* duration
  * 返回总时间(只读)
  * 在某些浏览器中需要延迟或者触发特定事件后才能返回正确的值，否则可能返回NaN
* currentTime
  * 返回当前进度(读写)
* volumn
  * 返回音量(读写)
  * 浏览器不会将此值与muted同步需要手动调整
  * muted的优先级高于此属性
* paused
  * 返回知否暂停(只读)
* ended
  * 返回是否播放完毕(只读)，没有出错返回null
* error
  * 媒体发生错误时返回错误代码(只读)
* currentSrc
  * 以字符串形式返回媒体地址(只读)
* play()
* pause()
* load()
  * 当修改了source的src时，必须调用此方法，否则无法生效

视频特有部分
* poster
  * 返回视频海报(读写)
* width
  * 返回控件实际宽度(读写)
* height
  * 返回控件实际高度(读写)
* videoWidth
  * 返回控件内视频实际宽度(只读)
* videoHeight
  * 返回控件内视频实际高度(只读)
#### audio
##### HTML中的attribute
* src
* controls  布尔值属性
* width
* height
* source 写在audio内部，内有src与type属性
  * `type="audio/ogg codecs='vorbis'"`等
  * 当浏览器支持type中指定的格式时才从src路径加载视频
  * 当使用source时不要给audio标签添加src
* autoplay 自动播放
* loop 自动循环
* muted 是否禁音
* preload
  * none  不预加载视频
  * metadata  只预加载基本数据如长度时间等
  * auto  预先加载
  * 空字符串  与auto相同
##### js相关
* duration
  * 返回总时间(只读)
  * 在某些浏览器中需要延迟或者触发特定事件后才能返回正确的值，否则可能返回NaN
* currentTime
  * 返回当前进度(读写)
* volumn
  * 返回音量(读写)
  * 浏览器不会将此值与muted同步需要手动调整
  * muted的优先级高于此属性
* paused
  * 返回知否暂停(只读)
* ended
  * 返回是否播放完毕(只读)，没有出错返回null
* error
  * 媒体发生错误时返回错误代码(只读)
* currentSrc
  * 以字符串形式返回媒体地址(只读)
* play()
* pause()
* load()
  * 当修改了src时，必须调用此方法，否则无法生效
## 视频与canvas结合
1. 获取video
2. 将video的内容用drawImage画到画布上
3. 播放视频时使用定时器按照定时器规定的帧数重绘画布
4. 使用loadeddata事件可以使视频加载完成后再执行
## 状态标签
* meter 创建类似于电池电量的进度条, 最多有三种颜色显示
  * value 指定初始值
  * min 指定最小值
  * max 指定最大值
  * low 指定区间下界
  * high  指定区间上界，两者都写时可以将meter分为3个部分
  * optimum 指定最优区间, 值可以为想要指定区间中的任意值
* progress  创建进度条
  * value 指定初始值
  * max 指定最大值
## 表单标签
* datalist  创建H5下拉菜单
  * 使其的id值与input标签的list属性的值相同
  * 在datalist中添加多个option标签，包含value属性
  * 可以使input增加下拉选项
```html
<input type="text" list="test" value="test" />
<datalist id="test">
  <option value="a">a</option>
  <option value="b">b</option>
  <option value="c">c</option>
</datalist>
```
* details 创建H5折叠菜单
  * 内部第一个标签为summary, 此标签内的内容为默认可点击处的内容
  * 使用p标签来填充折叠的内容
  * 有布尔值属性open来指定默认开启
```HTML
<details>
<summary>aaaa</summary>
<p>bbbb</p>
<p>bbbb</p>
<p>bbbb</p>
</details>
```
## 注释标签
* ruby 指定需要添加注音的文字
* rt  添加的注音，会显示在ruby标签中的内容的顶上
## 标记标签
* mark  效果类似于span, 默认背景为黄色
## 表单标签
### type类型
* email 会检查有无@
* tel 移动端会弹出数字键盘
* url
* search 在输入框中增加可点击清空的按钮
* range 滑块
  * min
  * max
  * step 控制一步的长度
* number 只能输入数字
* color 颜色选择器
* datetime 移动端使用，显示完整日期
* datetime-local pc端使用，显示完整日期
* time  显示时间不包含时区
* date  显示日期
* month 显示月份
* week  显示周
### 表单属性
* placeholder
  * 选中::-webkit-input-placeholder
* autofocus
  * 自动获取聚焦，当有多个时只生效第一个
* required
  * 必填项
* pattern
  * 设定正则表达式
* formaction
  * 指定上传的表单地址
* list
  * 值必须为datalist的id值
### 表单验证
* invalid事件
  * 当表单验证不通过时触发
* setCustomValidity
  * 自定义验证内容
* validity对象
  * 是表单节点下的对象，内部包含8个属性，true表示已触发的验证
    * valueMissing
    * typeMismatch
    * patternMismatch
    * customError 当自定义验证触发时为true
## 跨文档传输
* 在H5中可以通过postMessage这个api在不同域之间进行消息传递，对于XDM来说，能够跨域的只有iframe与由当前页面弹出的页面
* postMessage(msg, domain)
  * 第一个参数是想要传递的数据，为了兼容性最好只是字符串，想要传递对象时使用JSON代替
  * 第二个参数为表示消息的接收方来自于哪个域，当参数为\*时可以传递给任何域的文档但不推荐
* 接收到XDM消息时会触发文档中window对象的message事件, 这个事件以异步的方式传递因此从发送到接收存在延迟, onmessage的事件对象有以下三个属性
  * data
    * 接收到的数据
  * source
    * 发送数据的域的window代理，只能使用其中的postMessage方法来向其发送回复
  * origin
    * 发送数据的域的字符串
## 原生拖拽
* 对于IE10及以上还有其他浏览器对目前的原生拖拽功能大部分已经支持
* 默认情况下图像，链接和文本是可以拖拽的，其他元素可以拖拽，但是可以通过给这些元素设置draggable为true来启动它们的拖拽功能
* 当一个元素进入拖拽状态直到被释放的时候会依次触发下列三个事件:
  1. dragstart  拖拽开始
  2. drag       拖拽中
  3. dragend  拖拽结束
* 当一个元素成为放置元素，即拖拽元素移入它内部时会依次触发下列事件:
  1. dragenter  被拖拽元素进入放置元素时
  2. dragover 被拖拽元素在放置元素内移动时
  3. drop/dragleave 被拖拽元素被丢入放置元素中或者移出放置元素
* 在所有拖拽事件被触发时，它们的事件对象会出现dataTransfer属性
* dataTransfer包含下列方法与属性
  * setData(type, str)
    * type在IE老版本中是text或者URL字符串，在H5规范中可以是所有MIME类型，考虑到兼容性text会被映射成text/plain，URL会被映射成text/url-list
    * str是一个需要保存的字符串
    * 此api可以为每一种MIME类型保存一个字符串但会在drag相关事件结束时全部销毁
  * getData(type)
    * 是一个需要提取的字符串类型，text或者URL，规则同setData的type属性
  * dropEffect
    * 用来表示拖拽元素目前能够执行的放置行为，只能在dragenter事件触发时设置，具有以下值:
      * none  不要触发任何行为
      * move  要触发移动行为
      * copy  要触发复制行为
      * link  要触发打开链接的行为
    * 以上任何值都能决定拖拽元素被移动到放置元素时光标显示的样子
  * effectAllowed
    * 用来表示拖拽元素允许触发的放置行为，只能在dragstart事件触发时设置, 具有以下值:
      * uninitialized 没有给拖拽元素设置任何放置行为
      * none  不允许触发任何放置行为
      * copy  允许触发复制行为
      * link  允许触发打开链接的行为
      * move  允许触发移动行为
      * copyLink  允许触发复制与打开链接的行为
      * copyMove  允许触发复制与移动的行为
      * linkMove  允许触发打开链接与移动的行为
      * all 允许触发任何行为
  * setDragImage(ele, x, y)
    * 指定一副图像变成拖动时产生的副本样子
    * ele可以是元素也可以是图像，如果是普通元素则显示渲染后的结果，否则直接显示图片
  * addElement(ele)
    * 为拖动操作添加一个元素，添加这个元素只影响数据，不会影响拖动操作时页面元素的外观, 只有火狐支持
  * types
    * 当前保存的数据类型，返回的是一个字符串的数组
## 历史状态管理
* 过去可以通过hashchange事件来管理状态的变化
* H5通过更新history来管理状态的变化，通常是pushState, replaceState
  * pushState(obj, sbj, url)
    * 第一个参数是状态对象
    * 第二个参数是新状态的标题，目前没有浏览器实现，可以是空字符串
    * 第三个参数是可选的相对url
  * replaceState
    * 参数与上个api相同，不同在于是更新而非压入
* 按下回退按钮或者调用history.back等浏览器动作时会触发popstate事件，可以通过访问时间对象的state属性来得到当前状态对象