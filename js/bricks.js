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
};


var updatePosition = function(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].nextx += balls[i].velx;
    balls[i].nexty += balls[i].vely;
  }
};

var makeBall = function(){
  // var ball = new Ball(20,240,7,0,0,"white");
  // balls.push(ball);

  //square
  var ball = new Ball(200,75,10,10,3,3,"white");
  ball.launched = true;
  balls.push(ball);

  // ball
  // var ball = new Ball(200,75,10,3,-3,"white");
  // ball.launched = true;
  // balls.push(ball);
};

// var timer = 0;
// var drawBricks = function(){
//   for (var i = 0; i < bricks.length; i++) {
//     //bricks[i].player ? false : bricks[i].y +=(200-bricks[i].y)*.1; //simple easing.
//     bricks[i].player ? false : bricks[i].y = easeOutBack(timer,0,100,50);
//     game.c.fillStyle = "green";
//     bricks[i].player ? game.c.fillStyle = "black" : false
//     game.c.fillRect(bricks[i].x,bricks[i].y,bricks[i].w,bricks[i].h);
//   }
//   timer<50 ? timer++: false;
// };

// var drawRenderBalls = function(){
//   for (var i = 0; i < balls.length; i++) {
//     balls[i].x = balls[i].nextx;
//     balls[i].y = balls[i].nexty;
//     game.c.fillStyle = "blue";
//     game.c.fillRect(balls[i].x,balls[i].y,balls[i].w,balls[i].h);
//   }
// };

// t: current time, b: begInnIng value, c: change In value, d: duration
//var somevar = easeOutBack(0,0,100,100)//start
//var somevar = easeOutBack(100,0,100,100) //end
var easeOutBack = function (t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};


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
  this.timer = 0;
};

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
};
