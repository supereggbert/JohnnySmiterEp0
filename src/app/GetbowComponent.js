AFRAME.registerComponent('getbow', {
  tick: function () {
		if(!this.bow){
			if(this.el.object3D.position.x!=0){
				this.bow=true;
				var bow=document.getElementById("bow");
				bow.setAttribute("position","0 -0.15 -0.05");
				bow.object3D.rotation.x=-1.2;
				this.el.appendChild(bow);
			}
		}
	}
});
