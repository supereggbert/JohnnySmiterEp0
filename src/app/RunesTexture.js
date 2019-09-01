var canvas=document.createElement("canvas");
canvas.width=1024;
canvas.height=128;
var ctx=canvas.getContext("2d");

var points = [[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]];
var renderRune=function(value,x,y,w,h){
  var v=1;
  var idx=value&4;
  ctx.moveTo(points[idx][0]*w+x,points[idx][1]*h+y);
  for(var i=1;i<6;i++){
    var idx=(value>>(i*4))&15;
    ctx.lineTo(points[idx][0]*w+x,points[idx][1]*h+y);
  }
  ctx.closePath();
  ctx.stroke();
};

ctx.lineWidth=4;
ctx.shadowBlur = 10;
ctx.shadowColor = "#f00";
ctx.strokeStyle= "#fff";
ctx.lineJoin = "round";

var runes=[
  0x34461,
  0x15632,
  0x65146,
  0x16500,
  0x55362,
  0x16332
];

for(var i=0;i<runes.length;i++){
  ctx.beginPath();
  for(var j=0;j<3;j++){
  ctx.rect(128*i+16,16,96,96);
  renderRune(runes[i],128*i+34,30,68,23);
  }
}

export default canvas;
