// create level object to hold brick and ball objects
var LevelConstruct = function(){
  return [
    [ ['Player',200,550,250,65,15,'red',0],
    ['Speedy',50,0,50,100,25,'black',10],
    ['Speedy',150,0,50,100,25,'white',10],
    ['Speedy',250,0,50,100,25,'black',10],
    ['Speedy',350,0,50,100,25,'white',10],
    ['Speedy',450,0,50,100,25,'black',10],
    ['Speedy',550,0,50,100,25,'white',10],
    ['Speedy',650,0,50,100,25,'black',10],
    ['Speedy',50,0,75,100,25,'white',10],
    ['Speedy',150,0,75,100,25,'black',10],
    ['Speedy',250,0,75,100,25,'white',10],
    ['Speedy',350,0,75,100,25,'black',10],
    ['Speedy',450,0,75,100,25,'white',10],
    ['Speedy',550,0,75,100,25,'black',10],
    ['Speedy',650,0,75,100,25,'white',10],
    ['Speedy',50,0,100,100,25,'black',10],
    ['Speedy',150,0,100,100,25,'white',10],
    ['Speedy',250,0,100,100,25,'black',10],
    ['Speedy',350,0,100,100,25,'white',10],
    ['Speedy',450,0,100,100,25,'black',10],
    ['Speedy',550,0,100,100,25,'white',10],
    ['Speedy',650,0,100,100,25,'black',10],
    ['Speedy',50,0,125,100,25,'white',10],
    ['Speedy',150,0,125,100,25,'black',10],
    ['Speedy',250,0,125,100,25,'white',10],
    ['Speedy',350,0,125,100,25,'black',10],
    ['Speedy',450,0,125,100,25,'white',10],
    ['Speedy',550,0,125,100,25,'black',10],
    ['Speedy',650,0,125,100,25,'white',10] ],

    [['Player',200,550,250,65,15,'red',0],
    ['Durable',50,0,100,100,25,'red',10],
    ['Inert',200,0,75,100,25,'black',10],
    ['Durable',200,0,100,100,25,'red',10],
    ['Inert',200,0,125,100,25,'black',10],
    ['Durable',350,0,50,100,25,'red',10],
    ['Inert',350,0,75,100,25,'black',10],
    ['Durable',350,0,100,100,25,'red',10],
    ['Inert',350,0,125,100,25,'black',10],
    ['Durable',350,0,150,100,25,'red',10],
    ['Inert',500,0,75,100,25,'black',10],
    ['Durable',500,0,100,100,25,'red',10],
    ['Inert',500,0,125,100,25,'black',10],
    ['Durable',650,0,100,100,25,'red',10],
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
    ['Inert',650,0,325,100,25,'black',10],],

    [ ['Player',200,550,250,65,15,'red',0],
    ['Inert',50,0,50,100,25,'black',10],
    ['Inert',150,0,50,100,25,'white',10],
    ['Inert',250,0,50,100,25,'black',10],
    ['Inert',350,0,50,100,25,'white',10],
    ['Inert',450,0,50,100,25,'black',10],
    ['Inert',550,0,50,100,25,'white',10],
    ['Inert',650,0,50,100,25,'black',10],
    ['Inert',50,0,75,100,25,'white',10],
    ['Inert',150,0,75,100,25,'black',10],
    ['Inert',250,0,75,100,25,'white',10],
    ['Inert',350,0,75,100,25,'black',10],
    ['Inert',450,0,75,100,25,'white',10],
    ['Inert',550,0,75,100,25,'black',10],
    ['Inert',650,0,75,100,25,'white',10],
    ['Inert',50,0,100,100,25,'black',10],
    ['Inert',150,0,100,100,25,'white',10],
    ['Inert',250,0,100,100,25,'black',10],
    ['Inert',350,0,100,100,25,'white',10],
    ['Inert',450,0,100,100,25,'black',10],
    ['Inert',550,0,100,100,25,'white',10],
    ['Inert',650,0,100,100,25,'black',10],
    ['Inert',50,0,125,100,25,'blue',10],
    ['Speedy',150,0,125,100,25,'blue',10],
    ['Speedy',250,0,125,100,25,'blue',10],
    ['Speedy',450,0,125,100,25,'blue',10],
    ['Speedy',550,0,125,100,25,'blue',10],
    ['Speedy',650,0,125,100,25,'blue',10],
    ['Speedy',350,0,125,100,25,'blue',10],],

    [['Player',200,550,250,65,15,'red',0],
    ['Durable',150,0,460,100,25,'red',10],
    ['Durable',250,0,460,100,25,'red',10],
    ['Durable',350,0,460,100,25,'red',10],
    ['Durable',450,0,460,100,25,'red',10],
    ['Durable',550,0,460,100,25,'red',10],
    ['Durable',150,0,435,100,25,'red',10],
    ['Durable',250,0,435,100,25,'red',10],
    ['Durable',350,0,435,100,25,'red',10],
    ['Durable',450,0,435,100,25,'red',10],
    ['Durable',550,0,435,100,25,'red',10],
    ['Durable',150,0,410,100,25,'red',10],
    ['Durable',150,0,385,100,25,'red',10],
    ['Durable',150,0,360,100,25,'red',10],
    ['Durable',150,0,335,100,25,'red',10],
    ['Durable',150,0,310,100,25,'red',10],
    ['Durable',150,0,285,100,25,'red',10],
    ['Durable',150,0,260,100,25,'red',10],
    ['Durable',150,0,235,100,25,'red',10],
    ['Durable',150,0,210,100,25,'red',10],
    ['Durable',150,0,185,100,25,'red',10],
    ['Durable',175,0,160,100,25,'red',10],
    ['Durable',200,0,135,100,25,'red',10],
    ['Durable',200,0,110,100,25,'red',10],
    ['Durable',175,0,85,100,25,'red',10],
    ['Durable',550,0,410,100,25,'red',10],
    ['Durable',550,0,385,100,25,'red',10],
    ['Durable',550,0,360,100,25,'red',10],
    ['Durable',550,0,335,100,25,'red',10],
    ['Durable',550,0,310,100,25,'red',10],
    ['Durable',550,0,285,100,25,'red',10],
    ['Durable',550,0,260,100,25,'red',10],
    ['Durable',550,0,235,100,25,'red',10],
    ['Durable',550,0,210,100,25,'red',10],
    ['Durable',550,0,185,100,25,'red',10],
    ['Durable',525,0,160,100,25,'red',10],
    ['Durable',500,0,135,100,25,'red',10],
    ['Durable',500,0,110,100,25,'red',10],
    ['Durable',525,0,85,100,25,'red',10],]
  ];
}

var levelConstructs = new LevelConstruct();

var Level = function(currentLevel) {
  this.currentLevel = currentLevel;
  this.bricks = [];
  this.balls = [];
  this.winCriteria = 0;
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
      this.winCriteria++;
    } else if (pushtype === 'Inert' || pushtype === "Speedy") {
      newBrick.life = 1;
    } else if (pushtype === 'Durable') {
      newBrick.life = 2;
    } else if (pushtype === 'Steady') {
      this.winCriteria++;
      newBrick.life = 1;
    }
    this.bricks.push(newBrick);
  }
};
