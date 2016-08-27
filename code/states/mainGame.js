var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";
	this.game.load.image("earth","planetEarth.png");
	this.game.load.image("moon", "moon.png");
	this.game.load.image("ufo", "ufo.png");
	this.game.load.image("pyramida", "egypt.png")
}

mainGameState.create = function (){
	this.game.world.setBounds(-this.game.width/2,-this.game.height/2,this.game.width,this.game.height);
	
	earthGroup = new EarthGroup(this.game, {"earth" : "earth","pyramid" : "pyramida"});
	
	this.game.world.addChild(earthGroup);
	
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
	
	ufo.angularSpeed = 1.2;
	
	moon.update = function(){
		this.angle += this.angularSpeed;
	}

	ufo.update = function(){
		this.angle += this.angularSpeed;
		
		this.pivot.y *= 0.999
	}

	this.game.world.addChild(moon);
	this.game.world.addChild(ufo);
}