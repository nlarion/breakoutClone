const STATE_INIT = 10,
  STATE_LOADING = 20,
  STATE_RESET = 30,
  STATE_PLAYING = 40;
var bricks = [],
  balls = [];

var Game = function(){
  this.firstRun = true;
  this.pointImage = new Image();
  this.appState = STATE_INIT;
  this.isTheMouseBeingPressed = false;
  this.introCount = 0;
  this.$canvas = $('canvas');
  this.c = this.$canvas[0].getContext('2d');
  this.currentLevel = 0;
}


Game.prototype.gameManager = function(){
  switch (this.appState) {
  case STATE_INIT:
    this.initApp(); // intro screen
    break;
  case STATE_LOADING:
    //load assets
    this.pointImage.src = "images/point.png"; // load all assets now so 
    this.$canvas.mousemove(function(e){
      bricks[0].x = e.offsetX-((bricks[0].w)/2);
      //console.log("x: "+e.offsetX+"y: "+e.offsetY);
      for (var i = 0; i < balls.length; i++) {
        if(!balls[i].launched){
          balls[i].x = e.offsetX;
          balls[i].y = 240-balls[i].r;
        }
      }
    });
    this.appState = STATE_PLAYING;
    break;
  case STATE_RESET:
    resetApp(); //doesn't exist yet
    break;
  case STATE_PLAYING:
    this.gameLoop();
    break;
  }
};

Game.prototype.gameLoop = function(){
  this.c.fillStyle = "gray";
  this.c.fillRect(0,0,canvas.width,canvas.height);
  if(this.firstRun === true){
    makeBricks();
    makeBall();
    this.firstRun = false;
  }
  this.c.font = "12px serif";
  this.c.fillStyle = "#000000";
  this.c.fillText ("FPS: "+fps.getFPS(), 20, 20);
  updatePosition();
  collide();
  testWalls();
  this.drawBricks();
  this.drawRenderBalls();
};

Game.prototype.initApp = function(){
  this.introCount++;
  fadeIn = this.introCount + 30;
  colorModifier = fadeIn.toString(16);
  this.c.fillStyle = '#0001' + colorModifier;
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000'; 
  this.c.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#" + this.introCount + "";
  this.c.fillText ("Breakout",canvas.width / 3, canvas.height / 2);
  if (this.introCount == 150 || this.isTheMouseBeingPressed == true) {
    this.appState = STATE_LOADING;
  }
}

Game.prototype.drawBricks = function(){
  for (var i = 0; i < bricks.length; i++) {
    //bricks[i].player ? false : bricks[i].y +=(200-bricks[i].y)*.1; //simple easing.
    bricks[i].player ? false : bricks[i].y = easeOutBack(bricks[i].timer,0,100,50);
    this.c.fillStyle = "green";
    bricks[i].player ? this.c.fillStyle = "black" : false
    this.c.fillRect(bricks[i].x,bricks[i].y,bricks[i].w,bricks[i].h);
    bricks[i].timer<50 ? bricks[i].timer++: false;
  }

};

Game.prototype.drawRenderBalls = function(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].x = balls[i].nextx;
    balls[i].y = balls[i].nexty;
    this.c.fillStyle = "blue";
    this.c.fillRect(balls[i].x,balls[i].y,balls[i].w,balls[i].h);
  }
};

Game.prototype.runTheGame = function(){
  var t = this;
  setInterval(function(){t.gameManager();}, 30);
};

$(function(){
  var game = new Game();
  game.runTheGame();
});