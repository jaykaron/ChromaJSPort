
var background;
var pc;
var platforms = [];

function init() {

  var background = new Raster("background");
  background.position = view.center;

  pc = new PC(400,250);

  // pcPath = new Path.Rectangle(pc.box);
  // pcPath.fillColor = "red";

  platforms.push(new Platform(new Rectangle(300,400, 400,50), 1,0));
}

function onFrame(event) {
  //console.log(event.delta);
  pc.move();
  for (var i=0; i<platforms.length; i++)
    platforms[i].move();


}

function PC(x, y) {
    this.w = 35; this.h = 35;

    this.v = 0; this.a = 0.5;   // Velocity, Acceleration
    this.c = 0;     // Color

    this.jumping = false;
    this.onPlatform = false;

    this.box = new Rectangle(x,y, this.w,this.h);
    this.path = new Path.Rectangle(this.box);
    this.path.fillColor = "green";

    this.move = function() {
      /* Checks if PC intersects platform
     	 * if not move PC down
     	 * && statements make it so you can jump up from under platforms
     	 */

        this.checkPlatforms();

     	 	if(!this.onPlatform){
        		this.v += this.a;
            this.box.y += this.v;
     	 	}
        else {
          this.v = 0;
        }

        var vector = new Point(0, pc.v);
        this.path.position += vector;
    }

    this.increaseV = function () {
    /* First does a hop if on platform
     * Then slowly increases velocity, until a cap */
    	if(onPlatform==true){
    		v=v-9;
    	}
    	else if(jumping==true){
    		v=v-2;;
    	}
    	if(v<-19){
    		jumping =false;
    	}
    }

    this.nextC = function() {
      /* Switches to the next color */
      c = (c + 1) % 3;
    }

    this.prevC = function() {
      /* Switches to the previous color */
      c = (c + 2) % 3;
    }

    this.checkPlatforms = function() {
      //this.onPlatform = this.box.intersects(platforms[0].box);
      for (var i=0; i<platforms.length; i++)
        if(this.box.intersects(platforms[i].box)){
          this.onPlatform = true;
          return;
        }
      this.onPlatform = false;
    }
}

function Platform(rect, v, c) {
  this.box = rect;
  this.path = new Path.Rectangle(this.box);
  this.path.fillColor = "blue";

  this.v = v; this.c = c;

  this.move = function() {
    this.box.x -= v;
    var vector = new Point(-v, 0);
    this.path.position += vector;
  }
}

init();
