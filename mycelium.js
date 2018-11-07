// this number might need to be smaller for some computers
var particleCount = 2000;

var field;

function setup() {
  createCanvas(1024, 700);
  
  Particle[] particles = new Particle[particleCount];

  // create an array that stores the position of our particles
  field = new var[width * height];

  // add seed in the center
  var fcenterX = width / 2;
  var fcenterY = height / 2;
  field[fcenterX + fcenterY * width] = true;

  // make particles
  for(var i=0; i<particleCount; i++) {
    particles[i] = new Particle();
  }
}


function draw() {
  background(0);
  loadPixels();
  for(var i=0; i<particleCount; i++) {
    particles[i].update();
    if (particles[i].stuck) {
      pixels[particles[i].y * width + particles[i].x] = color(255);
    }
  }
  updatePixels();
}



// ---------------
// Particle.pde
// ---------------
class Particle
{
  var x, y;
  var stuck = false;

  Particle() {
    reset();
  }

  function reset() {
    // keep choosing random spots until an empty one is found
    do {
      x = floor(random(width));
      y = floor(random(height));
    } while (field[y * width + x]);
  }

  function update() {
    // move around
    if (!stuck) {
      x += round(random(-1, 1));
      y += round(random(-1, 1));

      if (x < 0 || y < 0 || x >= width || y >= height) {
         reset();
         return;
      }

      // test if something is next to us
      if (!alone()) {
        stuck = true;
        field[y * width + x] = true;
      }
    }
  }

  // returns true if no neighboring pixels
  var alone() {
    var cx = x;
    var cy = y;

    // get positions
    var lx = cx-1;
    var rx = cx+1;
    var ty = cy-1;
    var by = cy+1;

    if (cx <= 0 || cx >= width ||
  lx <= 0 || lx >= width ||
  rx <= 0 || rx >= width ||
  cy <= 0 || cy >= height ||
  ty <= 0 || ty >= height ||
  by <= 0 || by >= height) return true;

    // pre multiply the ys
    cy *= width;
    by *= width;
    ty *= width;

    // N, W, E, S
    if (field[cx + ty] ||
        field[lx + cy] ||
        field[rx + cy] ||
        field[cx + by]) return false;

    // NW, NE, SW, SE

    if (field[lx + ty] ||
        field[lx + by] ||
        field[rx + ty] ||
        field[rx + by]) return false;


    return true;
  }
}
