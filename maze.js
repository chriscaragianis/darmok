const angleShift = Math.PI/8;
const sampleRoom = [1,0,0,1,0,1,1,0];
var canvas = $('#maze')[0];
var ctx = canvas.getContext('2d');

ctx.fillStyle = "lime";
ctx.fillRect(0, 0, 800, 600);

ctx.lineWidth = 4;  

for (var i = 0; i < 8; i++) {
  ctx.save();
    ctx.translate(400,300);
    ctx.rotate(2*i * angleShift);
    if (sampleRoom[i] === 1) {
      ctx.save();
        ctx.rotate(angleShift/2);
        ctx.beginPath();
          ctx.moveTo(100,0);  
          ctx.lineTo(800, 0);
          ctx.arc(0, 0, 100, 0, angleShift/2, false);
        ctx.stroke();
        ctx.rotate(-angleShift);
        ctx.beginPath();
          ctx.moveTo(100,0);
          ctx.lineTo(800, 0);
          ctx.arc(0, 0, 100, 0, -angleShift/2, true);
        ctx.stroke();
      ctx.restore();
    }
    else { 
      ctx.save();
      ctx.beginPath();
        ctx.arc(0,0,100, -angleShift, angleShift, false);
      ctx.stroke();
      ctx.restore();
    }
  ctx.restore();
  
}
