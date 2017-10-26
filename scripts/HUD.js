
// ********** Start of HUD.js **********
var timeText;
var showedTime = 0;
var speedText;

var largeTextStyle = new Style({
  fontFamily: 'Impact',
  fontWeight: 'bold',
  justification: 'center'
});
var smallTextStyle = new Style({
  justification: "left",
  fontWeight: "normal",
  fontFamily: "arial black"
});

var soundButton;    //A path, clicking it toggles the music

function newHud() {
  hudLayer.activate();
    hudLayer.removeChildren();
    
    timeText = new PointText(10,35);
    timeText.style = smallTextStyle;
    timeText.style.fontSize = 25;
    
    speedText = new PointText(10,60);
    speedText.style = smallTextStyle;
    speedText.style.fontSize = 15;
    
    updateHudNewLevel();
    updateHudNewSecond();
  mainLayer.activate();
}

function updateHudNewSecond() {
  showedTime = timePassed;
  updateTimeText();
}

function updateHudNewLevel() {
  speedText.content = gameSpeed.toPrecision(2) + " x";
}

function updateTimeText() {
  timeText.content = showedTime;
}

function gameOverHud() {
  hudLayer.activate();
    var gameOverText = new PointText(view.center);
    gameOverText.style = largeTextStyle;
    gameOverText.style.fontSize = 70;
    gameOverText.content = "GAME OVER";
    
    var restartText = new PointText(view.center+new Point(0,55));
    restartText.style = largeTextStyle;
    restartText.style.fontSize = 35;
    restartText.content = "Press SPACE to restart";
  mainLayer.activate();
}

// ********** End of HUD.js **********
