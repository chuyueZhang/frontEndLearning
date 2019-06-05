# 层叠样式表cascading style sheet

* 嵌入式样式
  
    将style当做元素的属性, 将所有样式写在style中, 只对当前元素起作用, 不方便复用, 不推荐使用

* 内联样式
  
    在内部引入style标签

* 外联样式
  
    从外部引入style标签, 可以利用浏览器缓存加快用户访问速度, 最推荐使用, link原本的目的是用来链入外部文档，用rel(relation)表示当前文档与外部文档之间的关系

    `<link rel="stylesheet" type="text/css" href=""></link>`

## 语法

### 选择器

使用选择器语法选择相应的元素

### 声明块

使用{}, 为名值对结构, 不同声明使用;来分隔, 名值之间使用:来连接

## 块元素

独占一行的元素, 无论内容多少都一定独占一行

div, h1, h2..., p, br等

div没有语义, 为了设置块元素样式

## 内联元素

只占自身大小的元素, 不会占用一行

span,a,img,iframe

span没有语义, 用来选择一段文字来设置样式

一般情况下使用块布局, 使用内联元素修改样式并且使用块元素包含内联元素

a元素可以包含任何元素但不能包含本身

p元素不能包含任何块元素

## 元素之间的关系

父元素

子元素

祖先元素

后代元素

兄弟元素

## 子元素选择器 >

IE6及以下没有子元素选择器

伪类表示某个元素的某种状态

如: `:link, :visited, :hover, :active, :focus, ::selection, ::before, ::after`

    浏览器通过历史记录判断是否访问过网页, 因为有关用户隐私所以通过visited只能设置字体颜色
    伪类可以在IE6以外的浏览器中为除a元素以外的元素设置属性
        active表示点击时的状态
        hover表示鼠标移入, IE6中只能对a元素设置
        focus表示获取了鼠标焦点时
        selection表示文字内容被选中, 当使用火狐时用-moz-selection来兼容
    伪元素表示元素中的特殊位置, IE6及以下不支持
        :first-letter 元素中第一个字母
        :first-line 元素当前行
        :before 表示元素最前边部分,一般都要结合content一起使用
        :after 表示元素后面部分
    以下只对IE9及以上支持
    属性选择器[]
    语法:
        [属性名]
        [属性名="属性值"]
        [属性名^="属性值"] 以属性值开头的
        [属性名$="属性值"] 以属性值结尾的
        [属性名*="属性值"] 包含指定属性值的
    子元素选择器
    语法:
        :first-child 第一个子元素
        :last-child 最后一个子元素
        :nth-child(num) 指定位置子元素, 其中num可以是数字,even(偶数),odd(奇数)
        在当前类型的子元素中排列
        :first-of-type
        :last-of-type
        :nth-of-type
    兄弟选择器
    语法:
        +后面第一个兄弟元素
        ~后面所有兄弟元素
    否定伪类
        从已选中的元素中剔除某些元素
        语法:
            :not(选择器)

>祖先元素上的样式会被后代元素继承但是不是所有样式会被继承如背景相关样式

## 优先级的规则
    内联样式>id选择器>类和伪类>元素选择器>通配*>继承的样式
    优先级相加判断显示哪种样式
    可以在样式的最后添加一个!important来提高优先级
## 长度单位
    像素 px 显示效果越好的显示屏, 像素越小
        - 手机浏览器会自动将实际像素大小乘以4来显示
    百分比 %  根据父元素的大小来计算样式, 当父元素属性发生变化时, 子元素也会发生改变
        - 自适应时常用
    em  和百分比类似, 相对于当前元素字体大小来计算
        -1em = 1 font-size
## 颜色单位
    直接使用单词表示
        - red, blue
    RGB(红色浓度, 绿色浓度, 蓝色浓度)
        - 可以是0-255的数字
            - RGB(111,222,123)
        - 可以是0%-100%的百分比
            - RGB(50%,50%,50%)
        - 使用16进制来表示, 三组两位来表示, 每一组为00-ff, 当两位相同时可以简写
            - #0000ff /#00f
## 字体
    字体颜色 color:
        - 指定字体颜色, 会继承给border-color
    字体大小 font-size:
        - 设置的不是字体本身大小, 而是一个看不见的框的高度, 字在这个框中, chrome最小就支持12px,可以设置为0使内联元素间的距离清除
    字体样式 font-style:
        - normal
        - italic    斜体
        - oblique   倾斜
        大部分浏览器都不会区分这两者
    字体粗细 font-weight:
        - normal
        - bold 加粗
        也可以指定100,200, ..., 900等9种粗体, 但是用户电脑往往没有那么多字体所以可能达不到想要的效果
    font-variant 设置小型大写字母
        - normal
        - small-caps
        所有字母用大写表示但是小写字母用比较小的大写字母显示
    字体 font-family:
        - 指定字体, 当采用某种字体如果浏览器支持则使用指定字体, 否则使用默认字体
        - 该样式可以同时指定多个字体, 优先显示排在前面的字体, 没有再使用下一个
        - 浏览器使用的是计算机中的字体, 有则使用没有则不使用, 尽量不要使用奇怪的字体
            - font-family: arial,微软雅黑
    字体分类
        - 在网页中将字体分为五大类, 浏览器自动选取属于这些类中的字体来显示, 一般将大分类指定为font-family的最后一种字体
            - serif 衬线字体即有笔锋
            - sans-serif 非衬线字体即无笔锋
            - monospace 等宽字体即每个字一样宽
            - cursive 草书字体
            - fantasy 虚幻字体
    可以使用font来设置所有与字体相关的样式, 不同样式之间用空格隔开
        - 斜体 加粗 小型大写字母顺序可变且可不写
        - 文字大小和字体必须写, 不写就将字体样式全部应用默认值
        - 性能较分开写更好
