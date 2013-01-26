SOUND = null;

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
        //console.log(angle);
    },

    init: function() {
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
		  this.playHeartBeat();
		  this.beatRate = Math.floor(ENEMY.getDistance(this.x, this.y));
	      if(this.beatRate > 100 )
			this.beatRate = 100;
		  if(this.beatRate < 40)
		  	this.beatRate = 40;
			
		  this.frameCounter = 0;
		  console.log("br = " + this.beatRate);

		}
		
		this.frameCounter++;
		
      	if(this.hit("enemy")) {

           Crafty.trigger("Monster_GameOver");
        }else if(this.hit("goal")){
          Crafty.trigger("Victory");
        }
        else if(this.hit("hole")){
          Crafty.trigger("Hole_GameOver");
        }
      	
		var gridPos = GRID.convertToGridCoords(this.x, this.y);
		
		if(gridPos.x > this.lastGridPos.x || gridPos.x < this.lastGridPos.x ||
		   gridPos.y > this.lastGridPos.y || gridPos.y < this.lastGridPos.y){
			
			Crafty.trigger("peenis");
			this.lastGridPos = gridPos;
			ENEMY.getNewPath(gridPos);
			
			
		}
		
      });

      Crafty.addEvent(this, Crafty.canvas._canvas, "mousemove", this._onmousemove);
    },
    
    playHeartBeat: function(){
  		BEAT_SND.play();   	
    }
    
  });
