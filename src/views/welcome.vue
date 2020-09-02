<template>
  <div class="container" id="container">
    <div class="info-container">
      <div class="tips-container">
        <h1>SocialCRM</h1>
        <h5>把您的企业服务建立到微信上</h5>
      </div>
      <div class="text-align-center">
        <el-button size="small" @click="handleEnter" type="primary">进入</el-button>
      </div>
    </div>
    <img src="@/assets/welcome/planet2.png" />
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  data() {
    return {
      // tenantId:''
    }
  },
  computed: {},
  created() {
    const localStorage = JSON.parse(window.localStorage.getItem('corp'))
    if (localStorage?.name) {
      this.$store.commit('auth/SAVE_CORPINFO', localStorage)
    }
  },
  mounted() {
    var camera, scene, renderer

    var texture_placeholder,
      isUserInteracting = false,
      onMouseDownMouseX = 0,
      onMouseDownMouseY = 0,
      lon = 90,
      onMouseDownLon = 0,
      lat = 0,
      onMouseDownLat = 0,
      phi = 0,
      theta = 0,
      target = new THREE.Vector3()

    init()
    animate()

    function init() {
      var container, mesh

      container = document.getElementById('container')

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100
      )

      scene = new THREE.Scene()

      texture_placeholder = document.createElement('canvas')
      texture_placeholder.width = 128
      texture_placeholder.height = 128

      var context = texture_placeholder.getContext('2d')
      context.fillStyle = 'rgb( 200, 200, 200 )'
      context.fillRect(
        0,
        0,
        texture_placeholder.width,
        texture_placeholder.height
      )

      const url1 =require('@/assets/welcome/space4.jpg')
      const url2 =require('@/assets/welcome/space2.jpg')
      const url3 =require('@/assets/welcome/space1.jpg')
      const url4 =require('@/assets/welcome/space6.jpg')
      const url5 =require('@/assets/welcome/space3.jpg')
      const url6 =require('@/assets/welcome/space5.jpg')

      var materials = [
        loadTexture(
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space4.jpg'
        url1
        ), // right
        loadTexture(
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space2.jpg'
        url2
        ), // left
        loadTexture(
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space1.jpg'
        url3
        ), // top
        loadTexture(
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space6.jpg'
        url4
        ), // bottom
        loadTexture(
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space3.jpg'
        url5
        ), // back
        loadTexture(
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space5.jpg'
        url6
        ), // front
      ]

      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(300, 300, 300, 7, 7, 7),
        new THREE.MultiMaterial(materials)
      )
      mesh.scale.x = -1
      scene.add(mesh)

      for (var i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
        var vertex = mesh.geometry.vertices[i]

        vertex.normalize()
        vertex.multiplyScalar(550)
      }

      renderer = new THREE.CanvasRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      document.addEventListener('mousedown', onDocumentMouseDown, false)
      document.addEventListener('mousemove', onDocumentMouseMove, false)
      document.addEventListener('mouseup', onDocumentMouseUp, false)
      //document.addEventListener( 'wheel', onDocumentMouseWheel, false );

      document.addEventListener('touchstart', onDocumentTouchStart, false)
      document.addEventListener('touchmove', onDocumentTouchMove, false)

      //

      window.addEventListener('resize', onWindowResize, false)
    }

    function loadTexture(path) {
      var texture = new THREE.Texture(texture_placeholder)
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5,
      })

      var image = new Image()
      image.onload = function () {
        texture.image = this
        texture.needsUpdate = true
      }
      image.src = path

      return material
    }
    var onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    var onDocumentMouseDown = function (event) {
      event.preventDefault()

      isUserInteracting = true

      onPointerDownPointerX = event.clientX
      onPointerDownPointerY = event.clientY

      onPointerDownLon = lon
      onPointerDownLat = lat
    }

    var onDocumentMouseMove = function (event) {
      if (isUserInteracting === true) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat
      }
    }

    var onDocumentMouseUp = function (event) {
      isUserInteracting = false
    }

    var onDocumentTouchStart = function (event) {
      if (event.touches.length == 1) {
        event.preventDefault()

        onPointerDownPointerX = event.touches[0].pageX
        onPointerDownPointerY = event.touches[0].pageY

        onPointerDownLon = lon
        onPointerDownLat = lat
      }
    }

    var onDocumentTouchMove = function (event) {
      if (event.touches.length == 1) {
        event.preventDefault()

        lon =
          (onPointerDownPointerX - event.touches[0].pageX) * 0.1 +
          onPointerDownLon
        lat =
          (event.touches[0].pageY - onPointerDownPointerY) * 0.1 +
          onPointerDownLat
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      update()
    }

    function update() {
      if (isUserInteracting === false) {
        lon += 0.1
      }

      lat = Math.max(-85, Math.min(85, lat))
      phi = THREE.Math.degToRad(90 - lat)
      theta = THREE.Math.degToRad(lon)

      target.x = 500 * Math.sin(phi) * Math.cos(theta)
      target.y = 500 * Math.cos(phi)
      target.z = 500 * Math.sin(phi) * Math.sin(theta)

      camera.position.copy(target).negate()
      camera.lookAt(target)

      renderer.render(scene, camera)
    }

    this.$nextTick(()=>{
        window.watermark.create()
    })
    // this.$once('hook:beforeDestroy',()=>{
    //     window.watermark.create()
    // })
  },
  methods: {
    handleEnter() {
      this.$router.push({
        path: '/dashboard',
      })

      this.$store
        .dispatch('user/getMyInfo')
        .then(() => {})
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  overflow: hidden;
  background-color: #fff;
  .tips-container {
    margin: 20px 0;
  }
  -webkit-app-region: drag;
  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-app-region: no-drag;
    z-index: 1;
    position: absolute;
    color: #fff;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
}

img {
  width: 8vw;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 0;
}
</style>