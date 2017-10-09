
var background; // Background Image
var pc;         // The player obj
var platforms = [];   //Array holding all the platform obj.s
var startTime;

var clearPlatforms; // A boolean true when a platform is off the screen to the left

var vText;            // TEMP - TextPoint obj. showing the velocity
var timeText;
var speedText;

var music = new Audio("ChoazFantasy.mp3");
var soundButton;    //A path, clicking it toggles the music

var gameSpeed = 1;

function init() {

  initBackground();
  initHUD();
  initMusic();

  pc = new PC(400,50);

  platforms.push(new Platform(new Rectangle(300,275, 250,30), 1.5,0));
  for(var i=0; i<8; i++)
    newPlatform();

  startTime = Date.now();

}
function initBackground(){
  background = new Raster("background");
  background.position = view.center;
}
function initHUD() {
  vText = new PointText(10,25);
  timeText = new PointText(10,50);
  speedText = new PointText(10,75);


  soundButton = new Raster("soundOn");
  soundButton.position = new Point(950, 550);
  soundButton.box = new Path.Rectangle(925,525, 50,50);
}
function initMusic() {
  music.play();
  music.loop = true;

}

// The GAME LOOP
function onFrame(event) {
  pc.move();
  for (var i=0; i<platforms.length; i++)
    platforms[i].move();

  if(clearPlatforms) {
    if (platforms[0].offScreen) {
      platforms.shift();
      newPlatform();
    }
  }
  showInfo();   //Updates the vText
}
function showInfo() {
  vText.content = "V: " + pc.v;
  var timePassed =  Math.round((Date.now() - startTime)/1000);
  if(timePassed % 15 == 0) {
    gameSpeed = 1 + 0.1 * (timePassed / 15);
    console.log("SPEED UP "+gameSpeed);
  }
  if(timePassed > timeText.content)
    timeText.content = timePassed;
  speedText.content = "Speed: "+gameSpeed;
}

function newPlatform() {
  var lastPlat = platforms[platforms.length-1];
  var newOriginPoint;

  do {
    newOriginPoint = lastPlat.box.topRight+new Point(randomInt(-100,150), randomInt(-200,200));
  } while (newOriginPoint.y > 550 || newOriginPoint.y < 50);
  platforms.push(new Platform(new Rectangle(newOriginPoint, new Size(randomInt(100,350), 30)),1.5, randomInt(0,3)));
}
function randomInt(min, max) {
  return Math.floor(Math.random()*(max-min)+min);
}
function onKeyDown(event){
  switch (event.key) {
    case 'f':
      pc.nextC();
      break;
      case 'd':
        pc.prevC();
        break;
    default:
      ;
  }
}

function onKeyUp(event) {
  if(event.key = 'space')
    pc.peaked = true;
}

function onMouseDown(event) {
  if(soundButton.box.contains(event.point)) {
    if(music.paused) {
      music.play();
      soundButton.image = document.getElementById("soundOn");
    }
    else {
      music.pause();
      soundButton.image = document.getElementById("soundOff");
    }
  }
}

init();
