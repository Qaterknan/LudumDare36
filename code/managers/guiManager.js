function GUIManager (game){
	this.game = game;
	
	this.keyIDs = [Phaser.Keyboard.ONE, Phaser.Keyboard.TWO, Phaser.Keyboard.THREE, Phaser.Keyboard.FOUR];
	
	this.keys = [];
	
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
		buttonObjects : [],
		callbacks : [
			function (){
				this.handleKey(0);
			},
			function (){
				this.handleKey(1);
			},
			function (){
				this.handleKey(2);
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
		
		if(this.selectorPanel.buildings[i] == this.game.structuresManager.activeStructure){
			sB.switchFrames();
		}
		
		this.selectorPanel.buttonObjects.push(sB);
	};
	this.guiGroup.fixedToCamera = true;
}

GUIManager.prototype.switchSelectorOff = function (num){
	
	var active = this.game.structuresManager.activeStructure;
	
	if(!active){
		return -1;
	}
	
	if((num === undefined || num >= this.selectorPanel.buildings.length)){
		// Vypnout právě aktivní
		var index = this.selectorPanel.buildings.indexOf(active);
		
		this.selectorPanel.buttonObjects[index].switchFrames();
		
		return index;
	}
	else {
		if(this.selectorPanel.buttonObjects[num].currentFrame){ // Current frame je 1 pokud aktivní
			this.selectorPanel.buttonObjects[num].switchFrames();
			
			return num;
		}
		
		return -1;
	}
}

GUIManager.prototype.switchSelectorOn = function (num){
	if(num === undefined || num > this.selectorPanel.buildings.length)
		return false
	else{
		if(this.selectorPanel.buttonObjects[num].currentFrame == 0)
			this.selectorPanel.buttonObjects[num].switchFrames();
	}
}

GUIManager.prototype.handleKey = function(num){
	var switchedOff = this.switchSelectorOff();
	if(switchedOff == num){
		this.game.structuresManager.activeStructure = false;
		return;
	}
	else {
		this.game.structuresManager.activeStructure = this.selectorPanel.buildings[num];
		this.switchSelectorOn(num);
	}
}

GUIManager.prototype.setHandlers = function(){
	
	this.clearHandlers();
	
	for(var i = 0; i < this.selectorPanel.buildings.length; i++){
		this.keys.push(this.game.input.keyboard.addKey(this.keyIDs[i]));
		
		this.keys[i].onDown.add(this.selectorPanel.callbacks[i], this);
	}
}

GUIManager.prototype.clearHandlers = function (){
	
	for(var i = 0; i < this.keys.length; i++){
		this.game.input.keyboard.removeKey(this.keyIDs[i]);
		delete this.keys[i];
	}
}