const STATE_INIT = 10,
  STATE_LOADING = 20,
  STATE_RESET = 30,
  STATE_PLAYING = 40,
  STATE_GAMEOVER = 50,
  STATE_WIN = 60,
  STATE_LOADING_LEVEL = 70;

var Game = function(){
  this.firstRun = true;
  this.pointImage = new Image();
  this.appState = STATE_LOADING;
  this.isTheMouseBeingPressed = false;
  this.introCount = 0;
  this.$canvas = $('canvas');
  this.c = this.$canvas[0].getContext('2d');
  this.level = 1;
  this.currentLevel = new Level(1);
  this.currentPlayer = new Player();

}

Game.prototype.gameManager = function(){
  switch (this.appState) {
  case STATE_INIT:
    this.initApp(); // intro screen
    break;
  case STATE_LOADING:
    //load assets
    this.pointImage.src = "images/point.png"; // load all assets now so
    var t = this;
    this.$canvas.mousemove(function(e){
      t.currentPlayer.x = e.offsetX-((t.currentLevel.bricks[0].w)/2);
      //console.log("x: "+e.offsetX+"y: "+e.offsetY);
    });
    this.$canvas.click(function() {
      t.isTheMouseBeingPressed = true;
    });
    this.appState = STATE_INIT;
    break;
  case STATE_RESET:
    resetApp(); //doesn't exist yet
    break;
  case STATE_GAMEOVER:
    this.gameOverScreen();
    break;
  case STATE_PLAYING:
    this.gameLoop();
    break;
  case STATE_WIN:
    this.winnerScreen();
    break;
  case STATE_LOADING_LEVEL:
    this.loadingLevelScreen();
    break;
  }
};

