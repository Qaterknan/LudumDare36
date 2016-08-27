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
}

mainMenuState.create = function (){
	console.log("Calling create for Main Menu");
	/// Zrušit value true pokud se nemá spouštět hra rovnou
	this.game.state.add("game", mainGameState, true);
}