/**
 * Chroma.java
 *
 * Chroma Applet application
 *
 * Ari Karon
 * 
 * version 1.00
 * Coded the basic jumping system.
 * Platform moves and can be fallen off of.
 * 
 * version 2.01
 * Made platforms into an array.
 * Used intersect for movePC method. 
 * Made the program detect which platform the PC could be landing on.
 * Spawns any amount of platforms randomly.
 * Added double buffering.
 *
 * version 3.00
 * PC now checks all platforms.
 * Platforms can overlap.
 * PC hitbox is only the bottom quater of the PC.
 * 
 * version 4.00
 * Platforms are random colors.
 * PC can change colors.
 * PC falls through platforms that are not the same color as it.
 * 
 * version 5.00
 * Added a hud with a timer.
 * Platforms get 3 extra v every 25 units. 
 * REMEBER: Change speedUp number in checkSpeed if statement to the number of platforms.
 * Added a speedWarning 3 secs before the game speeds up.
 *
 * version 6.00
 * Added 3 background images. White, Orange Glow, and Title.
 * Added start button and title page.
 * Game stops when PC falls out of screen.
 * Game can restart after death.
 * Pressing space functions the same as clicking START or RETRY?.
 * Added instructions to title page.
 * Added legend. LOOKS BAD, DISTRACTING. COMMENT OUT
 * 	legendPic[]
 *			legendPic = new Image[3];
			legendPic[0]=getImage(getCodeBase(),"ColourR2.png");
			legendPic[1]=getImage(getCodeBase(),"ColourB2.png");
			legendPic[2]=getImage(getCodeBase(),"ColourG2.png");
 *	predrawGraphics.drawImage(legendPic[pc.getC()-1],800,301,200,75,this);
 * Added music. SLOWS DOWN GAME
 * 
 *
 *
 * CURRENT HIGH SCORE: >>> 135 <<< Ari Karon
 * Music: Chaoz Fanyasy by ParagonX9
 *  
 */
 
import java.awt.*;
import java.applet.*;
import java.awt.event.*;
import java.util.*;

public class Chroma extends Applet implements Runnable, KeyListener, ActionListener { 


	Platform[] platform;
	PC pc;
	HUD hud;
	Background background;
	
	Thread runner;
	int lastXPos,platformSpeed;				// LastXPos ensures that each succesive platform is in front of the previous.
	Random random;							// Generates random numbers for platform generation.
	Image predrawnImage, backgroundPic[];
	Graphics predrawGraphics;
	Button startButton;
	String gameState;						// Remembers the game state either "title," "game" or "gameOver".
	boolean suspended;						// Used to tell whether to resume the thread (after retrying) or start it (the first time).
	AudioClip music;

	
	public void init() {
	/* Initialize everything except PC, Platforms, HUD, and connected variables
	 * They are initialized in startGame() */
		addKeyListener(this);
		random = new Random();
		setFont(new Font("Franklin Gothic Heavy", Font.BOLD,25));
		/* Images, background and HUD */
		backgroundPic = new Image[3];
			backgroundPic[0]=getImage(getCodeBase(),"ChromaTitle2.png");
			backgroundPic[1]=getImage(getCodeBase(),"ChromaBackground.png");
			backgroundPic[2]=getImage(getCodeBase(),"White.png");
		background = new Background(0);
		/* Music */
		music = getAudioClip(getCodeBase(),"ChaozFantasy.mid");
		music.loop();
		/* For double buffering */
		predrawnImage = createImage(1000,600);
		predrawGraphics = predrawnImage.getGraphics();
		/* Button */
		setButton("START");
		/* gameState */
		gameState="title";
		suspended=false;
	}

