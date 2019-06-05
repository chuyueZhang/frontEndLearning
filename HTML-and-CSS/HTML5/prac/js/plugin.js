;(function(w){
    w.$.extend({drag: function (node, start, end, callbackbefore, callbackafter){
        node.addEventListener('mousedown', function(e){
            e = e||event
            start===0 || start || (start = -10000 )
            if(typeof end != "object"){
                end===0 || end || (end = 10000) 
            }
            var start_position = {x: 0, y: 0}
            var offset_position = {x: 0, y: 0}
            node.setCapture && node.setCapture()
            offset_position.x = node.offsetLeft
            offset_position.y = node.offsetTop
            start_position.x = e.clientX + document.documentElement.scrollLeft
            start_position.y = e.clientY + document.documentElement.scrollTop
            document.addEventListener('mousemove', moveEvent)
            document.addEventListener('mouseup', upEvent)
            function moveEvent(e){
                e = e || event
                var now_position = {x: 0, y: 0}
                now_position.x = e.clientX + document.documentElement.scrollLeft
                now_position.y = e.clientY + document.documentElement.scrollTop
                var instance_between_node_and_point = {x: now_position.x-node.offsetLeft, y: now_position.y-node.offsetTop}
                var final_position = {x:offset_position.x + now_position.x - start_position.x, y:offset_position.y + now_position.y - start_position.y}
                if(final_position.x < start){
                    final_position.x = start
                }
                if(typeof end === "object"){
                    if(final_position.x > end.end){
                        final_position.x = end.end
                    }
                }else{
                    if(final_position.x > end){
                        final_position.x = end
                    }
                }
                
                node.style.left = final_position.x + 'px'
                // node.style.top = offset_position.y + now_position.y - start_position.y + 'px'
                callbackbefore&&callbackbefore()
            }
            function upEvent(){
                document.removeEventListener('mousemove', moveEvent)
                document.removeEventListener('mouseup', upEvent)
                callbackafter&&callbackafter()
                document.releaseCapture && document.releaseCapture()
            }
            e.preventDefault()
        })
        
    }
    })
})(window)
