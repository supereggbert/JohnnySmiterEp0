import Story from './story.js'
AFRAME.registerComponent('story', {
  schema: {
    type: {type: 'string'},
    height: {type: 'number',default: 1}
  },
	init: function(){
		var texture = new THREE.TextureLoader().load( Story(this.data.type,this.data.height) );
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		texture.minFilter = THREE.LinearFilter;
		this.el.getObject3D('mesh').material.map = texture;
	}
});