	public void paint(Graphics g) {
	/* Checks if game is active or in title phase */
		requestFocus();
		if(gameState=="title"){
			predrawGraphics.fillRect(0,0,1000,600);
			predrawGraphics.drawImage(backgroundPic[background.getCostume()],0,0,1000,600,this);
		}
		else if(gameState=="game"||gameState=="gameOver"){
			predrawGraphics.setColor(Color.white);
			predrawGraphics.fillRect(0,0,1000,600);
			predrawGraphics.drawImage(backgroundPic[background.getCostume()],0,0,1000,600,this);
			/* Draws all platfroms, determines color, and draws black outline */
			for(int x=0;x<platform.length;x++){
				switch(platform[x].getC()){
					case 1:
						predrawGraphics.setColor(Color.red);
						break;
					case 2:
						predrawGraphics.setColor(Color.blue);
						break;
					case 3:
						predrawGraphics.setColor(Color.green);
						break;
				}
				predrawGraphics.fillRect(platform[x].getX(),platform[x].getY(),platform[x].getW(),platform[x].getH());
				predrawGraphics.setColor(Color.black);
				predrawGraphics.drawRect(platform[x].getX(),platform[x].getY(),platform[x].getW(),platform[x].getH());
			}
			/* Draw PC, check color */
			switch(pc.getC()){
				case 1:
					predrawGraphics.setColor(Color.red);
					break;
				case 2:
					predrawGraphics.setColor(Color.blue);
					break;
				case 3:
					predrawGraphics.setColor(Color.green);
					break;
			}
			predrawGraphics.fillRect(pc.getX(),pc.getY(),pc.getW(),pc.getH());
			predrawGraphics.setColor(Color.black);
			predrawGraphics.drawRect(pc.getX(),pc.getY(),pc.getW(),pc.getH());
			/* Draw HUD items 
			 * Time
			 * SpeedWarning
			 * GAME OVER screen */
			predrawGraphics.drawString(""+hud.getCurrentTime(),900,50);
			if(gameState=="game"){
				predrawGraphics.drawString(""+hud.getSpeedWarning(),400,200);	
			}
			if(gameState=="gameOver"){
				predrawGraphics.setFont(new Font("Franklin Gothic Heavy", Font.BOLD,50));
				predrawGraphics.drawString("GAME OVER",375,250);
				predrawGraphics.setFont(new Font("Franklin Gothic Heavy", Font.BOLD,15));
				predrawGraphics.drawString("(Press Space)",472,425);
				predrawGraphics.setFont(new Font("Franklin Gothic Heavy", Font.BOLD,25));
			}
					
		}	
		/* Draw */
		g.drawImage(predrawnImage,0,0,1000,600,this);
	}
	
	public void startGame(){
	/* Initialize items, change background, start thread */
		/* Platform array 
		 * lastXPos is so they constantly are ahead of PC */		
		lastXPos = 100+300;
		platformSpeed = 6;
		platform = new Platform[500];
			platform[0] = new Platform(100,400,400,25,platformSpeed,1);	
			for(int x=1;x<platform.length;x++){
				platform[x] = new Platform(random.nextInt(200)+lastXPos-90,random.nextInt(350)+180,random.nextInt(100)+120,25,platformSpeed,random.nextInt(3)+1);
				lastXPos = platform[x].getX()+platform[x].getW();
			}
		/* PC */
		pc = new PC(130,200);
		/* HUD */
		hud = new HUD();
		background.setCostume(1);
		gameState="game";

		/* Checks whether to start or resume thread. */
		if(!suspended){
			runner.start();
		}
		else{
			runner.resume();
		}
	}
	
	public void start(){
		if(runner==null){
			runner = new Thread(this);
		}		
	}
	
	public void run(){
	/* Doesn't start until button is pressed */
		while(true){
			/* Checks is PC is jumping */
			if(pc.getJumping()==true)
				pc.increaseV();
			/* See if PC is on a platform 
			 * If it is lands PC on platform */
			pc.setOnPlatform(false);
			for(int x=0;x<platform.length;x++){
				pc.checkPlatforms(platform[x]);
			}
			/* Moves PC down if not on platform */
			pc.movePC();
			/* Moves all platforms */
			for(int x=0;x<platform.length;x++){
				platform[x].movePlatform();
			}
			/* Speeds up platforms */
			for(int x=0;x<platform.length;x++){
				hud.checkSpeed(platform[x]);
			}
			/* Checks to see if PC has fallen */
			if(pc.getY()>680){
				gameOver();
			}			
			/* Slows down game */
			try {Thread.sleep(30);}
			catch (InterruptedException e){}
			/* Repaint */
			repaint();				
		}
	}
	
	public void gameOver(){
	/* Player has lost. Thread is suspended */
		suspended=true;	
		gameState="gameOver";
		setButton("RETRY?");
		runner.suspend();
		
	}
	
	public void setButton(String buttonText){
	/* Places the button on the screen
	 * can receive START or RETRY? */
		startButton = new Button(""+buttonText);
		startButton.addActionListener(this);
		setLayout(null);
		startButton.setBounds(470,350,110,50);
		add(startButton);
	}

	public void stop(){
		if(runner!=null){
			runner.stop();
			runner = null;
		}
	}
	
	public void update(Graphics g){
		paint(g);
	}
	
	public void keyPressed(KeyEvent e){
	/* Checks key then acts */
		switch(e.getKeyCode()){
			/* Space. Make PC jump */
			case 32:
				if(gameState=="game"){
					if(pc.getOnPlatform()==true){
						pc.setJumping(true);	
					}	
				}
				else if(gameState=="title" || gameState=="gameOver"){
					remove(startButton);
					startGame();
				}
				break;
			/* Right arrow. Next color */	
			case 39:
				pc.nextC();
				break;
			/* Left arrow. Previous color */
			case 37:
				pc.previousC();
				break;
		}	
	}		
	
	public void keyReleased(KeyEvent e){
		pc.setJumping(false);
		
	}
	
	public void keyTyped(KeyEvent e){
	}
	
	public void actionPerformed(ActionEvent e){
	/* Removes the button and calls the start method
	 * Both START and RETRY? are the same button. */
		remove(startButton);
		startGame();
		
	}
}