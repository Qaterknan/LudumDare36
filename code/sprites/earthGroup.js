function EarthGroup(game, textureNames){
	Phaser.Group.call(this, game, null, "earthGroup");
	/// Země
	this.earth = new Phaser.Sprite(this.game, 0,0,textureNames.earth);
	this.earth.anchor.x = 0.5;
	this.earth.anchor.y = 0.5;
	
	this.earth.height = 200;
	this.earth.width = 200;
	
	this.earth.radius = this.earth.width/2;
	
	this.earth.health = 100;
	
	/// Physics (druhý argument je debug)
	this.game.physics.p2.enable(this.earth, true);
	this.earth.body.angularVelocity = 1;
	this.earth.body.setCircle(this.earth.radius);
	this.earth.body.motionState = this.earth.body.KINEMATIC;
	this.earth.body.mass = Infinity;
	this.game.collisionManager.setCollisionsByClass(this.earth, "earth", false);
	
	this.addChild(this.earth);
	
	this.textureNames = textureNames;
}
EarthGroup.prototype = Object.create( Phaser.Group.prototype );

EarthGroup.prototype.update = function (){
	for(var i in this.children){
		this.children[i].update();
		this.update.call(this.children[i]);
	}
}

EarthGroup.prototype.getSimpleAngle = function (x,y){
	var point = new Phaser.Point(-x,-y);
	return this.game.math.radToDeg(point.angle({x : 1, y : 0}));
}

EarthGroup.prototype.getEarthBaseAngle = function(x,y){
	var simpleAngle = this.getSimpleAngle(x,y);
	return simpleAngle+90;
}