//globaaaals

//w = 75, h = 39 @ 16x16
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 624;

var GRID = null;



window.onload = (function () {

	

    //start crafty
    Crafty.init(CANVAS_WIDTH, CANVAS_HEIGHT, 60);
    Crafty.canvas.init();
    
    //TODO compose spritesheets when ready
    Crafty.scene("loading", function(){
        Crafty.load(["sprites.png"], function() {
        	
            loadSprites();
            Crafty.scene("main");

        });

        Crafty.background("#AAF");
        Crafty.e("2D, DOM, Text").attr({w:CANVAS_WIDTH, h:CANVAS_HEIGHT, x:CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2})
                .text("Loading..");


    });


    Crafty.scene("main", function(){
       //lataa täällä että map ladattu kun mainissa
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("bg.png");
        GRID = Crafty.e("Grid");
		
		    
		//gridin pitää olla ladattu että gridiä tarvitsevat paskat toimii
		//ei voi laittaa jostain syystä loading scenessä lataamaan gridiä    
        this.bind("MapReady", function(){
        	var enemy = Crafty.e("Enemy");

        });

    });
   

    function loadSprites(){
		Crafty.sprite(16, "sprites.png", {
        	wall: [1,0],
        	enemy: [0,1]
        });
    }

    //starting point
    Crafty.scene("loading");

});