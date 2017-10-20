
// ********** Start of BACKGROUND.js **********

function initBackground2(){
  backRect.bringToFront();
  backCirc.bringToFront();
}
var backRect = new Path.Rectangle(0,0, 1000, 600);
backRect.fillColor = "white";

var backCirc = new Path.Circle({
    center: view.center,
    radius: view.bounds.height * 0.45
});

// Fill the path with a radial gradient color with three stops:
// yellow from 0% to 5%, mix between red from 5% to 20%,
// mix between red and black from 20% to 100%:
backCirc.fillColor = {
    gradient: {
		stops: [new Color(1,1,0, 0.8), new Color(1,1,1,0.8)],
        radial: true
    },
    origin: backCirc.position,
    destination: backCirc.bounds.rightCenter
};

function onFrameBackground(event){
  backCirc.fillColor.gradient.stops[0].color.hue+= 0.3;
}

// ********** End of BACKGROUND.js **********