## 行间距
    只能通过设置行高来间接设置行间距
    - line-height
        - 使用大小表示
        - 使用百分数表示
        - 使用一个数值表示字体大小的倍数
    文字会默认在行高中垂直居中显示
    行间距 = 行高 - 字体大小
    - 对于单行文本可以将行高设置与父元素高度一致使文本居中
    可在font中设置行高, 行高值是字体大小加斜杠后设置
        - font: 30px/30px "微软雅黑"
            - 当使用font时其他在font中未指定的值都会变成默认值, 因此其他与字体相关的属性都要写在font之后
## 文本
    text-transform 设置大小写
        - none
        - capitalize 单词首字母大写, 用单词边界区分单词
        - uppercase 全部大写
        - lowercase 全部小写
    text-decoration 定义文本的线条
        - none
        - underline 下划线
        - overline 上划线
        - line-through 中线
        超链接会默认设置下划线, 要去除时要用此属性
    letter-spacing 字符间距
        - 中文也会起作用
    word-spacing 单词间距
        - 本质是单纯设置空格的大小
    text-align 文本对齐方式
        - left 靠左对齐
        - right 靠右对齐
        - center 居中对齐
        - justify 两端对齐(通过调整文本间大小来对齐)
    text-indent 设置首行缩进    IE6,7中可能会让父元素一起缩进
        设置正值向右缩进指定像素
        设置负值向左缩进指定像素
        text-indent: 2em;
        可以用来隐藏一段文字
            - text-indent: -9999px;
## 盒子模型
    由内容区, 内边距, 边框, 外边距组成
    设置边框
        三种样式缺一不可
        - border-width
        - border-color
        - border-style
        每种属性都可以通过写入不同数量的属性值来表示不同方向应用哪些属性
        也可以使用
        - border-left-width 等来规定特定方向的属性
        大部分浏览器边框宽度和颜色有默认值但是style默认值为none
        所以只设置style时就有边框显示
        可以使用border统一设置, 没有顺序要求, border只能指定4个边的样式都相同不能分别指定
        - border： 10px blue solid；
        可以使用border-top, border-bottom等来分别设置
    设置内边距
        padding可以一次性写明上下左右
    设置外边距
        不影响可见框的大小而是影响定位
        margin可以一次性写明上下左右
        左上的margin值影响元素本身的定位, 右下的margin值影响相邻元素的位置
        当值为负时, 元素向反方向移动
        水平方向设置为auto时将会设置成最大值
        垂直方向设置为auto时会设置成0
        当left与right都设置成auto时, 两值会相同因此可这样设置使元素居中
        垂直外边距的重叠
            - 元素间相邻的垂直方向的外边距会取最大值而不是相加
                - 兄弟之间
                - 父子元素之间, 当子元素设置上边距时如果父子元素上边距相邻, 父元素会使用子元素的上边距, 可使用padding, border等隔开使其不相邻而不生效
## 浏览器默认
    浏览器为了在没有设置样式时也可读会给标签设置默认样式, 但是许多默认样式是不需要的
    可以用margin, padding赋值为0来覆盖
## 内联元素的盒模型
    内联元素不能设置宽和高
    可以设置内边距但垂直内边距不影响页面布局, 水平内边距会影响
    可以设置边框但是垂直边框不影响布局, 水平会影响
    可以设置水平外边距且不会重叠, 不能设置垂直外边距
## 将内联元素设置为块元素
    display
        - inline 内联元素
        - block 块元素
        - inline-block  行内块元素, 可以使元素既可以设置宽高等且不会独占一行
        - none 不显示元素且不占位与visibility:(visible/hidden)相似, 但后者会占位
## 溢出
    子元素理论上小于等于父元素的内容区但有时候会大于父元素的内容区, 此时叫溢出
    可以使用overflow处理
        可选值
            - visible   默认值
            - hidden    隐藏溢出内容
            - scroll    滚动查看溢出内容, 无论是否溢出都会添加滚动条
            - auto      根据需求是否添加滚动条
## 文档流
    文档流在网页最底层, 表示页面的位置, 所创建的元素默认在文档流中
    元素在文档流中的特点
        块元素
            1.在文档流中独占一行自上向下排列
            2.块元素在文档流中默认宽度是100%, 宽度值是auto
            3.块元素在文档流中的高度默认被内容区撑开
        内联元素
            1.内联元素在文档流中只占自身大小, 默认从左向右排列, 如果一行不够容纳则换到下一行继续自左向右
            2.文档流中, 内联元素宽度和高度默认被内容撑开
## float
    可以使用它来使块元素脱离文档流
    使元素浮动后, 这个元素会向上浮动直到碰到父元素的边框或者其他浮动元素就会停止
    如果浮动元素上面是没有设置浮动的块元素则浮动元素不会超过块元素
    在IE6中上面元素如果是内联元素也不会超过那个内联元素
    如果一行无法容纳浮动元素则会自动换行
    浮动的元素不会超过它上边的兄弟浮动元素, 即处于其下方或平行
    浮动的元素不会盖住文字, 文字会自动环绕在浮动元素周围
    在文档流中元素宽度默认值是父元素的全部, 当浮动脱离文档流后高度和宽度默认由内容决定
    内联元素脱离文档流后表现与块元素脱离后相同
        - none  默认值, 不浮动
        - left  向左浮动
        - right 向右浮动
    浮动练习
