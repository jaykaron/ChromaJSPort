
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
    spaceText.style = {
      fontFamily: 'Impact',
      fontWeight: 'bold',
      fontSize: 35,
      justification: 'center'
    };
    spaceText.content = "Press SPACE to start";
  mainLayer.activate();
}
