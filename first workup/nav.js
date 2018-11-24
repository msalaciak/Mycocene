var about, documentation, team;
var linkX, linkY;
var animateA, fadeA, fadeIncr;
var erase, reset;

function preload() {
//add mycelium icons here
logo = loadImage('assets/logo.png');
iconA = loadImage('assets/bIcon.png');
info = loadImage('assets/info.png');
docu = loadImage('assets/docu.png');
team = loadImage('assets/team.png');
}

function setup(){
  //use id to get div height for canvas scrolling length
  canvasW = windowWidth*0.1;
  //create canvas at appropriate length for page
  // canvas = createCanvas(300, 200);
  canvas = createCanvas(canvasW, windowHeight);

  canvas.parent('canvasContainer');
  //basic canvas formatting
  canvas.style("z-index", "1000");
  canvas.position(0, 0);

  linkX = 20;
  linkY = windowHeight/6;

  about = createA('#', 'about');
  about.position(linkX, linkY);
  about.class("hLink");

  documentation = createA('#', 'documentation');
  documentation.position(linkX, linkY);
  documentation.class("hLink");

  team = createA('#', 'team');
  team.position(linkX, linkY*3);
  team.class("hLink");

  about.mouseOver(onAbout);
  about.mouseOut(offAbout);
  fadeA = 0;
  erase = 0.1;
  fadeIncr = 5;
  animateA=false;
  reset = false;

}

function draw(){

  image(logo, 20, 0, canvasW*0.8, canvasW*0.8);

  image(info, 20, linkY, canvasW*0.8, canvasW*0.8);
  about.position(linkX, linkY + 20);

  image(docu, 20, linkY*2, canvasW*0.8, canvasW*0.8);
  documentation.position(linkX, linkY*2 + 20);

  image(team, 20, linkY*3, canvasW*0.8, canvasW*0.8);
    team.position(linkX, linkY*3 + 20);


  if (animateA == true) {
    tint(255, fadeA);
    image(iconA, (linkX*2 - 30), (linkY-10), 50, 50);
    noTint();
    fadeA += fadeIncr;
  }


}

function windowResized(){
  //use id to get div height for canvas scrolling length
  canvasH = windowHeight / 8;
  //create canvas at appropriate length for page
  // canvas = createCanvas(300, 200);
  canvas = createCanvas(windowWidth, canvasH);
  //basic canvas formatting
  canvas.style("z-index", "1");
  canvas.position(0, 0);

}

//-------------Event Functions-------------

function onAbout() {
animateA = true;
reset = false;
}

function offAbout() {
fadeA = 0;
animateA = false;
reset = true;
}
