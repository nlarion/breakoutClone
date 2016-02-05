const STATE_INIT = 10,
  STATE_LOADING = 20,
  STATE_RESET = 30,
  STATE_PLAYING = 40,
  STATE_GAMEOVER = 50,
  STATE_WIN = 60,
  STATE_LOADING_LEVEL = 70;
  STATE_CREDITS_SCREEN = 80;

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
  this.getKeyPress;
  this.shakeXMod = 0;
  this.shakeCounter = 0;
  this.shakeTimer = 21;
  this.skipLevelKeyPress = false;
}


Game.prototype.gameManager = function(){
  switch (this.appState) {
  case STATE_INIT:
    this.initApp(); // intro screen
    break;
  case STATE_LOADING:
    //load assets
    this.audio = new SeamlessLoop();
    this.audio.addUri('sounds/breakoutLoop1.mp3',5350,"loop1");
    this.audio.addUri('sounds/breakoutLoop2.mp3',18700,"loop2");
    this.audio.addUri('sounds/breakoutLoop3.mp3',2720,"loop3");
    this.audio.addUri('sounds/breakoutLoop4.mp3',2700,"loop4");
    this.audio.addUri('sounds/breakoutLoop5.mp3',7990,"loop5");
    this.sounds = {gameOver: new Audio('sounds/breakoutGameOver.mp3'), normalHit: new Audio('sounds/SG280_BD_11.mp3'), lightHit: new Audio('sounds/SG280_Bongo_08.mp3'), powerUp: new Audio('sounds/SG280_Cym_01.mp3'), steady: new Audio('sounds/SG280_Tom_02.mp3'), mediumHit: new Audio('sounds/SG280_SD_02.mp3')};
    var t = this;
    this.$canvas.mousemove(function(e){
      t.currentPlayer.x = e.offsetX-((t.currentLevel.bricks[0].w)/2);
    });
    this.$canvas.click(function() {
      t.isTheMouseBeingPressed = true;
    });
    $(window).keypress(function(e){
      t.getKeyPress = e;
    });
    this.appState = STATE_INIT;
    break;
  case STATE_RESET:
    resetApp(); //doesn't exist yet
    break;
  case STATE_GAMEOVER:
    this.gameOverScreen();
    break;
  // case STATE_CREDITS_SCREEN:
  //   this.creditsScreen();
  //   break;
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
  if (this.firstRun) {
    this.audio.start("loop2");
    this.firstRun = false;
  }
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
    this.firstRun = true;
    this.audio.stop();
    this.isTheMouseBeingPressed = false;
    levelConstructs.splice(0,1);
    this.currentLevel = new Level(1);
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.gameOverScreen = function(){
  if (this.firstRun) {
    this.sounds.gameOver.play();
    this.firstRun = false;
  }
  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#fff";
  this.c.fillText ("GameOver :(",canvas.width / 4, canvas.height / 2);
  this.c.font = " "+ canvas.width / 30 + "px serif";
  this.c.fillText("Click to Try Again...",canvas.width / 2.8, canvas.height / 1.5);
  if (this.isTheMouseBeingPressed == true) {
    this.changeStateAndRestartGame();
  }
}

Game.prototype.winnerScreen = function() {
  if (this.firstRun) {
    this.audio.start("loop4");
    this.firstRun = false;
  }
  //new code
  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#fff";
  this.c.fillText ("You Won!",canvas.width / 4, canvas.height / 2);
  this.c.font = " "+ canvas.width / 30 + "px serif";
  this.c.fillText("Game by: Neil Larion, Matt Rosanio, Will Johnson, and Michael Smith", canvas.width / 40, canvas.height / 1.5);
  if (this.isTheMouseBeingPressed == true) {
    this.changeStateAndRestartGame();
  }
};

Game.prototype.changeStateAndRestartGame = function(){
  this.firstRun = true;
  this.isTheMouseBeingPressed = false;
  levelConstructs = new LevelConstruct();
  this.level = 1;
  this.currentLevel = new Level(1);
  this.currentPlayer = new Player();
  this.audio.stop();
  this.appState = STATE_INIT;
}

Game.prototype.gameLoop = function(){
  if (this.firstRun) {
    this.audio.start("loop1");
    this.firstRun = false;
  }
  if(this.getKeyPress){
    if(this.getKeyPress.which === 108){
      this.currentPlayer.lives++;
    }else if(this.getKeyPress.which === 110){
      this.skipLevelKeyPress = true;
    }
    this.getKeyPress = undefined;
  }
  this.clearCanvasAndDisplayDetails();
  if(this.currentLevel.brickAndBallStart) {
    this.collide();
    this.updatePosition();
    this.testWalls();
  }
  this.screenShake();
  this.drawBricks();
  this.drawRenderBalls();
  this.checkWinState();
};

Game.prototype.clearCanvasAndDisplayDetails = function(){
  this.c.fillStyle = "black";
  this.c.fillRect(0,0,canvas.width,canvas.height);
  this.c.font = "12px serif";
  this.c.fillStyle = "white";
  this.c.fillText ("Level: "+this.level, 20, 20);
  this.c.fillText ("Score: " + this.currentPlayer.score, canvas.width-65, 20);
  this.c.fillText ("Lives: ", 20, canvas.height - 20);
  for (var i = 0; i < this.currentPlayer.lives-1; i++) {
    this.c.fillStyle = "blue";
    this.c.beginPath();
    this.c.arc((i*20)+60,canvas.height-25,this.currentLevel.balls[0].w/2,0,Math.PI*2,true);
    this.c.closePath();
    this.c.fill();
  }
}

Game.prototype.initApp = function(){
  if (this.firstRun) {
    this.audio.start("loop5");
    this.firstRun = false;
  }
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
    this.firstRun = true;
    this.audio.stop();
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.drawBricks = function(){
  for (var i = 0; i < this.currentLevel.bricks.length; i++) {
    if(this.currentLevel.bricks[i].player){
      this.currentLevel.bricks[i].velx = (this.currentPlayer.x-this.currentLevel.bricks[i].x)*.4;
      if(this.currentLevel.bricks[i].paddleTime > 0) {
        this.currentLevel.bricks[i].w += (this.currentLevel.bricks[i].finalw - this.currentLevel.bricks[i].w)*.1;
        this.currentLevel.bricks[i].paddleTime--;
      } else {
        this.currentLevel.bricks[i].w -= (this.currentLevel.bricks[i].w - 65)*.1;
      }
      if(this.currentLevel.bricks[i].machineGunTime > 0) {
        if(this.currentLevel.bricks[i].machineGunTime%16 === 0) {
          var newProjectile1 = new Projectile(this.currentLevel.bricks[i].x,(this.currentLevel.bricks[i].y-this.currentLevel.bricks[i].h));
          this.currentLevel.projectiles.push(newProjectile1);
          this.currentLevel.bricks[i].playerFlashTimer = 2;
        } else if(this.currentLevel.bricks[i].machineGunTime%8 === 0) {
          var newProjectile2 = new Projectile((this.currentLevel.bricks[i].x+this.currentLevel.bricks[i].w),(this.currentLevel.bricks[i].y-this.currentLevel.bricks[i].h));
          this.currentLevel.projectiles.push(newProjectile2);
          this.currentLevel.bricks[i].playerFlashTimer = 2;
        }
        this.currentLevel.bricks[i].machineGunTime--;
      }
    } else {
      this.currentLevel.bricks[i].y = easeOutBack(this.currentLevel.bricks[i].timer,0,this.currentLevel.bricks[i].finalY,50);
    }
    this.currentLevel.bricks[i].y += this.currentLevel.bricks[i].vely+this.shakeXMod;
    this.currentLevel.bricks[i].x += this.currentLevel.bricks[i].velx+this.shakeXMod;
    if(i===0) {
      if(Math.round(this.currentLevel.bricks[1].y) === this.currentLevel.bricks[1].finalY) { // have to round because they get slightly off b/c of screen shake & bad js math.
        this.currentLevel.brickAndBallStart = true;
      }
      if (this.currentLevel.brickAndBallStart){
        if(this.currentLevel.bricks[i].playerFlashTimer > 0) {
          this.playerFlash(i);
        } else {
          this.c.strokeStyle = this.currentLevel.bricks[i].color;
          this.c.lineWidth = 2;
          this.c.strokeRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
        }
      }
    } else {
      this.c.strokeStyle = this.currentLevel.bricks[i].color;
      this.c.lineWidth = 2;
      this.c.strokeRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
    }
    if(this.currentLevel.bricks[i].type==="Durable" && this.currentLevel.bricks[i].life>1){
      this.c.strokeStyle = "rgba(0,0,0,.5)";
      this.c.lineWidth = 2;
      this.c.strokeRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
    }
    this.currentLevel.bricks[i].timer<50 ? this.currentLevel.bricks[i].timer++: false;
  }

};

Game.prototype.collide = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    for (var j = 0; j < this.currentLevel.bricks.length; j++) {
      if ( this.checkCollision(this.currentLevel.balls[i],this.currentLevel.bricks[j]) ) { //left and right of ball
        if ( (this.currentLevel.balls[i].y + this.currentLevel.balls[i].h > this.currentLevel.bricks[j].y) &&
          (this.currentLevel.balls[i].y < this.currentLevel.bricks[j].y + this.currentLevel.bricks[j].h) &&
          ((this.currentLevel.balls[i].x + this.currentLevel.balls[i].w > this.currentLevel.bricks[j].x) &&
          (this.currentLevel.balls[i].x > this.currentLevel.bricks[j].x ) || (this.currentLevel.balls[i].x + this.currentLevel.balls[i].w < this.currentLevel.bricks[j].x) &&
          (this.currentLevel.balls[i].x < this.currentLevel.bricks[j].x)) ) {

          this.currentLevel.balls[i].velx *= -(1.05);
          this.currentLevel.balls[i].vely += .05;//+0.5 increases the ball speed every time it hits something.
        } else {
          if(j===0) { // player brick
            this.currentLevel.balls[i].velx += this.currentLevel.bricks[j].velx*0.3;
          }
          this.currentLevel.balls[i].vely *= -(1.05);
          this.currentLevel.balls[i].velx += .05;//+0.5 increases the ball speed every time it hits something.
        }
        this.doCollide(i,j);
      }
    }
  }
  for(var i = 0; i < this.currentLevel.powerUp.length; i++){
    if(this.checkCollision(this.currentLevel.powerUp[i],this.currentLevel.bricks[0])){
      this.runPowerUpCollisions(i);
    }
  }
  for(var i = 0; i < this.currentLevel.projectiles.length; i++) {
    for(var j = 0; j < this.currentLevel.bricks.length; j++) {
      if(this.checkCollision(this.currentLevel.projectiles[i],this.currentLevel.bricks[j]) && this.currentLevel.bricks[j].type !== 'Steady') {
        this.currentLevel.bricks[j].life -= 0.2;
        if(this.currentLevel.bricks[j].life <= 0) {
          this.currentLevel.bricks.splice(j,1);
        }
        this.currentLevel.projectiles.splice(i,1);
        break;
      }
    }
  }
};

Game.prototype.doCollide = function(i,j){
  var decreaseLifeFlag = false;
  this.currentLevel.balls[i].flashTimer = 9;
  //TODO: fix screenshake
  if(this.shakeTimer===0 || this.shakeTimer===21 ||this.shakeTimer===undefined){
    this.shakeTimer = 0;
    this.shakeCounter = 0;
    this.screenShake();
  }
  if(this.currentLevel.bricks[j].type==="Player"){
    this.sounds.normalHit.play();
  }else if(this.currentLevel.bricks[j].type==="Inert"){
    decreaseLifeFlag = true;
    this.sounds.normalHit.play();
  }else if(this.currentLevel.bricks[j].type==="Durable"){
    decreaseLifeFlag = true;
    this.sounds.normalHit.play();
  }else if(this.currentLevel.bricks[j].type==="Speedy"){
    decreaseLifeFlag = true;
    this.sounds.powerUp.play();
    if(this.currentLevel.balls[i].velx<0) {
      this.currentLevel.balls[i].velx -= 3;
    } else {
      this.currentLevel.balls[i].velx += 3;
    }
    if(this.currentLevel.balls[i].vely<0) {
      this.currentLevel.balls[i].vely -= 3;
    } else {
      this.currentLevel.balls[i].vely += 3;
    }
  }else if (this.currentLevel.bricks[j].type==="Steady"){
    this.sounds.steady.play();
  }
  if(decreaseLifeFlag) {
    this.currentPlayer.score += this.currentLevel.bricks[j].score;
    this.currentLevel.bricks[j].life -= 1;
    if(this.currentLevel.bricks[j].powerUp.length>0) {
      //powerup array being created
      this.isTheMouseBeingPressed = false;
      var newPowerUp = new PowerUP(this.currentLevel.bricks[j].x+(this.currentLevel.bricks[j].w/3),this.currentLevel.bricks[j].y+(this.currentLevel.bricks[j].h/3),25,5,this.currentLevel.bricks[j].powerUp);
      this.currentLevel.powerUp.push(newPowerUp);
    }
    if(this.currentLevel.bricks[j].life <= 0) {
      this.currentLevel.bricks.splice(j,1);
    }
  }
}

Game.prototype.checkWinState = function(){
  if((this.currentLevel.bricks.length === this.currentLevel.winCriteria && this.currentPlayer.lives>0 && this.shakeTimer===21) || (this.skipLevelKeyPress && this.shakeTimer===21)){
    //skiplevel
    this.skipLevelKeyPress = false;
    this.level++;
    if(levelConstructs.length===1){
      this.firstRun = true;
      this.audio.stop();
      this.appState = STATE_WIN;
    }else{
      this.isTheMouseBeingPressed = false;
      this.firstRun = true;
      this.audio.stop();
      this.appState = STATE_LOADING_LEVEL;
    }
  }
}

Game.prototype.screenShake = function(){
  if(this.shakeTimer<21) {
    this.shakeTimer++;
    this.increaseShake = Math.PI * 6/20;
    this.shakeXMod = Math.sin(this.shakeCounter)*2;
    this.shakeCounter += this.increaseShake;
  }
}

Game.prototype.checkCollision = function(thing1,thing2) {
  if((((thing1.y+thing1.vely+this.shakeXMod) + thing1.h) > (thing2.y)) && ((thing1.y+thing1.vely+this.shakeXMod) < (thing2.y + thing2.h)) && (((thing1.x+thing1.velx+this.shakeXMod) + thing1.w) > thing2.x) && ((thing1.x+thing1.velx+this.shakeXMod) < (thing2.x + thing2.w))){
    return true;
  } else {
    return false;
  }
}

Game.prototype.runPowerUpCollisions = function(k) {
  if(this.currentLevel.powerUp[k].type === 'newBall') {
    this.currentLevel.makeBall(this.currentLevel.bricks[0].x+32,538);
  }
  if(this.currentLevel.powerUp[k].type === 'extraLife') {
    this.currentPlayer.lives++;
  }
  if(this.currentLevel.powerUp[k].type === 'slowDown') {
    for(var i = 0; i < this.currentLevel.balls.length; i++){
      console.log(this.currentLevel.balls[i].velx);
      if(this.currentLevel.balls[i].velx > 4 || this.currentLevel.balls[i].velx < -4) {
        if (this.currentLevel.balls[i].velx < 0){
          this.currentLevel.balls[i].velx += 2;
        } else {
          this.currentLevel.balls[i].velx -= 2;
        }
      }
      if(this.currentLevel.balls[i].vely > 4 || this.currentLevel.balls[i].vely < -4) {
        if (this.currentLevel.balls[i].vely < 0){
          this.currentLevel.balls[i].vely += 2;
        } else {
          this.currentLevel.balls[i].vely -= 2;
        }
      }
    }
  }
  if(this.currentLevel.powerUp[k].type === 'paddleWidth') {
    this.currentLevel.bricks[0].finalw = 120;
    this.currentLevel.bricks[0].paddleTime = 500;
  }
  if(this.currentLevel.powerUp[k].type === 'machineGun') {
    this.currentLevel.bricks[0].machineGunTime = 350;
  }
  this.currentLevel.powerUp.splice(k,1);
};

Game.prototype.testWalls = function(){
  for (var i = 0, max = this.currentLevel.balls.length; i < max; i = i + 1) {
    if(this.currentLevel.balls[i].y+this.currentLevel.balls[i].h>canvas.height){
      this.isTheMouseBeingPressed = false;
      this.currentLevel.balls.splice(i,1);
      if(this.currentLevel.balls.length === 0 && this.currentPlayer.lives > 1){
        this.currentPlayer.lives--;
        this.currentLevel.makeBall(this.currentLevel.bricks[0].x+32,538);
      } else {
        this.firstRun = true;
        this.audio.stop();
        this.appState = STATE_GAMEOVER;
      }
      break;
    }
  }
  if(this.currentPlayer.x+(this.currentLevel.bricks[0].w)>=canvas.width) {
    this.currentPlayer.x = canvas.width-(this.currentLevel.bricks[0].w);
  } else if(this.currentPlayer.x<=0) {
    this.currentPlayer.x = 0;
  }
};

Game.prototype.playerFlash = function (i){
  this.c.strokeStyle = 'white';
  this.c.lineWidth = 2;
  this.c.strokeRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
  this.currentLevel.bricks[i].playerFlashTimer--;
};

Game.prototype.ballFlash = function(i){
  //do animation here
  if(this.currentLevel.balls[i].flashTimer > 6 || this.currentLevel.balls[i].flashTimer < 4) {
    this.c.fillStyle = "white";
    this.c.beginPath();
    this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
    this.c.closePath();
    this.c.fill();
  }
  this.currentLevel.balls[i].flashTimer--;
}

//TODO: FIX THE Y SHAKE
Game.prototype.drawRenderBalls = function(){
  if(this.currentLevel.brickAndBallStart) {
    for (var i = 0; i < this.currentLevel.balls.length; i++) {
      if(!this.currentLevel.balls[i].launched) {
        this.currentLevel.balls[i].x = (this.currentLevel.bricks[0].x+((this.currentLevel.bricks[0].w/2)-(this.currentLevel.balls[i].w)/2))+this.shakeXMod;
        this.c.fillStyle = "blue";
        this.c.beginPath();
        this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2)+this.shakeXMod,this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2)+this.shakeXMod,this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
        this.c.closePath();
        this.c.fill();
      } else {
        this.currentLevel.balls[i].x += this.currentLevel.balls[i].velx+this.shakeXMod;
        this.currentLevel.balls[i].y += this.currentLevel.balls[i].vely+this.shakeXMod;
        this.c.fillStyle = "blue";
        this.c.beginPath();
        this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
        this.c.closePath();
        this.c.fill();
        if(this.currentLevel.balls[i].flashTimer > 0){
          this.ballFlash(i);
        }
      }
    }
  }
};

