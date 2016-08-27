var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";
	this.game.load.image("earth","planetEarth.png");
	this.game.load.image("moon", "moon.png")
	this.game.load.image("ufo", "ufo.png")
}

mainGameState.create = function (){
	this.game.world.setBounds(-this.game.width/2,-this.game.height/2,this.game.width,this.game.height);
	
	earthGroup = this.game.add.group(this.game.world, "earthGroup");
	
	//EARTH
	earth = new Phaser.Sprite(this.game, 0,0,"earth");
	earth.anchor.x = 0.5;
	earth.anchor.y = 0.5;
	
	earth.height = 200;
	earth.width = 200;
	
	earth.angularSpeed = 1;
	
	//MOON
	moon = new Phaser.Sprite(this.game, 0, 0, "moon");
	moon.anchor.x = 0.5;
	moon.anchor.y = 0.5;

	moon.pivot.x = 0;
	moon.pivot.y = 200;
	
	moon.height = 70;
	moon.width = 70;

	moon.angularSpeed = 1/14;
	
	//UFO
	ufo = new Phaser.Sprite(this.game, 0, 0, "ufo");
	ufo.anchor.x = 0.5;
	ufo.anchor.y = 0.5;

	ufo.pivot.x = 0;
	ufo.pivot.y = 300;
	
	ufo.height = 64;
	ufo.width = 64;

	ufo.angularSpeed = 0.5;
 
	earth.update = function(){
		this.angle += this.angularSpeed;
	} 

	moon.update = function(){
		this.angle += this.angularSpeed;
	}

	ufo.update = function(){
		this.angle += this.angularSpeed;
		this.pivot.y *= 1 - 1/10000
	}

	earthGroup.addChild(earth);
	this.game.world.addChild(moon);
	this.game.world.addChild(ufo)
}