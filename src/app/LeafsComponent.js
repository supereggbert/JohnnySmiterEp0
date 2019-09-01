
function Leafs(x,y){
  	var geometry = new THREE.BufferGeometry();
		var vertices = [];
		var dirs = [];
		var speed = [];

		for ( var i = 0; i < 200; i ++ ) {

			var x = Math.random() * 20 - 10;
			var y = Math.random() * 20;
			var z = Math.random() * 20 - 10 ;

			vertices.push( x, y, z );
		
			dirs.push(new THREE.Vector3(Math.random()-0.5,Math.random(),Math.random()-0.5).normalize());
			speed.push(Math.random()+0.5);
		}

		var attribute = new THREE.Float32BufferAttribute( vertices, 3 )
		attribute.dynamic=true;
		geometry.addAttribute( 'position',  attribute);

		var materials = new THREE.PointsMaterial( { size: 0.1, color:0x000000,  blending: THREE.AdditiveBlending, fog:false,depthTest: false, transparent: true,alphaTest:0.5 } );
		this.object = new THREE.Points( geometry, materials );

		this.update=function(time){
			var a=attribute.array;

			var len=a.length/3;
			for(var i=0;i<len;i++){
				var idx=i*3;
				a[idx]=dirs[i].x*time*speed[i];
				a[idx+1]=dirs[i].y*time*speed[i]-0.5*time*time;
				a[idx+2]=dirs[i].z*time*speed[i];
			}
			attribute.needsUpdate=true;
		}
}

AFRAME.registerComponent('leafs', {
  init: function () {
		var leafs=new Leafs();
		this.el.setObject3D('leafs',leafs.object);
		this.leafs=leafs;
  },
	tick: function(time,deltatTime){
		this.leafs.update((time/1000)%2);
	}
});
