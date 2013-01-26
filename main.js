//globaaaals

//w = 75, h = 39 @ 16x16
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 624;

var GRID = null;
var PLAYER = null;
var ENEMY = null;
var BG_IMAGE = null;

var BG_IMAGE = null;
var MENU_BG = null;



window.onload = (function () {

    

    //start crafty
    Crafty.init(CANVAS_WIDTH, CANVAS_HEIGHT, 60);
    Crafty.canvas.init();
    
    /*Crafty.scene("loading_menu", function(){
        Crafty.load(["bg_menu.png"], function() {
            Crafty.scene("Main_menu");
        });

        Crafty.background("#AAF");
        Crafty.e("2D, DOM, Text").attr({w:CANVAS_WIDTH, h:CANVAS_HEIGHT, x:CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2})
                .text("Loading..");

    });*/

    Crafty.scene("Main_menu", function(){
        console.log("Main menu");
        MENU_BG = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("bg_menu.png");
        menu = Crafty.e("Selector, OptionList").OptionList().Selector()
            .bind("SelectorMoved", function(e){
                this.hilightOptionListItem(e.index);
            })
            .bind("OptionItemSelected", function(e){
                selectedOption = this.getId(this.getSelectorIndex());
                Crafty.scene("loading_game");
            });

        TUTORIAL_TEXT = Crafty.e("SpriteFontWriter").SpriteFontWriter(CANVAS_WIDTH/2, CANVAS_HEIGHT/2+100);
        TUTORIAL_TEXT2 = Crafty.e("SpriteFontWriter").SpriteFontWriter(CANVAS_WIDTH/2, CANVAS_HEIGHT/2+150);
        TUTORIAL_TEXT3 = Crafty.e("SpriteFontWriter").SpriteFontWriter(CANVAS_WIDTH/2, CANVAS_HEIGHT/2+200);
        TUTORIAL_TEXT4 = Crafty.e("SpriteFontWriter").SpriteFontWriter(CANVAS_WIDTH/2, CANVAS_HEIGHT/2+250);
        TUTORIAL_TEXT.setContent("WASD to move");
        TUTORIAL_TEXT2.setContent("Mouse to control flashlight");
        TUTORIAL_TEXT3.setContent("Stay away from the thing that's chasing you");
        TUTORIAL_TEXT4.setContent("Don't fall down a hole and try to find the goal");


        TUTORIAL_TEXT.eraseText();
        TUTORIAL_TEXT.writeText();
        TUTORIAL_TEXT2.eraseText();
        TUTORIAL_TEXT2.writeText();
        TUTORIAL_TEXT3.eraseText();
        TUTORIAL_TEXT3.writeText();
        TUTORIAL_TEXT4.eraseText();
        TUTORIAL_TEXT4.writeText();

        TUTORIAL_TEXT.center();
        TUTORIAL_TEXT2.center();
        TUTORIAL_TEXT3.center();
        TUTORIAL_TEXT4.center();
    });

    Crafty.scene("loading_game", function(){
        Crafty.load(["sprites.png", "gfx/player.png"], function() {
            loadSprites();
            Crafty.scene("main");
        });

        Crafty.background("#AAF");
        Crafty.e("2D, DOM, Text").attr({w:CANVAS_WIDTH, h:CANVAS_HEIGHT, x:CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2})
                .text("Loading..");

        MENU_BG.destroy();
        menu.destroy();
        TUTORIAL_TEXT.destroy();
        TUTORIAL_TEXT2.destroy();
        TUTORIAL_TEXT3.destroy();
        TUTORIAL_TEXT4.destroy();
    });


    Crafty.scene("main", function(){
        console.log("Playing");
       //lataa täällä että map ladattu kun mainissa
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("bg.png");
        GRID = Crafty.e("Grid");
        
            
        //gridin pitää olla ladattu että gridiä tarvitsevat paskat toimii
        //ei voi laittaa jostain syystä loading scenessä lataamaan gridiä    
        this.bind("MapReady", function(){
            PLAYER = Crafty.e("2D, Canvas, Player, hero");
            PLAYER.addComponent("Multiway").multiway(2, { W: -90, S: 90, D: 0, A: 180});
            PLAYER.addComponent("Collision").bind('Moved', function(from){
                if(this.hit("wall")) {
                   this.attr({x: from.x, y:from.y});
                }
            });


            ENEMY = Crafty.e("Enemy");

	        this.bind("GameOver", function(){
	        	Crafty.scene("bad_end");
			});

            this.bind("Victory", function(){
                Crafty.scene("good_end");
            }) 
			
		});    
		
	});
	//todo retrynappi ja reposition paskat uusiksi
    Crafty.scene("bad_end", function(){
    	console.log("BAD END");
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("endbg.png");
    	ENEMY.destroy();
    	PLAYER.destroy();
    	GRID.destroy();
    });

    Crafty.scene("good_end", function(){
        console.log("GOOD END");
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("endbg.png");
        ENEMY.destroy();
        PLAYER.destroy();
        GRID.destroy();
    })
    
    function loadSprites(){
        Crafty.sprite(16, "sprites.png", {
            wall: [1,0],
            enemy: [0,1],
            hole: [0,1],
            goal: [0,1]

        });

        Crafty.sprite(10, "gfx/player2.png", {
            hero: [0,0]
        });

    }

    //starting point
    Crafty.scene("Main_menu");

});
