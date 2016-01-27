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
  console.log("x: "+e.offsetX+"y: "+e.offsetY);
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
  //so basically i think the last && needs to be split and put in it's own shit, but idk...
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < bricks.length; j++) {
      if((balls[i].nextx+balls[i].r) > bricks[j].x && (balls[i].nextx-balls[i].r) < ((bricks[j].x)+bricks[j].w) && (balls[i].nexty+balls[i].r) > bricks[j].y && (balls[i].nexty-balls[i].r) < (bricks[j].y+bricks[j].h)) {
        balls[i].vely *= -1;
        console.log("first");
        bricks[j].player ? false : bricks.splice(j,1);
      }
      if((balls[i].nexty+balls[i].r) >= bricks[j].y && (balls[i].nexty+balls[i].r) <= ((bricks[j].y)+bricks[j].h) && (balls[i].nextx+balls[i].r) >= bricks[j].x && (balls[i].nextx-balls[i].r) <= bricks[j].x+bricks[j].w){
        balls[i].velx *= -1;
        console.log("second");
        bricks[j].player ? false : bricks.splice(j,1);
      }
    }
  }
}
// var collide = function(){
//   for (var i = 0; i < balls.length; i++) {
//     for (var j = 0; j < bricks.length; j++) {
//       if(balls[i].nextx >= bricks[j].x && balls[i].nextx <= (bricks[j].x+bricks[j].w)) {
//         if((balls[i].nexty-balls[i].r) < (bricks[j].y+bricks[j].h)&&(balls[i].nexty+balls[i].r) > (bricks[j].y)) {
//           balls[i].vely *= -1;
//           bricks[j].player ? false : bricks.splice(j,1);
//         }
//
//       } else if (balls[i].nexty < bricks[j].y && balls[i].nexty > (bricks[j].y-bricks[j].h)) {
//         if((balls[i].nextx-balls[i].r) <= (bricks[j].x+bricks[j].w)&&(balls[i].nextx+balls[i].r) >= (bricks[j].x)) {
//           balls[i].velx *= -1;
//           bricks[j].player ? false : bricks.splice(j,1);// slight performace loss
//         }
//       }
//     }
//   }
// }

var testWalls = function() {
  for (var i = 0; i < balls.length; i++) {
    if(balls[i].nextx-balls[i].r<0){
      balls[i].velx *= -1;
    }
    if(balls[i].nextx+balls[i].r>canvas.width){
      balls[i].velx *= -1;
    }
    if(balls[i].nexty-balls[i].r<0){
      balls[i].vely *= -1;
    }
    if(balls[i].nexty+balls[i].r>canvas.height){
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
  var ball = new Ball(200,75,7,3,-3,"white");
  ball.launched = true;
  balls.push(ball);
}
var makeBricks = function(){
  var brick = new Brick(200,250,40,10,"black");
  brick.player=true;
  bricks.push(brick);
  var brick = new Brick(150,0,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(250,0,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(100,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(150,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(200,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(250,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(300,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(350,100,40,10,"black");
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
    c.beginPath();
    c.arc(balls[i].x,balls[i].y, balls[i].r, 0, Math.PI*2, true);
    c.closePath();
    c.fillStyle = "blue";
    c.fill();
  }
}

function Brick(x,y,w,h,color){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
  this.nextx = 0;
  this.nexty = 0;
  this.player = false;
}

function Ball(x,y,r,velx,vely,color){
  this.x = x;
  this.y = y;
  this.r = r;
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
