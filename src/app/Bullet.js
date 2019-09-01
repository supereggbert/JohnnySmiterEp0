import {Arrow} from './Arrow.js'

export default class Bullet{
    constructor(){
      var geometry = Arrow;
      var material = new THREE.MeshStandardMaterial( {color: 0x888888,fog:true,flatShading:true} );
      var object = new THREE.Mesh( geometry,  material);
      object.visible = false;
      this.object=object;
      this.maxLife=1000;
      this.speed=20;
      this.lastPosition = new THREE.Vector3(0,0,0);
      this.currentPosition = new THREE.Vector3(0,0,0);
    }
    updateMatrix(time){
      var dt=time-this.fired;
      if(dt>this.maxLife){
        this.hide();
        return;
      }      
      //set position and rotation based on time passed
      if(this.fired>0){
        this.lastPosition.copy(this.object.position);
        var pos = this.getCurrentPosition(dt);
        this.object.position.copy(pos);
        var dir = this.getCurrentPosition(dt+0.01);
        this.object.lookAt(dir);
      }
    }
    getCurrentPosition(dt){
      var f=-dt*this.speed/1000;  //TODO this will be + not - for anything but the camera
      this.currentPosition.copy(this.direction);
      this.currentPosition.multiplyScalar(f)
      this.currentPosition.add(this.position)
      return this.currentPosition;
    }
    fire(position, direction){
      this.fired=+new Date;
      this.position=position;
      this.direction=direction;
      this.show();
    }
    hide(){
      this.fired=0;
      this.object.visible = false;
    }
    show(){
      this.object.visible = true;
    }
}
