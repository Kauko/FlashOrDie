
Crafty.c("Flashlight", {

	ready: true,

    init: function(){
        this.requires("2D, Canvas, Mouse");
        this.z = 101;
		this.maskCanvas = document.createElement('canvas');

    	this.bind("EnterFrame", function(obj){
          	//this.drawBlack();
    	});

    	/*this.bind("Draw", function(obj){
    		this.drawFlash();
    	});*/
	},
        

    drawBlack: function(){
		// I'll use a skyblue background that covers everything
		// Just to demonstrate

		console.log("KULLI");

		WIDTH = 1200;
		HEIGHT = 624;

		ctx = Crafty.canvas.context;
		//ctx.clearRect(0,0, WIDTH, HEIGHT);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0)";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);

		// Create a canvas that we will use as a mask
		// Ensure same dimensions
		this.maskCanvas.width = WIDTH;
		this.maskCanvas.height = HEIGHT;

		var maskCtx = this.maskCanvas.getContext('2d');
		maskCtx.clearRect(0,0, WIDTH, HEIGHT);
		// This color is the one of the filled shape
		maskCtx.fillStyle = "black";
		// Fill the mask
		maskCtx.fillRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
		// Set xor operation
		maskCtx.globalCompositeOperation = 'xor';
		// Draw the shape you want to take out

		maskCtx.beginPath();
    	maskCtx.moveTo(this.x, this.y);

    	start = new Crafty.math.Vector2D(this.x, this.y);

		rad = (this.rotation -40) * 3.141565/180;

		d = 200;

		start.x += d * Math.cos(rad);
		start.y += d * Math.sin(rad);

    	end = new Crafty.math.Vector2D(this.x, this.y);

		rad = (this.rotation + 40) * 3.141565/180;

		end.x += d * Math.cos(rad);
		end.y += d * Math.sin(rad);

    	maskCtx.lineTo(start.x, start.y);
    	maskCtx.lineTo(end.x, end.y);
    	maskCtx.closePath();
		maskCtx.fill();

		ctx.drawImage(this.maskCanvas, 0, 0);

		this._changed = true;
		// Draw mask on the image, and done !

	},
});