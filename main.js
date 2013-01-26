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

var SOUNDS_INITIALIZED = false;
var GRID_INITIALIZED = false;

var FLASH = null;

window.onload = (function () {

    

	soundManager.onready(function() {
		SOUNDS_INITIALIZED = true;
	});

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

        Crafty.background("#AAF");
        loading_text = Crafty.e("2D, DOM, Text").attr({w:CANVAS_WIDTH, h:CANVAS_HEIGHT, x:CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2})
                .text("Loading..");

        MENU_BG.destroy();
        menu.destroy();
        TUTORIAL_TEXT.destroy();
        TUTORIAL_TEXT2.destroy();
        TUTORIAL_TEXT3.destroy();
        TUTORIAL_TEXT4.destroy();

        if(Crafty.asset("sprites.png") === undefined){
            Crafty.load(["sprites.png", "gfx/player.png", "gfx/lightmask.png"], function() {
                loadSprites();
                loading_text.destroy();
                Crafty.scene("main");
            });
        }else{
            loading_text.destroy();
            Crafty.scene("main");
        }


    });


    Crafty.scene("main", function(){
        console.log("Playing");
       //lataa täällä että map ladattu kun mainissa
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("bg.png");
        console.log("sounds init: " + SOUNDS_INITIALIZED + " grid; " + GRID);
        this.loader = Crafty.e();
        this.loader.bind("EnterFrame", function(){
			if(SOUNDS_INITIALIZED && GRID_INITIALIZED == false){
		       GRID = Crafty.e("Grid");
		       GRID_INITIALIZED = true;
		       console.log("GRID LOADEEED");
			}
		});


            
        //gridin pitää olla ladattu että gridiä tarvitsevat paskat toimii
        //ei voi laittaa jostain syystä loading scenessä lataamaan gridiä    
        this.bind("MapReady", function(){
            PLAYER = Crafty.e("2D, Canvas, Player, hero").attr({x: 30 * 16, y:6 * 16, z:10});

            FLASH = Crafty.e("2D, Canvas, flash").attr({z:200});

            PLAYER.addComponent("Multiway").multiway(2, { W: -90, S: 90, D: 0, A: 180});
            PLAYER.addComponent("Collision").bind('Moved', function(from){
                if(this.hit("wall")) {
                   this.attr({x: from.x, y:from.y});
                }
                FLASH.origin("center");
                FLASH.attr({x: PLAYER.x - FLASH.w / 2, y: PLAYER.y - FLASH.h / 2});
            });

            ENEMY = Crafty.e("Enemy");


	        this.bind("Monster_GameOver", function(){
	        	DEATH_SND.play();
	        	Crafty.scene("monster_end");
                Crafty.audio.play("death",1,0.5);
			});

            this.bind("Hole_GameOver", function(){
            	DEATH_SND.play();
                Crafty.scene("hole_end");
                Crafty.audio.play("death",1,0.5);
            });


            this.bind("Victory", function(){
            	WIN_SND.play();
                Crafty.scene("good_end");
            });
            
            loopMusic();
            
        	this.loader.destroy();
            
		});    
		
	});
	//todo retrynappi ja reposition paskat uusiksi
    Crafty.scene("monster_end", function(){
    	console.log("BAD END");
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("endbg_monster.png");
    	setTimeout("Crafty.scene(\"Main_menu\")", 3000);
        ENEMY.destroy();
    	PLAYER.destroy();
    	GRID.destroy();
    });

    Crafty.scene("hole_end", function(){
        console.log("BAD END");
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("endbg_trap.png");
        setTimeout("Crafty.scene(\"Main_menu\")", 3000);
        ENEMY.destroy();
        PLAYER.destroy();
        GRID.destroy();
    });

    Crafty.scene("good_end", function(){
        console.log("GOOD END");
        BG_IMAGE = Crafty.e("2D, Canvas, Image").attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT, z: 1}).image("winbg.png");
        setTimeout("Crafty.scene(\"Main_menu\")", 3000);
        ENEMY.destroy();
        PLAYER.destroy();
        GRID.destroy();
    });
    
    function loadSprites(){
        Crafty.sprite(16, "sprites.png", {
            wall: [1,0],
            enemy: [0,1],
            hole: [1,1],
            goal: [2,0]

        });

        Crafty.sprite(10, "gfx/player2.png", {
            hero: [0,0]
        });

        Crafty.sprite(1200, "gfx/lightmask.png", {
            flash: [0,0]
        });

    }
    
    function loopMusic(){
    	MUSIC.play({
    	
	    	onfinish: function() {
	   		   loopMusic();
	   		}
   		});
    }


    //starting point
    Crafty.scene("Main_menu");

});
