
Crafty.c("Grid", {

    ready: true,

    init: function(){
        this.requires("2D, Canvas");
        this.z = 100;
        this.attr({x:0, y:0, w: CANVAS_WIDTH, h: CANVAS_HEIGHT});
        this.visible = false;
        
        this._nodeSize = 16;
        this._tiles = [];  
   		this._loadMap();

        //draw grid
        this.bind("Draw", function(obj){
              this.drawGrid(obj.ctx, obj.pos);
        });
        
        this.bind("ButtonUnselected", function(){
        	this.visible = false;
        });
        
        this.bind("ButtonClick", function(){
        	this.visible = true;
        });
        

    },
    
    gridSize: function(){
    	return this.gridSize;
    },
    
    _loadMap: function(){
    	
    },

	//help debugging
    drawGrid: function(ctx, pos){
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(255,255,255)";

        for(var x = 0; x  < pos._w / this.gridSize; x++){
            ctx.beginPath();
            ctx.moveTo(x * this.gridSize, 0)
            ctx.lineTo(x * this.gridSize, pos._h);
            ctx.stroke();
        }

        for(var y = 0; y  < pos._h / this.gridSize; y++){
            ctx.beginPath();
            ctx.moveTo(0, y * this.gridSize)
            ctx.lineTo(pos._w, y * this.gridSize);
            ctx.stroke();
        }

    },

    convertToGridCoords: function(x,y){
        return {x: Math.floor(x/this.gridSize), y: Math.floor(y/this.gridSize)};
    },


});
