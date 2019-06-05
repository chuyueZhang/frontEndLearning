# 容器
## 流体布局
`class="container-fluid"`

`width: auto`
## 固定容器
`class="container"`

固定容器特性
```less
//阈值
@screen-xs:                  480px;
@screen-xs-min:              @screen-xs;
@screen-phone:               @screen-xs-min;

@screen-sm:                  768px;
@screen-sm-min:              @screen-sm;
@screen-tablet:              @screen-sm-min;

@screen-md:                  992px;
@screen-md-min:              @screen-md;
@screen-desktop:             @screen-md-min;

@screen-lg:                  1200px;
@screen-lg-min:              @screen-lg;
@screen-lg-desktop:          @screen-lg-min;
@grid-gutter-width:         30px;
```
|响应式阈值|width|
|:------:|:---:|
|大于1200(lg)|1170(1140+槽宽30)|
|大于等于992小于1200(md)|970(940+槽宽30)|
|大于等于768(sm)|750(720+槽宽30)|
|小于768(xs)|auto|
## 栅格布局
被容器包裹，一行默认被分成12份
### 栅格grid源码分析 
1.流体容器与固定容器公共样式

容器的左右外边距为`auto`, 左右内边距为`15px`
```less
.container-fixed(@gutter: @grid-gutter-width) {
  margin-right: auto;
  margin-left: auto;
  padding-left:  floor((@gutter / 2));  //15px
  padding-right: ceil((@gutter / 2));   //15px
  &:extend(.clearfix all);
}
```
2.固定容器特定样式

根据媒体查询结果设置容器宽度

```less
.container {
  .container-fixed();

  @media (min-width: @screen-sm-min) {
    width: @container-sm;
  }
  @media (min-width: @screen-md-min) {
    width: @container-md;
  }
  @media (min-width: @screen-lg-min) {
    width: @container-lg;
  }
}
```
3.流体容器特定样式
```less
.container-fluid {
  .container-fixed();
}
```
4.行特定样式

将每一行的左右外边距设为`-15px`, 与容器的内边距重叠
```less
.row {
  .make-row();
}
.make-row(@gutter: @grid-gutter-width) {
  margin-left:  ceil((@gutter / -2));
  margin-right: floor((@gutter / -2));
  &:extend(.clearfix all);
}
```
5.列特定样式

初始化列公共样式
```less
.make-grid-columns();
.make-grid-columns() {
  // 对lg, md, sm, xs四种情况, 都会将一行分成@grid-columns份, 此处为12
  .col(@index) { // 初始化列样式
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @grid-columns) { // 递归
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index, @list) when (@index > @grid-columns) { // 递归出口
    @{list} {
      //设置相对定位以便每一列能够开启列排序
      position: relative;
      // 设置最小高度防止没有内容时元素坍塌
      min-height: 1px;
      // 通过槽宽来设置内边距
      padding-left:  ceil((@grid-gutter-width / 2));
      padding-right: floor((@grid-gutter-width / 2));
    }
  }
  .col(1); // 开启样式
}
```
根据媒体查询来决定开启哪种特定样式
```less
//手机优先，当以下三种媒体查询没有效果时默认使用此样式, 否则按照从小到大的顺序覆盖
.make-grid(xs);
@media (min-width: @screen-sm-min) {
  .make-grid(sm);
}
@media (min-width: @screen-md-min) {
  .make-grid(md);
}
@media (min-width: @screen-lg-min) {
  .make-grid(lg);
}
//混合匹配, 用来分别设置width, pull, push, offset的样式
.loop-grid-columns(@index, @class, @type) when (@index >= 0) {
  .calc-grid-column(@index, @class, @type);
  // 下一步迭代
  .loop-grid-columns((@index - 1), @class, @type);
}
//设置列样式
.make-grid(@class) {
  .float-grid-columns(@class);
  .loop-grid-columns(@grid-columns, @class, width);
  .loop-grid-columns(@grid-columns, @class, pull);
  .loop-grid-columns(@grid-columns, @class, push);
  .loop-grid-columns(@grid-columns, @class, offset);
}
```
### 以`.make-grid(xs)`为例
#### 运行`.float-grid-columns(@class)`混合

