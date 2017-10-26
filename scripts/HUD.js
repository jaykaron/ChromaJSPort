
// ********** Start of HUD.js **********
var timeText;
var showedTime = 0;
var speedText;
var textStyle = new Style({
  fontFamily: 'Impact',
  fontWeight: 'bold',
  justification: 'center'
});

var soundButton;    //A path, clicking it toggles the music

function newHud() {
  hudLayer.activate();
    hudLayer.removeChildren();
    var smallTextStyle = new Style({
      fontSize: 15,
      justification: "left",
      fontWeight: "normal"
    });
    timeText = new PointText(10,25);
    timeText.style = textStyle;
    timeText.style = smallTextStyle;
    speedText = new PointText(10,50);
    speedText.style = textStyle;
    speedText.style = smallTextStyle;
    
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
    gameOverText.style = textStyle;
    gameOverText.style.fontSize = 70;
    gameOverText.content = "GAME OVER";
    
    var restartText = new PointText(view.center+new Point(0,55));
    restartText.style = textStyle;
    restartText.style.fontSize = 35;
    restartText.content = "Press SPACE to restart";
  mainLayer.activate();
}

// ********** End of HUD.js **********
