betweenLevels = new Phaser.State();

betweenLevels.init = function (levelParser){console.log(levelParser.levelNumber);
	this.game.level = levelParser.levelNumber+1;
	
	this.game.ufoSpawner.currentLevel = "level_"+(levelParser.levelNumber+1);
	
	this.game.resourceManager.levelParse(levelParser.resourceManager);
}

betweenLevels.preload = function (){
	
}

betweenLevels.create = function (){
	
	var startButton = this.game.add.button(320,250, "button",
		function (){
			this.game.state.start("level_"+(this.game.level));
		},
		this,
		2,
		0,
		1,
		2
	);
	
	startButton.width = 100;
	startButton.height = 40;
	
	startButton.anchor.x = 0.5;
	startButton.anchor.y = 0.5;
	
	var textStyle = {font : "30px sans-serif", fill : "#ffffff", align: "center"};
	
	var text = new Phaser.Text(this.game, startButton.x,startButton.y,"GO ON",textStyle);
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	
	this.game.world.add(text);
	
}