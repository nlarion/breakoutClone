const STATE_INIT = 10,
  STATE_LOADING = 20,
  STATE_RESET = 30,
  STATE_PLAYING = 40;
var firstRun = true,
  pointImage = new Image(),
  appState = STATE_INIT,
  isTheMouseBeingPressed = false,
  introCount = 0, 
  $canvas = $('canvas'), 
  c = $canvas[0].getContext("2d"),
  bricks = [],
  balls = [];


var gameManager = function(){
  switch (appState) {
  case STATE_INIT:
    initApp(); // intro screen
    break;
  case STATE_LOADING:
    //load assets
    pointImage.src = "images/point.png"; // load all assets now so when they're finished the game starts
    //load event handlers
    $canvas.mousemove(function(e){
      bricks[0].x = e.offsetX-((bricks[0].w)/2);
      //console.log("x: "+e.offsetX+"y: "+e.offsetY);
      for (var i = 0; i < balls.length; i++) {
        if(!balls[i].launched){
          balls[i].x = e.offsetX;
          balls[i].y = 240-balls[i].r;
        }
      }
    });
    appState = STATE_PLAYING;
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
  c.fillStyle = "gray";
  c.fillRect(0,0,canvas.width,canvas.height);
  if(firstRun === true){
    makeBricks();
    makeBall();
    firstRun = false;
  }
  c.font = "12px serif";
  c.fillStyle = "#000000";
  c.fillText ("FPS: "+fps.getFPS(), 20, 20);
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