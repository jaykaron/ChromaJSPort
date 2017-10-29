
function initWelcome() {
  platforms = []
  platforms.push(new Platform(new Rectangle(screenWidth+100,275, 150,30), platformSpeed,0));
  
  level = 8;                    // newPlatform needs a defined level number
  for(var i=0; i<8; i++)
    newPlatform();
  gameSpeed = initialGameSpeed*2;
  
  hudLayer.activate();
    var title = new Raster("title");
    title.position = view.center;
    
    var spaceText = new PointText(view.center+new Point(0,95));
    spaceText.style = largeTextStyle;
    spaceText.style.fontSize = 35;
    spaceText.content = "Press SPACE to start";
    
    var controlsText = new PointText(view.center+new Point(0,130));
    controlsText.style = largeTextStyle;
    controlsText.style.fontSize = 20;
    controlsText.content = "SPACE to jump.   F and D to switch colors.";
  mainLayer.activate();
}
