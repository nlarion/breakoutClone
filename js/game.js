//causes problems - not sure why.
// var collide = function(){
//   for (var i = 0, max = balls.length; i < max ; i = i + 1) {
//     for (var j = 0 , max2 = bricks.length; j < max2; j = j + 1) {

var collide = function(){
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < bricks.length; j++) {
      if ( ((balls[i].nexty + balls[i].h) > (bricks[j].y)) && ((balls[i].nexty) < (bricks[j].y + bricks[j].h)) && ((balls[i].nextx + balls[i].w) > bricks[j].x) && (balls[i].nextx < (bricks[j].x + bricks[j].w)) ) {
        //left of ball
        if ( (balls[i].y + balls[i].h > bricks[j].y) &&
          (balls[i].y < bricks[j].y + bricks[j].h) &&
          (balls[i].x + balls[i].w > bricks[j].x) &&
          (balls[i].x > bricks[j].x )) {
          balls[i].velx *= -1;
          //right of ball
        }else if ( (balls[i].y + balls[i].h > bricks[j].y) &&
          (balls[i].y < bricks[j].y + bricks[j].h) &&
          (balls[i].x + balls[i].w < bricks[j].x) &&
          (balls[i].x < bricks[j].x) ) {
          balls[i].velx *= -1;
        } else {
          balls[i].vely *= -1;
        }
        bricks[j].player ? false : bricks.splice(j,1);
      }
    }
  }
};

var testWalls = function(){
  for (var i = 0, max = balls.length; i < max; i = i + 1) {
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
};

var fps = {
  startTime : 0,
  frameNumber : 0,
  getFPS : function(){
    this.frameNumber++;
    var d = new Date().getTime(),
      currentTime = ( d - this.startTime ) / 1000,
      result = Math.floor( ( this.frameNumber / currentTime ) );

    if(currentTime > 1){
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    return result;
  }
};

// var initApp = function(){
//   game.introCount++;
//   fadeIn = game.introCount + 30;
//   colorModifier = fadeIn.toString(16);
//   game.c.fillStyle = '#0001' + colorModifier;
//   game.c.fillRect(0, 0, canvas.width, canvas.height);
//   //Box
//   game.c.strokeStyle = '#000000'; 
//   game.c.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
//   game.c.font = " "+ canvas.width / 10 + "px serif";
//   game.c.fillStyle = "#" + game.introCount + "";
//   game.c.fillText ("Breakout",canvas.width / 3, canvas.height / 2);
//   if (game.introCount == 150 || game.isTheMouseBeingPressed == true) {
//     game.appState = STATE_LOADING;
//   }
// }

// //event handeler for non jquery if we go that way
// function addEventHandler(oNode, evt, oFunc, bCaptures) {
//   if (document.addEventListener) {
//     // Safari, Chrome, Fx, etc
//     oNode.addEventListener(evt, oFunc, bCaptures);
//   } else if (document.attachEvent) {
//     // IE
//     oNode.attachEvent('on' + evt, oFunc);
//   } else {
//     // If all else fails
//     oNode['on' + evt] = oFunc;
//   }
// }