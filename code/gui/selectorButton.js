function SelectorButton(game, x,y, buildingClass){
	
	this.activeFrame = game.guiManager.selectorButton.activeFrame;
	this.passiveFrame = game.guiManager.selectorButton.passiveFrame;
	// 0 pasivní, 1 aktivní
	this.currentFrame = 0;
	
	Phaser.Image.call(
		this,
		game,
		x,
		y,
		game.guiManager.selectorButton.textureName, 
		this.passiveFrame
	);
	
	this.buildingClass = buildingClass;
	this.buildingTextureName = game.structuresManager.structures[buildingClass].textureName;
	
	this.anchor.x = this.anchor.y = 0.5;
	
	this.width = game.guiManager.selectorButton.size;
	this.height = game.guiManager.selectorButton.size;
	
	this.picture = new Phaser.Sprite(
		game,
		0,
		0,
		this.buildingTextureName,
		0
	);
	
	this.picture.smoothed = false;
	
	this.picture.anchor.x = this.picture.anchor.y = 0.5;
	
	this.addChild(this.picture);
}

SelectorButton.prototype = Object.create( Phaser.Image.prototype );

SelectorButton.prototype.switchFrames = function (){
	this.currentFrame = 1- this.currentFrame;
	
	if(this.currentFrame){
		this.frame = this.activeFrame;
	}
	else{
		this.frame = this.passiveFrame;
	}
}