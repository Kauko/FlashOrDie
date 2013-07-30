Crafty.c("OptionsListEntry", {
	
	init : function(){
	},
	
	OptionsListEntry : function(t){
		this.id = t.id;
		this.name = t.name;
		return this;
	},
	
	getOptionName : function(){
		return this.name;
	},
	
	getOptionId : function(){
		return this.id;
	}
})