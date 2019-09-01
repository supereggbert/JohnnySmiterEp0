import Grid from './Grid.js';
import RunesTexture from './RunesTexture.js';

AFRAME.registerComponent('grid', {
  init: function () {
    this.gameGrid=new Grid(5,40,0.3,15);

		var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide,flatShading:true,transparent:true,fog:false } );
		material.map=new THREE.CanvasTexture(RunesTexture);
    //var material=this.el.components.material.material;
    //material.transparent = true;
    var grid = new THREE.Mesh( this.gameGrid.geometry,  material);
    grid.frustumCulled=false;
    this.geometry=grid;
    this.el.setObject3D('grid', grid);
    this.el.addEventListener("hit",(intersection)=>{
      this.gameGrid.hit(intersection.detail);
    });
  },
  tick: function(){
    this.gameGrid.update();
  }
});
