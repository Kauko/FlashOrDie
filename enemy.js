
Crafty.c("Enemy", {


	init: function(){
	    this.requires("2D, Canvas, Tween, PathFinder, enemy");
	    this._nodeSize = GRID.nodeSize();
        this.attr({x: 1 * this._nodeSize, y: 0 * this._nodeSize, z:10, w: 16, h: 16});
        this.origin("center");

        this._path = null;
        this._tweenTime = 20;
        this._gridPos = GRID.convertToGridCoords(this.x, this.y);
        this._tweening = false;
        
        
		this.bind("TweenEnd", function(){
			this._tweening = false;
			this._processMove();
		});
		

   },
   
   _processMove: function(){
   	
	    if(this._path === null )
     	   return;
		if(this._nextPos != null){
			
			if(this.getDistance(PLAYER.x, PLAYER.y) > 100){
				this._tweenTime = 15;
			}
			
			this._rotateTowards(this._nextPos.point());
			var target = this._nextPos.point();
    		this.tween({x: target.x * this._nodeSize, y: target.y * this._nodeSize}, this._tweenTime);
    		this._tweening = true;
        	this._gridPos = this._nextPos.point();  	
    		this._nextPos = this._nextPos.next();
    		this._tweenTime = 20;
		}
	
   },
      
   	_rotateTowards: function(point){
		
		if(point.x > this._gridPos.x)
			this.rotation = 90;
		else if(point.x < this._gridPos.x)
			this.rotation = 270;
		else if(point.y > this._gridPos.y)
			this.rotation = 180;
		else
			this.rotation = 0;
		
	},
        
	getNewPath: function(target){
    	
		var newPath = this.findPath(this._gridPos, target);
							
		this._path = newPath;
		if(this._path != null){
			this._nextPos = this._path.tail();
			//tuplatween esto
			if(this._tweening === false)
				this._processMove();

		}

	},
	
	getDistance: function(x,y){
		var pos = new Crafty.math.Vector2D(this.x, this.y);
		var tar_pos = new Crafty.math.Vector2D(x, y);
		
		return pos.distance(tar_pos);


	}
    

});