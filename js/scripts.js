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

var game = new Game();

var gameManager = function(){
  switch (game.appState) {
  case STATE_INIT:
    initApp(); // intro screen
    break;
  case STATE_LOADING:
    //load assets
    game.pointImage.src = "images/point.png"; // load all assets now so 
    game.$canvas.mousemove(function(e){
      bricks[0].x = e.offsetX-((bricks[0].w)/2);
      //console.log("x: "+e.offsetX+"y: "+e.offsetY);
      for (var i = 0; i < balls.length; i++) {
        if(!balls[i].launched){
          balls[i].x = e.offsetX;
          balls[i].y = 240-balls[i].r;
        }
      }
    });
    game.appState = STATE_PLAYING;
    break;
  case STATE_RESET:
    resetApp(); //doesn't exist yet
    break;
  case STATE_PLAYING:
    gameLoop();
    break;
  }
}

var gameLoop = function(){
  game.c.fillStyle = "gray";
  game.c.fillRect(0,0,canvas.width,canvas.height);
  if(game.firstRun === true){
    makeBricks();
    makeBall();
    game.firstRun = false;
  }
  game.c.font = "12px serif";
  game.c.fillStyle = "#000000";
  game.c.fillText ("FPS: "+fps.getFPS(), 20, 20);
  updatePosition();
  collide();
  testWalls();
  drawBricks();
  drawRenderBalls();
}

var runTheGame = function(){
  setInterval(gameManager, 30);
}

$(function(){
  runTheGame();
});