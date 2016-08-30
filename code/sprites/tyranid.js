function Tyranid(game,x,y,animation, textureName){
	UFO.call(this, game, x,y,"tyranid", animation, textureName);
	
	this.body.mass = 3;
	
	this.game.physics.p2.createSpring(this.body, this.game.earthGroup.earth.body, this.game.earthGroup.earth.radius, 3, 0.7);
	
	var positionLength = Math.sqrt(x*x+y*y);
	
	var switchingNumber = this.game.rnd.pick([-1,1]); 
	this.body.velocity.x = switchingNumber*y/positionLength*250;
	this.body.velocity.y = -switchingNumber*x/positionLength*250;
}
Tyranid.prototype = Object.create( UFO.prototype );