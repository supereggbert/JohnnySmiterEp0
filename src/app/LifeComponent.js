
import {End} from './player.js';

var mix=function(a,b,d){
	return b*(1-d)+a*d;
}

AFRAME.registerComponent('life', {
  schema: {
    spiders: {type: 'selector'}
  },
  init: function () {
		this.life=1;
		this.hitvalue=0;
		this.dead=false;
  },
	drain: function(value){
		this.life=Math.max(0,this.life-value);
		if(this.life==0){
			End();
			this.dead=true;
			var frame=0;
			var fadeout=()=>{
				frame++;
				var v=(frame/100)*1.5
				this.life=0.5-v;
				if(frame<100){
					setTimeout(fadeout,15);
				}else{
					spiders.components.spiders.gameover();
					frame=0;
					setTimeout(fadein(),1500);
				}
			}
			fadeout();
			var fadein=()=>{
				frame++;
				var v=-1+(frame/150)*2;
				this.life=v;
				if(frame<150){
					setTimeout(fadein,15);
				}else{
					this.life=1;
					this.dead=false;
				}	
			}
		}
	},
	hit:function(){
		if(this.dead) return;
		this.drain(0.2);
		this.hitvalue=1;
	},
	tick: function(time,deltatTime){
		var material=this.el.getObject3D('mesh').material;
		material.opacity=mix(1,0.5-this.life*0.5,this.hitvalue);
		material.color.setRGB( mix(1,0,this.hitvalue*this.hitvalue*this.hitvalue), 0, 0 );
		this.hitvalue*=0.98;
	}
});
