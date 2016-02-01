// create level object to hold brick and ball objects
function Level(currentLevel) {
  this.currentLevel = currentLevel;
  this.levelConstruct;
  this.bricks = [];
  this.balls = [];
  this.getCurrentLevelprops();

}

Level.prototype.getCurrentLevelprops = function() {
  //needs to be synchronous
  if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    xhr = new XMLHttpRequest();
  }
  xhr.open("GET", "0"+this.currentLevel+".xml", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //xhr.send("level=" + encodeURIComponent(level)); //this is for if you're doing php
  xhr.send(null); //send null to kick off responce.
  if (xhr.status == 200) {
    var xml = xhr.responseXML;
    var getballs = xml.documentElement.getElementsByTagName("brick");
    for (var i = 0; i < getballs.length; i++) {
      var pushtype = getballs[i].getAttribute("type");
      var pushx = getballs[i].getAttribute("x");
      var pushy = getballs[i].getAttribute("y");
      var width = getballs[i].getAttribute("width");
      var height = getballs[i].getAttribute("height");
      var pushcolor = getballs[i].getAttribute("color");
      var newBrick = new Brick(pushtype,pushx,pushy,width,height,pushcolor)
      if(pushtype === 'Player') {
        newBrick.player = true;
      }
      this.bricks.push(newBrick);
    }
  }
};
