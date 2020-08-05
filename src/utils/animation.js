export default class Animation {
  constructor() {
    this.e = null
    this.scene = null
    this.renderer = null
    this.texture_placeholder = null

    this.isUserInteracting = false,
      this.onMouseDownMouseX = 0,
      this.onMouseDownMouseY = 0,
      this.onPointerDownPointerX = 0
    this.onPointerDownPointerY = 0
    this.onPointerDownLon = 0
    this.onPointerDownLat = 0
    this.lon = 90,
      this.onMouseDownLon = 0,
      this.lat = 0,
      this.onMouseDownLat = 0,
      this.phi = 0,
      this.theta = 0,
      this.target = new THREE.Vector3();

  }

  init() {

    var container, mesh;

    container = document.getElementById('container');

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

    this.scene = new THREE.Scene();

    this.texture_placeholder = document.createElement('canvas');
    this.texture_placeholder.width = 128;
    this.texture_placeholder.height = 128;

    var context = this.texture_placeholder.getContext('2d');
    context.fillStyle = 'rgb( 200, 200, 200 )';
    context.fillRect(0, 0, this.texture_placeholder.width, this.texture_placeholder.height);

    var materials = [

      this.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space4.jpg'), // right
      this.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space2.jpg'), // left
      this.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space1.jpg'), // top
      this.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space6.jpg'), // bottom
      this.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space3.jpg'), // back
      this.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space5.jpg') // front

    ];

    mesh = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300, 7, 7, 7), new THREE.MultiMaterial(materials));
    mesh.scale.x = -1;
    this.scene.add(mesh);

    for (var i = 0, l = mesh.geometry.vertices.length; i < l; i++) {

      var vertex = mesh.geometry.vertices[i];

      vertex.normalize();
      vertex.multiplyScalar(550);

    }

    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('mouseup', this.onDocumentMouseUp, false);
    //document.addEventListener( 'wheel', onDocumentMouseWheel, false );

    document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);

    //

    window.addEventListener('resize', this.onWindowResize, false);

  }

  onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

  }

  loadTexture(path) {

    var texture = new THREE.Texture(this.texture_placeholder);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5
    });

    var image = new Image();
    image.onload = function () {

      texture.image = this;
      texture.needsUpdate = true;

    };
    image.src = path;

    return material;

  }

  onDocumentMouseDown(event) {

    event.preventDefault();

    this.isUserInteracting = true;

    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;

    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;

  }

  onDocumentMouseMove(event) {

    if (this.isUserInteracting === true) {

      this.lon = (this.onPointerDownPointerX - event.clientX) * 0.1 + this.onPointerDownLon;
      this.lat = (event.clientY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;

    }
  }

  onDocumentMouseUp(event) {

    this.isUserInteracting = false;

  }

  onDocumentTouchStart(event) {

    if (event.touches.length == 1) {

      event.preventDefault();

      this.onPointerDownPointerX = event.touches[0].pageX;
      this.onPointerDownPointerY = event.touches[0].pageY;

      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;

    }

  }

  onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

      event.preventDefault();

      this.lon = (this.onPointerDownPointerX - event.touches[0].pageX) * 0.1 + this.onPointerDownLon;
      this.lat = (event.touches[0].pageY - this.onPointerDownPointerY) * 0.1 + this.onPointerDownLat;

    }

  }

  animate() {

    requestAnimationFrame(arguments.callee) ;
    this.update();

  }

  update() {

    if (this.isUserInteracting === false) {

      this.lon += 0.1;

    }

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.Math.degToRad(90 - this.lat);
    this.theta = THREE.Math.degToRad(this.lon);

    this.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    this.target.y = 500 * Math.cos(this.phi);
    this.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.position.copy(this.target).negate();
    this.camera.lookAt(this.target);

    this.renderer.render(this.scene, this.camera);

  }
}
