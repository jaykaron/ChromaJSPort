
// ********** Start of HUD.js **********
var timeText;
var showedTime = 0;
var speedText;

var countDown;
var speedingUpText;

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

function newHud() {
  hudLayer.activate();
    hudLayer.removeChildren();
    
    timeText = new PointText(10,35);
    timeText.style = smallTextStyle;
    timeText.style.fontSize = 25;
    
    speedText = new PointText(10,60);
    speedText.style = smallTextStyle;
    speedText.style.fontSize = 15;
    
    //countDown = new PointText(220, screenHeight - 20);
    countDown = new PointText(view.center);
    countDown.style = largeTextStyle;
    countDown.style.fontSize = 90;
    
    speedingUpText = new PointText(20, screenHeight - 30);
    speedingUpText.style = smallTextStyle;
    speedingUpText.style.fontSize = 20;
    
    updateHudNewLevel();
    updateHudNewSecond();
  mainLayer.activate();
}

function updateHud(){
  if(timePassed > showedTime)
    updateHudNewSecond();
  if(countDown.opacity < 1)
    countDown.opacity+=0.05;
  if(countDown.content)
    countDown.style.fontSize-= 1;
}

function updateHudNewSecond() {
  if(timeIncrement - timePassed%timeIncrement <= 3) {
    countDown.content = timeIncrement - timePassed%timeIncrement;
    countDown.opacity = 0;
    countDown.style.fontSize = 150;
    //speedingUpText.content = "Speeding up in";
  }
  else {
    countDown.content = "";
    speedingUpText.content = "";
  }
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
    
    countDown.content = "";
    speedingUpText.content = "";
  mainLayer.activate();
}

// ********** End of HUD.js **********
