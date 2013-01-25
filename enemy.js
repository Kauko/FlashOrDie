
Crafty.c("Enemy", {


	init: function(){
	    this.requires("2D, Canvas, Tween, PathFinder, enemy");
	    this._nodeSize = GRID.nodeSize();
        this.attr({x: 1 * this._nodeSize, y: 0 * this._nodeSize, z:5});
        this._path = null;
        this._target = {x: 70, y: 30};
        this._tweenTime = 10;
        this._gridPos = GRID.convertToGridCoords(this.x, this.y);
        this._getNewPath();
        
		this.bind("TweenEnd", function(){
			this._processMove();
       });

   },
   
   _processMove: function(){
   	
	    if(this._path === null )
     	   return;
		if(this._nextPos != null){

			this._rotateTowards(this._nextPos.point());
			var target = this._nextPos.point();

    		this.tween({x: target.x * this._nodeSize, y: target.y * this._nodeSize}, this._tweenTime);
        	this._gridPos = this._nextPos.point();  	
    		this._nextPos = this._nextPos.next();
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
        
	_getNewPath: function(trigger){
    	
		var newPath = this.findPath(this._gridPos, this._target);
							
		this._path = newPath;
		this._nextPos = this._path.tail();
		this._processMove();

	}
    

});