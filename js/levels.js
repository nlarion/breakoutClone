// create level object to hold brick and ball objects
function Level(currentLevel) {
  this.currentLevel = currentLevel;
  this.levelConstructs = [
    [['Player',200,250,40,15,'red',0],
    ['Inert',5,0,30,15,'red',10],
    ['Inert',55,0,30,15,'red',10],
    ['Inert',105,0,30,15,'red',10],
    ['Inert',155,0,30,15,'red',10],
    ['Inert',205,0,30,15,'red',10],
    ['Inert',255,0,30,15,'red',10],
    ['Inert',305,0,30,15,'red',10],
    ['Inert',355,0,30,15,'red',10]],
    [],[]];
  this.bricks = [];
  this.balls = [];
  this.getCurrentLevelprops();
  this.makeBall();
}

Level.prototype.makeBall = function(){
  var ball = new Ball(200,75,10,10,3,3,"white");
  ball.launched = true;
  this.balls.push(ball);
};

Level.prototype.getCurrentLevelprops = function() {
  for (var i = 0; i < this.levelConstructs[this.currentLevel-1].length; i++) {
    var pushtype = this.levelConstructs[this.currentLevel-1][i][0];
    var pushx = this.levelConstructs[this.currentLevel-1][i][1];
    var pushy = this.levelConstructs[this.currentLevel-1][i][2];
    var width = this.levelConstructs[this.currentLevel-1][i][3];
    var height = this.levelConstructs[this.currentLevel-1][i][4];
    var pushcolor = this.levelConstructs[this.currentLevel-1][i][5];
    var pushScore = this.levelConstructs[this.currentLevel-1][i][6];
    var newBrick = new Brick(pushtype,pushx,pushy,width,height,pushcolor,pushScore)
    if(pushtype === 'Player') {
      newBrick.player = true;
    }
    this.bricks.push(newBrick);
  }
};
