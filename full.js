
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

var gameOn = false;
var canRestart;
var backgroundLayer, mainLayer, hudLayer;
function init(){
  backgroundLayer = project.activeLayer;
  mainLayer = new Layer();
  hudLayer = new Layer();
  musicControlLayer = new Layer();
  mainLayer.activate();
  
  initBackground();
  initMusic();
  
  initWelcome();
}
function newGame() {
  mainLayer.removeChildren();
  
  level = 1;
  gameSpeed = initialGameSpeed;
  timePassed = 0;  

  pc = new PC(400,50);
  
  platforms = []
  platforms.push(new Platform(new Rectangle(300,275, 250,30), platformSpeed,0));
  for(var i=0; i<8; i++)
    newPlatform();

  gameOn = true;
  newHud();

  startTime = Date.now();

}
function initMusic() {
  musicControlLayer.activate();
    soundButton = new Raster("volumeMed");
    soundButton.position = new Point(950, 550);
    soundButton.box = new Path.Rectangle(925,525, 50,50);
  mainLayer.activate();
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
  for (var i=0; i<platforms.length; i++) {
    platforms[i].move();
  }

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
          newGame();
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

// ********** Start of BACKGROUND.js **********
var backCirc;

function initBackground() {
  backgroundLayer.activate();
    backCirc = new Path.Circle({
        center: view.center,
        radius: view.bounds.height * 0.45,
        opacity: 0.8
    });

    backCirc.fillColor = {
        gradient: {
    		stops: [new Color(1,1,0), new Color(1,1,1)],
            radial: true
        },
        origin: backCirc.position,
        destination: backCirc.bounds.rightCenter
    };
  mainLayer.activate();
}
function onFrameBackground(event){
  backCirc.fillColor.gradient.stops[0].color.hue+= 0.3;
}

// ********** End of BACKGROUND.js **********

function initWelcome() {
  platforms = []
  platforms.push(new Platform(new Rectangle(1000,275, 150,30), platformSpeed,0));
  for(var i=0; i<8; i++)
    newPlatform();
  gameSpeed = initialGameSpeed*2;
  
  hudLayer.activate();
    var title = new Raster("title");
    title.position = view.center;
    
    var spaceText = new PointText(view.center+new Point(0,95));
    spaceText.style = {
      fontFamily: 'Impact',
      fontWeight: 'bold',
      fontSize: 35,
      justification: 'center'
    };
    spaceText.content = "Press SPACE to start";
  mainLayer.activate();
}

// ********** Start of PC.js **********

function PC(x, y) {
    this.w = 35; this.h = 35;

    this.v = 0; this.a = 0.5;   // Velocity, fallingAcceleration
    this.MAX_V = 25;
    this.MIN_V = -12;

    this.c = 0;     // Color

    this.peaked = true;
    this.onPlatform = false;

    this.box = new Rectangle(x,y, this.w,this.h);
    this.path = new Path.Rectangle(this.box);
    this.path.fillColor = "red";
    this.path.strokeColor = "black";

    this.move = function() {

      this.updateV();

      this.shift(this.v);

      var currentPlatform = this.checkPlatforms();
      if(currentPlatform) {
        this.shift(-this.box.intersect(currentPlatform.box).height);
      }
    }

    this.shift = function(deltaY) {
      this.box.y += deltaY;
      var vector = new Point(0, deltaY);
      this.path.position += vector;
      if(this.box.topRight.y > 600) {
        gameOver();
      }
    }

    this.nextC = function() {
      /* Switches to the next color */
      this.c = (this.c + 1) % 3;
      this.updateC();
    }

    this.prevC = function() {
      /* Switches to the previous color */
      this.c = (this.c + 2) % 3;
      this.updateC();
    }
    this.updateC = function() {
      switch (this.c) {
        case 0:
          this.path.fillColor = "red";
          break;
        case 1:
          this.path.fillColor = "blue";
          break;
        case 2:
          this.path.fillColor = "green";
          break;
        default:
          this.path.fillColor = "red";
      }
    }

    this.checkPlatforms = function() {
      if(this.v < 0) {
        this.onPlatform = false;
        return null;
      }
      for (var i=0; i<platforms.length; i++) {
        if (platforms[i].c == this.c) {
          if(platforms[i].box.contains(this.box.bottomRight) || platforms[i].box.contains(this.box.bottomLeft)) {
            this.onPlatform = true;
            this.peaked = false;
            return platforms[i];
          }
        }
      }
      this.onPlatform = false;
      return null;
    }

    this.updateV = function() {
      if(Key.isDown('space') && !this.peaked) {
        if(this.onPlatform && this.v >= 0) {    //Landing or on a platform
      		this.v = -5;
      	}
      	else if (!this.peaked && this.v < 0) {
      		this.v -= 0.5;
      	}
        if(this.v < this.MIN_V || this.v > 0) {
      		this.peaked = true;
      	}
      }
      else if(!this.onPlatform) {
          this.v += this.a;
      }
      else if (this.v > 0) {
        this.v = 0;
      }
      if(this.v > this.MAX_V)
        this.v = this.MAX_V;
    }
}

// ********** End of PC.js **********

// ********** Start of Platform.js **********

function Platform(rect, v, c) {
  this.move = function() {
    this.box.x -= v * gameSpeed;
    if(this.box.topRight.x < 0) {
      clearPlatforms = true;
      this.offScreen = true;
    }

    var vector = new Point(-v*gameSpeed, 0);
    this.path.position += vector;
  }

  this.updateC = function() {
    switch (this.c) {
      case 0:
        this.path.fillColor = "red";
        break;
      case 1:
        this.path.fillColor = "blue";
        break;
      case 2:
        this.path.fillColor = "green";
        break;
      default:
        this.path.fillColor = "red";
    }
  }

  this.box = rect;
  this.path = new Path.Rectangle(this.box);
  this.path.strokeColor = "black";

  this.v = v; this.c = c;

  this.offScreen = false;

  this.updateC();
}

// ********** End of Platform.js **********

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

// ********** Start of INIT.js **********
// The code to run after the rest of the code is already loaded
init();

// ********** End of INIT.js **********
