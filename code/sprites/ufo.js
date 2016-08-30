function UFO (game,x,y, classID, animation, textureName){
	
	this.game = game;
	
	this.classID = classID;
	// Prozatimně
	this.textureName = textureName === undefined ? classID : textureName;
	
	Phaser.Sprite.call(this, this.game, x,y,this.textureName);
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.height = 64;
	this.width = 64;
	
	this.angle = this.game.earthGroup.getEarthBaseAngle(this.x, this.y);
	
	if(animation){
		this.animations.add("fly", [0,1,2], 12, true);

		this.animations.play("fly");
	}
	
	this.smoothed = false;
	
	this.health = 10;
	this.attack = 5;
	
	this.events.onKilled.add(function(){this.destroy();}, this);
	
	this.game.physics.p2.enable(this, this.game.collisionManager.debug);
	
	this.body.setRectangle(48,48);
	
	this.game.collisionManager.setCollisionsByClass(this, "ufo", false);
	
	this.game.collisionManager.setCollisionCallbacks(this, {
		"bullet" : function(ufoBody, bulletBody){
			if(bulletBody.sprite){ // Pokud už nezačal ničící proces
				this.damage(bulletBody.sprite.attack);
				bulletBody.sprite.destroy();
			}
		},
		"earth" : function (ufoBody, earthBody){
			if(ufoBody.sprite){
				earthBody.sprite.damage(this.attack);
				this.game.guiManager.updateText("healthText", earthBody.sprite.health);
				ufoBody.sprite.destroy();
			}
		}
	});
	
	this.body.motionState = this.game.collisionManager.motionStates.dynamic;
	
};
UFO.prototype = Object.create( Phaser.Sprite.prototype );

UFO.prototype.update = function (){
	this.body.rotation = this.game.math.degToRad(this.game.earthGroup.getEarthBaseAngle(this.x, this.y));
}