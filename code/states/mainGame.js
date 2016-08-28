var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";

	this.game.load.image("earth","planetEarth.png");
	this.game.load.image("moon", "moon.png");
	this.game.load.image("ufo", "ufo.png");
	this.game.load.image("pyramida", "egypt.png");
	this.game.load.image("background", "bg.png");
	this.game.load.image("night", "shadowEarth.png")
	this.game.load.image("basicBullet", "basicBullet.png")
}

mainGameState.create = function (){
	// Fyzika
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	this.game.physics.p2.setImpactEvents(true);
	// Užitečné proměnné
	var width = this.game.width;
	var height = this.game.height;
	this.game.world.setBounds(-width/2,-height/2,width,height);

	//STAR GROUP - pomalu rotující pozadí
	var starGroup
	var background = new Phaser.Sprite(this.game, 0, 0, "background");
	background.anchor.x = 0.5;
	background.anchor.y = 0.5;

	background.pivot.x = 0;
	background.pivot.y = 0;

	var dim = Math.round(
		Math.sqrt(Math.pow(width,2) + Math.pow(height,2))
	);
	background.height = dim;
	background.width = dim;

	background.z;

	background.angularSpeed = 1/50;
	
	background.update = function() {
		this.angle += this.angularSpeed;
	};

	this.game.world.addChild(background);

	// EARTH GROUP
	
	this.game.earthGroup = new EarthGroup(this.game, {"earth" : "earth","pyramid" : "pyramida"});
	
	this.game.world.addChild(this.game.earthGroup);
	
	// Resource Manager
	
	this.game.resourceManager = new ResourceManager(this.game);
	
	// Collision Manager
	
	this.game.collisionManager = new CollisionManager(this.game.physics.p2);
	
	//NIGHT
	night = new Phaser.Sprite(this.game, 0,0,"night");
	night.anchor.x = 0.5;
	night.anchor.y = 0.5;
	
	night.height = 200;
	night.width = 200;
	
	night.angularSpeed = 0.01;
	
	this.game.earthGroup.addChild(night);
	
	night.update = function(){
		this.angle += this.angularSpeed;
	}
	
	//MOON
	moon = new Phaser.Sprite(this.game, 0, 0, "moon");
	moon.anchor.x = 0.5;
	moon.anchor.y = 0.5;

	moon.pivot.x = 0;
	moon.pivot.y = 200;
	
	moon.height = 70;
	moon.width = 70;
	
	this.game.physics.p2.enable(moon, this.game.collisionManager.debug);
	moon.body.setCircle(moon.width/2, -moon.pivot.x, -moon.pivot.y);
	moon.body.motionState = this.game.collisionManager.motionStates.kinematic;
	moon.body.angularVelocity = 1/14;
	
	this.game.collisionManager.setCollisionsByClass(moon, "moon", false);
	
	this.game.world.addChild(moon);
	
	//UFO - poté odstranit
	ufo = new Phaser.Sprite(this.game, 0, 0, "ufo");
	ufo.anchor.x = 0.5;
	ufo.anchor.y = 0.5;
	
	ufo.pivot.x = -100;
	ufo.pivot.y = 200;
	
	ufo.height = 64;
	ufo.width = 64;
	
	this.game.physics.p2.enable(ufo, this.game.collisionManager.debug);
	ufo.body.setRectangle(48,48,100,-200);
	this.game.collisionManager.setCollisionsByClass(ufo, "ufo", false);
	
	ufo.body.motionState = this.game.collisionManager.motionStates.kinematic;
	
	this.game.world.addChild(ufo);
	
};
