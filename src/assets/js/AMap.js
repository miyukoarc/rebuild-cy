/*
 * @Author: your name
 * @Date: 2020-07-27 16:12:10
 * @LastEditTime: 2020-07-27 16:25:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\assets\js\AMap.js
 */
export default function MapLoader() {
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initAMap&key=yourkey'
            script.onerror = reject
            document.head.appendChild(script)
        }
        window.initAMap = () => {
            resolve(window.AMap)
        }
    })
}