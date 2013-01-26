Crafty.c("Selector", {
	init : function() {
		this.requires("Keyboard");
	},
	
	Selector : function(i) {
		return this;
	},
 
 	enableSelector: function() {
		this.max = this.getListLength()-1;
		this.optionIndex = 0;
		this.bind("KeyDown", function(e){
			if(e.keyCode == Crafty.keys.W || e.keyCode == Crafty.keys.UP_ARROW){
				if(this.optionIndex == 0)
					this.optionIndex = this.max;
				else
					this.optionIndex--;
					
				Crafty.trigger("SelectorMoved", {index : this.optionIndex});
			}
			
			if(e.keyCode == Crafty.keys.S || e.keyCode == Crafty.keys.DOWN_ARROW){
				if(this.optionIndex == this.max)
					this.optionIndex = 0;
				else
					this.optionIndex++;
				
				Crafty.trigger("SelectorMoved", {index : this.optionIndex});
			}
			
			if(e.keyCode == Crafty.keys.SPACE){
				Crafty.trigger("OptionItemSelected", {index : this.optionIndex});
			}
		});
	}, 		
 
	getSelectorIndex : function(){
		return this.optionIndex;
	}
});