var camera, scene, renderer, stars = [];
  var fallSpeed = 0.5; // 🌟 control this to make stars fall faster or slower

  function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 5;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function addStars() {
    for (var i = 0; i < 2000; i++) {
      var geometry = new THREE.SphereGeometry(0.2, 8, 8);
      var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var star = new THREE.Mesh(geometry, material);
      star.position.x = Math.random() * 1000 - 500;
      star.position.y = Math.random() * 1000 - 500;
      star.position.z = Math.random() * 1000 - 500;
      scene.add(star);
      stars.push(star);
    }
  }

  function animateStars() {
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      // Use global variable
      star.position.y -= fallSpeed;

      if (star.position.y < -500) {
        star.position.y = 500;
        star.position.x = Math.random() * 1000 - 500;
        star.position.z = Math.random() * 1000 - 500;
      }
    }
  }

  function render() {
    requestAnimationFrame(render);
    animateStars();
    renderer.render(scene, camera);
  }

  init();
  addStars();
  render();