
// ********** Start of HUD.js **********

var vText;            // TEMP - TextPoint obj. showing the velocity
var timeText;
var showedTime = 0;
var speedText;
var gameOverText;

var soundButton;    //A path, clicking it toggles the music

function initHud() {
  vText = new PointText(10,25);
  timeText = new PointText(10,50);
  speedText = new PointText(10,75);
  gameOverText = new PointText(view.center);
  gameOverText.style = {
    fontFamily: 'Impact',
    fontWeight: 'bold',
    fontSize: 50,
    justification: 'center'
};



  soundButton = new Raster("volumeMed");
  soundButton.position = new Point(950, 550);
  soundButton.box = new Path.Rectangle(925,525, 50,50);
  
  updateHudNewLevel();
  updateHudNewSecond();
}

function updateHudNewFrame() {
  vText.content = "V: " + pc.v;
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
  gameOverText.content = "GAME OVER";
}

// ********** End of HUD.js **********
