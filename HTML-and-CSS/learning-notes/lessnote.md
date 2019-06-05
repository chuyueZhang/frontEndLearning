# less预处理器

LESS是一种动态样式语言扩展了CSS的功能添加了变量, Mixin, 函数等特性

* 可以通过客户端编译
    
    引入less编译的js文件, 会增加客户端加载速度

* 可以通过服务端编译
  
    通过nodejs实现

* 可以通过预编译转化成css文件再从html引入
  
    使用[考拉编译器](www.koala-app.com)

## 注释
通过//编写的注释在编译成css后不会暴露

通过/**/编写的注释才会暴露

## 变量

### 变量为延迟加载

整个文件加载完后才给变量赋值，因此某个变量值可能是在这行语句后面定义的值

### 使用@来声明变量

* @color: pink;
* @a: #wrap;
* @b: margin;
* @c: min.jpg;

当变量为选择器，属性名，url时，要用`@{selector|attr|url}`的方式

```less {.line-numbers}
@{a}{
}
.wrap{
    @{b}: 20px;
}
.wrap{
    background-image: url(@{c});
}
```

当变量为属性值时使用@value的方式

```less {.line-numbers}
.wrap{
    color: @color;
}
```

## 嵌套规则
  
基本嵌套规则为大括号表示父子关系，即两个选择器之间有空格

使用&表示此选择器与上个选择器为兄弟关系，即两个选择器之间没有空格

## less混合(mixin)

混合是将一系列规则集引入另一个规则集中

在less规则中明确定义混合前必须加`.`

### 普通混合

此混合会被当成.center的样式被编译进原生css文件

```less {.line-numbers}
    // less:
            .center{
                width: 20px;
                height: 20px;
            }
            .wrap{
                .center
            }
    //css:
            .center{
                width: 20px;
                height: 20px;
            }
            .wrap{
                width: 20px;
                height: 20px;
            }
```

### 不带输出的混合

```less {.line-numbers}
    // less:
            .center(){
                width: 20px;
                height: 20px;
            }
            .wrap{
                .center()
            }
    //css:
            .wrap{
                width: 20px;
                height: 20px;
            }
```

### 带参数的混合

```less {.line-numbers}
    // less:
            .center(@a){
                width: @a;
                height: 20px;
            }
            .wrap{
                .center(100px)
            }
    //css:
            .wrap{
                width: 100px;
                height: 20px;
            }
```

### 多个参数的混合

```less {.line-numbers}
    // less:
            .center(@a, @b){
                width: @a;
                height: @b;
            }
            .wrap{
                .center(100px, 100px)
            }
    //css:
            .wrap{
                width: 100px;
                height: 100px;
            }
```
### 有默认值的混合

```less {.line-numbers}
    // less:
            .center(@a: 20px, @b: 20px){
                width: @a;
                height: @b;
            }
            .wrap{
                .center(100px)
            }
    //css:
            .wrap{
                width: 100px;
                height: 20px;
            }
```

### 匹配

```less {.line-numbers}
    // less:
            .triangle(@_, @a, @b){      //此处变量为形参不需要与匹配模式中其他的规则命名相同
                width: 100px;
                height: 100px;
            }
            .triangle(A, @c, @d){
                border-top: @c @d;
            }
            .triangle(B, @c, @d){
                border-bottom: @c @d;
            }
            .wrap{
                .triangle(A, 100px, solid)
            }
    //css:
            .wrap{
                width: 100px;
                height: 100px;
                border-top: 100px solid; 
            }
```

### arguments

```less {.line-numbers}
    // less:
            .center(@a, @b){
                border: @arguments;
            }
            .wrap{
                .center(100px, solid)
            }
    //css:
            .wrap{
                border: 100px solid; 
            }
```

## 计算

加减乘除，且可以只有一个数值加单位

```less {.line-numbers}
        //less:
        .wrap{
            border: 100+100px solid;
        }
        //css:
        .wrap{
            border: 200px solid;
        }
```

## 继承

语法: `:extend()`

  混合在被编译成css后，效果等同于将混合规则集复制到另一个混合集中，会造成原生css中有大量的重复声明块

  使用继承可以使多个选择器被结合符隔开，提高css性能

  被继承的规则写法上必须与普通混合相同，不能加括号也不能有参数

```less {.line-numbers}
    //less
            .center{
                width: 20px;
                height: 20px;
            }
            //第一种写法
            .wrap{
                &:extend(.center);
                &:first-child{
                    background-color: red;
                }
            }
            //第二种写法
            .wrap:extend(.center){
                &:first-child{
                    background-color: red;
                }
            }
    //css:
            .center,
            .wrap{
                width: 20px;
                height: 20px;
            }
            .wrap:first-child{
                background-color: red;
            }
```

## 避免编译

当在less使用运算时可以指定某些运算不被预编译，直接将运算过程赋值给原生css时可以使用此功能

```less {.line-numbers}
    //less:
        .wrap{
            border: ~(100+100px) solid;
        }
    //css:
        .wrap{
            border: 100+100px solid;
        }
```