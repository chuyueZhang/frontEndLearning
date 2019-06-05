/*
 1. 鼠标移入显示,移出隐藏
    目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

$(function () {
  showHide()
  subMenu()
  search()
  share()
  address()
  minicart()
  products()
  midumImg()
  movePic()
  showBig()

  //1. 鼠标移入显示,移出隐藏
  function showHide() {
    $('[name=show_hide]').hover(function () {
      var id = $(this).attr('id') //当前元素的id
      var subId = id + '_items' //子元素id
      $('#' + subId).show() //显示
    }, function () {
      var id = $(this).attr('id') //当前元素的id
      var subId = id + '_items' //子元素id
      $('#' + subId).hide() //隐藏
    })
  }

  //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
  function subMenu() {
    $('#category_items .cate_item').hover(function () {
      $(this).children('.sub_cate_box').show()
    }, function () {
      $(this).children('.sub_cate_box').hide()
    })
  }

  //3. 输入搜索关键字, 列表显示匹配的结果
  function search() {
    // 1.写入数据的时候，出现智能提示
    // 2.失去焦点的时候，隐藏智能提示
    // 3.当输入框中有数据的时候，获得焦点 出现智能提示，
    // 4.当输入框中没有数据的时候，获得焦点 不出现智能提示

    $('#txtSearch')
      .on('keyup focus', function () {
        var value = this.value.trim()
        if (value){
          $('#search_helper').show()
        }
      })
      .blur(function () {
        $('#search_helper').hide()
      })
  }

  //4. 点击显示或者隐藏更多的分享图标
  function share() {
    var isClose = true
    $('#shareMore').click(function () {
      if (isClose) { //当前关闭==>打开
        $('#dd').width('200px') //宽度增加
        $('a').prevAll(':gt(3)').show()
        $(this).children('b').addClass('backword')
        isClose = false
      } else { //当前打开==>关闭
        $('#dd').width('155') //宽度增加
        $(this).prevAll(':lt(2)').hide()
        $(this).children('b').removeClass('backword')
        isClose = true
      }
    })
  }

  //5. 鼠标移入移出切换地址的显示隐藏
  function address() {
    $('#store_select').hover(function () {
      $('#store_content, #store_close').show()
    }, function () {
      $('#store_content, #store_close').hide()
    })

    //点击叉隐藏
    $('#store_close').click(function () {
      $('#store_content, #store_close').hide()
    })

    // 6. 点击切换地址tab
    $('#store_tabs>li').click(function () {
      $(this).siblings().removeClass('hover')
      $(this).addClass('hover')
    })
  }

  //7. 鼠标移入移出切换显示迷你购物车
  function minicart() {
    $('#minicart').hover(function () {
      $(this).addClass('minicart').children('div').show()
    }, function () {
      $(this).removeClass('minicart').children('div').hide()
    })
  }

  //8. 商品详情的切换显示
  function products() {
    $('#product_detail>ul>li').click(function () {
      $(this).siblings().removeClass('current') //兄弟姐妹去掉被选中的状态
      $(this).addClass('current') //本身添加 class
      var index = $(this).index() //得到在兄弟中的下标
      //找到5个div 把他们隐藏 找到当前的索引，根据当前的索引 显示当前div
      $('#product_detail>div:not(:eq(0))').hide().eq(index).show()
    })
  }

  //9. 点击向右/左, 移动当前展示商品的小图片
  function movePic() {
    var $preview = $('#preview')
    var $backward = $preview.children('h1').children('a:eq(0)')
    var $forward = $preview.children('h1').children('a:eq(1)')
    var $iconList = $('#icon_list')
    var WIDTH = 5
    var PIC_WIDTH = 62
    var counter = 0 //左侧的图片的数量
    var THRESHOLD = 0 //阈值

    //初始化
    //检查有几张图片
    var pics = $iconList.children('li').length
    var THRESHOLD = pics - WIDTH
    if (pics > WIDTH) {
      //调节按钮
      $forward.attr('class', 'forward')
      //列表的宽度
      $iconList.width(pics * PIC_WIDTH)
    }

    //事件响应
    $forward.click(function () {
      //检查当前状态
      var currentState = $(this).attr('class')
      if ('forward_disabled' !== currentState) {
        counter++
        $iconList.css({
          left: -PIC_WIDTH * counter
        })
        if (counter === THRESHOLD) {
          //把按钮设置为 不可用状态
          $forward.attr('class', 'forward_disabled')
        }
        if (counter > 0) {
          //把左侧按钮设置为 可用状态
          $backward.attr('class', 'backward')
        }
      }
    })
    $backward.click(function () {
      //检查当前状态
      var currentState = $(this).attr('class')
      if ('backward_disabled' !== currentState) {
        counter--
        $iconList.css({
          left: -PIC_WIDTH * counter
        })
        if (counter === 0) {
          //把按钮设置为 不可用状态
          $backward.attr('class', 'backward_disabled')
        }
        if (counter < THRESHOLD) {
          //把左侧按钮设置为 可用状态
          $forward.attr('class', 'forward')
        }
      }
    })
  }

  //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
  function midumImg() {
    $('#icon_list>li').hover(function () {
      //获取到 自己 src
      var src = $(this).children('img').attr('src')

      //设置中图的src
      var srcMedium = src.replace('.jpg', '-m.jpg')
      $('#mediumImg').attr('src', srcMedium)

      //加红框
      $(this).children('img').addClass('hoveredThumb')
    }, function () {
      $(this).children('img').removeClass('hoveredThumb')
    })
  }

  //11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
  function showBig() {
    var $mask = $('#mask') //小黄块
    var $maskTop = $('#maskTop') //透明层
    var $largeImgContainer = $('#largeImgContainer') //大图的容器
    var $loading = $('#loading') //加载过程图
    var $largeImg = $('#largeImg') //大图的标签
    var $mediumImg = $('#mediumImg') //中图标签
    var MASK_WIDTH = $mask.width()
    var MASK_HEIGHT = $mask.height()
    var MEDIUM_WIDTH = $mediumImg.width()
    var MEDIUM_HEIGHT = $mediumImg.height()


    $maskTop.hover(function () {
      //显示
      $mask.show()
      $largeImgContainer.show()

      //通知系统加载图片
      var srcM = $mediumImg.attr('src')
      var srcL = srcM.replace('m.jpg', 'l.jpg')
      $largeImg.attr('src', srcL)
      //图片加载好后做一些处理
      //loading 隐藏
      $largeImg.on('load', function () {
        // console.log('aaa')
        $loading.hide() //隐藏
        //容器大小由 图片大小决定
        var picLWidth = $largeImg.width()
        var picLHeight = $largeImg.height()

        //设置容器
        $largeImgContainer.width(picLWidth / 2)
        $largeImgContainer.height(picLHeight / 2)
        $largeImg.show() //显示

        //监听鼠标事件
        $maskTop.mousemove(function (event) {
          //关于父元素
          var mouseLeft = event.offsetX
          var mouseTop = event.offsetY
          console.log(mouseLeft, mouseTop)

          //小黄块运动
          var maskLeft = mouseLeft - MASK_WIDTH / 2
          var maskTop = mouseTop - MASK_HEIGHT / 2

          //横向范围
          if (maskLeft < 0) {
            maskLeft = 0
          }
          if (maskLeft > MEDIUM_WIDTH / 2) {
            maskLeft = MEDIUM_WIDTH / 2
          }

          //纵向范围
          if (maskTop < 0) {
            maskTop = 0
          }
          if (maskTop > MEDIUM_HEIGHT / 2) {
            maskTop = MEDIUM_HEIGHT / 2
          }

          // 重新绘制小黄块的位置
          $mask.css({
            top: maskTop,
            left: maskLeft
          })

          //计算大图的位置
          var largImgLeft = picLWidth * maskLeft / MEDIUM_WIDTH
          var largImgTop = picLHeight * maskTop / MEDIUM_HEIGHT

          //设置大图的位置
          $largeImg.css({
            left: -largImgLeft,
            top: -largImgTop
          })
        })
      })
    }, function () {
      //隐藏
      $mask.hide()
      $largeImgContainer.hide()
    })
  }

})