## 高度塌陷问题
    在文档流中父元素默认被子元素撑开, 子元素多高, 父元素也多高
    当给子元素设置浮动, 子元素会完全脱离文档流此时将会导致子元素无法撑起父元素的高度造成高度塌陷
    这会导致布局混乱需要解决
        - 将高度写定, 但父元素无法适应子元素高度, 因此不推荐使用
    在页面中元素有隐藏属性block formatting context    
    简称BFC, 该属性可以打开或关闭, 默认关闭
    当开启BFC时元素有以下属性：
        - 父元素垂直外边距不会和子元素重叠
        - 不会被浮动元素覆盖
        - 可以包含浮动元素
    开启BFC有如下方法：
        - 设置元素浮动
            会导致父元素宽度丢失, 且之后的元素上移, 不推荐
        - 设置绝对定位
        - 设置为inline-block
            宽度会丢失, 不推荐使用
        - overflow设置为非visible值
            此元素内部的相对定位元素如果超出内容区会被隐藏
            这些方法中将overflow设置为hidden或者auto副作用最小
    IE6及以下不支持BFC, 因此使用此方式不兼容BFC
    IE6有类似属性叫做hasLayout
    开启此属性有以下方法：
        - zoom: 1 将元素放大几倍
        - min-height/max-height/min-width/max-width:除none
        - 绝对定位
## 清除浮动
    有时希望其他元素浮动时对当前元素不产生影响, 使用clear样式
    clear用来清除其他元素对当前元素的影响, 可选值：
        - none 默认值
        - left  清除影响最大的左侧浮动元素的影响
        - right 清除影响最大的右侧浮动元素的影响
        - both  清除两边中影响最大的浮动元素的影响
## 解决高度塌陷方式2
    使用清除浮动的方式解决高度塌陷, 在浮动元素后增加一个带有clear属性的空白块元素来撑起高度
    可使用伪类.clearfix:after来在不修改html结构的情况下解决问题(clearfix为浮动元素的父元素)
    IE6及以下不支持此伪类, 使用:
        .clearfix{
            zoom: 1;
        }
    来兼容
    table添加在子元素前时可以解决父子元素上外边距重叠问题, 为了不改变html结构使用：
    .clearfix:before,
    .clearfix:after{
        content: "";
        display: table;
        clear: both;
    }
    可以同时解决上外边距重叠与高度塌陷问题
## ps基本操作
    编辑->首选项->文件与标尺->修改为像素
    ctrl+2 打开/关闭标尺
    alt+滚轮 放大缩小图片
    F8 打开选取框的颜色大小信息
    从标尺中拖出辅助线
    按住alt取色
## 定位
    将元素移动到页面的指定位置
    position
    可选值：
    - static 默认值, 没有开启定位
    - relative  相对定位
        开启元素相对定位不设置偏移量时页面不会产生任何变化
        可以通过left, right, top, bottom来设置元素偏移量
        如果没有开启定位会忽略以上属性
        相对定位是元素相对原本在文档流中的位置进行定位
        相对定位会使元素提升层级, 定位元素会盖住文档流中的元素
        相对定位不会改变元素的性质, 块元素和内联元素这个性质不会变化
    - absolute 绝对定位
        开启此定位会使元素脱离文档流
        开启此定位不设置偏移量元素的位置不会发生变化
        绝对定位是相对于开启了定位的最近的祖先元素进行定位
        如果所有祖先元素都没有开启定位则会相对于浏览器窗口进行定位(一般来说开启绝对定位都会开启父元素的相对定位)
        绝对定位会提升元素的层级
        开启绝对定位会使内联元素变成块元素, 宽度和高度默认被内容撑开
    - fixed 固定定位
        固定定位是绝对定位的一种, 不同点：
        永远只相对于页面窗口进行定位
        IE6及以下不支持固定定位
## 元素层级
    如果元素层级相同, 则结构上在下面的元素会覆盖上面的
    可以通过z-index来指定层级, 层级越高越优先显示
    父元素层级再高也不会盖住子元素, 父元素调高层级, 子元素也会自动调高
## 透明
    opacity
        - 0-1之间的值, 0是完全透明
        - IE8及以下不支持
    filter: alpha(opacity=50)
        - 在IE中使用此属性代替
        - 0-100之间的值
## css2背景
    background-color: 可以设置为透明transparent,从border-box绘制

    background-image: url(相对路径或者绝对路径)
        - 元素大小默认为位图的大小
        - 如果背景图片大于img元素, 则从左上角开始显示, 多出部分不显示
        - 如果背景图片小于img元素则默认平铺来充满元素
        - 可以同时指定背景图片与背景颜色, 此时背景颜色会充当底色
        - 在IE6中对PNG24支持不高, 如果使用则透明效果无法正常使用, 使用png8来解决或者引入外部js文件处理
    background-repeat:
        - repeat 默认值, 双向平铺
        - no-repeat 不平铺
        - repeat-x 水平平铺
        - repeat-y 垂直方向平铺
        可以通过平铺来将1像素宽或高的图片填充各种元素的背景
    background-position:
        进行img中的图片位置定位
        - 使用left,top,right,bottom,center中的两个值来确定图片位置
          如果只给出一个值第二值默认是center
        - 指定偏移量
            第一个值为水平偏移量第二值为垂直偏移量, 偏移量为百分比时, 是指元素大小减去图片大小的百分比, 保留正负号
    background-attachment:
        设置背景图片是否髓页面滚动
        - scroll 默认值, 背景图片随窗口滚动
        - fixed,  背景图片固定, 不随页面滚动
        当设置成fixed时, 背景图片的定位会变成相对于视图调整, 不推荐使用性能不足, 使用img固定定位代替
    background
        设置所有背景相关的属性, 没有顺序与数量要求, 不设置的值会有默认值
## CSS-sprite
    将多个图片整合成一个请求, 加快访问速度, 提升体验并且能够减少图片的总大小

## 条件hack
    当只需要在某些浏览器中执行某些代码时使用
    有些浏览器能识别而其他浏览器不能识别
    适用于IE9及以下：
    <!--[if IE]>
    <![endif]-->
    语法：
    <!-- [if (keyword)? IE (version)?]>
    <![endif]-->
## 属性hack
    在样式前添加_, 只有IE6生效
    添加*, 只有IE7及以下生效
## IE6双倍边距bug
    在IE6中如果给左浮动元素设置左外边距或者给右浮动元素设置右外边距会变成双倍外边距
    给此浮动元素设置成inline可以解决
