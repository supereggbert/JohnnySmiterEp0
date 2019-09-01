var mix=function(v1,v2,t){
  return v1*(1-t)+t*v2;
}

class SpiderLeg{
  constructor(){
    this.segment = new THREE.BoxBufferGeometry( 2, 0.3, 0.3 );
    this.segment.applyMatrix((new THREE.Matrix4()).makeTranslation(1,0,0));

    this.root=new THREE.Group();

    this.joint0=new THREE.Group();
    this.joint0.add(new THREE.Mesh(this.segment,null));
    this.root.add(this.joint0);

    this.joint1=this.joint0.clone();
    this.joint1.position.x=1.8;
    this.joint0.add(this.joint1);

    this.joint2=this.joint1.clone();
    this.joint1.add(this.joint2); 
  }
  setTime(dt){
    var t=(dt/2000)%1;
    t = (Math.sin(t*Math.PI*2)+1)*0.5;
    var r1=mix(-0.9,-0.3,t);
    var r2=mix(0.9,1.2,t);
    var r3=mix(0.9,1.2,t);
    this.joint0.rotation.z=-r1;
    this.joint1.rotation.z=-r2;
    this.joint2.rotation.z=-r3;

    var r4=mix(-0.4,0.5,t*t);
    this.joint0.rotation.y=r4;

    var r5=mix(-0.2,0.3,t);
    this.joint0.rotation.x=r5;
    var p=mix(-0.2,0.2,t);
    this.joint0.position.y=p;
    
  }
}

class SpiderBase{
  constructor(){
    this.root=new THREE.Group;

    var legs=[
      [0,0.6,1,1],
      [1,0.25,1,1.25],
      [2,-0.25,1,1.25],
      [3,-1.0,1,1],
      [0,-0.6,-1,-1],
      [1,-0.25,-1,-1.25],
      [2,0.25,-1,-1.25],
      [3,1.0,-1,-1]
    ];

    this.legs=[];
    for(var i=0;i<legs.length;i++){
      var leg = new SpiderLeg();
      leg.root.position.z=legs[i][0];
      leg.root.rotation.y=legs[i][1];
      leg.root.scale.x=legs[i][2];
      leg.root.position.x=legs[i][3];
      this.root.add(leg.root);
      this.legs.push(leg);
    }

    //body
  
    this.bodygroup=new THREE.Group();
    var geometry = new THREE.SphereBufferGeometry( 5, 8, 8 );
    var body = new THREE.Mesh(geometry,null);
    body.scale.set(0.3,0.25,0.5);
    body.position.z=2;
  
    var ab=body.clone();
    ab.position.z=-2.7;
    ab.position.y=0.6;
    ab.scale.set(0.45,0.35,0.6);
    ab.rotation.x=0.3;
    this.ab=ab;

    this.bodygroup.add(body);
    this.bodygroup.add(ab);
    this.root.add(this.bodygroup);

    //jaws
    var geometry = new THREE.ParametricBufferGeometry( (u,v,r)=>{
      var scale=0.5*(1-u);
      var a=v*Math.PI*2;
      var x=Math.sin(a)*scale+u*u*u;
      var y=Math.cos(a)*scale;
      r.set(x*0.75,y*0.75,u*3);
    }, 8, 8 );
    var jaw1 = new THREE.Mesh( geometry, null );
    jaw1.position.set(-0.5,0,3.5);
    var jaw2 = jaw1.clone();
    jaw2.position.set(0.5,0,3.5);
    jaw2.scale.x=-1;

    this.bodygroup.add( jaw1 );
    this.bodygroup.add( jaw2 );
    this.jaw1=jaw1;
    this.jaw2=jaw2;
    

  }
  setTime(dt,nooffset){
    var legs=this.legs;
    for(var i=0;i<legs.length;i++){
      legs[i].setTime(dt);
      if(!nooffset) dt=(dt+450)%2000;
    }
    var t=(dt/2000)%1;
    t = (Math.sin(t*Math.PI*2)+1)*0.5;
    this.bodygroup.rotation.x=mix(-0.1,0.1,t*t);
    this.ab.rotation.x=mix(0.35,0.25,t);

		var t=(dt/2000)%1;
    t = (Math.sin(t*Math.PI*4)+1)*0.5;
    var r1=mix(-0.5,0.0,t*t);
    this.jaw1.rotation.y=r1;
    this.jaw2.rotation.y=-r1;
  }

  getTarget(dt,nooffset){
    this.setTime(dt,nooffset);
    var geometry=new THREE.Geometry();
    this.root.traverse((el)=>{
      el.updateMatrix();
      el.updateMatrixWorld();
      if(el.geometry){
        var meshgeometry=new THREE.Geometry();
        meshgeometry.fromBufferGeometry(el.geometry);
        meshgeometry.applyMatrix(el.matrixWorld);
        geometry.merge(meshgeometry);
      };
    });
    var buffergeometry=new THREE.BufferGeometry();
    buffergeometry.fromGeometry(geometry);
    buffergeometry.groups=[];

    return buffergeometry;
  }

  getMorphGeometry(){
    var base = this.getTarget(0,true);
    base.morphAttributes.position = [];
    for(var i = 0; i<11;i++){
      var dt=i/10*2000;
      var g = this.getTarget(dt);
      base.morphAttributes.position.push(g.attributes.position);
    }
    return base;
  }
}

var spider=new SpiderBase();
export default spider.getMorphGeometry();

