import Spider from './Spider.js';
import Boid from './Boid.js';
import {Attack,Start} from './player.js';

var seed=1323;
var random=function(){
	seed=(Math.sin(seed*100000)+1)*0.5;
	return seed;
}
var c = document.createElement("canvas");
c.width=c.height=128;
var ctx = c.getContext("2d");

for(var i=0;i<5;i++){
	var x=random()*64+32;
	var y=random()*64+32;
	var r=random();
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.arc(x, y, r*8+5, 0, 2 * Math.PI);
	ctx.fillStyle="#600";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.arc(x, y-3, r*4+1, 0, 2 * Math.PI);
	ctx.fillStyle="#c88";
	ctx.fill();
}
var texture=new THREE.CanvasTexture( c );



function Explode(size){
  	var geometry = new THREE.BufferGeometry();
		var vertices = [];
		var dirs = [];
		var speed = [];

		

		for ( var i = 0; i < 300; i ++ ) {

			vertices.push( 0, 0, 0 );
		
			dirs.push(new THREE.Vector3(Math.random()-0.5,Math.random(),Math.random()-0.5).normalize());
			speed.push(Math.random()+0.5);
		}
var materials = new THREE.PointsMaterial( { map:texture, size: size*0.75, color:0xffffff, fog:false,depthWrite:false,depthTest: true, transparent: true } );

		var attribute = new THREE.Float32BufferAttribute( vertices, 3 )
		attribute.dynamic=true;
		geometry.addAttribute( 'position',  attribute);
		this.object = new THREE.Points( geometry, materials );
		this.object.visible=false;
		this.object.scale.set(size,size,size);
		this.explode=function(position){
			if(this.object.visible) return;
			this.object.visible=true;
			this.object.position.copy(position);
			var frame=0;
			var explode=()=>{
				this.update(frame/10);
				frame++;
				if(frame<50){
					setTimeout(explode,15);
				}else{
					this.object.visible=false;
				}
			}
			explode();
		}
		this.update=function(time){
			var a=attribute.array;

			var len=a.length/3;
			for(var i=0;i<len;i++){
				var idx=i*3;
				a[idx]=dirs[i].x*time*speed[i];
				a[idx+1]=dirs[i].y*time*speed[i]*2-0.5*time*time;
				a[idx+2]=dirs[i].z*time*speed[i];
			}
			attribute.needsUpdate=true;
		}
}

AFRAME.registerComponent('spiders', {
  schema: {
    life: {type: 'selector'},
    grid: {type: 'selector'}
  },
	init:function(){
		this.state='new';
		this.createSpiders();
		this.start=+new Date;
		this.spiders[0].position.set(0,this.spiders[0].position.y,-3);
	},
	createSpiders:function(){
		var seed=523;
		var random=function(){
			seed=(Math.sin(seed*100000)+1)*0.5;
			return seed;
		}
		var material = new THREE.MeshStandardMaterial( { color: 0x444444, morphTargets: true, side: THREE.DoubleSide,flatShading:true,roughness:0.8 } );
		this.spiders=[];
		this.boids=[];
		this.explotions=[];
		for(var i=0;i<25;i++){
			var mesh=new THREE.Mesh(Spider,material);
			this.el.setObject3D('spider'+i,mesh);
			this.spiders.push(mesh);
      var a=Math.random()*100;
			var size=Math.pow(random(),3)*1.0+0.4;
			//mesh.position.set(Math.sin(a)*20,size*0.5,Math.cos(a)*20);
			//mesh.scale.set(0.2*size,0.2*size,0.2*size);
			mesh.castShadow=true;
			this.boids.push(new Boid(size,mesh));
			var e=new Explode(size);
			this.explotions.push(e);
			this.el.setObject3D('explode'+i,e.object);
		}
		this.reset();
	},
	gameover(){
		document.getElementById("menu").setAttribute("visible",true);
		var fail=document.getElementById("fail");
		var win=document.getElementById("win");
		var intro=document.getElementById("intro");
		fail.setAttribute("visible",false);
		win.setAttribute("visible",false);
		intro.setAttribute("visible",false);

		if(document.getElementById("score").score>=window.localStorage.highscore){
			win.setAttribute("visible",true);
		}else{
			fail.setAttribute("visible",true);
		}

		this.reset();
		this.data.grid.components.grid.gameGrid.reset();
		document.getElementById("correct").object3D.rotation.y=-document.getElementById("camera").object3D.rotation.y
	},
	reset(){
		this.state='new';
		this.boids[0].size=0.8;
		for(var i=0;i<this.spiders.length;i++){
			var r=Math.random()*100;
      var a=Math.random()*100;
			var boid=this.boids[i];
			var spider=this.spiders[i];
			spider.updateMorphTargets();
			spider.visible=false;
			spider.rotation.set(0,0,0);
			spider.scale.set(0.2*boid.size,0.2*boid.size,0.2*boid.size);
			spider.position.set(Math.sin(a)*(10+r),this.boids[i].size*0.35,Math.cos(a)*(10+r));
		}
		this.spiders[0].position.set(0,this.spiders[0].position.y,-3);
		this.spiders[0].visible=true;
	},
	kill:function(idx){
		if(this.state=='new'){
			setTimeout(Start,1000);
			this.start=+new Date;
			this.data.grid.components.grid.gameGrid.start();
			this.state='play';
			document.getElementById("menu").setAttribute("visible",false);
			document.getElementById("score").score=0;
			document.getElementById("score").setAttribute("text","value: RUNES: 0/"+window.localStorage.highscore);
		}
		var frame=0;
		var spider=this.spiders[idx];
		spider.dead=true;
		this.explotions[idx].explode(spider.position);
		var implode=()=>{
			frame++;
			spider.scale.multiplyScalar(0.9);
			if(frame<50){
				setTimeout(implode,15);
			}else{
				spider.dead=false;
				this.respawn(idx);
			}
		}
		implode();
	},
	respawn:function(idx){
		var spider=this.spiders[idx];
		var boid=this.boids[idx];
    var a=Math.random()*100;
		spider.scale.set(0.2*boid.size,0.2*boid.size,0.2*boid.size);
		spider.position.set(Math.sin(a)*50,spider.position.y,Math.cos(a)*50);
	},
	tick:function (time, timeDelta){
		if(this.state=='play'){
			for(var i=0;i<this.spiders.length;i++){
				var spiderspeed=Math.min(1,this.boids[i].velocity.length()*0.8);
				var spider=this.spiders[i];
				if(spider.position.length()>20){
					spider.visible=false;
					continue;
				}else{
					spider.visible=true;
				}
				var frame=((time+i*5100)/50)%10;
				spider.updateMorphTargets();
				spider.morphTargetInfluences[Math.floor(frame)]=(1-(frame%1))*spiderspeed;
				spider.morphTargetInfluences[(Math.floor(frame)+1)%10]=(frame%1)*spiderspeed;
				if(!spider.dead && spider.position.length()<1.5*this.boids[i].size){
					life.components.life.hit();
					Attack();
					this.respawn(i);
				}
			}

			for(var i=0;i<this.boids.length;i++){
				this.boids[i].update(this.boids,timeDelta/1000,(+new Date-this.start)/50000+0.5);
			}
		}
	}
});