# CSS2.1
## 包含块
    在大多数浏览器, 初始包含块是一个视窗大小的矩形
    - 对于浮动元素, 包含块是最近的块级祖先元素的内容边界构成
    - 对于非根元素, position是relative或static, 包含块由最近的块级框的内容边界构成
    - 对于非根元素, position是absolute, 包含块为最近的position不是static的祖先元素
        如果祖先元素为块级元素, 包含块则为该元素的内边距边界
        如果没有祖先, 元素包含块为初始包含块
    left,top,bottom,right,width,height默认值为auto, 不可继承
    margin, padding默认值为0, 不可继承
    border-width默认值为medium
    width, left,padding, margin的百分比是包含块的width的
    height, top的百分比是包含块的height的
## 浮动
        开启浮动时层数提升半层, 一个元素占两层, 第一层为盒模型, 第二层为文字, 此理论只在浮动有效
## 三列布局要求：
        1.两边固定, 当中自适应
        2.中间要完全显示
        3.当中列要优先加载
        绝对定位来三列布局
            - 中间不能设置最小宽度, 不推荐
        浮动来三列布局
            - 中间页面会最后加载
        圣杯布局
            - 使用浮动搭建基本布局
            - 调整左右的margin-left使其处于同一行
            - 使用relative使左右处于中间页面的两端
## 前端社区
        - segmentFault
        - 掘金
        - 奇舞周刊
## 素材网
        - 17素材网
## 伪等高布局
        - 给三列内容设置非常大的下内边距
        - 给三列内容设置与下内边距相同的下外边距, 为负值, 使外部块元素大小与未设置下内边距时相同
        - 给外部块元素设置溢出隐藏
## 双飞翼布局
        - 与圣杯布局基本类似
        - padding设置给中间div中嵌套的子div而不是给父div, 直接可以将中内容显示而不被左侧内容覆盖
## html与body的高度问题
        - 需要视图html, body高度三合一时两者都必须设置height:100%, 没有设置html高度时, body高度都由内容撑开
        - html或者body其中之一使用overflow:scroll时, 都是让document出现滚动条
        - html和body都设置时, html的scroll设置给document, body的才设置给body
        - 常被用来禁用系统默认滚动条, 代码为:
            html, body{
                height: 100%;
                overflow: hidden;
            }
        - 当使用此方案使body具有overflow:scroll使body滚动条模拟视图滚动条时, 可以使用绝对定位模拟固定定位, 常用于移动端或解决IE6没有fixed的问题
    使用caniuse.com网站来检查api兼容性
## stickyFooter
    粘连布局
    - 有一块内容`<main>`
    - 当`<main>`的高度足够长时, `<footer>`跟在`<main>`的后面
    - 当`<main>`元素比较短的时候, 我们希望`<footer>`能够“粘连”在底部
        1.给wrap设置最小高度
        2.给main设置相等于footer高度的下内边距, 为了不让footer遮挡住main里的文字,因为main高度是百分比所以视图中没有给footer占位的地方
        3.给footer设置相等于自身高度的上外边距, 值为负

```javascript {line-numbers}
        <div class="wrap">
            <div class="main"></div>
        </div>
        <div class="footer"></div>
```
## box: CSS布局基本单位
    元素类型与display的值决定了box的类型。不同的box会参与不同的Formatting context
    box类型:
        block-level box:
            display属性为block, list-item, table的元素, 会生成block-level box, 并且参与block formatting context
        inline-level box:
            display属性为inline, inline-block,  inline-table的元素, 会生成inline-lebel box并且参与inline formatting context
    Formatting context是页面中一块渲染区域, 并且有一套渲染规则, 决定子元素如何定位以及和其他元素的关系和相互作用
    BFC只有block-level box参与, 规定了内部的block-level box如何布局, 并且与这个区域外部毫不相干
    BFC布局规则
    1.内部box会在垂直方向, 一个接一个放置
    2.BFC的区域不会与float box重叠
    3.内部的box垂直方向距离由margin决定, 属于同一个BFC的两个相邻块级box的margin会发生重叠
        - 两个方式来使其不重叠, 其一是使两个元素属于不同BFC, 其二是使两个元素不相邻
    4.计算BFC高度时, 浮动元素也参与计算
    5.BFC就是页面上的一个隔离的独立容器, 容器里面的子元素不会影响到外面的元素, 反之也是如此
    出现BFC的情况
    1.根元素
    2.float属性不为none
    3.postion为absolute或fixed
    4.overflow不为visible
    5.display为inline-block, table-cell, flex, inline-flex
## 多余内容出现省略号:
    1.white-spacing: nowrap; 强制不换行
    2.text-overflow: ellipsis;  决定如果对溢出文本应用样式
    3.overflow: hidden;
    4.display: block;   在有些情况下设置没宽度, 如果display为inline-block宽度会被内容撑开, 使多余部分不会出现省略号
## 清除浮动
    1.给父元素设置高度, 扩展性差
    给父元素设置成BFC, 在IE6,7中用开启haslayout解决
    2.给父元素设置overflow:hidden, 移动端常用
    3.给父元素设置定位
    4.给父元素设置浮动
    定位盒子或者浮动盒子的宽高会默认由内容撑开而其余的宽高默认为包含块的100%
    5.空div标签清除浮动, 在IE6中可能会造成最小高度问题且违反结构行为样式分离原则
        - 当给div设置高度时, 在IE6中最小只能设置成font-size的最小值12px, 但是即使将font-size设置成0时也依然会有2px的高度, 设置overflow: hidden才能解决
    6.br标签用html属性clear来清除浮动,在IE6中无效且违反结构行为样式分离原则
    7.伪元素清除浮动, 在IE6,7中不支持, 使用zoom解决, PC端常用
