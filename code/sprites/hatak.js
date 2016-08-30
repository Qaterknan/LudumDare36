function Hatak(game,x,y,animation, textureName){
	UFO.call(this, game, x,y,"hatak", animation, textureName);
	
	this.body.mass = 3;
	
	this.game.physics.p2.createSpring(this.body, this.game.earthGroup.earth.body, this.game.earthGroup.earth.radius, 1, 0.2);
	
	var positionLength = Math.sqrt(x*x+y*y);
	
	var switchingNumber = this.game.rnd.pick([-1,1]); 
	this.body.velocity.x = switchingNumber*y/positionLength*120;
	this.body.velocity.y = -switchingNumber*x/positionLength*120;
}
Hatak.prototype = Object.create( UFO.prototype );