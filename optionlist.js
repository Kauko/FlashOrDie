Crafty.c("OptionList", {

	init : function(){
		this.requires("2D, Image, Canvas");
	},
	
	OptionList : function(){	
		this.options = [];
		this.populateOptionsList();
		
		this.bind("SelectorMoved", function(e){
			for(var i in this.tracks){
				if(i == e.index){
					this.tracks[i].highlight();
				}else{
					this.tracks[i].dehighlight();
				}
			}
		});
		
		return this;
	},

	populateOptionsList : function(){
		this.options.push(Crafty.e("OptionsListEntry, SpriteFontWriter").OptionsListEntry({id:0, name: "Press Space to Start"}).SpriteFontWriter(CANVAS_WIDTH/2, CANVAS_HEIGHT/2));
		this.options[0].setContent(this.options[0].getOptionName());
		this.options[0].eraseText();
		this.options[0].writeText();
		this.options[0].center();


		this.enableSelector();
		//this.options[0].highlight();
	},
	
	/*listResponseHandler: function(trackDataList) {
		for(var i in trackDataList){
			this.tracks.push(Crafty.e("TrackListEntry, SpriteFontWriter").TrackListEntry(trackDataList[i]).SpriteFontWriter(5,i*20+5));
			this.tracks[i].setContent(this.tracks[i].getTrackName());
			this.tracks[i].eraseText();
			this.tracks[i].writeText();
		};
		this.enableSelector(); 
		this.getTrackPreviewData(0);
		this.tracks[0].highlight();
	},*/
	
	getListLength : function(){
		return this.options.length;
	},

	getId : function(i){
		return this.options[i].getOptionId();
	}
});