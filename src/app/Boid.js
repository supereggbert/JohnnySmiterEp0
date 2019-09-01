


export default class Boid{
  constructor(size, spider){
    this.size = size;
    this.position=spider.position;
    this.velocity=new THREE.Vector3();
    this.rotation=spider.rotation;
  }
  update(boids,dt,maxspeed){
    var max_v=maxspeed;
    for(var i=0;i<boids.length;i++){
      var boid = boids[i];
      var v = this.position.clone().sub(boid.position);
      var d = Math.max(1,v.length());
      if(d<(this.size+boid.size)*1.5){
        var s=dt*50;
      }else{
        s=dt*-0.1/d/d;
      }
      v.multiplyScalar(s);
      this.velocity.add(v);
    }
    if(this.velocity.length()>max_v) this.velocity.multiplyScalar(max_v/this.velocity.length());
    this.velocity.multiplyScalar(0.98);
    this.velocity.add(this.position.clone().negate().multiplyScalar(dt*50/Math.pow(this.position.length()+1,2)));
		this.velocity.y=0;
    this.position.add(this.velocity.clone().multiplyScalar(dt));

    this.rotation.y = (this.rotation.y * 29 + Math.atan2(this.velocity.clone().normalize().x,this.velocity.clone().normalize().z))/30;

  }
}
