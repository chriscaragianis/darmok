const angleShift = Math.PI/8;
const radius = 150;
const sampleRoom = [1,1,1,0,0,1,0,0];
const rooms = [[1,0,0,0,0,0,1,0],
               [0,0,1,0,1,0,0,0],
               [1,0,1,0,0,0,0,0],
               [0,0,0,0,1,0,1,0]];
               
var roomNumber = 0;
  
var toPolar = function(point) {
  x = parseFloat(point[0]);
  if (x === 0) {
    x += 0.000001;
  }
  y = point[1];
  var quad = 0;
  if (x <= 0 && y >= 0) {
    quad = 1;
  }
  else if (x <= 0 && y <= 0) {
    quad = -1;
  }
  return [Math.sqrt(x*x + y*y), Math.atan(y/x) + quad*Math.PI];
};        

var inWedge = function(point) {
  if (point[0] < radius) {
    return -1;
  }
  theta = point[1]+(angleShift/2);
  var wedge = Math.floor((theta/angleShift))/2;
  if (wedge < 0) {
    wedge += 8;
  }
  if (wedge !== Math.floor(wedge)) {
    return -1;
  }
  return wedge;
}

var drawRoom = function(roomData) {
  var canvas = $('#maze')[0];
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = "lime";
  ctx.fillRect(0, 0, 800, 600);
  ctx.lineWidth = 4;  

  for (var i = 0; i < 8; i++) {
    ctx.save();
      ctx.translate(400,300);
      ctx.rotate(2*i * angleShift);
      if (roomData[i] === 1) {
        ctx.save();
          ctx.rotate(angleShift/2);
          ctx.beginPath();
            ctx.moveTo(radius,0);  
            ctx.lineTo(800, 0);
            ctx.arc(0, 0, radius, 0, angleShift/2, false);
          ctx.stroke();
          ctx.rotate(-angleShift);
          ctx.beginPath();
            ctx.moveTo(radius,0);
            ctx.lineTo(800, 0);
            ctx.arc(0, 0, radius, 0, -angleShift/2, true);
          ctx.stroke();
          ctx.fill(); 
        ctx.restore();
      }
     else { 
        ctx.save();
        ctx.beginPath();
          ctx.arc(0,0,radius, -angleShift, angleShift, false);
       ctx.stroke();
        ctx.restore();
     }
    ctx.restore();
  }
}
  
drawRoom([1,1,1,1,1,1,1,1]); 
$('#maze').click(function(e) {
  point = [e.pageX-this.offsetLeft-400, (-1*e.pageY)+this.offsetTop+300];
  alert(inWedge(toPolar(point)));
})