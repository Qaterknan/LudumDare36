function CollisionManager (physics){
	
	this.groups = {};
	
	this.groups.ufoColGroup = physics.createCollisionGroup();
	this.groups.otherColGroup = physics.createCollisionGroup();
}
CollisionManager.prototype.makeCollides = function (strArray){
	var result = [];
	
	for(var i in strArray){
		result[i] = this.groups[strArray[i]];
	}
	
	return result;
}