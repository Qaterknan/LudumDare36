function UFO (game, classID, x,y){
	
	this.game = game;
	
	this.classID = classID;
	
	this.textureName = "hatak";
	
	Phaser.Sprite.call(this, this.game, x,y,this.textureName);
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.height = 64;
	this.width = 64;
	
	this.angle = this.game.earthGroup.getEarthBaseAngle(this.x, this.y);
	
};
UFO.prototype = Object.create( Phaser.Sprite.prototype );

UFO.prototype.update = function (){
	this.body.rotation = this.game.math.degToRad(this.game.earthGroup.getEarthBaseAngle(this.x, this.y));
}