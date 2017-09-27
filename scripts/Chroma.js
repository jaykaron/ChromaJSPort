
var canvasW, canvasH;
var background;

var w,h;
var x,y;

function init() {

  var canvas = document.getElementById('mainCanvas');
  canvasW = canvas.width; canvasH = canvas.height;
  var context = canvas.getContext('2d');

  /*var preCanvas = document.createElement('canvas');
  preCanvas.width = 1000;
  preCanvas.height = 600;
  var preContext = preCanvas.getContext("2d");*/

  loadImages();

  w = 100; h = 100;
  x = 400; y = 250;

  player = new Player(400,250);

  if (canvas.getContext) {
      setInterval(draw, 30, canvas, context);
  }
}

function loadImages() {
  background = new Image();
  background.src = "imgs/background.png";
}

function draw(canvas, context) {
  context.clearRect(0,0, canvasW,canvasH);
  context.beginPath();
  context.drawImage(background,0,0)
  context.rect(player.x,player.y, player.w,player.h);
  context.fill();
  player.x++; player.y++;
}

init();
