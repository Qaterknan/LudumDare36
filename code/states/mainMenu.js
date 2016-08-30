mainMenuState = new Phaser.State();
/// Řadit funkce podle toho, jak jsou volány, teda 
/// init, preLoad, create, update
/// Jméno statu je mainMenu

mainMenuState.init = function (){
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically	= true;
	this.game.stage.backgroundColor = "#333333";
}

mainMenuState.preload = function (){
	this.game.load.script("level_1", "code/states/level_1.js");
	this.game.load.script("betweenLevels", "code/states/betweenLevels.js");
	
	this.game.load.spritesheet("button", "assets/button.png", 25, 20);
	this.game.load.spritesheet("hatak", "assets/hatak.png", 16, 16);
	this.game.load.spritesheet("buildButton", "assets/buildButton.png", 18, 18);
}

mainMenuState.create = function (){
	/// Zrušit value true pokud se nemá spouštět hra rovnou
	this.game.state.add("level_1", level_1, false);
	this.game.state.add("betweenLevels", betweenLevels, false);
	
	// Init managerů
	
	// Resource Manager
	this.game.resourceManager = new ResourceManager(this.game);
	
	// Structures Manager
	
	this.game.structuresManager = new StructuresManager(this.game);
	
	// GUI Manager
	
	this.game.guiManager = new GUIManager(this.game);
	
	// UFO Spawner
	
	this.game.ufoSpawner = new UFOSpawner(this.game);
	
	this.game.world.setBounds(-this.game.width/2, -this.game.height/2, this.game.width, this.game.height);
	
	var startButton = this.game.add.button(0,0, "button",
		function (){game.state.start("betweenLevels", true, false, {
			levelNumber : 0,
			resourceManager : {
				resourceAvailable : 0,
			},
		});},
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
	
	var text = new Phaser.Text(this.game, startButton.x,startButton.y,"START",textStyle);
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	
	this.game.world.add(text);
	
}