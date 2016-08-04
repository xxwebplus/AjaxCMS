function node(ra, w,h, x,y, vx,vy, depth) {
  this.x = x;
  this.y = y;
  this.velocity = new Victor(vx, vy);
  this.depth = depth;

  this.frame = function(cd) {
  	// Apply Movement
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    // Increase Velocity
    this.velocity.y += -0.005;
    
    // Depth
    
    
    // Draw Stuff
	copySizeArray(this.x|0,this.y|0, sa[30],cd);
  }
}


function drawFrame(ctx, frame) {
	if (play) {
		
		// Make new nodes
		canvas_size = ctx.canvas.width * ctx.canvas.height;

		if ( ((rand(canvas_size) - (canvas_size/10))) < 0) {
			nodes.push(new node(sa, img.width,img.height, rand(page_width),page_height, rand(4)-2,-3, rand(20)-10));
		}
		
		// Remove nodes outside of display
		nodes = nodes.filter(function(i){
		  return ( (i.y > 0) && ((i.x > 0) && (i.x < page_width- img.width)) )	
		});
		
		// Fade the Array
		cdFade(cd,1,255);
		//cdDiffuse(cd,100,10);
		
		// Draw Stuff on The Array
		for (n = 0; n < nodes.length; n++) {
		  nodes[n].frame(cd);
		}
		
		// Copy The Array to the Canvas
		ctx.putImageData(cd, 0, 0);
	}
}

function fillArray(r,g,b,a,destination) {
	for (i=0; i<destination.data.length; i += 4) {
		destination.data[i] = r;
		destination.data[i+1] = g;
		destination.data[i+2] = b;
		destination.data[i+3] = a;
	}
}

function copySizeArray(x,y, sa,destination) {
  var op,dp,line;

  var ow = Math.sqrt(sa.length/4) * 4;
  var dw = destination.width * 4;
  for (i=0; i < ow; i++) {
  	op = ow * i;
  	dp = (x * 4) + (y * dw) + (dw * i);
   	for (ii=0; ii<ow; ii+=4) {
   		if (sa[op+ii+3] == 0) { continue; } // Skip Empty Pixels
  		destination.data[dp+ii] = sa[op+ii];
  		destination.data[dp+ii+1] = sa[op+ii+1];
  		destination.data[dp+ii+2] = sa[op+ii+2];
  		destination.data[dp+ii+3] = sa[op+ii+3] / 2;
  	}
  }
}

function copyArrayTrans(x,y,origin,destination) {
  var op,dp,line;

  var ow = origin.width * 4;
  var dw = destination.width * 4;
  
  for (i=0; i < origin.height; i++) {
  	op = ow * i;
  	dp = (x * 4) + (y * dw) + (dw * i);
   	for (ii=0; ii<ow; ii+=4) {
   		if (origin.data[op+ii+3] == 0) { continue; } // Skip Empty Pixels
  		destination.data[dp+ii] = origin.data[op+ii];
  		destination.data[dp+ii+1] = origin.data[op+ii+1];
  		destination.data[dp+ii+2] = origin.data[op+ii+2];
  		destination.data[dp+ii+3] = origin.data[op+ii+3];
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
	
	canvas = document.getElementById('background');
	ctx = canvas.getContext("2d");
	page_width = window.innerWidth;
	page_height = window.innerHeight;
	ctx.canvas.width = page_width;
	ctx.canvas.height = page_height;
	ctx.strokeStyle = "black";
	ctx.fillStyle = "rgba(255,255,255,0.018)";
	cd = ctx.getImageData(0, 0, canvas.width, canvas.height);
	  
	  
	$('#background').after('<canvas id="c3" style="display:block;"></canvas>');
	img = new Image();
	play=false;
	img.onload = function(){
	    sa = makeSizeArray(img);
	    play=true;
	}
	img.src = 'images/bubble.png';
	
	// Animation Loop
	function draw() {
		requestAnimationFrame(draw);
		frame++;
		drawFrame(ctx, frame);
	}
	
	draw();
}