/**
 * HUD.java
 *
 *
 * Ari Karon
 */
import java.awt.*;

public class HUD {
	
	long startTime, currentTime;
	int speedUp;						// Ensure that each platform can only speed up once every 25 secs.
	String speedWarning;
	
    public HUD() {
    	startTime = System.currentTimeMillis();
    	speedWarning="";
    	speedUp = 0;
    }
    
    public long getCurrentTime(){
    /* Gets the amount of time elasped since the game started and converts it to seconds */
    	return (System.currentTimeMillis() - startTime)/1000;
    }
    public String getSpeedWarning(){
    	return speedWarning;
    }
    
    public void checkSpeed(Platform platformCurrent){
		/* Time is divisble by 25, speeds up */
    	if(getCurrentTime()%25==0&&getCurrentTime()!=0&&speedUp<500){ // 500 is the number of platforms.
			platformCurrent.increaseV();
			speedUp++;
		}
		/* Sets speedUp back to 0 is time isn't divisble by 25 */
		else if((getCurrentTime()*500)%12500!=0){
			speedUp = 0;
		}
		if(getCurrentTime()%25==22){
			speedWarning = "Speeding Up in 3";
		}
		else if(getCurrentTime()%25==23){
			speedWarning = "Speeding Up in 2";
		}
		else if(getCurrentTime()%25==24){
			speedWarning = "Speeding Up in 1";
		}
		else{
			speedWarning = " ";
		}
    }
 

}