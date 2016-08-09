function node(x,y, vx,vy, size, depth) {
  this.x = x;
  this.y = y;
  this.velocity = new Victor(vx, vy);
  this.depth = depth;
  this.size = size;

  this.frame = function(cd) {
  	// Apply Movement
    this.x += (this.velocity.x / this.depth);
    this.y += (this.velocity.y / this.depth);
    
    // Increase Velocity
    this.velocity.y += -0.05;
    
    
    
    // Draw Stuff
    ctx.drawImage(image2, this.x|0,this.y|0, (150 / this.depth), (150 / this.depth));
  }
}


function drawFrame(ctx, frame) {
	if (play) {
		// Make new nodes
		if ( rand(10)|0 == 1 ) {
			nodes.push(new node(rand(page_width),page_height, rand(10)-5,-9, 100,rand(50)));
		}
		
		// Remove nodes outside of display
		nodes = nodes.filter(function(i){
		  return ( (i.y > 0) && ((i.x > 0) && (i.x < page_width- img.width)) )	
		});
		
		// Clear the frame.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw Stuff on The Array
		for (n = 0; n < nodes.length; n++) {
		  nodes[n].frame(cd);
		}
	}
}

function makeSizeArray(img) {
	var sa = [];
	var canvas3 = document.getElementById('c3');
	canvas3.width = img.width;
	canvas3.height = img.height;
	
	var ctx3 = canvas3.getContext("2d");
	for (i=0;i<100;i++) {
		ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
		ctx3.save()
		ctx3.scale(i/100,i/100);
		ctx3.drawImage(img, 0, 0, img.width, img.height);
		sa[i] = ctx3.getImageData(0, 0, i+1, i+1).data.slice();
		ctx3.restore();
	}
	return sa
}

////////////////////////////////////////////////////////////////////
window.onload = function() {
	nodes = [];
	velocity_per_frame = 1;
	frame = 0;
	play=false;
	
	
	// Set up the background canvas
	canvas = document.getElementById('background');
	ctx = canvas.getContext("2d");
	page_width = window.innerWidth;
	page_height = window.innerHeight;
	ctx.canvas.width = page_width;
	ctx.canvas.height = page_height;
	ctx.strokeStyle = "black";
	ctx.fillStyle = "rgba(255,255,255,0.018)";
	cd = ctx.getImageData(0, 0, canvas.width, canvas.height);
	canvas_size = ctx.canvas.width * ctx.canvas.height;
	  
	  
	// Load image put on new canvas, manipulate, and save as a new image.
	img = new Image();
	img.onload = function(){
	    ctx.drawImage(img, 100, 100,150,150);
	    play=true;
	   	
	    // Make the canvas for the image
	    canvas2 = document.createElement('canvas');
		canvas2.width = img.width;
		canvas2.height = img.height;
		ctx2 = canvas2.getContext("2d");
		ctx2.drawImage(img, 0, 0,150,150);

		// Manipulate the image
		cd2 = ctx2.getImageData(0, 0, 150, 150);
			cdFade(cd2,1,100);
			for (i=0; i<10; i++){cdDiffuse(cd2,1,3)}
			//StackBlur.imageDataRGB(cd2, 0, 0, canvas2.width, canvas2.height, 15);
		ctx2.putImageData(cd2,0,0);
		
		// Draw on screen (debug)
		//ctx.putImageData(cd2,600,600);
		
		// Save the manipulated image as a new image.
		image2 = new Image();
		image2.src = canvas2.toDataURL();

	}
	img.src = 'images/bubble2.png';
	
	
	
	
	// Animation Loop
	function draw() {
		requestAnimationFrame(draw);
		frame++;
		drawFrame(ctx, frame);
	}
	
	draw();
}