/**
 * PC.java
 *
 * Ari Karon 
 */
import java.awt.*;

public class PC {
	
	int x,y,h,w,c;
	int v,a; 						//for velocity positive is downwards
	Rectangle box;
	boolean onPlatform, jumping;

    public PC(int startX, int startY) {
    	
    	x=startX;
    	y=startY;
    	w=35;
    	h=35;
    	v=0;
    	a=1;
    	c=1;
    	
    	jumping=false;
    	onPlatform=false;
    	/* Box is on the lower quarter of PC */
    	box = new Rectangle(x,y+((3*h)/4),w,h/4);
    }
    
    public int getY(){
    	return y;
    }
    public int getX(){
    	return x;
    }    
    public int getW(){
    	return w;
    }
    public int getH(){
    	return h;
    }
    public int getC(){
    	return c;
    }
    public boolean getOnPlatform(){
    	return onPlatform;
    }
    public boolean getJumping(){
    	return jumping;
    }
    
    public void movePC(){
 	/* Checks if PC intersects platform
 	 * if not move PC down
 	 * && statements make it so you can jump up from under platforms
 	 */
 	 	if(onPlatform==false){
    		v=v+a;
    		y=y+v;
    		box.y=y+((3*h)/4);
    		onPlatform = false;
 	 	}	
    } 

    public void increaseV(){
    /* First does a hop if on platform
     * Then slowly increases velocity, until a cap */	
    	if(onPlatform==true){
    		v=v-9;	
    	}
    	else if(jumping==true){
    		v=v-2;;
    	}
    	if(v<-19){
    		setJumping(false);
    	}
    }
    
    public void checkPlatforms(Platform platformCurrent){
    /* Checks if PC intersects any platforms 
     * if yes land PC on platform */
    	if(box.intersects(platformCurrent.getBox())&&jumping==false&&v>=0&&platformCurrent.getC()==c){
    		v=0;
    		y=platformCurrent.getY()-h;
    		onPlatform = true;
    	}
    }
    
    public void setJumping(boolean tempJumping){
    	jumping=tempJumping;
    }
    public void setOnPlatform(boolean tempOnPlatform){
    	onPlatform=tempOnPlatform;
    }
    public void nextC(){
    /* Switches two next color */
    	switch(c){
    		case 1:
    			c=2;
    			break;
    		case 2:
    			c=3;
    			break;
    		case 3:
    			c=1;
    			break;
    	}
    }
    
    public void previousC(){
    /* Switches to previous color */
    	switch(c){
    		case 1:
    			c=3;
    			break;
    		case 2:
    			c=1;
    			break;
    		case 3:
    			c=2;
    			break;
    	}
    }
    
    
}