## haslayout
    IE6,7特有的概念, 如果一个元素没有布局, 则它的尺寸和位置由最近拥有布局的祖先元素控制
    IE团队是为了减少性能开销才将元素变成拥有布局和没有布局这两种情况
    默认拥有布局的元素
    html, body, table, tr, td, img, hr,
    input, select, textarea, button, 
    iframe, embed, object, applet, marquee
    触发haslayout
    IE6或IE7支持
    1.float为left或right
    2.display为inline-block
    3.position为absolute
    4.width为除auto外的值
    5.height为除auto外的值
    6.zoom为除normal外的值
    7.writing-mode为tb-rl
    IE7支持
    min-height:任意值
    min-width:任意值
    max-height: 除none外
    max-width: 除none外
    overflow, overflow-x, overflow-y: 除visible外任意值, 仅用于块元素
    position: fixed
## 检测低版本IE
    js中结合b标签的innerHTML与条件hack, 最后判断innerHTML内的标签是否存在来决定版本
    function isIE(version){
        var b = document.createElement("b");
        b.innerHTML = "<!--[if IE "+version+"]><i></i><![endif]-->"
        return b.getElementByTagname("i").length == 1;
    }
## 垂直水平居中
    已知高宽的水平居中
        - 调整margin-left为负值
        - 绝对定位盒子高度由内容撑开
          水平方向上: left + right + margin + padding + width = 包含块的宽度
          垂直方向上: top + bottom + margin + padding + height = 包含块的高度
          因此可以将left,top,bottom,right设置为0再设置固定高宽
          将margin设置为auto可以垂直水平居中
          未设置高宽时默认高宽撑满父元素
    未知高宽的水平居中
        - 设置绝对定位, left和top设置为-50%
        - 使用transform: translate3D(-50%, -50%, 0)
        兼容性较差
## line-height
    行高定义为两行字的基线间距离, 常用于单行文本垂直居中
    内容区：顶线到底线间的距离
    行内框：内容区加上 (行高-字体大小)/2 的值 
    行框：一行中最大的行内框的值
    如果要处理大量文本, 建议把行高设置比字体大, 因为当行高比内容区小时, 上下缺少的高度渲染会根据不同浏览器进行变化
    格式化css时一般会统一设置line-height为1, 即font-size的一倍, 纯数字为行高因子
    行高因子继承时, 是行高因子, 其他的百分比, 像素等是继承计算值
## 垂直居中
    vertical-align
        用来指定inline-block的垂直
        当给图片垂直居中时可以通过伪元素after设置一个内联块状元素来使与图片同一行的行内框撑满父元素
        再给图片设置vertical-align: middle就能使图片垂直居中
# CSS3
    样式表由规则组成
    规则由选择器与声明块组成
    声明由CSS属性与键值对组成
    CSS选择器渲染是从右向左寻找
## 基本选择器：
        1.通配符 *
        2.id选择器 #
        3.类选择器 .
        4.后代选择器 空格
        5.元素选择器 元素名
        6.分组 ,(结合符)
## 基本选择器扩展：
        1.子元素选择器 >
        2.相邻兄弟选择器 +
        3.通用兄弟选择器 ~
## 属性选择器
        1.存在及值选择器
            [attr] 选中存在attr属性的元素 
            [attr=val] 选中值为val的属性 
            [attr~=val] 选中值中以空格分隔时带有val属性的元素
        2.子串值属性选择器
            [attr|=val] 选中值为val或者以val-开头的元素
            [attr^=val] 选中以val开头的元素
            [attr$=val] 选中以val结尾的元素
            [attr*=val] 选中值包含有val值的元素
## 伪类选择器
        1.链接伪类 只能给链接标签a使用
            :link
            :visited    由于隐私问题, 这个伪类只能控制color, bg-color, border-color
            :target 点击a元素, a元素的锚点充当id选择器来选中的某个元素, 锚点会在URL中显示出来
        2.动态伪类
            :hover
            :active
        3.表单伪类
            :enable
            :disable
            :checked
            :focus
        4.结构性伪类
            index从1开始
            :nth-child(index)
                例子： #wrap li:nth-child(1), 找到#wrap下第一个子元素且这个子元素必须为li
                      li:nth-child(1), 找到所有标签的第一个子元素且这个子元素必须为li
                延伸
                :first-child
                :last-child
                :nth-last-child
                :only-child  相当于:first-child:last-child
            :nth-of-type(index) 
                例子： #wrap li:nth-of-type(1), 找到#wrap下第一个li子元素
                       li:nth-of-type(1), 找到所有标签的第一个li子元素
                    重要问题：这个属性以元素为中心, 当父元素中有多个不同子元素, 此选择器可能同时选中不同元素
                       #wrap .inner:nth-of-type(1), 找到#wrap下相同元素中第一个类为inner的子元素而不是找到#wrap下第一个类为inner的子元素
                延伸
                :first-of-type
                :last-of-type
                :nth-last-of-type
                :only-of-type  相当于:first-of-type:last-of-type
            :empty
                不能含有任何内容, 包括空格
        5.伪元素选择器, 可以使用单冒号或者双冒号,位于dom树之外, 是由css进行创建
            ::after
            ::before
            ::firstletter   第一个字母
            ::firstline     第一行
            ::selection 光标选中的部分
## 声明的优先级
        选择器特殊性, 特殊性为4个部分 0,0,0,0
        ID选择器特殊性为第三位
        类选择器, 伪元素, 属性选择器特殊性为第二位
        伪类与元素特殊性为第一位
        通配符不增加特殊性
        结合符对特殊性没有贡献
        内联中的选择器特殊性为第四位
        继承属性没有特殊性
        重要声明
            添加在声明最后即分号之前
            浏览器会将重要声明与非重要声明分为两组, 先解决每一组之间的冲突, 再解决两组之间的冲突, 胜出的一定重要声明
        权重：
            读者的重要声明
            创作者的重要声明
            创作者的正常声明
            读者的正常声明
            用户代理的声明
        计算声明优先级：
            按照来源排序
            按照选择器特殊性排序
            按照顺序排序
