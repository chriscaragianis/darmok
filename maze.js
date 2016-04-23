const angleShift = Math.PI/8;
const radius = 150;
const sampleRoom = [1,1,1,0,0,1,0,0];

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
  
  drawRoom([1,0,0,0,1,1,0,0]);
  setTimeout(function() {
    drawRoom([0,1,1,0,0,1,0,1]);  
  }, 1000);
  setTimeout(function() {
    drawRoom([0,0,1,0,1,0,0,1]);  
  }, 2000);
  setTimeout(function() {
    drawRoom([1,1,1,0,1,1,0,1]);  
  }, 3000);
  setTimeout(function() {
    drawRoom([0,0,0,0,0,0,0,0]);  
  }, 4000);
  

