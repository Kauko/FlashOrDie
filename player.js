
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
      for(var k in this._keys) {
        var keyCode = Crafty.keys[k] || k;
        this._keys[keyCode] = this._keys[k];
      }
      
      this.bind("EnterFrame", function(){
      	
      	if(this.hit("enemy")) {
           		Crafty.trigger("GameOver");
        }
      	
		var gridPos = GRID.convertToGridCoords(this.x, this.y);
		
		if(gridPos.x > this.lastGridPos.x || gridPos.x < this.lastGridPos.x ||
		   gridPos.y > this.lastGridPos.y || gridPos.y < this.lastGridPos.y){
			
			this.lastGridPos = gridPos;
			ENEMY.getNewPath(gridPos);
			
			
		}
		
      });

      Crafty.addEvent(this, Crafty.canvas._canvas, "mousemove", this._onmousemove);
    }
    
  });