export default class GridSquare{
  constructor(x,y,z,tx,ty,size,indexX,indexY){
    this.x=x;
    this.y=y;
    this.z=z;
    this.tx=tx;
    this.ty=ty;
    this.size=size;
    this.height=0;
    this.offset=0;
    this.explodeTime=0;
    this.bounceTime=0;
    this.scale=1;
    this.indexX=indexX;
    this.indexY=indexY;
    this.tiles=8;
    this.type=Math.floor(Math.random()*3);
  }

  setHeight(height){
    this.start=+new Date;
    this.height=height;
    this.offset=height;
    this.bounceTime=0;
    this.explodeTime=0;
  }

  startBounce(){
    this.bounceTime = +new Date;
  }

  explode(callback){
    if(this.explodeTime>0) return;
    this.explodeTime = +new Date;
    this.explodeCallback = callback;
  }

  update(time){
    var dt=time-this.start;
    this.offset=Math.max(this.height-0.5*0.00001*dt*dt,0);
    if(this.offset==0 && this.bounceTime==0 && this.height>0){
      this.startBounce();
      this.height=0;
    }
    if(this.bounceTime>0){
      var dtb=time-this.bounceTime;
      var mag=Math.max(1-(dtb/500),0);
      this.offset=Math.abs(Math.sin(dtb*0.01)*this.size*0.5*mag);
      if(mag==0) this.bounceTime=0;
    }
    if(this.explodeTime>0){
      var dts=time-this.explodeTime;
      var mag=Math.max(1-(dts/500),0);
      this.scale = Math.abs(Math.cos(mag*Math.PI*2))*mag;
      if(mag==0){
        this.scale = 1;
        this.explodeTime = 0;
        var callback = this.explodeCallback;
        if(callback){
          this.explodeCallback=null;
          callback(this.indexX,this.indexY);
        }
      }
    }
  }

  setVerts(verts,idx){
    var dx=this.tx*this.size/2*this.scale;
    var dy=this.ty*this.size/2*this.scale;
    var offset = this.offset + (this.size-this.size*this.scale)/2;
    var i=idx*4*3;

    verts[i++]=this.x-dx;
    verts[i++]=this.z+offset;
    verts[i++]=this.y-dy;

    verts[i++]=this.x-dx;
    verts[i++]=this.z+this.size*this.scale+offset;
    verts[i++]=this.y-dy;

    verts[i++]=this.x+dx;
    verts[i++]=this.z+this.size*this.scale+offset;
    verts[i++]=this.y+dy;

    verts[i++]=this.x+dx;
    verts[i++]=this.z+offset;
    verts[i++]=this.y+dy;
  }

  setUVs(uvs,idx){
    var i=idx*4*2;
    var size=1/this.tiles;
    var offset = this.type*size;
    uvs[i++]=offset;
    uvs[i++]=0;

    uvs[i++]=offset;
    uvs[i++]=1;

    uvs[i++]=size+offset;
    uvs[i++]=1;

    uvs[i++]=size+offset;
    uvs[i++]=0;
  }

  setIndices(indices,idx){
    var i = idx*3*2; //initial array index
    var f = idx*4; //initial vert index
    indices[i++]=0+f;
    indices[i++]=1+f;
    indices[i++]=2+f;
    indices[i++]=0+f;
    indices[i++]=2+f;
    indices[i++]=3+f;
  }
}
