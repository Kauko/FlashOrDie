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
        Crafty.load(["sprites.png", "gfx/dick.png"], function() {
            loadSprites();
            Crafty.scene("main");
        });

        Crafty.background("#AAF");
        Crafty.e("2D, DOM, Text").attr({w:CANVAS_WIDTH, h:CANVAS_HEIGHT, x:CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2})
                .text("Loading..");

    });


    Crafty.scene("main", function(){
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("bg.png");
		GRID = Crafty.e("Grid");
        var player = Crafty.e("2D, Canvas, PlayerControls, Slide, hero").attr({x:10, y:10, z:10});
    });
   

    function loadSprites(){
		Crafty.sprite(32, "sprites.png", {
        	wall: [2,0]
        });

        Crafty.sprite(128, "gfx/dick.png", {
            hero: [0,0]
        });

    }

    //starting point
    Crafty.scene("loading");

});