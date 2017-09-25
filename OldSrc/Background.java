/**
 * Background.java
 *
 *
 *  Ari Karon 
  */
import java.awt.*;

public class Background {
	
	int costume;
    
    public Background(int startCostume) {
    	costume=startCostume;
	}
	
	
	public int getCostume(){
    	return costume;
    }
    
    public void setCostume(int tempCostume){
    	costume=tempCostume;
    }
 
}   