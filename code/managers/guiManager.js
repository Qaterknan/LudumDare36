function GUIManager (game){
	this.game = game;
	
	this.contents = [];
	
	this.keys = [Phaser.Keyboard.ONE, Phaser.Keyboard.TWO, Phaser.Keyboard.THREE, Phaser.Keyboard.FOUR];
	
	this.activeStructure = "pyramid";
	
	this.selectorButton = {
		textureName : "selectorButton",
		activeFrame : 1,
		passiveFrame : 0,
		size : 64,
	};
	
	this.selectorPanel = {
		begin : {
			x : -300,
			y : 250,
		},
		space : 20,
		buildings : [
			"pyramid",
			"aztec",
		],
	};
}

GUIManager.prototype.createSelectorPanel = function (){
	var sB;
	for(var i = 0; i < this.selectorPanel.buildings.length; i++){
		sB = new SelectorButton(
			this.game,
			this.selectorPanel.begin.x+i*(
				this.selectorButton.size+this.selectorPanel.space),
			this.selectorPanel.begin.y,
			this.selectorPanel.buildings[i]
		);
		this.contents.push(sB);
		
		this.game.world.add(sB);
		
		if(this.selectorPanel.buildings[i] == this.activeStructure){
			sB.switchFrames();
		}
	};
}