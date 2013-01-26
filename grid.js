
Crafty.c("Grid", {

    ready: true,

    init: function(){
        this.requires("2D, Canvas");
        this.z = 100;
        this.attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT});
        this.visible = true;
        
        this._mapData = null;
        this._nodeSize = 16;
        this._tiles = [];
   		this._loadMap();

        //draw grid
        this.bind("Draw", function(obj){
              this.drawGrid(obj.ctx, obj.pos);
        });
        
        this.bind("MapParsed", function(mapData){
        	this._mapData = mapData;
        	this._buildMap();
        });
       	

    },
    
    nodeSize: function(){
    	return this._nodeSize;
    },
    
    _loadMap: function(){
    	
		var request = new XMLHttpRequest();
		
		request.parseMap = function(map_file){
			mapData = map_file.split("\n");
			mapData.splice(-1, 1);
		 	Crafty.trigger("MapParsed", mapData);
		}

		request.onreadystatechange = function(){
		 	if(request.readyState == 4){
		 		map = request.responseText;
		 		request.parseMap(map);
		 	}
		 };

		request.open("GET", "maps/map2", true);
		request.send();    
	},

	//help debugging
    drawGrid: function(ctx, pos){
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(150,150,150)";

        for(var x = 0; x  < pos._w / this._nodeSize; x++){
            ctx.beginPath();
            ctx.moveTo(x * this._nodeSize, 0)
            ctx.lineTo(x * this._nodeSize, pos._h);
            ctx.stroke();
        }

        for(var y = 0; y  < pos._h / this._nodeSize; y++){
            ctx.beginPath();
            ctx.moveTo(0, y * this._nodeSize)
            ctx.lineTo(pos._w, y * this._nodeSize);
            ctx.stroke();
        }

    },

    convertToGridCoords: function(x,y){
        return {x: Math.floor(x/this._nodeSize), y: Math.floor(y/this._nodeSize)};
    },
    
     //X Y VÄÄRINPÄIN LOL
    _buildMap: function(){
    	for(var y = 0; y < this._mapData.length; y++){	
    		for(var x = 0; x < this._mapData[y].length; x++){
       			if(this._mapData[y][x] === '1'){
    				Crafty.e("2D, Canvas, wall, Collision").attr({x: x * this._nodeSize, y: y * this._nodeSize, z: 10});
    			}
    		}
    	}
   
   		Crafty.trigger("MapReady");

    },
    
    //X Y VÄÄRINPÄIN LOL
    isWall: function(x,y){
    	
    	
    	if(x < 0 || y < 0 || x >= CANVAS_WIDTH || y >= CANVAS_HEIGHT){
    		return true;
    	}
    	
    	//TODO vaihda '1' jos / kun useampia seinia
    	if(this._mapData[y][x] === '1'){
    		return true;
    	}
    	
    	return false;
    }

});
