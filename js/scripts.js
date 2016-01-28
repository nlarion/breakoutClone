//TODO: make block
//Globals
var $canvas = $('canvas');
var c = $canvas[0].getContext("2d");
var bricks = [],
  balls = [],
  firstRun = true,
  test = 1;

$canvas.mousemove(function(e){
  bricks[0].x = e.offsetX-((bricks[0].w)/2);
  //console.log("x: "+e.offsetX+"y: "+e.offsetY);
  for (var i = 0; i < balls.length; i++) {
    if(!balls[i].launched){
      balls[i].x = e.offsetX;
      balls[i].y = 240-balls[i].r;
      //console.log(balls);
    }
  }
});

var gameLoop = function(){
  //fill with black each frame
  c.fillStyle = "gray";
  c.fillRect(0,0,canvas.width,canvas.height);
  if(firstRun === true){
    makeBricks();
    makeBall();
    firstRun = false;
  }
  updatePosition();
  collide();
  testWalls();
  drawBricks();
  drawRenderBalls();
}

var collide = function(){
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < bricks.length; j++) {
      if ( ((balls[i].nexty + balls[i].h) > (bricks[j].y)) && ((balls[i].nexty) < (bricks[j].y + bricks[j].h)) && ((balls[i].nextx + balls[i].w) > bricks[j].x) && (balls[i].nextx < (bricks[j].x + bricks[j].w)) ) {
        var dx = (balls[i].nextx+balls[i].velx) - balls[i].nextx;
        var dy = (balls[i].nexty+balls[i].vely) - balls[i].nexty;
        var distSquared = dx * dx + dy * dy;
        var xVelocity = balls[i].velx - bricks[j].velx;
        var yVelocity = balls[i].vely - bricks[j].vely;
        // var xVelocity = bricks[j].velx - balls[i].velx;
        // var yVelocity = bricks[j].vely - balls[i].vely;
        var dotProduct = dx * xVelocity + dy * yVelocity; 
        console.log(dotProduct);
        if (dotProduct > 0) {
          if (dx<0 && dy<0) {
            balls[i].vely *= -1;
            //balls[i].velx *= -1;
          } else if (dx<0 && dy>0) {
            balls[i].vely *= -1;
            //balls[i].velx *= -1;
          } else if (dx>0 && dy>0) {
            balls[i].vely *= -1;
            //balls[i].velx *= -1;
          } else if (dx>0 && dy<0) {
            balls[i].vely *= -1;
            //balls[i].velx *= -1;
          }

          console.log(dx+" "+dy)
        } else {
          console.log("hi");
        }
        // if (dx<0 && dy<0) {
        //   balls[i].vely *= -1;
        //   //balls[i].velx *= -1;
        // } else if (dx<0 && dy>0) {
        //   balls[i].vely *= -1;
        //   //balls[i].velx *= -1;
        // } else if (dx>0 && dy>0) {
        //   balls[i].vely *= -1;
        //   //balls[i].velx *= -1;
        // } else if (dx>0 && dy<0) {
        //   balls[i].vely *= -1;
        //   //balls[i].velx *= -1;
        // }
      }
    }
  }
}

// var collide = function(){
//   for (var i = 0; i < balls.length; i++) {
//     for (var j = 0; j < bricks.length; j++) {
//       if ( ((balls[i].nexty + balls[i].h) > (bricks[j].y)) && ((balls[i].nexty) < (bricks[j].y + bricks[j].h)) && ((balls[i].nextx + balls[i].w) > bricks[j].x) && (balls[i].nextx < (bricks[j].x + bricks[j].w))) {
//         dx = (balls[i].nextx+balls[i].velx) - balls[i].nextx;
//         dy = (balls[i].nexty+balls[i].vely) - balls[i].nexty;
//         console.log(dx+" "+dy)
//         if (dx<0 && dy<0) {
//           balls[i].vely *= -1;
//           //balls[i].velx *= -1;
//         } else if (dx<0 && dy>0) {
//           balls[i].vely *= -1;
//           //balls[i].velx *= -1;
//         } else if (dx>0 && dy>0) {
//           balls[i].vely *= -1;
//           //balls[i].velx *= -1;
//         } else if (dx>0 && dy<0) {
//           balls[i].vely *= -1;
//           //balls[i].velx *= -1;
//         }
//       }
//     }
//   }
// }

