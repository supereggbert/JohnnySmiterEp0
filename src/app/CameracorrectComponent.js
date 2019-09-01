AFRAME.registerComponent('cameracorrect', {   
  tick: function () {
    var camera=document.querySelector("[camera]");
    if(camera.object3D.position.y>0){
      this.el.object3D.position.y=0;
    }else{
      this.el.object3D.position.y=1.2;
    }
  }
});
