function EarthStructure(game, earth, plainAngle, textureName){
	Phaser.Sprite.call(this, game, 0,0,textureName);
	
	var angle = plainAngle - earth.angle;
	
	this.anchor.x = 0.5;
	this.anchor.y = 1.0;
	
	this.position.x = earth.radius/(earth.scale.x)*Math.cos(this.game.math.degToRad(angle));
	this.position.y = earth.radius/(earth.scale.y)*Math.sin(this.game.math.degToRad(angle));
	
	this.width = this.width/earth.scale.x;
	this.height = this.height/earth.scale.y;
	
	this.angle = angle + 90;
	
	this.inputEnabled = true;
	
	this.events.onInputDown.add(function(){
		console.log("fire");
	}, this);
}
EarthStructure.prototype = Object.create( Phaser.Sprite.prototype );