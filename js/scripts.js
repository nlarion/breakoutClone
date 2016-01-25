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
  for (var i = 0; i < balls.length; i++) {
    if(!balls[i].launched){
      balls[i].x = e.offsetX;
      balls[i].y = 250-balls[i].r;
      console.log(balls);
    }
  }
});

var gameLoop = function(){
  //fill with black each frame
  c.fillStyle = "black";
  c.fillRect(0,0,canvas.width,canvas.height);
  if(firstRun === true){
    makeBricks();
    makeBall();
    firstRun = false;
  }
  // collide();
  testWalls();
  updatePosition();
  drawBricks();
  drawBalls();
}

var testWalls = function() {
  for (var i = 0; i < balls.length; i++) {
    if(balls[i].x-balls[i].r<0){
      balls[i].xvel *= -1;
    }
    if(balls[i].x+balls[i].r>canvas.width){
      balls[i].xvel *= -1;
    }
    if(balls[i].y-balls[i].r<0){
      balls[i].yvel *= -1;
    }
    if(balls[i].y+balls[i].r>canvas.height){
      balls[i].yvel *= -1;
    }
  }
}

var updatePosition = function(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].xvel;
    balls[i].y += balls[i].yvel;
  }
}

var makeBall = function(){
  var ball = new Ball(20,243,7,0,0,"white");
  balls.push(ball);
  var ball = new Ball(100,10,7,-3,3,"white");
  ball.launched = true;
  balls.push(ball);
}
var makeBricks = function(){
  var brick = new Brick(1,250,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(1,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(50,100,40,10,"black");
  bricks.push(brick);
  var brick = new Brick(100,100,40,10,"black");
  bricks.push(brick);
}

var drawBricks = function(){
  for (var i = 0; i < bricks.length; i++) {
    c.fillStyle = "green";
    c.fillRect(bricks[i].x,bricks[i].y,bricks[i].w,bricks[i].h);
  }
  c.stroke();
}

var drawBalls = function(){
  for (var i = 0; i < balls.length; i++) {
    c.fillStyle = "blue";
    c.beginPath();
    c.arc(balls[i].x,balls[i].y, balls[i].r, 0, Math.PI*2, true);
    c.closePath();
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

function Ball(x,y,r,xvel,yvel,color){
  this.x = x;
  this.y = y;
  this.r = r;
  this.xvel = xvel;
  this.yvel = yvel;
  this.color = color;
  this.nextx = 0;
  this.nexty = 0;
  this.launched = false;
}


function runtheapp() {
  setInterval(gameLoop, 33);
}

$(function(){
  runtheapp();
});
