/**
 * Platform.java
 *
 * Ari Karon 
 */
import java.awt.*;

public class Platform {
	
	int x,y,w,h,v,c;
	Rectangle box;

    public Platform(int startX,int startY,int startW,int startH,int startV,int startC) {
    	x=startX;
    	y=startY;
    	w=startW;
    	h=startH;
    	v=startV;
    	c=startC;
    	
    	box = new Rectangle(x,y,w,h);

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
    public int getV(){
    	return v;
    }
    public int getC(){
    	return c;
    }
    
    public Rectangle getBox(){
    	return box;
    }
    
    public void movePlatform(){
    	x=x-v;
    	box.x=x;
    }
    
    public void setV(int tempV){
    	v=tempV;
    }
    
    public void increaseV(){
    	v=v+2;
    }
}