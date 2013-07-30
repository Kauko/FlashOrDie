Crafty.c("SpriteChar", {

	_xTarget: 0, 
	_yTarget: 0,
	
	SpriteChar: function() {
		this._xTarget = this.x;
		this._yTarget = this.y; 
		
		this.bind("EnterFrame", function() {
			this.x = this._xTarget; 
			this.y = this._yTarget; 	
		} ); 
		
		return this; 
	}, 
	
	moveX: function(xOffset) {
		this._xTarget += xOffset; 
	}, 

	moveY: function(yOffset) {
		this._yTarget += yOffset; 
	}, 
	
	hide: function() {
		this.visible = false;
	}, 
	
	show: function() {
		this.visible = true; 
	}
} );
	
			
		

Crafty.c("SpriteFontWriter", {
	
	_length: 0, 
	_x: 0, 
	_y: 0, 
	_moved: false,
	__characters: [], 
	
	SpriteFontWriter: function(x, y) {
		this._x = x;
		this._y = y; 
		this._content = ""; 
		this.__characters = []; 
		return this;
	}, 
	
	setContent: function(text) {
		this._content = text;
	},
	
	highlight : function() {
		if (this._length > 0 ){
			this.eraseText();
			this.writeText();
			for (var i in this.__characters) {
				this.__characters[i].moveX(15); 
			}
			this._moved = true;
			
		}
	},
	
	dehighlight : function() {
		if (this._length > 0 && this._moved){
			this.eraseText();
			this.writeText();
			for (var i in this.__characters) {
				this.__characters[i].moveX(0); 
			}
		}
	},
	
	updateText: function(text) {
		if (this._length > 0) {
			this.eraseText(); 
			this.writeText(); 
			this.center(); 
		}
	}, 
	
	eraseText: function() {
		for (var i = this.__characters.length - 1; i >= 0; i--) {
			this.__characters[i].destroy(); 
		}
		this._length = 0; 
	}, 
	
	writeText: function() {
		for (var i = 0; i < this._content.length; i++) {
			this.writeChar(this._content.charCodeAt(i), i);
		}
	}, 
	
	writeChar: function(cp, i) {
		key = "c" + cp; 
		this.__characters[i] = Crafty.e("2D, Canvas, " + key + ", SpriteChar")
			.attr({x: this._x + this._length, y: this._y, z: 401})
			.SpriteChar();
		this._length += this.__characters[i]._w;
	}, 
	
	center: function() {
		offset = -1 * this._length / 2;
		for (var i in this.__characters) {
			this.__characters[i].moveX(offset); 
		}
	}, 
	
	move: function(xOffset, yOffset) {
		this._x += xOffset; 
		this._y += yOffset; 
		for (var i in this.__characters) {
			this.__characters[i].moveX(xOffset); 
			this.__characters[i].moveY(yOffset); 
		}
	}, 
	
	hide: function() {
		for (var i in this.__characters) {
			this.__characters[i].hide(); 
		}
	}, 
	
	show: function() {
		for (var i in this.__characters) {
			this.__characters[i].show(); 
		}
	}, 
	
} );	
	
	