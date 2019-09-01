export default function(seed){
	var canvas=document.createElement("canvas");
	canvas.width=1024;
	canvas.height=1024;
	var ctx=canvas.getContext("2d");

	var random=function(){
		var r=Math.abs(Math.sin(1000*seed)+Math.sin(2001*seed)+Math.sin(3242*seed)+Math.sin(883231*seed))/4;
		seed+=r;
		return r;
	}

	var drawTree=function(x,y,l){
		ctx.beginPath();
		ctx.lineWidth=40/Math.pow(l,1.2);
		ctx.moveTo(x,y);
		var branch=[];
		for(var i=0; i<30;i++){
			y-=10/Math.pow(l,0.7);
			x+=(random()-0.5)*2;
			ctx.lineTo(x,y);
			if(l<7 && (random()>0.8 || i==27) && i>3){
				var r=Math.abs(random()-0.5)+0.1;
				branch.push([x,y,r]);
				branch.push([x,y,-r]);
			}
			if(random()>0.8 && l>3) break;
		}
		ctx.stroke();
		for(var i=0;i<branch.length;i++){
			ctx.save();
			ctx.translate(branch[i][0],branch[i][1]);
			ctx.rotate(branch[i][2]);
			ctx.translate(-branch[i][0],-branch[i][1]);
			drawTree(branch[i][0],branch[i][1],l+1);
			ctx.restore();
		}
	}

	//ctx.scale(2,2);
	drawTree(512,1024,1);
	return canvas;
}
