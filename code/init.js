function init(){
	game = new Phaser.Game(800,600, Phaser.AUTO);
	
	game.state.add("mainMenu", mainMenuState, true);
}