// var testWalls = function() {
//   for (var i = 0; i < balls.length; i++) {
//     if(balls[i].nextx-balls[i].r<0){
//       balls[i].velx *= -1;
//     }
//     if(balls[i].nextx+balls[i].r>canvas.width){
//       balls[i].velx *= -1;
//     }
//     if(balls[i].nexty-balls[i].r<0){
//       balls[i].vely *= -1;
//     }
//     if(balls[i].nexty+balls[i].r>canvas.height){
//       balls[i].vely *= -1;
//     }
//   }
// }

var testWalls = function() {
  for (var i = 0; i < balls.length; i++) {
    if(balls[i].nextx<0){
      balls[i].velx *= -1;
    }
    if(balls[i].nextx+balls[i].w>canvas.width){
      balls[i].velx *= -1;
    }
    if(balls[i].nexty<0){
      balls[i].vely *= -1;
    }
    if(balls[i].nexty+balls[i].h>canvas.height){
      balls[i].vely *= -1;
    }
  }
}

var updatePosition = function(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].nextx += balls[i].velx;
    balls[i].nexty += balls[i].vely;
  }
}

var makeBall = function(){
  // var ball = new Ball(20,240,7,0,0,"white");
  // balls.push(ball);

  //square
  var ball = new Ball(200,75,10,10,3,3,"white");
  ball.launched = true;
  balls.push(ball);

  //ball
  // var ball = new Ball(200,75,10,3,-3,"white");
  // ball.launched = true;
  // balls.push(ball);
}
var makeBricks = function(){
  var brick = new Brick(200,250,40,15,"black");
  brick.player=true;
  bricks.push(brick);

  // var brick = new Brick(150,0,10,400,"black");
  // bricks.push(brick);
  // var brick = new Brick(250,0,10,400,"black");
  // bricks.push(brick);


  // var brick = new Brick(0,0,400,10,"black");
  // bricks.push(brick);
  // var brick = new Brick(0,100,400,10,"black");
  // bricks.push(brick);

  var brick = new Brick(150,0,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(250,0,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(100,100,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(150,100,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(200,100,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(250,100,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(300,100,40,15,"black");
  bricks.push(brick);
  var brick = new Brick(350,100,40,15,"black");
  bricks.push(brick);
}

var drawBricks = function(){
  for (var i = 0; i < bricks.length; i++) {
    c.fillStyle = "green";
    c.fillRect(bricks[i].x,bricks[i].y,bricks[i].w,bricks[i].h);
  }
}

var drawRenderBalls = function(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].x = balls[i].nextx;
    balls[i].y = balls[i].nexty;
    // c.beginPath();
    // c.arc(balls[i].x,balls[i].y, balls[i].r, 0, Math.PI*2, true);
    // c.closePath();
    c.fillStyle = "blue";
    // c.fill();
    c.fillRect(balls[i].x,balls[i].y,balls[i].w,balls[i].h);
  
  }
}

function Brick(x,y,w,h,color){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.velx = 0;
  this.vely = 0;
  this.color = color;
  this.nextx = 0;
  this.nexty = 0;
  this.player = false;
}

//function Ball(x,y,r,velx,vely,color){
function Ball(x,y,w,h,velx,vely,color){
  this.x = x;
  this.y = y;
  // this.r = r;
  this.w = w;
  this.h = h;
  this.velx = velx;
  this.vely = vely;
  this.color = color;
  this.nextx = x;
  this.nexty = y;
  this.launched = false;
}


function runtheapp() {
  setInterval(gameLoop, 33);
}

$(function(){
  runtheapp();
});