设置`class`为`col-xs-1, col-xs-2, ..., col-xs-12`的浮动样式
```less
.float-grid-columns(@class) {
  .col(@index) { // 初始化列样式
    @item: ~".col-@{class}-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @grid-columns) { // 递归
    @item: ~".col-@{class}-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index, @list) when (@index > @grid-columns) { // 递归收尾, 给所有选择器添加浮动
    @{list} {
      float: left;
    }
  }
  .col(1); // 开启列样式
}
```
#### 运行`.loop-grid-columns(@grid-columns, @class, width)`混合

设置`class`为`col-xs-1, col-xs-2, ..., col-xs-12`的`width`
```less
.calc-grid-column(@index, @class, @type) when (@type = width) and (@index > 0) {
  .col-@{class}-@{index} {
    width: percentage((@index / @grid-columns));
  }
}
```
#### 运行`.loop-grid-columns(@grid-columns, @class, push)`混合

设置`class`为`col-xs-1, col-xs-2, ..., col-xs-12`的列排序
```less
.calc-grid-column(@index, @class, @type) when (@type = push) and (@index > 0) {
  .col-@{class}-push-@{index} {
    //列排序由left实现
    left: percentage((@index / @grid-columns));
  }
}
.calc-grid-column(@index, @class, @type) when (@type = push) and (@index = 0) {
  .col-@{class}-push-0 {
    //为了使递归中不将left设置为0px因此单独挑出@index=0时设置值为auto
    left: auto;
  }
}
```
#### 运行`.loop-grid-columns(@grid-columns, @class, pull)`混合

与`push`的区别仅仅在于此处设置的是相对定位的`right`而非`left`

因此对不同阈值不能跳跃设置列排序, 可能会发生`left`, `right`冲突或者未覆盖的情况
#### 运行`.loop-grid-columns(@grid-columns, @class, offset)`混合
设置`class`为`col-xs-1, col-xs-2, ..., col-xs-12`的列偏移
```less
.calc-grid-column(@index, @class, @type) when (@type = offset) {
  .col-@{class}-offset-@{index} {
    //列偏移由外边距实现
    margin-left: percentage((@index / @grid-columns));
  }
}
```
## 响应式工具
```less
.responsive-visibility() {
  display: block !important;
  table&  { display: table !important; }
  tr&     { display: table-row !important; }
  th&,
  td&     { display: table-cell !important; }
}

.responsive-invisibility() {
  display: none !important;
}
//初始化所有样式为隐藏
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  .responsive-invisibility();
}
//将符合条件的元素显示出来
.visible-xs {
  @media (max-width: @screen-xs-max) {
    .responsive-visibility();
  }
}
.visible-xs-block {
  @media (max-width: @screen-xs-max) {
    display: block !important;
  }
}
.visible-xs-inline {
  @media (max-width: @screen-xs-max) {
    display: inline !important;
  }
}
.visible-xs-inline-block {
  @media (max-width: @screen-xs-max) {
    display: inline-block !important;
  }
}
//将符合条件的元素隐藏
.hidden-xs {
  @media (max-width: @screen-xs-max) {
    .responsive-invisibility();
  }
}
.hidden-sm {
  @media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
    .responsive-invisibility();
  }
}
.hidden-md {
  @media (min-width: @screen-md-min) and (max-width: @screen-md-max) {
    .responsive-invisibility();
  }
}
.hidden-lg {
  @media (min-width: @screen-lg-min) {
    .responsive-invisibility();
  }
}
```
## 栅格盒模型的精妙之处
### 回顾栅格的基本规则
* 固定容器拥有左右内边距15px
* 行两边有-15px的外边距
* 列两边有15px的内边距

1. 为了维护槽宽的规则列里面应该内边距隔开相邻列内的文本
2. 当列里面放行行里又有子列时, 为了不让被行里面的子列内的文本与跟行外面那个列相邻列内的文本的边距扩大, 需要给行设置负的外边距使任意嵌套关系的两列内边距恒定为30px
3. 当给容器内放行时, 必须给容器设置内边距才能抵消行的外边距的副作用
## bootstrap的定制化
* 修改源码

bootstrap的入口文件为bootstrap.less, 里面的import为less的特性, 起着整合其他less的功能而不是css中发出新请求的功能, 可以经常使用

可以通过修改源码后重新编译bootstrap.less再引入新css文件
* 创建新的入口文件

将bootstrap的入口文件当做混合引入到新的入口文件中

接下来修改想要修改的变量或样式

最后将新入口文件编译引入
