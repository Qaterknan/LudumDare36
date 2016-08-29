function GUIManager (game){
	this.game = game;
	
	this.keys = [Phaser.Keyboard.ONE, Phaser.Keyboard.TWO, Phaser.Keyboard.THREE, Phaser.Keyboard.FOUR];
	
	this.selectorButton = {
		textureName : "selectorButton",
		activeFrame : 1,
		passiveFrame : 0,
		size : 64,
	};
	
	this.selectorPanel = {
		begin : {
			x : 50,
			y : 550,
		},
		space : 20,
		buildings : [
			"pyramid",
			"aztec",
			"babylon",
		],
		callBacks : [
			function (){
				
			},
			function (){
				
			},
			function (){
				
			},
		],
	};
	
	this.guiGroup = new Phaser.Group(this.game);
	
	this.lastIndex = this.z;
	
	this.guiGroup.update = function (){
		for(var i in this.children)
			this.children[i].update();
		if(this.lastIndex != this.z)
			this.game.world.bringToTop(this);
	}
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
		
		this.guiGroup.add(sB);
		
		if(this.selectorPanel.buildings[i] == this.activeStructure){
			sB.switchFrames();
		}
	};
	this.guiGroup.fixedToCamera = true;
}