function node(x, y, vx, vy, h, s, l, a) {
  this.x = x;
  this.y = y;
  this.velocity = new Victor(vx, vy);
  this.hsl = [h, s, l];

  this.frame = function(cd) {
    // Number of iterations to draw per frame
    for (i = 0; i < velocity_per_frame; i++) {
      var rgb = hslToRgb(this.hsl[0], this.hsl[1], this.hsl[2]);
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      this.hsl[0] += 0.001;
      // Rotate the velocity using perlin noise.
      this.velocity.rotateDeg(perlin.get1d(frame / 100 + x + y) * 10);
      // Step through each pixel of node velocity
      for (l = 0; l < this.velocity.length(); l++) {
        var v1 = this.velocity.clone();
        v1.divide(Victor(this.velocity.length(), this.velocity.length()));
        var offsetX = v1.x;
        var offsetY = v1.y;
        // Apply Movement
        this.x += offsetX;
        this.y += offsetY;

        // Draw Node as Pixel
        setPixel(cd, this.x | 0, this.y | 0, r, g, b, a);
        // Draw Spray around pixel
        for (ii = 0; ii < 20; ii++) {
          var rr = rand(360);
          var xr = rand(2);
          var yr = rand(15);
          var xx = (Math.cos(Math.radians(rr)) * xr);
          var yy = (Math.sin(Math.radians(rr)) * yr);

          var rgb = hslToRgb(this.hsl[0] + (yr / 70), this.hsl[1], this.hsl[2]);
          var r = rgb[0];
          var g = rgb[1];
          var b = rgb[2];
          setPixel(cd, (this.x + xx) | 0, (this.y + yy) | 0, r, g, b, a);
        }
        // Detect collision with outside border and invert velocity.
        if (this.x > page_width) {
          this.x = page_width;
          this.velocity.invertX()
        }
        if (this.x < 0) {
          this.x = 0;
          this.velocity.invertX()
        }
        if (this.y > page_height) {
          this.y = page_height;
          this.velocity.invertY()
        }
        if (this.y < 0) {
          this.y = 0;
          this.velocity.invertY()
        }
      }
    }
  }
}

function drawFrame(ctx, frame) {
	// Draw Stuff on The Canvas
	for (n = 0; n < nodes.length; n++) {
	  nodes[n].frame(cd);
	}
	
	// Fade the canvas
	if (frame % 10 == 1){cdFade(cd,1)}
	
	// Copy The Canvas to the Screen
	ctx.putImageData(cd, 0, 0);
}

////////////////////////////////////////////////////////////////////
window.onload = function() {
  nodes = [];
  velocity_per_frame = 1;
  frame = 0;

  canvas = document.getElementById('background');
  ctx = canvas.getContext("2d");
  page_width = window.innerWidth;
  page_height = window.innerHeight;
  ctx.canvas.width = page_width;
  ctx.canvas.height = page_height;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(255,255,255,0.018)";
  cd = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Create Animation Nodes
  for (i = 0; i < 10; i++) {
    nodes.push(new node(rand(page_width), rand(page_height), rand(10) - 5, rand(10) - 5, rand(255) / 255, 1, 0.5, 255));
  }
  
  // Animation Loop
  function draw() {
  	requestAnimationFrame(draw);
	frame++;
	drawFrame(ctx, frame)
  }
  
  draw();
}