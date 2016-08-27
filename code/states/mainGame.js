var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";
	this.game.load.image("basicEarth","basicEarth.png");
	this.game.load.image("basicPyramid","basicPyramid.png");
}

mainGameState.create = function (){
	this.game.world.setBounds(-this.game.width/2,-this.game.height/2,this.game.width,this.game.height);
	
	earthGroup = new EarthGroup(this.game, {"earth" : "basicEarth","pyramid" : "basicPyramid"});
	
	this.game.world.addChild(earthGroup);
	earthGroup.addStructure(0, "basicPyramid");
}