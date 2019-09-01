
var random=function(v1,v2){
	var d=Math.pow((v1*v1+v2*v2)/1000,1.5)*0.15;
	return Math.sin(v1*1345+v2*8500)*d*0.05+d*0.05-1;
}

AFRAME.registerComponent('terrain', {
  init: function () {
		var mesh=this.el.getObject3D('mesh');
		var position=mesh.geometry.attributes.position.array;
		for(var i=2;i<position.length;i+=3){
			position[i]=random(position[i-1],position[i-2]);
		}
  }
});
