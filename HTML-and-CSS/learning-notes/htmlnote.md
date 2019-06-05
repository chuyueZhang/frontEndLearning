结构
    <html>
        <head>
            <title></title>
        </head>
        <body></body>
    </html>
    title标签中的内容影响网站在搜索引擎中的排名
注释
    <!-- -->
标签
    例：
    `<font color="" size=""></font>`  //不推荐使用
    属性写在标签的头部
页面声明
    doctype
    浏览器存在两种模式:标准模式与怪异模式
    如果不写页面声明,有些浏览器会进入怪异模式,导致页面无法正常工作
    如果想定义页面为HTML5标准进行如下声明:
        `<!DOCTYPE html>`
实体(转义字符串)
    空格 &nbsp;
    大于号 &gt;
    小于号 &lt;
常用标签
    img
        拥有以下属性:
        src:
        alt:
        width:
        height:
        当只设置width或者height时,图片大小会按照比例缩放
        如果不打算制作自适应的网页,最好不要使用这个标签的width和height属性,因为即便缩小图片的大小,仍旧会占用图片原大小的内存
    meta
        1.设置网页关键字
        `<meta name="keywords" content=""/>`
        2.设置网页描述
        `<meta name="description" content=""/>`
        3.设置网页重定向
        `<meta http-equiv="refresh" content="...(时间),url=...(网址)"/>`
        4.设置字体
        `<meta charset="UTF-8"/>`
图片格式
    jpeg:
        支持颜色较多,不支持透明动态,常用于照片
    gif:
        支持颜色少,支持简单透明与动态
    png:
        支持颜色多,支持透明,不支持动态
    使用规则:
        效果一致使用小的
        效果不一致使用效果好的
内联框架
    `<iframe></iframe>`
        属性：
            src:
                可以使用相对路径与绝对路径
            height：
            width：
            name：
                指定name名
        不推荐使用，内联内容不会被搜索引擎检索到
框架集
    `<frameset></frameset>`
    内部使用`<frame></frame>`引入外部页面
        属性:
            rows 指定框架集中的页面一行一行的排列
            cols 一列一列的排列
            必须指定属性值来表示frame在页面中的占比
    框架集可以嵌套，会充当一个frame
`<a></a>`
    属性:
        href:
            可以使用相对路径或绝对路径，如果地址不确定可以使用#占位，会自动跳转到当前页面的顶部
            使用#id可以跳转到指定id的元素的所在位置
            使用mailto:(收件人地址)可以打开电子邮件客户端并将收件人设置为指定的收件人地址
        target:
            指定打开链接的位置
            --self 在当前窗口打开，默认值
            --blank 在新窗口打开
            内联框架name值，可以在指定框架中打开    
`<center></center>`
    居中元素，不推荐使用
标签的title属性: 当鼠标移入时显示的内容
文本标签
    语义表示强调                没有语义
    `<strong></strong>`   粗体   `<i></i>`
    `<em></em>`   斜体            `<b></b>`
    表示细则
    `<small></small>` 缩小字号
    表示引用，可用在所有有书名号时
    `<cite></cite>`   斜体
    短引用,浏览器会默认给标签里的内容添加引号
    `<q></q>`
    长引用,块级引用，是块元素
    `<blockquote></blockquote>`
    上标
    `<sup></sup>`
    下标
    `<sub></sub>`
    带有删除划线的内容
    `<del></del>`
    带有下划线的内容
    `<ins></ins>`
    保存html代码中的格式
    `<pre></pre>`
    表示这是代码的语义
    `<code></code>`
列表标签
    列表之间可以互相嵌套
    1.无序列表
        使用ul创建无序列表，使用li表示列表项，默认的项目符号由于不同浏览器显示不同不使用，如果需要设置图片
    2.有序列表
        使用ol创建，使用li表示列表项
    3.定义列表
        使用dl创建定义列表，dl中有两个子标签
            dt: 被定义的内容 
            dd: 对定义内容的描述
        dl，ul，ol之间可以相互嵌套
表格
    使用table创建表格
    使用tr创建一行
    在tr中使用td创建单元格
    表格创建时默认没有边框，可以通过修改table样式修改样式
    在td中使用colspan属性，值为需要合并的单元格数量，来横向合并单元格
    使用rowspan来纵向合并
    - table是块元素，在table和td间默认有个border-spacing属性来调整边框距离
    - 有border-collapse: collapse来对表格边框进行合并，如果设置了边框合并，border-spacing属性自动失效
    - 可以使用th来表示表格表头，与td效果相同只是会有一些默认字体效果
长表格
    在一些情况下非常长就需要将表格分为表头，表格主体，表格底部三部分
    使用thead，tbody，tfoot来区分table的不同部分，它们是table子标签，tr需要写在这些标签中
    无论这三个属性写在table的什么地方，thead永远显示在头部，tfoot永远显示在底部
    如果表格中没有写tbody，浏览器会默认添加tbody，所以tr不是table的子元素
表格布局
    以前经常使用表格来布局，现在被css替代了，因为维护困难且难以被搜索引擎检索
    布局特性：
        - 表格列数由最多的td或th决定
        - table可以嵌套
表单
    将用户输入提交给服务器
    使用form创建表单，必须指定action属性，值为表单提交的地址
    使用label来框中文字，给label指定for属性，值为需要连接的表单项的id，点击label相当于选择对应的表单项
    使用input指定表单项，在表单项中指定name属性的才会真正提交，指定placeholder属性会有提示水印，在IE8及以下不支持，需要JS
        - type="text" 单行文本框
        - type="password" 密码框
        - type="submit" 提交按钮
            提交按钮中用value值能改变按钮的文字
        - type="reset" 将表单内容恢复成默认值
        - type="button" 创建单纯的按钮
        - type="radio" 单选按钮
            通过name属性分组，相同的为一组，用来选择的表单项都需要指定value属性，提交给服务器的是value值
        - type="checkbox" 多选按钮
            通过name分组
    使用button标签来创建按钮更灵活，推荐使用，使用属性cursor设置移上去鼠标样式
    使用select创建下拉列表
        可以添加multiple="multiple"使其变成可以选中多个
        在之中使用option来创建下拉项，name给select指定，value给option指定
        使用optgroup对多个option进行分组，通过label属性对一组option创建组名
    使用textarea创建多行文本域
        - resize: none; 不能调整框大小
    在单选或者多选中使用checked="checked"来使其默认选中
    在下拉列表中使用selected="selected"使其默认显示
    使用fieldset创建表单分组，会有边框将一组内容框中(针对所有表单元素)
        在fieldset中使用legend为每一组创建组名，组名显示在边框的左上角中
    

            