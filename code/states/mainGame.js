var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";
	this.game.load.image("earth","planetEarth.png");
	this.game.load.image("moon", "moon.png")
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
	

	
	moon = new Phaser.Sprite(this.game, 0, 0, "moon");
	moon.anchor.x = 0.5;
	moon.anchor.y = 0.5;

	moon.pivot.x = 0;
	moon.pivot.y = 200;
	
	moon.height = 70;
	moon.width = 70;

	moon.angularSpeed = 1/14;
	
	earth.update = function(){
		this.angle += this.angularSpeed;
	} 

	moon.update = function(){
		this.angle += this.angularSpeed;
	}

	earthGroup.addChild(earth);
	this.game.world.addChild(moon);
}