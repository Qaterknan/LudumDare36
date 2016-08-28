function EarthStructure(game, earth, plainAngle, textureName, bulletOptions){
	Phaser.Sprite.call(this, game, 0,0,textureName);
	
	var angle = plainAngle - earth.angle;
	
	this.earth = earth;
	
	this.anchor.x = 0.5;
	this.anchor.y = 1.0;
	
	this.x = earth.radius/(earth.scale.x)*Math.cos(this.game.math.degToRad(angle));
	this.y = earth.radius/(earth.scale.y)*Math.sin(this.game.math.degToRad(angle));
	
	this.width = this.width/earth.scale.x;
	this.height = this.height/earth.scale.y;
	
	this.angle = angle + 90;
	
	this.inputEnabled = true;
	
	this.weapon = new ParticleEmitter(this.game, "weapon", {x : 0, y : 0}, bulletOptions);
	this.addChild(this.weapon);
	
	this.events.onInputDown.add(function(){
		this.weapon.startStream(1);
	}, this);
	
}
EarthStructure.prototype = Object.create( Phaser.Sprite.prototype );

EarthStructure.prototype.update = function (){
	/// Updatuje rychlost zbraně, aby střeli letěly od planety
	var positionVector = new Phaser.Point(this.x, this.y);
	positionVector.rotate(0, 0, this.earth.angle, true);
	normalizedX = positionVector.x/this.earth.radius;
	normalizedY = positionVector.y/this.earth.radius;
	
	this.weapon.options.initialVelocity.x = normalizedX*300;
	this.weapon.options.initialVelocity.y = normalizedY*300;
}