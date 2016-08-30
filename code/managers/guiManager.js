function GUIManager (game){
	this.game = game;
	
	this.fontFamily = "sans-serif";
	
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
	
	this.resourcesText = {
		position : {
			x : 600,
			y : 20,
		},
		style : {
			font : "20px "+this.fontFamily,
			fill : "#ffffff",
		},
		text : "Resources : ",
		object : false,
	};
	
	this.healthText = {
		position : {
			x : 20,
			y : 20,
		},
		style : {
			font : "20px "+this.fontFamily,
			fill : "#ffffff",
		},
		text : "Health : ",
		object : false,
	};
	
	this.lastIndex = this.z;
	
	this.guiGroup = false;
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
		this.keys[i].reset(true);
		delete this.keys[i];
	}
}

GUIManager.prototype.resetGroup = function (){
	if(this.guiGroup)
		this.guiGroup.destroy();
	
	this.guiGroup = new Phaser.Group(this.game);
	
	this.guiGroup.update = function (){
		for(var i in this.children)
			this.children[i].update();
		if(this.lastIndex != this.z)
			this.game.world.bringToTop(this);
	}
}

GUIManager.prototype.createTexts = function (){
	// Resources
	if(this.resourcesText.object)
		this.resourcesText.object.destroy();
	
	this.resourcesText.object = new Phaser.Text(
		this.game,
		this.resourcesText.position.x,
		this.resourcesText.position.y,
		this.resourcesText.text+this.game.resourceManager.resourceAvailable,
		this.resourcesText.style
	);
	
	this.guiGroup.addChild(this.resourcesText.object);
	
	// Health
	if(this.healthText.object){
		this.healthText.object.destroy();
	}
	
	this.healthText.object = new Phaser.Text(
		this.game,
		this.healthText.position.x,
		this.healthText.position.y,
		this.healthText.text+this.game.earthGroup.earth.health,
		this.healthText.style
	);
	
	this.guiGroup.addChild(this.healthText.object);
}

GUIManager.prototype.updateText = function (name, value){
	
	if(name == "resourcesText"){
		this.resourcesText.object.text = this.resourcesText.text+value;
	}
	
	if(name == "healthText"){
		this.healthText.object.text = this.healthText.text + value;
	}
	
}

GUIManager.prototype.displayVictoryMessage = function (LN){
	var text = this.game.add.text(0,0, "VICTORY !", {font: "40px "+this.fontFamily, fill: "#ffffff"});
	
	text.anchor.x = text.anchor.y = 0.5;
	
	this.game.ufoSpawner.timer.add(3000, function (){
		this.game.state.start("betweenLevels",true, false, {
			levelNumber : LN,
			resourceManager : {
				resourceAvailable : this.game.resourceManager.resourcesAvailable,
			}
		});
	}, this);
}