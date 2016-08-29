var mainGameState = new Phaser.State();

mainGameState.preload = function (){
	this.game.load.path = "assets/";
	
	this.game.load.image("earth","earth.png");
	this.game.load.image("moon", "moon.png");
	
	this.game.load.image("hatak", "hatak.png");
	
	this.game.load.image("pyramida", "egypt2.png");
	this.game.load.image("aztec", "aztec.png");
	this.game.load.image("babylon", "babylon.png");
	
	this.game.load.image("background", "bg.png");
	this.game.load.image("night", "shadowEarth.png");
	this.game.load.image("basicBullet", "basicBullet.png");
	
	this.game.load.spritesheet("selectorButton", "buildButton.png", 18, 18);
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

	// Collision Manager
	
	this.game.collisionManager = new CollisionManager(this.game.physics.p2);
	
	// EARTH GROUP
	
	this.game.earthGroup = new EarthGroup(this.game, {"earth" : "earth","pyramid" : "pyramida", "aztec" : "aztec",});
	
	this.game.world.addChild(this.game.earthGroup);
	
	// Resource Manager
	
	this.game.resourceManager = new ResourceManager(this.game);
	
	// Structures Manager
	
	this.game.structuresManager = new StructuresManager(this.game, this.game.earthGroup);
	
	// GUI Manager
	
	this.game.guiManager = new GUIManager(this.game);
	this.game.guiManager.createSelectorPanel();
	this.game.guiManager.setHandlers();
	
	// Handler pro přidávání struktur
	this.game.input.onTap.add(function(){
		var x = this.game.input.activePointer.worldX;
		var y = this.game.input.activePointer.worldY;
		var clickAngle = this.getSimpleAngle(x,y);
		
		var active = this.game.structuresManager.activeStructure;
		
		if(!active)
			return;
		var canBuild = this.game.resourceManager.payStructure(active);
		if(canBuild){
			var newStructure = new EarthStructure(
				this.game,
				this.game.earthGroup.earth,
				clickAngle,
				active
			);
			this.game.earthGroup.earth.addChild(newStructure);
			
			this.game.structuresManager.build(newStructure);
		}
	}, this.game.earthGroup);
	
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
	this.game.moon = moon;
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
	ufo = new UFO(this.game, "hatak", 500,0);
	
	this.game.physics.p2.enable(ufo, this.game.collisionManager.debug);
	
	ufo.body.setRectangle(48,48);
	
	//ufo.body.velocity.y = 500;
	ufo.body.mass = 1;
	
	this.game.physics.p2.createSpring(ufo.body, this.game.earthGroup.earth.body, this.game.earthGroup.earth.radius, 2, 0.0001);
	
	this.game.collisionManager.setCollisionsByClass(ufo, "ufo", false);
	
	ufo.body.motionState = this.game.collisionManager.motionStates.dynamic;
	
	this.game.world.addChild(ufo);
	
};
