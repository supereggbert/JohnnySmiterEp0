import Bullet from './Bullet.js';
import {Boom,Shoot,Wind} from './player.js';
import {Bow} from './Arrow.js';

AFRAME.registerComponent('bullets', {
  schema: {
    grid: {type: 'selector'},
    spiders: {type: 'selector'},
    source: {type: 'selector'},
  },
  init: function () {
    this.bulletCount=10;
    this.availableBullets=[];
    this.bullets=[];
		this.fired=false;
    for(var i=0;i<this.bulletCount;i++){
      var bullet = new Bullet();
      this.availableBullets.push(bullet);
      this.el.setObject3D('bullet'+i, bullet.object);
    }
		this.loadeBullet = new Bullet();
		this.loadeBullet.object.position.z=-0.6;
		this.loadeBullet.object.rotation.y=3.141;
		this.loadeBullet.object.visible=true;
    this.data.source.setObject3D('arrow', this.loadeBullet.object);


    var material = new THREE.MeshStandardMaterial( {color: 0x888888,fog:true,flatShading:true} );
		var bow= new THREE.Mesh(Bow,material);
		bow.rotation.z=-1.57;
		bow.rotation.y=1.57;
		bow.position.z=-0.5;
		bow.position.y=-0.07;
		bow.scale.set(0.15,0.15,0.15);
    this.data.source.setObject3D('bow', bow);
		var started=false;

		var fire=(e)=>{
			this.fire();
			if(!started){
				setTimeout(Wind,1000);
				started=true;
			}
    }
    document.addEventListener("click",fire);
    document.addEventListener("mousedown",fire);
    document.addEventListener("touchstart",fire);
    document.addEventListener("keydown",fire);
    document.getElementById("hand").addEventListener("triggerdown",fire);



  },
  fire:function(){
    //if(!this.data.source) return;
		if(this.fired) return;
		Shoot();
		this.fired=true;
		this.loadeBullet.object.visible=false;
		setTimeout(()=>{
			this.fired=false;
		this.loadeBullet.object.visible=true;
		},500);
		var pos=(new THREE.Vector3()).setFromMatrixPosition(this.loadeBullet.object.matrixWorld);
    var direction=this.data.source.object3D.getWorldDirection(new THREE.Vector3(0,0,0));
    var bullet=this.availableBullets.pop();
    if(bullet){
      bullet.fire(pos,direction);
      this.bullets.push(bullet);
    }
  },
  checkCollisions:function(){
    if(!this.data.grid || !this.data.grid.components.grid.gameGrid) return;
    var gameGrid = this.data.grid.components.grid.gameGrid;
    var r = gameGrid.radius;
    var r2 = r*r;
    for(var i=0;i<this.bullets.length;i++){
      var bullet = this.bullets[i];
      var currentPosition = bullet.currentPosition;
			if(bullet.currentPosition.y<-10 || bullet.currentPosition.y>30){
          bullet.hide();
          this.bullets.splice(i,1);
          this.availableBullets.push(bullet);
			}
      var lastPosition = bullet.lastPosition;
      if(bullet.fired>0){
        var od=currentPosition.x*currentPosition.x+currentPosition.z*currentPosition.z;

        if(od>r2){
          var dir=currentPosition.clone().sub(lastPosition).normalize();
          var pos=lastPosition.clone().sub(this.data.grid.object3D.position);
          var intersection=gameGrid.ray(pos,dir);
          this.data.grid.emit('hit',intersection);
          bullet.hide();
          this.bullets.splice(i,1);
          this.availableBullets.push(bullet);
          i--;
        }
				var spiders=this.data.spiders.components.spiders.boids;
				var ray=new THREE.Ray(lastPosition,dir);
		  	for(var i=0;i<spiders.length;i++){
					var d=ray.distanceToPoint(spiders[i].position);

					if(d<spiders[i].size*0.9){
		        bullet.hide();
		        this.bullets.splice(i,1);
		        this.availableBullets.push(bullet);
						this.data.spiders.components.spiders.kill(i);
						Boom();
						break;
					}
				}
      }
    }
		
  },
  update:function(){
  },
  tick: function(){
    var t = +new Date;
    for(var i=0;i<this.bullets.length;i++){
      this.bullets[i].updateMatrix(t);
    }
    this.checkCollisions();
  },
  remove: function () {
    for(var i=0;i<this.bulletCount;i++){
      this.el.removeObject3D('bullet'+i);
    }
  }
});
