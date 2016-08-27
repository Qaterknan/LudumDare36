var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";
	this.game.load.image("earth","basicEarth.png");
}

mainGameState.create = function (){
	this.game.world.setBounds(-this.game.width/2,-this.game.height/2,this.game.width,this.game.height);
	
	earthGroup = this.game.add.group(this.game.world, "earthGroup");
	
	earth = new Phaser.Sprite(this.game, 0,0,"earth");
	earth.anchor.x = 0.5;
	earth.anchor.y = 0.5;
	
	earth.height = 200;
	earth.width = 200;
	
	earth.angularSpeed = 1;
	earth.update = function(){
		this.angle += this.angularSpeed;
	}
	
	earthGroup.addChild(earth);
}