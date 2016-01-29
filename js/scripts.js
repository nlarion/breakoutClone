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
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < bricks.length; j++) {
      if ( ((balls[i].nexty + balls[i].h) > (bricks[j].y)) && ((balls[i].nexty) < (bricks[j].y + bricks[j].h)) && ((balls[i].nextx + balls[i].w) > bricks[j].x) && (balls[i].nextx < (bricks[j].x + bricks[j].w)) ) {
        //left of ball
        if ( (balls[i].y + balls[i].h > bricks[j].y) &&
          (balls[i].y < bricks[j].y + bricks[j].h) &&
          (balls[i].x + balls[i].w > bricks[j].x) &&
          (balls[i].x > bricks[j].x )) {
          console.log("one");
          balls[i].velx *= -1;
          //right of ball
        }else if ( (balls[i].y + balls[i].h > bricks[j].y) &&
          (balls[i].y < bricks[j].y + bricks[j].h) &&
          (balls[i].x + balls[i].w < bricks[j].x) &&
          (balls[i].x < bricks[j].x) ) {
          console.log("two");
          balls[i].velx *= -1;
        } else {
          balls[i].vely *= -1;
        }
        bricks[j].player ? false : bricks.splice(j,1);
      }
    }
  }
}

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
  brick.color = "black";
  bricks.push(brick);

  var brick = new Brick(5,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(55,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(105,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(155,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(205,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(255,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(305,0,30,15,"black");
  bricks.push(brick);
  var brick = new Brick(355,0,30,15,"black");
  bricks.push(brick);
}

var drawBricks = function(){
  var target = 100;
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].player ? false : bricks[i].y +=(target-bricks[i].y)*.1;
    c.fillStyle = "green";
    bricks[i].player ? c.fillStyle = "black" : false
    c.fillRect(bricks[i].x,bricks[i].y,bricks[i].w,bricks[i].h);
  }
}

var drawRenderBalls = function(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].x = balls[i].nextx;
    balls[i].y = balls[i].nexty;
    c.fillStyle = "blue";
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
