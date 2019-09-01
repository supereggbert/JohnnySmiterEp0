import GridSquare from './GridSquare.js';

import {Rune} from './player.js';

export default class Grid{
  constructor(rows,cols, margin, radius){
    this.rows=rows;
    this.cols=cols;
    this.margin=margin;
    this.radius=radius;
    this.initSquares();
    this.buildGeometry();
		this.reset();
  }

	reset(){
    for(var x=0; x<this.cols;x++){
      for(var y=0; y<this.rows;y++){
				this.squares[x][y].start=+new Date;
        this.squares[x][y].setHeight((50+Math.random())*(y+1));
			}
		}
		this.update();
		this.state='new';
	}

  ray(origin, direction){
    var intersection=new THREE.Vector3(0,0,0);

    var A=origin.x;
    var C=origin.z;
    var B=direction.x;
    var D=direction.z;
    var R=this.radius;

    var x = (Math.sqrt((2*A*B+2*C*D)*(2*A*B+2*C*D) - 4*(B*B+D*D)*(A*A+C*C-R*R)) - 2*A*B-2*C*D) / (2*(B*B+D*D));
    intersection.x=(A+x*B);
    intersection.z=(C+x*D);
    
    intersection.y = (intersection.x-origin.x)/direction.x*direction.y+origin.y
    return intersection;
  }

  hit(intersection){
    var angle = Math.atan2(intersection.x,intersection.z);
    var size = (this.radius*Math.PI*2)/this.cols;
    var x = Math.round((angle+Math.PI)/(Math.PI*2)*this.cols)%this.cols;
    var y = Math.floor(intersection.y/size);
		var dx=((angle+Math.PI)/(Math.PI*2)*this.cols+0.5)%1;
		var dy=(intersection.y/size)%1;
    if(y>-1 && y<this.rows && dx>0.15 && dx<0.85 && dy<0.8){
      this.squareHit(x,y);
    }
  }

  squareHit(x,y){
			var scorel=document.getElementById("score");
			scorel.score++;
			scorel.setAttribute("text","value: RUNES: "+scorel.score+"/"+window.localStorage.highscore);
			if(scorel.score>window.localStorage.highscore) window.localStorage.highscore=scorel.score;
      this.explodeSquare(x,y);
      if(y<this.rows-1){
        if(this.squares[x][y].type==this.squares[x][y+1].type && this.squares[x][y+1].explodeTime==0 && this.squares[x][y+1].height==0){
          setTimeout(()=>this.squareHit(x,y+1),150);
        }
      }
      if(y>0){
        if(this.squares[x][y].type==this.squares[x][y-1].type && this.squares[x][y-1].explodeTime==0 && this.squares[x][y-1].height==0){
          setTimeout(()=>this.squareHit(x,y-1),150);
        }
      }
      var x1=(x+1)%this.cols;
      var x2=(x-1+this.cols)%this.cols;
      if(this.squares[x][y].type==this.squares[x1][y].type && this.squares[x1][y].explodeTime==0 && this.squares[x1][y].height==0){
        setTimeout(()=>this.squareHit(x1,y),150);
      }
      if(this.squares[x][y].type==this.squares[x2][y].type && this.squares[x2][y].explodeTime==0 && this.squares[x2][y].height==0){
        setTimeout(()=>this.squareHit(x2,y),150);
      }
  }

  initSquares(){
    var squaresize = (this.radius*Math.PI*2)/this.cols - this.margin;
    var squares=[];
    for(var x=0; x<this.cols;x++){
      var col=[];
      for(var y=0; y<this.rows;y++){
        var px = -Math.sin(x/this.cols*2*Math.PI);
        var py = -Math.cos(x/this.cols*2*Math.PI);
        var pz = y*(squaresize+this.margin);
        col.push(new GridSquare(px*this.radius,py*this.radius,pz,py,-px,squaresize,x,y));
      }
      squares.push(col)
    }
    this.squares=squares;
  }

	start(){
		this.state='play';
    for(var x=0; x<this.cols;x++){
      for(var y=0; y<this.rows;y++){
				this.squares[x][y].start=+new Date;
			}
		}
	}

  buildGeometry(){
    var vertsLength = this.rows*this.cols*3*4;
    var uvsLength = this.rows*this.cols*2*4;
    this.geometry = new THREE.BufferGeometry();
    this.verts = new THREE.BufferAttribute(new Float32Array(vertsLength), 3);
    this.uvs = new THREE.BufferAttribute(new Float32Array(uvsLength), 2);
    this.indices = new THREE.BufferAttribute(new Uint16Array(this.rows*this.cols*2*3), 1);
    this.verts.dynamic = true;
    this.uvs.dynamic = true;

    var idx=0;
    for(var x=0; x<this.cols;x++){
      for(var y=0; y<this.rows;y++){
        this.squares[x][y].setHeight((50+Math.random())*(y+1));
        this.squares[x][y].setVerts(this.verts.array,idx);
        this.squares[x][y].setUVs(this.uvs.array,idx);
        this.squares[x][y].setIndices(this.indices.array,idx);
        idx++;
      }
    }
    this.geometry.setIndex( this.indices );
    this.geometry.addAttribute( 'position', this.verts );
    this.geometry.addAttribute( 'uv', this.uvs );
  }

  explodeSquare(x,y){
		if(this.state!='play') return;
		Rune();
    this.squares[x][y].explode((x,y)=>{
      //move all rows above down one and set top to initial height
      for(var i=y;i<this.rows-1;i++){
        var src=this.squares[x][i+1];
        var dest=this.squares[x][i];
        var delta=src.z-dest.z;
        if(src.height>0){
          dest.start=src.start;
          dest.height=src.height+(delta);
        }else{
          dest.height=delta;
          dest.start=+new Date;
        }
        dest.bounceTime=0;
        dest.explodeTime=src.explodeTime;
        dest.explodeCallback=src.explodeCallback;
        dest.scale=src.scale;
        dest.type=src.type;
      }
      var last=this.squares[x][this.rows-1];
      last.setHeight((10+Math.random())*this.rows);
      last.scale=1;
      last.explodeTime=0;
      last.bounceTime=0;
      last.type=Math.floor(Math.random()*6);
      this.update();
    });
  }

  update(){
		if(this.state=='new') return;
    var t=+new Date;
    var idx=0;
    for(var x=0; x<this.cols;x++){
      for(var y=0; y<this.rows;y++){
        this.squares[x][y].update(t);
        this.squares[x][y].setVerts(this.verts.array,idx);
        this.squares[x][y].setUVs(this.uvs.array,idx);
        idx++;
      }
    }
    this.verts.needsUpdate=true;
    this.uvs.needsUpdate=true;
  }
}

