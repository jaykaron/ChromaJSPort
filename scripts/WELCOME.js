
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
    spaceText.style = textStyle;
    spaceText.style.fontSize = 35;
    spaceText.content = "Press SPACE to start";
    
    var controlsText = new PointText(view.center+new Point(0,130));
    controlsText.style = textStyle;
    controlsText.style.fontSize = 20;
    controlsText.content = "SPACE to jump.   F and D to switch colors.";
  mainLayer.activate();
}
