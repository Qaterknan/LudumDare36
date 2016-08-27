function EarthGroup(game, textureNames){
	Phaser.Group.call(this, game, null, "earthGroup");
	/// Země
	this.earth = new Phaser.Sprite(this.game, 0,0,textureNames.earth);
	this.earth.anchor.x = 0.5;
	this.earth.anchor.y = 0.5;
	
	this.earth.height = 200;
	this.earth.width = 200;
	
	this.earthRadius = this.earth.width/2;
	
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
		earthGroup.addStructure(clickAngle - earthGroup.earth.angle, "pyramida");
	});
}
EarthGroup.prototype = Object.create( Phaser.Group.prototype );

EarthGroup.prototype.addStructure = function (angle, textureName){
	/// Zatím jenom pyramida
	var structure = new Phaser.Sprite(this.game, 0, 0, textureName);
	
	structure.anchor.x = 0.5;
	structure.anchor.y = 1.0;
	
	structure.position.x = this.earthRadius/(this.earth.scale.x)*Math.cos(this.game.math.degToRad(angle));
	structure.position.y = this.earthRadius/(this.earth.scale.y)*Math.sin(this.game.math.degToRad(angle));
	
	structure.width = structure.width/this.earth.scale.x;
	structure.height = structure.height/this.earth.scale.y;
	
	structure.angle = angle+90;
	
	this.earth.addChild(structure);
}