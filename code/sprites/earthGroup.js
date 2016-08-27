function EarthGroup(game, textureNames){
	Phaser.Group.call(this, game, null, "earthGroup");
	/// Země
	this.earth = new Phaser.Sprite(this.game, 0,0,textureNames.earth);
	this.earth.anchor.x = 0.5;
	this.earth.anchor.y = 0.5;
	
	this.earth.height = 200;
	this.earth.width = 200;
	/// Otestovat, jestli takhle nebo odmocninou
	this.earthRadius = this.earth.width;
	
	this.earth.angularSpeed = 1;
	this.earth.update = function(){
		this.angle += this.angularSpeed;
	}
	
	this.addChild(this.earth);
	/// Pyramida
	var pyramid = new Phaser.Sprite(this.game, 0,0,textureNames.pyramid);
	pyramid.anchor.x = 0.5;
	pyramid.anchor.y = 1;
	pyramid.width = pyramid.width/this.earth.scale.x;
	pyramid.height = pyramid.height/this.earth.scale.y;
	pyramid.position.y = -this.earth.height/(2*this.earth.scale.y);
	
	this.earth.addChild(pyramid);
}
EarthGroup.prototype = Object.create( Phaser.Group.prototype );

EarthGroup.prototype.addStructure = function (angle, textureName){
	/// Zatím jenom pyramida
	var structure = new Phaser.Sprite(this.game, 0, 0, textureName);
	
	structure.anchor.x = 0.5;
	structure.anchor.y = 1.0;
	
	structure.position.x = this.earthRadius/(2*this.earth.scale.x)*Math.cos(this.game.math.degToRad(angle));
	structure.position.y = this.earthRadius/(2*this.earth.scale.y)*Math.sin(this.game.math.degToRad(angle));
	
	structure.width = structure.width/this.earth.scale.x;
	structure.height = structure.height/this.earth.scale.y;
	
	structure.angle = angle+90;
	
	this.earth.addChild(structure);
}