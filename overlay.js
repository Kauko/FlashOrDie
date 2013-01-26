Crafty.c("Overlay", {
	imgObject : null,
	bgImgData : [],
	init: function(){
		this.requires("Canvas, 2D");

		this.attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z:50});
		this.imgObject = new Image();
		this.imgObject.src = "bg.png";
		//this.image("black.png");
		//this.tint("#000000", 1);
	},
	Overlay : function(){
		this.bind("EnterFrame", function(e){
			this.applyFlashlight({x:0, y:0},0);
		});

		this.initFlashlight();

		return this;
	},

	applyFlashlight : function(pos, rad){
		rad = 0;
		pos.x = 100;
		pos.y = 100;



		/*var data = this.bgImgData.data;

		for(var i=0;i<data.length;i+=4){			
				this.bgImgData.data[i+0]=0;
  				this.bgImgData.data[i+1]=0;
  				this.bgImgData.data[i+2]=0;
 				this.bgImgData.data[i+3]=255;
		}

		Crafty.canvas.context.putImageData(this.bgImgData,0,0);*/

	},

	initFlashlight : function(){

		console.log("derp");

		Crafty.canvas.context.drawImage(this.imgObject, 0, 0);
		this.bgImgData = Crafty.canvas.context.getImageData(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	}
});