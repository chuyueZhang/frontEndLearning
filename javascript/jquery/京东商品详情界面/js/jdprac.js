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
$(function(){
    showHiden()
    showSubItems()
    search()
    showShare()
    showAdress()
    showMinichart()
    toggleDetail()
    toggleImg()
    showMiddleImg()
    showBigImg()
    function showHiden(){
        $('[name="show_hide"]').hover(function(){
            $('#'+this.id+'_items').show()
        },function(){
            $('#'+this.id+'_items').hide()
        })
    }
    function showSubItems(){
        $('.cate_item').hover(function(){
            $(this).children(':last').show()
        }, function(){
            $(this).children(':last').hide()
        })
    }
    function search(){
        var $txtSearch = $('#txtSearch')
        var $search_help = $txtSearch.parent().prev()
        $txtSearch.focus(function(){
            if(this.value != ''){
                $search_help.show()
            }
            $txtSearch.keyup(function(){
                $search_help.show()
            })
        })
        $txtSearch.blur(function(){
            $search_help.hide()
        })
    }
    function showShare(){
        var $share_more = $('#shareMore')
        var $dd = $share_more.parent()
        var $show_img = $share_more.prevAll(':lt(2)')
        var is_open = false
        $share_more.click(function(){
            if(is_open){
                $dd.width(155)
                $show_img.hide()
                is_open = !is_open
            }else{
                $dd.width(200)
                $show_img.show()
                is_open = !is_open
            }
        })
    }
    function showAdress(){
        var $adress = $('#store_select')
        var $store_content = $adress.children(':gt(0)')
        $adress.hover(function(){
            $store_content.show()
        }, function(){
            $store_content.hide()
        })
        $store_content.next().click(function(){
            $store_content.hide()
        })
        toggleTab()
        function toggleTab(){
            var $tab_list = $store_content.first().children(':first').children()
            var clicked_item = 0
            $tab_list.on('click', function(){
                $tab_list.eq(clicked_item).removeClass('hover')
                this.className = 'hover'
                clicked_item = $(this).index()
            })
        }
    }
    function showMinichart(){
        var $minicart = $('#minicart')
        var $content = $minicart.children(':last')
        $minicart.hover(function(){
            $content.show()
            this.className = 'minicart'
        }, function(){
            $content.hide()
            this.className = ''
        })
    }
    function toggleDetail(){
        var $product_detail = $('#product_detail')
        var $main_tab_list = $product_detail.children(':first').children()
        var $detail_list = $product_detail.children(':gt(1)')
        var current = 0
        $main_tab_list.click(function(){
            $main_tab_list.eq(current).removeClass('current')
            $detail_list.eq(current).hide()
            var $this = $(this)
            current = $this.index()
            $this.addClass('current')
            $detail_list.eq(current).show()
        })
    }
    function toggleImg(){
        var $backward = $('.backward_disabled')
        var $forward = $('.forward_disabled')
        var $icon_list = $('#icon_list')
        var IMG_WIDTH = 62
        var SHOW_IMG = 5
        var TOTAL_IMG = 8
        var current_position = 0
        //初始化
        $forward.attr('class', $forward.attr('class').replace('_disabled', '')).click(function(){
            if(this.className.search(/_/)!= -1){
                return
            }
            current_position++
            $icon_list.css('left', $icon_list.position().left-IMG_WIDTH)
            if(current_position != 0){
                $backward.attr('class', $backward.attr('class').replace('_disabled', ''))
            }
            if(current_position === TOTAL_IMG-SHOW_IMG){
                this.className = this.className + '_disabled'
            }
        })
        $backward.click(function(){
            if(this.className.search(/_/)!= -1){
                return
            }
            current_position--
            $icon_list.css('left', $icon_list.position().left+IMG_WIDTH)
            if(current_position != TOTAL_IMG-SHOW_IMG){
                $forward.attr('class', $forward.attr('class').replace('_disabled', ''))
            }
            if(current_position === 0){
                this.className = this.className + '_disabled'
            }
            
        })
    }
    function showMiddleImg(){
        var $icon_list = $('#icon_list').children()
        var $medium_img = $('#mediumImg')
        $icon_list.hover(function(){
            var $img = $(this).children(':first')
            $img.addClass('hoveredThumb')
            $medium_img.attr('src', $img.attr('src').replace(/\.jpg$/,'-m.jpg')) 
        }, function(){
            $(this).children(':first').removeClass('hoveredThumb')
        })
    }
    function showBigImg(){
        var $medimImg_container = $('#medimImgContainer')
        var $medium_img = $medimImg_container.children('img')
        var $mask = $medimImg_container.children(':eq(1)')
        var $mask_top = $medimImg_container.children(':eq(2)')
        var $large_img_container = $medimImg_container.children(':eq(3)')
        var $large_img = $large_img_container.children(':last')
        var $load = $large_img_container.children(':first')
        var IMG_WIDTH = $medium_img.width()
        var IMG_HEIGHT = $medium_img.height()
        $mask_top.hover(function(){
            var mask_width = $mask.width()
            var mask_height = $mask.height()
            //显示黄块
            $mask.show()
            //显示大图
            $large_img_container.show()
            $large_img.show()
            $load.show()
            $large_img.attr('src', $medium_img.attr('src').replace(/m\.jpg$/, 'l.jpg'))
            $large_img.on('load', function(){
                $large_img_container.css({width: $large_img.width()/2, height: $large_img.height()/2})
                $load.hide()
                $mask_top.mousemove(function(event){
                    var mask_left = event.offsetX - mask_width/2
                    var mask_top = event.offsetY - mask_height/2
                    if(mask_left > IMG_WIDTH-mask_width){
                        mask_left = IMG_WIDTH-mask_width
                    }
                    if(mask_left < 0){
                        mask_left = 0
                    }
                    if(mask_top > IMG_HEIGHT-mask_height){
                        mask_top = IMG_HEIGHT-mask_height
                    }
                    if(mask_top < 0){
                        mask_top = 0
                    }
                    $mask.css({'left': mask_left,'top': mask_top})
                    $large_img.css({left: -mask_left*(IMG_WIDTH/mask_width), top: -mask_top*(IMG_HEIGHT/mask_height)})
                })
                
            })
        },function(){
            //隐藏黄块
            $large_img_container.hide()
            $mask.hide()
            //隐藏大图
            $large_img.hide()
        })
    }
})