## 自定义字体与字体图标
        CSS3提供, 不能放在声明块中
        @font-face{
            font-family: "字体名",
            src: url(路径)
        }
        上传矢量图到icomoon转换成字体demo再根据demo修改自己的页面
        由于字体图标属于font, 当想修改样式时通过修改font相关的样式来修改字体图标
## 新增UI样式
        1.opacity
            性能较visibility高, 不继承但是子元素会应用透明效果
        2.rgba
            第四个参数是设置opacity值, 可以省略0, 例子rgba(0,0,0,.5)
        3.text-shadow
            默认值为none, 不可继承
            可选值：[(x偏移量, y偏移量, 模糊程度, 颜色)]{1,}
            可以添加多层阴影
            浮雕文字
                字体设为白色, 使用字体阴影
            模糊字体
                使用text-shadow的第四个参数
            模糊图片
                使用浏览器过滤器filter: flur(10px)来对指定元素模糊(不是对元素背景)
        4.transition
            给元素添加指定时长的动画效果, 参数为s
        5.direction
            设置文字呈现方向
            可选值：ltr, rtl等, 配合unicode-bidi:bidi-override
        6.-webkit-text-stroke 非CSS3内容, 由浏览器自主实现
            文字描边功能
            -webkit-text-stroke: <length> <color>;
## 新增盒模型样式
        1.box-shadow
            默认值为none, 不可继承
            可选值：[(inset/outset, x偏移量, y偏移量, 模糊程度, 模糊面积, 颜色)]{1,}
        2.-webkit-box-reflict 非CSS3内容, 由浏览器自主实现
            box倒影
            可选值：
                -webkit-box-reflict: <direction> <间距>; 第三个参数可以设置为渐变ilnear-gradient/radial-gradient
        3.resize
            控制块元素伸缩
            常用可选值：vertical, horizontal, both
        4.box-sizing
            border-box  使盒模型在设置宽高时会自动调整内容区使宽高包括内边距与边框
            content-box 默认值
## 新增UI样式
        1.border-radius
            默认值0, 不可继承
            百分数水平参照于盒模型的宽度, 垂直参照盒模型高度, 最高值为50%, 超出将被设置为50%, 在IOS5或者安卓4之前不能使用, 尽量不要使用
            可选值:
                当没有/时, 内部画的圆按照参数不同分别按顺序应用于左上, 右上, 右下, 左下
                radius  
                当有/时, 内部画的圆对于4个角来说X轴半径固定, Y轴半径按照参数不同分别按顺序应用于左上, 右上, 右下, 左下
                (first radius)/radius
        2.border-image-source
            设置边框图片, 参数为url()
            必须配合border-width与border-style使用, 但是border-style的效果不会生效只显示图片
            配合border-image-slice来决定图片在边框的分布, 对图片按照上右下左的顺序根据设定值规定的距离进行切割再放置在边框上
            例如border-image-slice:33.3333%,就是对这个图片距离上右下左33.3333%的地方切割放置在边框上, 当加上fill值时才将图片中心内容当做background-imgage给图填充否则不填充
            浏览器会将切割好的部分平均分成三部分放置在边框角和边框上, 边框上的图片默认会被拉伸, 由border-image-repeat的值决定
            border-image-repeat：
                1.repeat, 边框上的部分从边框中心开始平铺, 两边可能会被截断
                2.round, 平铺图像。当不能整数次平铺时, 根据情况放大或缩小图像。
                3.stretch, 拉伸
                4.space, 平铺图像 。当不能整数次平铺时, 会用空白间隙填充在图像周围（不会放大或缩小图像）
        3.border-iamge-outset
            使边框图片向外扩张, 不能为负值
        4.CSS3背景样式
            1.background-origin
                决定背景从哪里开始绘制,在没设置no-repeat或者clip的情况下其余部分会被平铺占满
                border-box
                padding-box,为默认值
                content-box
            2.background-clip
                决定背景从哪里剪去
                border-box,为默认值
                padding-box
                content-box
            3.background-size：
                修改图片大小
                默认为auto
                - 固定值, px, em, xm等
                - 百分比, 背景盒模型的百分比, 根据background-origin值决定
                - contain 使图片在不改变比例的情况下全部被父元素包含
                -cover 使图片在不改变比例的情况下将父元素填充满
        5.线性渐变(应用给background-image)
            background-image: linear-gradient(toright, red,yello,green);(颜色参数可以是rgba进行透明度渐变)
                第一个值可以是角度N deg, 正上方为0, 顺时针为正, 逆时针为负
                从第二个颜色参数起在每个颜色后可以添加百分比或者固定值表示在这个值后的颜色就是自己写定的颜色, 第一个颜色参数是指这个值前的颜色是自己写定的颜色
            background-image: repeating-linear-gradient(toright, red 100px,yello 200px);
                从第100px开始以red开头渐变, 渐变到300px以yello结束, 剩余像素采用平铺的方式
        6.径向渐变
            background-image: radial-gradient([closest-side|farthest-side|closest-corner|farthest-corner][circle|ellipse][at 渐变圆心X轴的位置, 渐变圆心Y轴的位置], red,yello,green);(第一个参数默认为farthest-corner ellipse)
