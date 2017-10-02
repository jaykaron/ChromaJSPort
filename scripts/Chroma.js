
var background; // Background Image
var pc;         // The player obj
var platforms = [];   //Array holding all the platform obj.s
var vText;            // TEMP - TextPoint obj. showing the velocity
var clearPlatforms; // A boolean true when a platform is off the screen to the right

var music = new Audio("ChoazFantasy.mp3");
var musicButton;    //A path, clicking it toggles the music

function init() {

  initBackground();
  initMusic();

  pc = new PC(400,50);

  platforms.push(new Platform(new Rectangle(300,275, 250,30), 1.5,0));
  for (var i=0; i<6; i++)
    platforms.push(new Platform(new Rectangle(300+250*i,275+Math.floor(Math.random()*100), 200,30), 1.5,0));
}
function initBackground(){
  var background = new Raster("background");
  background.position = view.center;
  vText = new PointText(10,25);

  var halfWidth = 250;
  backRect = new Path.Rectangle(500-halfWidth, 300-halfWidth, 2*halfWidth,2*halfWidth);
  // backRect.fillColor = {
  //       gradient: {
  //           stops: ['yellow', 'red', 'blue']
  //       },
  //       origin: view.center,
  //       destination: new Point(180,500)
  //     }
  backRect.rotate(45);
}
function initMusic() {
  music.play();
  music.loop = true;
  musicButton = new Path.Rectangle(950,550, 40,40);
  musicButton.fillColor= "black";   //TEMP - need icon
}

// The GAME LOOP
function onFrame(event) {

  pc.move();
  for (var i=0; i<platforms.length; i++)
    platforms[i].move();

  if(clearPlatforms) {
    if (platforms[0].offScreen) {
      platforms.shift();
    }
  }
  showInfo();   //Updates the vText
}
function showInfo() {
  vText.content = "V: " + pc.v;
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

function PC(x, y) {
    this.w = 35; this.h = 35;

    this.v = 0; this.a = 0.5;   // Velocity, Acceleration
    this.MAX_V = 25;

    this.c = 0;     // Color

    this.peaked = false;
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
        if(this.onPlatform && this.v >= 0) {
      		this.v -= 5;
      	}
      	else if (!this.peaked) {
      		this.v -= 1;
      	}
        if(this.v <- 15) {
      		this.peaked = true;
      	}
      }
      else if(!this.onPlatform) {
          this.v += this.a;
      }
      else if (this.v > 0) {
        this.v = 0;
      }
      if(this.v > 25)
        this.v = this.MAX_V;
    }
}

function Platform(rect, v, c) {
  this.move = function() {
    this.box.x -= v;
    if(this.box.topRight.x < 0) {
      clearPlatforms = true;
      this.offScreen = true;
    }

    var vector = new Point(-v, 0);
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

function onMouseDown(event) {
  if(musicButton.contains(event.point)) {
    if(music.paused)
      music.play();
    else
      music.pause();
  }
}

init();
