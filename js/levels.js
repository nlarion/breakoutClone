// create level object to hold brick and ball objects
var LevelConstruct = function(){
  return [
    [ ['Player',200,550,250,65,15,'black',0],
    ['Inert',50,0,50,100,25,'red',10],
    ['Inert',150,0,50,100,25,'blue',10],
    ['Inert',250,0,50,100,25,'red',10],
    ['Inert',350,0,50,100,25,'blue',10],
    ['Inert',450,0,50,100,25,'red',10],
    ['Inert',550,0,50,100,25,'blue',10],
    ['Durable',650,0,50,100,25,'red',10],
    ['Durable',50,0,75,100,25,'blue',10],
    ['Durable',150,0,75,100,25,'red',10],
    ['Durable',250,0,75,100,25,'blue',10],
    ['Durable',350,0,75,100,25,'red',10],
    ['Durable',450,0,75,100,25,'blue',10],
    ['Durable',550,0,75,100,25,'red',10],
    ['Durable',650,0,75,100,25,'blue',10],
    ['Durable',50,0,100,100,25,'red',10],
    ['Durable',150,0,100,100,25,'blue',10],
    ['Durable',250,0,100,100,25,'red',10],
    ['Durable',350,0,100,100,25,'blue',10],
    ['Durable',450,0,100,100,25,'red',10],
    ['Durable',550,0,100,100,25,'blue',10],
    ['Inert',650,0,100,100,25,'red',10],
    ['Inert',50,0,125,100,25,'blue',10],
    ['Inert',150,0,125,100,25,'red',10],
    ['Inert',250,0,125,100,25,'blue',10],
    ['Inert',350,0,125,100,25,'red',10],
    ['Inert',450,0,125,100,25,'blue',10],
    ['Inert',550,0,125,100,25,'red',10],
    ['Inert',650,0,125,100,25,'blue',10] ],

    [['Player',200,550,250,65,15,'red',0],
    ['Inert',50,0,100,100,25,'white',10],
    ['Inert',200,0,75,100,25,'black',10],
    ['Inert',200,0,100,100,25,'white',10],
    ['Inert',200,0,125,100,25,'black',10],
    ['Inert',350,0,50,100,25,'white',10],
    ['Inert',350,0,75,100,25,'black',10],
    ['Inert',350,0,100,100,25,'white',10],
    ['Inert',350,0,125,100,25,'black',10],
    ['Inert',350,0,150,100,25,'white',10],
    ['Inert',500,0,75,100,25,'black',10],
    ['Inert',500,0,100,100,25,'white',10],
    ['Inert',500,0,125,100,25,'black',10],
    ['Inert',650,0,100,100,25,'white',10],
    ['Inert',0,0,350,100,25,'black',10],
    ['Inert',100,0,350,100,25,'white',10],
    ['Inert',200,0,350,100,25,'black',10],
    ['Inert',500,0,350,100,25,'black',10],
    ['Inert',600,0,350,100,25,'white',10],
    ['Inert',700,0,350,100,25,'black',10],
    ['Inert',50,0,325,100,25,'black',10],
    ['Inert',150,0,325,100,25,'white',10],
    ['Inert',250,0,325,100,25,'black',10],
    ['Inert',450,0,325,100,25,'black',10],
    ['Inert',550,0,325,100,25,'white',10],
    ['Inert',650,0,325,100,25,'black',10],
   ] ];
}

var levelConstructs = new LevelConstruct();

var Level = function(currentLevel) {
  this.currentLevel = currentLevel;
  this.bricks = [];
  this.balls = [];
  this.getCurrentLevelprops();
  this.makeBall(394,538);
}

Level.prototype.makeBall = function(x,y){
  var ball = new Ball(x,y,12,12,5,-5,"white");
  ball.launched = false;
  this.balls.push(ball);
};

Level.prototype.getCurrentLevelprops = function() {
  for (var i = 0; i < levelConstructs[this.currentLevel-1].length; i++) {
    var pushtype = levelConstructs[this.currentLevel-1][i][0];
    var pushx = levelConstructs[this.currentLevel-1][i][1];
    var pushy = levelConstructs[this.currentLevel-1][i][2];
    var pushFinalY = levelConstructs[this.currentLevel-1][i][3];
    var width = levelConstructs[this.currentLevel-1][i][4];
    var height = levelConstructs[this.currentLevel-1][i][5];
    var pushcolor = levelConstructs[this.currentLevel-1][i][6];
    var pushScore = levelConstructs[this.currentLevel-1][i][7];
    var newBrick = new Brick(pushtype,pushx,pushy,pushFinalY,width,height,pushcolor,pushScore);
    //console.log(newBrick);
    if(pushtype === 'Player') {
      newBrick.player = true;
      newBrick.life = 1;
      newBrick.maxLife = 1;
    } else if (pushtype === 'Inert') {
      newBrick.life = 1;
      newBrick.maxLife = 1;
    } else if (pushtype === 'Durable') {
      newBrick.life = 2;
      newBrick.maxLife = 2;
    }
    this.bricks.push(newBrick);
  }
};