## 过渡
        transition
        存在简写形式, 可以使CSS在可动画化属性发生变化的过程时按照指定时间内产生渐变动画
        给元素增加此属性后即便是js改变的属性也会发生动画
        -transition-property
            默认值为all, 指定需要产生动画效果的属性, 可以指定多个属性
        -transition-duration
            指定动画过程的时间, 单位可以是s与ms, 默认为0s, 不接受负值, 必须加单位
            可以指定多个参数, 当此参数数量少于指定的属性时, 整个时长列表会重复放置
        -transition-timing-function
            ease    先快后慢, 默认值
            linear  线性
            ease-in 加速
            ease-out    减速
            ease-in-out 先加速后减速, 速度比ease快
            cubic-bezier 贝塞尔曲线
            steps(num, [start|end]) 默认为end, start意思为触发此状态时立刻前进一步状态, end指触发此状态后等待一个间隔再前进一步状态
            可以有多个参数, 当参数数量少于property时, 不足的部分使用默认值
        -transition-delay
            表示延迟时间, 规则与duration一致
        过渡完成事件
            -transitioned, 只能在dom2事件中触发(addEventListener)
        transition难点1：
            css属性存储在内存中会快于浏览器渲染
        transition难点2：
            transition在首次渲染未结束前是不会触发的
                -css渲染慢于同步下的js引擎, 此时会导致许多可能的预期外影响
                    在js中直接设置元素样式, 此时不会触发动画
                    在js中先设置alert()后设置元素样式, 会触发动画, 因为alert的异步特点
                    在js中将样式写在onload的事件函数中会触发动画
                    在js中将两个不同样式同步地写在onload事件函数中只会触发第二个样式的动画
                    使用settimeout等待css渲染完后才可以触发动画
                    先修改样式再添加duration仍然会触发动画
        transition简写
            严格遵循书写顺序, 按照duration, property,timing-function,delay的顺序书写
            可以用逗号分隔不同的动画效果, 在遇到第一个可以解析为时间的值时会赋值给duration
## 2D变换
        transform 只支持块级元素
            rotate  旋转, 单位为deg
            translate   平移, 可设置单值, 与X轴平移相同
            translateX
            translateY
            skew    倾斜, 单位为deg, 可设置单值, 与X轴倾斜相同
            skewX
            skewY
            scale   缩放, 可设置单值, 使X轴与Y轴按同比例缩放
            scaleX
            scaleY
        基点的变换
            transform-origin 设置X轴Y轴上的基点位置, 百分比是基于元素的宽高
            对除translate外的属性才产生影响
        2D变换中所有的变换都是基于矩阵运算
        变换组合
            在变换组合时矩阵运算方式是从右向左的, 感官上可认为坐标系按照从左向右的顺序发生了变换
        transition难点3:
            在绝大多数变换组合进行切换时, 如果两次变换的数量, 顺序不同时, 不会触发过渡动画
            因此在涉及到变换组合内的变换改变的时候要注意数量和顺序问题
        transition难点4:
            过渡变换只关注变换起始状态与最终状态, 无法控制中间状态
## 3D变换
        景深
        perspective
            景深可以理解为肉眼距离显示屏的距离, 景深越大, 变换效果越不明显
            可以使3D效果产生近大远小的功能, 不可继承, 但是效果是作用给后代元素
        transform: perspective
            写在需要作用的元素中, 但必须放在tranform所有变换的首位, 其他位置会使变换失效
        灭点
            控制视图的焦点即景深
            景深越大灭点越远, 元素变形更小
        景深基点
            perspective-origin(x, y, z)
            控制视角的位置, 默认值为50% 50% 50%, 参照border-box模型, 常与perspective结合使用
        transform-style
            preserve-3D, 常用值
            none, 默认值
            营造有层级的3d舞台, 不可继承属性, 但只作用于子元素
        景深叠加
            祖先元素增加多个景深会产生景深叠加, 由于叠加规则不可控因此要避免
        backface-visibility
            -visible
            -hidden
            隐藏背面
        rotate3D(x,y,z,angle), x, y, z的值只有0,1的区别, 大于1没有影响
        rotateX()
        rotateY()
        rotateZ()
        translateD(translateX,translateY,translateY)
        scaleZ()
            单独使用时没有意义, 组合使用会影响到Z坐标轴
        难点：
            当对某个元素进行变换时, 这个元素结构内部的所有元素都会发生变换, 而不仅仅只有设置了变换的这个元素会产生变换效果
## 动画
        动画内属性
        animation-name
            - 指定关键帧的名字
        关键帧基本写法：
            @keyframes name{
                from{}
                to{}
            }
        animation-duration
            - 指定动画周期, 无单位与负值无效
        animation-timing-function
            - 指定关键帧周期的运动方式
            - steps(step, end默认值|start)
                设置end时动画的起始位置会占用一步, 否则不会, 即start看不见第一帧, end看不见最后一帧
        animation-direction
            - 反转关键帧执行顺序, 使顺序为to-from, 同时也反转动画运动方式, 即timing-function
            - normal 默认值
            - reverse 反转
            - alternate 播放顺序为from-to然后to-from然后循环
            - alternate-reverse 播放顺序与alternate相反
        动画外属性
        animation-delay
            - 指定延迟时间
        animation-literation-count
            - 只影响动画内的属性
            - infinite  无限次数
            - num
        animation-fill-mode
            - 管理元素在动画外的状态
            -none 默认值, 动画外的属性保持在动画之前
            - backwords from之前的状态保持的和from的状态保持一致
            - forwords to之后的状态与to的状态保持一致
            - both 包含以上两种情况
        animation-play-state
            - 控制动画是否暂停或运动
            - paused
            - running   默认值
        关键帧进阶：
            @keyframes name{
                from(0%){

                }
                百分比{

                }
                百分比{

                }
                百分比{

                }
                to(100%){
                    
                }
            }
            百分比为duration时间的百分比, 整个关键帧中的百分比为一个动画周期, 两个百分比算作一个关键帧周期
        简写属性
            animation
                与transition类似, 前两个能被解析成时间的参数被看做duration与delay
## flex布局
        常用于移动端
        安卓4.3及之前版本使用需要-webkit-flex
        更老的版本使用flex的老版本称为box, 使用时加上-webkit-前置   
        用法：
            display: flex|-webkit-flex|-webkit-box
        flex布局分为主轴与侧轴, 放下为向右与向下, 整体又分为容器与项目, 容器属性作用于容器, 项目属性作用于项目
        表格中没有写属性的表示老版本不存在此属性

