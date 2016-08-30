var level_1 = new Phaser.State();

level_1.preload = function (){
	this.game.load.path = "assets/";
	
	this.game.load.image("earth","earth.png");
	this.game.load.image("moon", "moon.png");
	
	this.game.load.spritesheet("hatak", "hatak.png", 16, 16);
	this.game.load.spritesheet("tyranid", "tyranid.png", 16, 16);
	
	this.game.load.image("pyramida", "egypt2.png");
	this.game.load.image("aztec", "aztec.png");
	this.game.load.image("babylon", "babylon.png");
	
	this.game.load.image("background", "bg.png");
	this.game.load.image("night", "shadowEarth.png");
	this.game.load.image("basicBullet", "basicBullet.png");
	
	this.game.load.spritesheet("selectorButton", "buildButton.png", 18, 18);
}

level_1.create = function (){
	// Fyzika
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	this.game.physics.p2.setImpactEvents(true);
	// Užitečné proměnné
	var width = this.game.width;
	var height = this.game.height;
	this.game.world.setBounds(-width/2,-height/2,width,height);
	
	// Reset timerů
	this.game.time.reset();
	this.game.time.add(this.game.structuresManager.timer);
	this.game.time.add(this.game.ufoSpawner.timer);
	

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
	
	// GUI Manager
	
	this.game.guiManager.resetGroup();
	
	// Nastavení dovolených budov
	this.game.guiManager.buildings = [];
	this.game.guiManager.buttonObjects = [];
	
	for(var i in this.game.structuresManager.structures){
		if(this.game.structuresManager.structures[i].available){
			this.game.guiManager.selectorPanel.buildings.push(i);
		}
	}
	
	this.game.guiManager.createSelectorPanel();
	this.game.guiManager.setHandlers();
	
	// Nastavení textů
	
	this.game.guiManager.createTexts();
	
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
	
	this.game.ufoSpawner.startLevel("level_"+this.game.level);
	
};
