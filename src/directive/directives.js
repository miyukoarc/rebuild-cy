/* jshint esversion: 6 */
import Vue from 'vue';

// 聚焦鼠标
// Vue.directive('focus', {
//     inserted(el) {
//         el.focus();
//     }
// })

Vue.directive('txt', {
    inserted(el, binding) {
        el.innerText = binding.value;
    }
})

// 传入val, 间隔val毫秒可以点击1次, 不传val则不能点击
Vue.directive('noClick', {
    inserted(el, binding) {
        el.style.position = "relative";
        el.style.overflow = "hidden";
        let element = document.createElement('div');
        element.className = "noClick";
        el.append(element);
        // if(binding.value) {
        //     // let val = binding.value;
        //     // let flag = true;
        //     // el.addEventListener('click', () => {
        //     //     if(flag) {
        //     //         el.style.pointerEvents = "none";
        //     //         flag = false;
        //     //         setTimeout(() => {
        //     //             el.style.pointerEvents = "all";
        //     //             flag = true;
        //     //         }, val);
        //     //     }
        //     // });
        // } else {

        // }
    }
})

// 自动获取焦点
Vue.directive('focus', {
        // 注册一个局部的自定义指令 v-focus
        // 指令的定义
        inserted: function(el) {
            // 聚焦元素
            el.querySelector('input').focus()
        }
    })
    // Vue.directive('focus', {
    //     // 注册一个局部的自定义指令 v-focus
    //     // 指令的定义
    //     inserted: function(el, binding) {
    //         // 聚焦元素
    //         if(binding.value) el.querySelector('input').focus()
    //     },
    //     componentUpdated: function(el, binding) {
    //         if(binding.value && !binding.oldValue) el.querySelector('input').focus();
    //     }
    // })
Vue.directive('drag', {
    inserted: function(el, binding) {
        /* 记录鼠标开始拖拽时的位置 */
        let startPos = {
            x: 0,
            y: 0
        }
        let isString = typeof binding.value == "string"
        let targetE = document.getElementById(isString ? binding.value : binding.value.id)
        let cursorType = targetE.style.cursor
        targetE.addEventListener('mousedown', dragStart)
            /* 开始拖拽 -- 拖拽中 -- 拖拽结束 */
        function dragStart(e) {
            document.addEventListener('mousemove', drag)
            document.addEventListener('mouseup', dragEnd)
            startPos.x = e.offsetX
            startPos.y = e.offsetY
        }

        function drag(e) {
            targetE.style.cursor = 'move'
            let x = e.x - startPos.x
            let y = e.y - startPos.y
            if (isString || binding.value.flag) {
                x = x < 0 ? 0 : x
                x = x > innerWidth - el.offsetWidth ? innerWidth - el.offsetWidth : x
                y = y < 0 ? 0 : y
                y = y > innerHeight - el.offsetHeight ? innerHeight - el.offsetHeight : y
            }
            el.style.left = x + 'px'
            el.style.top = y + 'px'
        }

        function dragEnd(e) {
            targetE.style.cursor = cursorType
            document.removeEventListener('mousemove', drag)
            document.removeEventListener('mouseup', dragEnd)
        }
    }
})


Vue.directive('watermark', {
    inserted: function(el, binding) {
        function addWaterMarker(str, parentNode, font, textColor) { // 水印文字，父元素，字体，文字颜色
            var can = document.createElement('canvas');
            parentNode.appendChild(can);
            can.width = 400;
            can.height = 200;
            can.style.display = 'none';
            var cans = can.getContext('2d');
            cans.rotate(-20 * Math.PI / 180);
            cans.font = font || "16px Microsoft JhengHei";
            cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
            cans.textAlign = 'left';
            cans.textBaseline = 'Middle';
            cans.fillText(str, can.width / 3, can.height / 2);
            parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
        }
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
    }
})