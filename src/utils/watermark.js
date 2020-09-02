/*
 * @Author: your name
 * @Date: 2020-06-30 16:44:06
 * @LastEditTime: 2020-07-13 12:18:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\utils\watermark.js
 */
export default class Watermark {
  constructor(text) {
    this.id = 'watermark' //填充容器id

    this.text = text //填充文本

    this.paper = document.createElement('canvas') //绘画区域

    this.chip = this.paper.getContext('2d') //填充图形

    this.container = document.createElement('div') //填充容器

    this.timer = null

  }

  /**
   * 绘制
   */
  draw() {

    this.paper.width = 120
    this.paper.height = 120
    this.chip.rotate(-15 * Math.PI / 180);
    this.chip.font = '14px Vedana'
    this.chip.fillStyle = 'rgba(200, 200, 200, 0.25)'
    this.chip.textAlign = 'left'
    this.chip.textBaseline = 'middle'
    this.chip.fillText(this.text, this.paper.width / 8, this.paper.height / 2)
    this.container.id = this.id
    this.container.style.pointerEvents = 'none'
    this.container.style.top = '30px'
    this.container.style.left = '0px'
    this.container.style.position = 'fixed'
    this.container.style.zIndex = '10000'
    this.container.style.width = document.documentElement.clientWidth + 'px'
    this.container.style.height = document.documentElement.clientHeight + 'px'
    this.container.style.background = 'url(' + this.paper.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(this.container)

    // console.log('挂载水印')

  }

  /**
   * 创建水印`
   */
  create() {
    this.timer = setInterval(() => {
      if (document.getElementById(this.id) === null) {
        this.draw()
      }
      // console.log('定时器运行中')
    }, 500)

    window.onresize = () => {
        // console.log(window.watermark)
        if(window.watermark){
            this.draw()
            

        }
    }
  }

  /**
   * 移除水印
   */
  remove() {

    clearInterval(this.timer)

    document.querySelector(`#${this.id}`)?.parentNode?.removeChild(document.querySelector(`#${this.id}`))

    window.watermark = null


  }
}
