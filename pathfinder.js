
Crafty.c("PathFinder", {

	init: function(){
		
	},

	/*
	 	Find path from pos ({x,y}) to target ({x,y})
	 * 
	 * -	x,y as grid coordinates
	 * - uses bfs (sort of, atleast)
	 * - converts path to linked list
	 * 
	 */
    findPath: function(pos, target){
		
	   console.log("FINDPATH CALLED");

       if(pos.x === target.x && pos.y === target.y)
          return null;
          
	   var nodeSize = GRID.nodeSize();
       var l_width = CANVAS_WIDTH / nodeSize;
       var l_height = CANVAS_HEIGHT / nodeSize;
       
       var d = new Array(l_width);
       var p = new Array(l_width);
       var color = new Array(l_width);
       
       var WHITE = 0;
       var GRAY = 1;
       var BLACK = 2;

       for(var x = 0; x < l_width; x++){
          d[x] = new Array(l_height);
          p[x] = new Array(l_height);
          color[x] = new Array(l_height);           	  
          for(var y = 0; y < l_height; y++){
             color[x][y] = WHITE;
             p[x][y] = null;
             d[x][y] = 99999;

          }
       }


       d[pos.x][pos.y] = 0;
       color[pos.x][pos.y] = GRAY;

       var queue = [];


       queue.push({x: pos.x, y: pos.y});
       
       while(queue.length > 0){
          var t = queue.shift();

          if(t.x === target.x && t.y === target.y)
             break;

          var adj = [];
          if(!GRID.isWall(t.x +1, t.y))
              adj.push({x: t.x +1, y: t.y});
          if(!GRID.isWall(t.x-1, t.y))
              adj.push({x: t.x-1, y: t.y});
          if(!GRID.isWall(t.x , t.y +1))
             adj.push({x: t.x, y: t.y + 1});
          if(!GRID.isWall(t.x, t.y -1))
             adj.push({x: t.x, y: t.y -1});



          for(i = 0; i < adj.length; i++ ){
             var v = adj[i];
						
             if(color[v.x][v.y] == WHITE){
                color[v.x][v.y] = GRAY;
                d[v.x][v.y] = d[t.x][t.y] + 1;
                p[v.x][v.y] = t;
                queue.push(v);
             }
          }

          color[t.x][t.y] = BLACK;

       }


       //return path
		if(p[target.x][target.y] === null)
      	  return null;

         
        var tar = target;
        var nextPos;
        var path = new Path();
        path.addPoint({x: target.x, y: target.y});
            
        do{

            nextPos = p[tar.x][tar.y];
          	var temp = p[nextPos.x][nextPos.y];
			tar = nextPos;

			path.addPoint({x: nextPos.x, y: nextPos.y});
            
            if(temp === null)
            	break;
                
        }while(!(temp.x == pos.x && temp.y == pos.y));
 
 	   console.log("FINDPATH finished");
       return path;

                  
    }

    
});



/*
 *	Data structure for Pathfinding 
 * 	- linked list
 * 
 */

function Path(){
	this._head = null;
	this._tail = null;
}

Path.prototype.addPoint = function(value){
	//first node
	if(this._head === null){
		var h = new PathPoint(value);
		h.setNext(null);
		h.setPrev(null);
		this._head = h;
	}
	else if(this._tail === null){
		
		var t = new PathPoint(value);
		this._head.setPrev(t);
		t.setNext(this._head);
		t.setPrev(null);
		this._tail = t;
		
	}
	else{
		var oldTail = this._tail;
		var t = new PathPoint(value);
		t.setNext(oldTail);
		oldTail.setPrev(t);
		t.setPrev(null);
		this._tail = t;
		
	}
}

Path.prototype.tail = function(){
	return this._tail;
}

Path.prototype.head = function(){
	return this._head;
}

function PathPoint(value){

	this._point = value;
	this._next = null;
	this._prev = null;
	
}

PathPoint.prototype.next = function(){
	return this._next;
}

PathPoint.prototype.prev = function(){
	return this._prev;
}   


PathPoint.prototype.setNext = function(n){
	this._next = n;
}

PathPoint.prototype.setPrev = function(p){
	this._prev = p;
}

PathPoint.prototype.point = function(){
	return this._point;
}