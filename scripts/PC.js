function PC(x, y) {
    this.x = x;  this.y = y;
    this.w = 35; this.h = 35;

    this.v = 0; this.a = 1;   // Velocity, Acceleration
    this.c = 0;     // Color

    this.jumping = false;
    this.onPlatform = true;

    this.bottomBox = new Rectangle(x,y+((3*h)/4),w,h/4);

    this.movePC = function() {
      /* Checks if PC intersects platform
     	 * if not move PC down
     	 * && statements make it so you can jump up from under platforms
     	 */
     	 	if(onPlatform==false){
        		v=v+a;
        		y=y+v;
        		bottomBox.y=y+((3*h)/4);
        		onPlatform = false;
     	 	}
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
}
