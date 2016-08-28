function EarthGroup(game, textureNames){
	Phaser.Group.call(this, game, null, "earthGroup");
	/// Země
	this.earth = new Phaser.Sprite(this.game, 0,0,textureNames.earth);
	this.earth.anchor.x = 0.5;
	this.earth.anchor.y = 0.5;
	
	this.earth.height = 200;
	this.earth.width = 200;
	
	this.earth.radius = this.earth.width/2;
	
	/// Physics (druhý argument je debug)
	this.game.physics.p2.enable(this.earth, false);
	this.earth.body.angularVelocity = 1;
	this.earth.body.setCircle(this.earthRadius);
	this.earth.body.motionState = this.earth.body.KINEMATIC;
	
	this.addChild(this.earth);
	/// Handler pro přidávání struktur
	this.game.input.onTap.add(function(){
		var x = this.game.input.activePointer.worldX;
		var y = this.game.input.activePointer.worldY;
		var point = new Phaser.Point(-x,-y);
		var clickAngle = this.game.math.radToDeg(point.angle({x : 1, y : 0}));
		var canBuild = this.game.resourceManager.buildStructure("pyramid", clickAngle);
		if(canBuild)
			this.addStructure(clickAngle, this.textureNames["pyramid"], {textureName : "basicBullet", collisionGroup : "bullet", collisionCallback : function (){console.log("hello");},});
	}, this);
	
	this.textureNames = textureNames;
}
EarthGroup.prototype = Object.create( Phaser.Group.prototype );

EarthGroup.prototype.addStructure = function (angle, textureName, bulletOptions){
	/// Zatím jenom pyramida
	this.earth.addChild(new EarthStructure(this.game, this.earth, angle, textureName, bulletOptions));
}

EarthGroup.prototype.update = function (){
	for(var i in this.children){
		this.children[i].update();
		this.update.call(this.children[i]);
	}
}