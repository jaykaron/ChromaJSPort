
// ********** Start of Chroma.js **********

var background; // Background Image
var pc;         // The player obj
var platforms;   //Array holding all the platform obj.s
var startTime;

var clearPlatforms; // A boolean true when a platform is off the screen to the left


var music = new Audio("ChoazFantasy.mp3");

var prevLevel;
var level;
var timeIncrement = 15; // Number of seconds between level
var initialGameSpeed = 1;
var gameSpeed;
var gameSpeedIncrement = 0.2; // How much the game speeds up each time
var platformSpeed = 1.7;

var timePassed;

var gameOn;
var canRestart;

function init() {

  //initBackground();
  initBackground2();
  initMusic();
  
  level = 1;
  gameSpeed = initialGameSpeed;
  timePassed = 0;

  pc = new PC(400,50);
  
  platforms = []
  platforms.push(new Platform(new Rectangle(300,275, 250,30), platformSpeed,0));
  for(var i=0; i<8; i++)
    newPlatform();

  gameOn = true;
  initHud();

  startTime = Date.now();  

}
function initBackground(){
  background = new Raster("background");
  background.position = view.center;
}
function initMusic() {
  music.play();
  music.loop = true;
  music.volume = 1;

}

// The GAME LOOP
function onFrame(event) {
  onFrameBackground();
  if(gameOn) {
    pc.move();
    updateTime();
  }
  for (var i=0; i<platforms.length; i++)
    platforms[i].move();

  if(clearPlatforms) {
    if (platforms[0].offScreen) {
      platforms.shift();
      newPlatform();
    }
  }
  
  updateHudNewFrame();
}
function updateTime() {
  timePassed =  Math.round((Date.now() - startTime)/1000);
  if(timePassed % timeIncrement == 0)
    if (level < 1 + timePassed / timeIncrement)
      nextLevel();
  if(timePassed > showedTime)
    updateHudNewSecond();
}
function nextLevel() {
  level++;
  gameSpeed = initialGameSpeed + gameSpeedIncrement * (level - 1);
  updateHudNewLevel();
}

function newPlatform() {
  var lastPlat = platforms[platforms.length-1];
  var newOriginPoint;

  do {
    newOriginPoint = lastPlat.box.topRight+new Point(randomInt(-100,150), randomInt(-200,200));
  } while (newOriginPoint.y > 550 || newOriginPoint.y < 50);
  platforms.push(new Platform(new Rectangle(newOriginPoint, new Size(randomInt(100,350), 30)),platformSpeed, randomInt(0,3)));
}

function randomInt(min, max) {
  return Math.floor(Math.random()*(max-min)+min);
}

function gameOver() {
  gameOn = false;
  gameOverHud();
}

function onKeyDown(event){
  switch (event.key) {
    case 'f':
      pc.nextC();
      break;
      case 'd':
        pc.prevC();
        break;
      case 'space':
        if(!gameOn)
          init();
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
    switch (music.volume) {
      case 0.5:
        music.volume = 1;
        soundButton.image = document.getElementById("volumeHigh")
        break;
      case 1:
        music.volume = 0;
        soundButton.image = document.getElementById("volumeOff")
        break;
      case 0:
        music.volume = 0.25;
        soundButton.image = document.getElementById("volumeLow")
        break;
      case 0.25:
        music.volume = 0.5;
        soundButton.image = document.getElementById("volumeMed")
        break;
      default:
        music.volume = 1;
        soundButton.image = document.getElementById("volumeHigh")
        break;
    }
  }
}

// ********** End of Chroma.js **********
