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
	this.game.load.script("mainGameState", "code/states/mainGame.js");
	this.game.load.spritesheet("button", "assets/button.png", 25, 20);
	this.game.load.spritesheet("hatak", "assets/hatak.png", 16, 16);
	this.game.load.spritesheet("buildButton", "assets/buildButton.png", 18, 18);
}

mainMenuState.create = function (){
	/// Zrušit value true pokud se nemá spouštět hra rovnou
	this.game.state.add("game", mainGameState, false);
	
	this.game.world.setBounds(-this.game.width/2, -this.game.height/2, this.game.width, this.game.height);
	
	var startButton = this.game.add.button(0,0, "button",
		function (){game.state.start("game");},
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
	
	/*
	one = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	one.onDown.add(function(){square.frame = 1 - square.frame;});
	/*
	hatak.animations.add("fly", [0,1,2], 12, true);
	
	hatak.animations.play("fly");
	*/
}