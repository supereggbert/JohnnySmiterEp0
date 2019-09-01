import vertexShader from './shaders/vertex.js';
import fragmentShader from './shaders/fragment.js';

AFRAME.registerShader('gradient', {
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

