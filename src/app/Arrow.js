var step=function(x1,x2){
	return x1<x2?1:0;
};
var max=Math.max;
var pow=Math.pow;
var abs=Math.abs;
var sin=Math.sin;
var cos=Math.cos;
var exp=Math.exp;
var sign=Math.sign;
var Arrow = new THREE.ParametricBufferGeometry( (u,v,r)=>{
	u*=9;
	var scale=max((u*1.7-1)*step(u,2)*0.1+0.1,(pow(abs(u-7),0.3)*0.3)*step(7,u))*step(u,9);
  var a=v*Math.PI*2;
  var x=Math.sin(a);
  var y=Math.cos(a);
	if(u>7) scale*=0.15/(pow(abs(x),9)+pow(abs(y),9));
	if(u>8 && scale<0.2) u=9-u+7.5
	if(u>8) y*=0.5;
	if(u<2) y*=0.6;
  r.set(x*scale*0.2,-y*scale*0.2,-u*0.1);
}, 16, 16 );

var Bow = new THREE.ParametricGeometry( (u,v,r)=>{
	var z=(u-0.5)*2;
	var scale=1-abs(z*z);
	var a=v*Math.PI*2;
  var x=sin(a)*0.05*(scale+0.5);
  var y=cos(a)*0.03*scale+z*z*0.5;
  r.set(-x*5,-y*5,z*5);
}, 8, 8 );

var shaft = new THREE.ParametricGeometry( (u,v,r)=>{
	var z=u*1.5;
	var a=v*Math.PI*2;
	var scalex= max(0.5,1-exp(-u-0.3))*2-0.5
  var x=pow(abs(sin(a)),1/3)*sign(sin(a))*0.1*scalex+scalex*0.1-0.05;
  var y=pow(abs(cos(a)),1/3)*sign(cos(a))*0.08;
	if(z==1.5){ x=0;y=0;z=1.3125}
  r.set(x*5,-z*5,y*5);
}, 8, 8 );

var wire = new THREE.ParametricGeometry( (u,v,r)=>{
	var z=(u-0.5)*2;
	var scale=1-abs(z*z);
	var a=v*Math.PI*2;
  var x=Math.sin(a)*0.01+(1-abs(z))*0.1;
  var y=Math.cos(a)*0.01-abs(z)*0.5+1;
  r.set(-x*5,-y*5,z*5);
}, 8, 8 );

Bow.merge(shaft);
Bow.merge(wire);

export {Arrow, Bow}
