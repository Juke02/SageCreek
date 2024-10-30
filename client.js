import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { initializePopup } from './popup.js'; // Import the popup module

var scene = new THREE.Scene();
var isDragging = false;
var startX, startY;
var translateX = 0;
var translateY = 0;

// Set up the camera
var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Set up the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere
var geometry = new THREE.SphereGeometry(15, 64, 64);
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('6.png');
var material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set the camera position slightly away from the center
camera.position.set(0, 0.1, 0); // Adjust the distance as needed

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// ** Lock rotation to left-right only **
controls.minPolarAngle = Math.PI / 2; // Lock rotation on the Y axis (vertical movement)
controls.maxPolarAngle = Math.PI / 2; // Lock rotation on the Y axis (vertical movement)

// Allow free horizontal (left-right) rotation
controls.enableZoom = false;
controls.enablePan = false;

// Handle window resizing
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});

// Initialize the popup
initializePopup(textureLoader, sphere); // Pass the textureLoader and sphere to the popup

sphere.rotation.y = -Math.PI/2;
sphere.rotation.x = 0; // 45 degrees around the X-axis
sphere.rotation.z = 0; // No rotation around the Z-axis (you can adjust this as needed)

// Animation loop
var animate = function () {
  requestAnimationFrame(animate);
  
  controls.update();
  renderer.render(scene, camera);
};

// Start the animation
animate();