|    |老版本box|新版flex|
|:---:|:---:|:---:|
| 容器 |||
|决定主轴或侧轴水平或者垂直     |       `-webkit-box-orient: vertical|horizontal `      |`flex-direction: column|row`|
|决定主轴的方向                |       `-webkit-direction: normal默认值|reverse`          |     `flex-direction: column-reverse|row-reverse`|
|        主轴富裕空间管理      |               `-webkit-box-pack:start|end|center|justify`   |         `justify-content: flex-start默认值|flex-end|center|space-between|space-around`|
|       侧轴富裕空间管理, 单行/单列有效 |      `-webkit-box-align:start|end|center|justify` |          `align-items: flex-start默认值|flex-end|center|baseline|stretch`|
|        控制侧轴的堆砌方向   |                      |                                               `flex-wrap: nowrap默认值|wrap|wrap-reverse`|
|        控制多行/多列的富裕空间管理    |                                |                            `align-content(把每行/列看成一个整体): flex-start|flex-end|center|space-between|space-around|stretch|normal默认值`|
|        新版本中flex-direction与flex-wrap的简写    |                                               |`flex-flow: column|row|column-reverse|row-reverse [nowrap默认值|wrap|wrap-reverse]`|
    老版本：
        start   表示富裕空间在右边(x轴)或下边(y轴)
        end     表示富裕空间在左边(x轴)或上边(y轴)
        center  表示富裕空间在两边
        justify 表示富裕空间在项目之间
        老版本不能控制侧轴方向, 因为老版本无法在侧轴堆砌, 想要在侧轴有堆砌效果必须使用多个容器
    新版本：
    flex-start      表示富裕空间在按轴方向的后面
    flex-end        表示富裕空间在按轴方向的前面
    center          表示富裕空间在两边
    space-between   表示富裕空间在项目之间
    space-around    表示富裕空间在项目两边
    baseline        基线对齐
    stretch         等长/高布局, 项目不能有高度
    align-content中的stretch    侧轴的等长/高布局, 富裕空间会按照1:1的比例填充给每一个项目
                                            老版本box                                               新版flex
    项目：
        弹性空间管理, 放大                      -webki-box-flex: 默认值为0                                 flex-grow: 弹性因子默认值为0
            将主轴上的富裕空间按照设定的比例分配个每个项目上, 参数为纯数字
            计算规则
            可用空间 = 容器大小 - 所有相邻项目的flex-basis总和(没有设置时默认为height(y轴), width(x轴))
            可扩展空间 = (可用空间) / 所有相邻项目的flex-grow的总和
            每个项目伸长后大小 = 每个项目自身的flex-basis(没有设置时默认为height(y轴), width(x轴)) + 可扩展空间 * 每个项目自身的flex-grow
            在老版本中没有flex-basis因此此值就是每个项目自己的width/height
            老版本可以控制伸缩, 伸缩的计算规则都与新版本的flex-grow相同
        弹性空间管理, 缩小                                                                                flex-shrink 收缩因子默认值为1
            计算规则
            需缩减大小 = 容器大小 - 所有相邻项目的flex-basis总和(没有设置时默认为height(y轴), width(x轴))
            总权重 = 每一个项目flex-basis * flex-shrink之后求和
            每个项目的权重 = 每一个项目flex-basis * flex-shrink/总权重
            每个项目缩减后大小 = 每一个项目flex-basis - 需缩减大小 * 每个项目的权重
            在flex-wrap值不是nowrap时, 此属性失效
            flex-grow与flex-shrink在计算时的区别在于后者要将flex-basis考虑进权重
        排列顺序                                                                                    order
            决定每一个项目在容器中排列的顺序
        管理单个项目的富裕空间, 单行/单列有效                                                                       align-self: flex-start|flex-end|center|space-between|space-around|stretch|auto默认值
            如果此项目没有父元素即容器时, 默认为stretch
        基值                                                                                        flex-basis 默认值为height(y轴), width(x轴)
        flex练习: flexboxfroggy.com
        flex应用
        1.等分布局
            flex-basis: 0
            flex-grow: 1
            flex-shrink: 1
            简写属性
                flex: 1
                等同于上面三行代码
## 响应式布局核心
        CSS2媒体查询
            <link rel="stylesheet" type="text/css" href="index.css" media="print|screen"/>
            指定媒体才引入相应css代码
        CSS3媒体查询
            @media 媒体类型 [and 媒体属性]{0,} {

            }
            对声明特殊性没有任何贡献
            媒体类型：
                screen|print|all(默认值)
            媒体属性：
                width   可添加min或max前缀, 当为min时表示大于某个值有效
                height  可添加min或max前缀, 当为max时表示小于某个值有效
                device-width    表示移动端：设备独立像素, pc端：分辨率。可添加min或max前缀
                device-pixel-ratio  PC端值为1, 移动端与手机种类有关, 使用时添加webkit前缀, 还可添加min或max前缀
                orientation 指定显示的屏幕, portrait表示竖屏, landscape表示横屏
            关键字：
                and     代表与, 一般用来连接媒体类型与媒体属性
                only    和浏览器有关, 老版本不支持媒体属性, 因此添加后会使老浏览器无法识别而不执行这段查询, 写在媒体查询开头
                逗号,   代表或的意思, 逗号前为一组规则, 后为一组规则, 可以有3组及以上规则
                not     位置与only相同, 同样在老浏览器中无法识别
    多列布局
        column-width    指定一列宽度, 由于文字间隔等原因一般会比width/(column-width)的列数少1
        column-count    分成指定列数
        column-gap      指定两列之间间距
        column-rule     指定每列间的分隔线样式  
# 规范
    ECMA262 JS基础规范
    DOM0 浏览器厂商自主实现, 非W3C规范
    DOM1 开始成为W3C规范, 专注于html与XML文档
    DOM2 增加了样式表对象模型, addEventListener等
    DOM3 对DOM2增加了内容模型(DTD,schemas)和文档验证