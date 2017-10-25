
// ********** Start of HUD.js **********
var timeText;
var showedTime = 0;
var speedText;

var soundButton;    //A path, clicking it toggles the music

function newHud() {
  hudLayer.activate();
    hudLayer.removeChildren();
    timeText = new PointText(10,25);
    speedText = new PointText(10,50);
    
    updateHudNewLevel();
    updateHudNewSecond();
  mainLayer.activate();
}

function updateHudNewFrame() {
  //vText.content = "V: " + pc.v;
}

function updateHudNewSecond() {
  showedTime = timePassed;
  updateTimeText();
}

function updateHudNewLevel() {
  speedText.content = "Speed: "+gameSpeed;
}

function updateTimeText() {
  timeText.content = "Time: " + showedTime;
}

function gameOverHud() {
  hudLayer.activate();
    var gameOverText = new PointText(view.center);
    gameOverText.style = {
      fontFamily: 'Impact',
      fontWeight: 'bold',
      fontSize: 75,
      justification: 'center'
    };
    gameOverText.content = "GAME OVER";
    
    var restartText = new PointText(view.center+new Point(0,55));
    restartText.style = {
      fontFamily: 'Impact',
      fontWeight: 'bold',
      fontSize: 35,
      justification: 'center'
    };
    restartText.content = "Press SPACE to restart";
  mainLayer.activate();
}

// ********** End of HUD.js **********
