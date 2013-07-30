

Crafty.c("Player", {
    _keys: { 
    UP_ARROW: [0,-1],
    }, 

    _onmousemove: function(e){
        this.origin("center");

        this.dire = new Crafty.math.Vector2D(0,0);

        this.dire.x = this.x - e.pageX;
        this.dire.y = this.y - e.pageY;

        this.dire.normalize();

        angle = Math.atan2(this.dire.x, this.dire.y) * 180/3.141;
		
        this.rotation = -angle;	
        FLASH.rotation = -angle;
		TOP_SHADOW.rotation = -angle;
		LEFT_SHADOW.rotation = -angle;
		BOTTOM_SHADOW.rotation = -angle;
		RIGHT_SHADOW.rotation = -angle;
		FLASH_COVER.rotation = -angle;
     },

    init: function() {
	  this.addComponent("Multiway").multiway(2, { W: -90, S: 90, D: 0, A: 180});
	  this.addComponent("Collision").bind('Moved', function(from){
		//COLLISION DETECT
		var gridPos = GRID.convertToGridCoords(this.x, this.y);
		if(GRID.isWall(gridPos.x, gridPos.y)){
			this.x = from.x;
			this.y = from.y;
		}
		else if(GRID.isHole(gridPos.x, gridPos.y)){
			Crafty.trigger("Hole_GameOver");
		}
		else if(GRID.isGoal(gridPos.x, gridPos.y)){
			Crafty.trigger("Victory");
		}


      });

   	  this.attr({x: 4 * 16, y: 4 * 16, z:10, w:10, h:10}); 
  	  this.lastGridPos = {x: 4, y: 4};
  	  this.beatRate = 100;
  	  this.frameCounter = 0;
  	  
      for(var k in this._keys) {
        var keyCode = Crafty.keys[k] || k;
        this._keys[keyCode] = this._keys[k];
      }
      
      this.bind("EnterFrame", function(){
      	
		if(this.frameCounter % this.beatRate === 0){
		  this.processHeartBeat();
		  this.beatRate = Math.floor(ENEMY.getDistance(this.x, this.y));
	      if(this.beatRate > 100 )
			this.beatRate = 100;
		  if(this.beatRate < 40)
		  	this.beatRate = 40;
			
		  this.frameCounter = 0;

		}
		
		this.frameCounter++;
		
      	if(this.hit("enemy")) {
   //        Crafty.trigger("Monster_GameOver");
        }
        
		var gridPos = GRID.convertToGridCoords(this.x, this.y);
		
		if(gridPos.x > this.lastGridPos.x || gridPos.x < this.lastGridPos.x ||
		   gridPos.y > this.lastGridPos.y || gridPos.y < this.lastGridPos.y){
			
			this.lastGridPos = gridPos;
			ENEMY.getNewPath(gridPos);
						
		}
        
        FLASH.attr({x: PLAYER.x - FLASH.w / 2, y: PLAYER.y - FLASH.h / 2});

      });

      Crafty.addEvent(this, Crafty.canvas._canvas, "mousemove", this._onmousemove);
    },
    
    processHeartBeat: function(){
    	console.log("PROCES");
  		BEAT_SND.play();   	
  		FLASH_COVER.visible = true;
  		setTimeout(function(){
  			console.log("visible false");
  			FLASH_COVER.visible = false;
  		}, this.beatRate * 10);

    }
    
  });