Game.prototype.updatePosition = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    if(this.isTheMouseBeingPressed) {
      this.currentLevel.balls[i].launched = true;
    }
    if(this.currentLevel.balls[i].launched === true) {
      if(this.currentLevel.balls[i].velx > 15){
        this.currentLevel.balls[i].velx = 15;
      } else if(this.currentLevel.balls[i].velx < -15){
        this.currentLevel.balls[i].velx = -15;
      } else if(this.currentLevel.balls[i].vely > 15){
        this.currentLevel.balls[i].vely = 15;
      } else if(this.currentLevel.balls[i].vely < -15){
        this.currentLevel.balls[i].vely = -15;
      }
    }
  }
  if(this.currentLevel.powerUp.length > 0){
    this.updatePowerUp();
    this.drawPowerUp();
  }
  if(this.currentLevel.projectiles.length > 0){
    this.updateProjectile();
    this.drawProjectiles();
  }
};

Game.prototype.updatePowerUp = function() {
  for(var i = 0; i < this.currentLevel.powerUp.length; i++){
    this.currentLevel.powerUp[i].nexty += this.currentLevel.powerUp[i].vely;
  }
}

Game.prototype.drawPowerUp = function(j){
  for(var i = 0; i < this.currentLevel.powerUp.length; i++){
    this.currentLevel.powerUp[i].y = this.currentLevel.powerUp[i].nexty;
    this.c.fillStyle = this.currentLevel.powerUp[i].color;
    this.c.fillRect(this.currentLevel.powerUp[i].x,this.currentLevel.powerUp[i].y,this.currentLevel.powerUp[i].w,this.currentLevel.powerUp[i].h);
  }
};

Game.prototype.updateProjectile = function(){
  for(var i = 0; i < this.currentLevel.projectiles.length; i++){
    this.currentLevel.projectiles[i].nexty += this.currentLevel.projectiles[i].vely;
  }
};

Game.prototype.drawProjectiles = function(){
  for(var i = 0; i < this.currentLevel.projectiles.length; i++){
    this.currentLevel.projectiles[i].y = this.currentLevel.projectiles[i].nexty;
    this.c.fillStyle = this.currentLevel.projectiles[i].color;
    this.c.fillRect(this.currentLevel.projectiles[i].x,this.currentLevel.projectiles[i].y,this.currentLevel.projectiles[i].w,this.currentLevel.projectiles[i].h);
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
