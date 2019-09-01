import TreeTexture from './TreeTexture.js';


AFRAME.registerComponent('trees', {
  schema: {
    seed: {type: 'number', default: 1860}
  },
  init: function () {
		var texture=new THREE.CanvasTexture(TreeTexture(this.data.seed));
		//texture.premultiplyAlpha =true;
		var geometry= new THREE.PlaneGeometry(40,40);
		var mesh = new THREE.Mesh(geometry,null);
		var treegeo = new THREE.Geometry();
		var seed=this.data.seed+9;
		var random=function(){
			seed=(Math.sin(seed*10000)+1)*0.5;
			return seed;
		}
		for(var i=0;i<60;i++){
			var l=(i+random()*20)%20;
			var a=l/20*Math.PI*2;
			var d=i+20;
			var x=Math.cos(a)*d;
			var y=Math.sin(a)*d;
			mesh.position.set(x,20,y);
			mesh.lookAt(0,20,0);
			mesh.updateMatrix();
			treegeo.merge(geometry.clone().applyMatrix(mesh.matrix));
		}
		var material =new THREE.MeshStandardMaterial( { color: 0x000000, alphaTest: 0.6, map:texture,transparent:true,depthTest:true } );
		var mesh = new THREE.Mesh(new THREE.BufferGeometry().fromGeometry(treegeo),material);

		this.el.setObject3D("tree",mesh);
	}
});