Game.prototype.loadingLevelScreen = function(){

  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#fff";
  this.c.fillText ("Well Done!",canvas.width / 4, canvas.height / 2);
  this.c.font = " "+ canvas.width / 30 + "px serif";
  this.c.fillText("Click to Advance to Next Level",canvas.width / 3.6, canvas.height / 1.5);
  if (this.isTheMouseBeingPressed == true) {
    this.isTheMouseBeingPressed = false;
    levelConstructs.splice(0,1);
    this.currentLevel = new Level(1);
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.gameOverScreen = function(){

  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#fff";
  this.c.fillText ("GameOver :(",canvas.width / 4, canvas.height / 2);
}

Game.prototype.winnerScreen = function() {
  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#fff";
  this.c.fillText ("You Won!",canvas.width / 4, canvas.height / 2);
};

Game.prototype.gameLoop = function(){
  this.clearCanvasAndDisplayDetails();
  if(this.isTheMouseBeingPressed) {
    this.updatePosition();
    this.currentLevel.balls[0].launched = true;
  }
  this.collide();
  this.testWalls();
  this.drawBricks();
  this.drawRenderBalls();
};

Game.prototype.clearCanvasAndDisplayDetails = function(){
  this.c.fillStyle = "gray";
  this.c.fillRect(0,0,canvas.width,canvas.height);
  this.c.font = "12px serif";
  this.c.fillStyle = "#000000";
  this.c.fillText ("FPS: "+fps.getFPS(), 20, 20);
  this.c.fillText ("Score: " + this.currentPlayer.score, canvas.width-65, 20);
  this.c.fillText ("Lives: ", 20, canvas.height - 20);
  this.c.fillText ("VelX: "+this.currentLevel.balls[0].velx+" VelY: "+ this.currentLevel.balls[0].vely, canvas.width-100,canvas.height -20);
  for (var i = 0; i < this.currentPlayer.lives-1; i++) {
    this.c.fillStyle = "blue";
    this.c.fillRect((i*20)+60,canvas.height -30,10,10);
  }
  this
}

Game.prototype.initApp = function(){
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
  if(this.introCount<150){
    this.introCount++;
  }else{
    this.c.strokeStyle = '#000000';
    this.c.font = " "+ canvas.width / 30 + "px serif";
    this.c.fillStyle = "white";
    this.c.fillText("Click to Start a New Game",canvas.width / 3, canvas.height / 1.5);
  }
  if (this.isTheMouseBeingPressed == true) {
    this.isTheMouseBeingPressed = false;
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.drawBricks = function(){
  for (var i = 0; i < this.currentLevel.bricks.length; i++) {
    //this.currentLevel.bricks[i].player ? false : this.currentLevel.bricks[i].y +=(200-this.currentLevel.bricks[i].y)*.1; //simple easing.

    if(this.currentLevel.bricks[i].player){
      this.currentLevel.bricks[i].velx = (this.currentPlayer.x-this.currentLevel.bricks[i].x)*.4;
    }else {
      this.currentLevel.bricks[i].y = easeOutBack(this.currentLevel.bricks[i].timer,0,this.currentLevel.bricks[i].finalY,50);
    }
    this.currentLevel.bricks[i].x += this.currentLevel.bricks[i].velx;
    this.c.fillStyle = this.currentLevel.bricks[i].color;
    this.currentLevel.bricks[i].player ? this.c.fillStyle = "black" : false
    this.c.fillRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
    this.currentLevel.bricks[i].timer<50 ? this.currentLevel.bricks[i].timer++: false;
  }
};



Game.prototype.collide = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    for (var j = 0; j < this.currentLevel.bricks.length; j++) {
      if ( ((this.currentLevel.balls[i].nexty + this.currentLevel.balls[i].h) > (this.currentLevel.bricks[j].y)) && ((this.currentLevel.balls[i].nexty) < (this.currentLevel.bricks[j].y + this.currentLevel.bricks[j].h)) && ((this.currentLevel.balls[i].nextx + this.currentLevel.balls[i].w) > this.currentLevel.bricks[j].x) && (this.currentLevel.balls[i].nextx < (this.currentLevel.bricks[j].x + this.currentLevel.bricks[j].w)) ) {
        //left of ball
        if ( (this.currentLevel.balls[i].y + this.currentLevel.balls[i].h > this.currentLevel.bricks[j].y) &&
          (this.currentLevel.balls[i].y < this.currentLevel.bricks[j].y + this.currentLevel.bricks[j].h) &&
          (this.currentLevel.balls[i].x + this.currentLevel.balls[i].w > this.currentLevel.bricks[j].x) &&
          (this.currentLevel.balls[i].x > this.currentLevel.bricks[j].x )) {
          this.currentLevel.balls[i].velx *= -(1 + .05);
          this.currentLevel.balls[i].vely += .05;//+0.5 increases the ball speed every time it hits something.
          //right of ball
        }else if ( (this.currentLevel.balls[i].y + this.currentLevel.balls[i].h > this.currentLevel.bricks[j].y) &&
          (this.currentLevel.balls[i].y < this.currentLevel.bricks[j].y + this.currentLevel.bricks[j].h) &&
          (this.currentLevel.balls[i].x + this.currentLevel.balls[i].w < this.currentLevel.bricks[j].x) &&
          (this.currentLevel.balls[i].x < this.currentLevel.bricks[j].x) ) {
          this.currentLevel.balls[i].velx *= -(1 + .05);
          this.currentLevel.balls[i].vely += .05;//+0.5 increases the ball speed every time it hits something.
        } else {
          if(j===0) {
            this.currentLevel.balls[i].velx += this.currentLevel.bricks[j].velx*0.3;
          }
          this.currentLevel.balls[i].vely *= -(1 + .05);
          this.currentLevel.balls[i].velx += .05;//+0.5 increases the ball speed every time it hits something.
        }
        if(!this.currentLevel.bricks[j].player) {
          this.currentPlayer.score += this.currentLevel.bricks[j].score;
          this.currentLevel.bricks.splice(j,1);
          if(this.currentLevel.bricks.length === 1  && this.currentPlayer.lives>0){
            this.level++;
            console.log(levelConstructs.length);
            if(levelConstructs.length===1){
              this.appState = STATE_WIN;
            }else{
              this.isTheMouseBeingPressed = false;
              this.appState = STATE_LOADING_LEVEL;
              //console.log(this.currentLevel);
              //console.log(levelConstructs);
            }
          }
          console.log(this.currentPlayer.score);
        }
      }
    }
  }
};



Game.prototype.testWalls = function(){
  for (var i = 0, max = this.currentLevel.balls.length; i < max; i = i + 1) {
    if(this.currentLevel.balls[i].nextx<0){
      this.currentLevel.balls[i].velx *= -1;
    }
    if(this.currentLevel.balls[i].nextx+this.currentLevel.balls[i].w>canvas.width){
      this.currentLevel.balls[i].velx *= -1;
    }
    if(this.currentLevel.balls[i].nexty<0){
      this.currentLevel.balls[i].vely *= -1;
    }
    if(this.currentLevel.balls[i].nexty+this.currentLevel.balls[i].h>canvas.height){
      // this.currentLevel.balls[i].vely *= -1;
      this.isTheMouseBeingPressed = false;
      this.currentLevel.balls.splice(i,1);
      if(this.currentLevel.balls.length === 0 && this.currentPlayer.lives > 1){
        this.currentPlayer.lives--;
        console.log(this.currentPlayer.lives);
        this.currentLevel.makeBall(this.currentLevel.bricks[0].x+32,538);
      } else {
        this.appState = STATE_GAMEOVER;
      }
    }
  }
};

Game.prototype.drawRenderBalls = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    if(!this.currentLevel.balls[i].launched) {
      this.currentLevel.balls[i].x = (this.currentLevel.bricks[0].x+((this.currentLevel.bricks[0].w/2)-(this.currentLevel.balls[i].w)/2));
      this.currentLevel.balls[i].nextx = this.currentLevel.balls[i].x;
      this.currentLevel.balls[i].nexty = this.currentLevel.balls[i].y;
      this.c.fillStyle = "blue";
      this.c.fillRect(this.currentLevel.balls[i].x,this.currentLevel.balls[i].y,this.currentLevel.balls[i].w,this.currentLevel.balls[i].h);
    } else {
    this.currentLevel.balls[i].x = this.currentLevel.balls[i].nextx;
    this.currentLevel.balls[i].y = this.currentLevel.balls[i].nexty;
    this.c.fillStyle = "blue";
    this.c.fillRect(this.currentLevel.balls[i].x,this.currentLevel.balls[i].y,this.currentLevel.balls[i].w,this.currentLevel.balls[i].h);
  }
  }
};

Game.prototype.updatePosition = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    if(this.currentLevel.balls[i].velx > 15){
      this.currentLevel.balls[i].velx = 15;
    } else if(this.currentLevel.balls[i].velx < -15){
      this.currentLevel.balls[i].velx = -15;
    } else if(this.currentLevel.balls[i].vely > 15){
      this.currentLevel.balls[i].vely = 15;
    } else if(this.currentLevel.balls[i].vely < -15){
      this.currentLevel.balls[i].vely = -15;
    }
    this.currentLevel.balls[i].nextx += this.currentLevel.balls[i].velx;
    this.currentLevel.balls[i].nexty += this.currentLevel.balls[i].vely;
  }
};

Game.prototype.runTheGame = function(){
  var t = this;
  setInterval(function(){t.gameManager();}, 30);
};

$(function(){
  var game = new Game();
  game.runTheGame();
  // game.currentLevel.levelConstruct = levels[game.currentLevel.currentLevel-1];
});
