import diamondSquare from './cloudnoise.js';
import TreeTexture from './TreeTexture.js';
AFRAME.registerComponent('cloud', {
  init: function () {
		var mesh=this.el.getObject3D('mesh');
		var canvas=diamondSquare(512, 411);
		var texture=new THREE.CanvasTexture(canvas);
		texture.repeat.set( 15, 15 );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		mesh.material.map=texture;
		mesh.material.roughness=1;
  }
});
