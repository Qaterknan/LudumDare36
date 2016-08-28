function CollisionManager (physics){
	
	this.physics = physics;
	
	this.debug = true;
	
	this.groupList = [
		"ufo",
		"moon",
		"earth",
		"bullet",
		"laser",
		"other"
	];
	
	this.groups = {};
	
	this.generateGroups();
	
	this.motionStates = {
		"dynamic" : Phaser.Physics.P2.Body.DYNAMIC,
		"kinematic" : Phaser.Physics.P2.Body.KINEMATIC,
		"static" : Phaser.Physics.P2.Body.STATIC,
	};
	
	this.collisionMap = {
		ufo : [
			"moon",
			"earth",
			"bullet",
			"laser"
		],
		moon : [
			"ufo",
			"bullet",
			"other"
		],
		earth : [
			"ufo",
			"other"
		],
		bullet : [
			"ufo",
			"moon",
		],
		laser : [
			"ufo"
		],
		other : [
			"moon",
			"earth"
		],
	};
}

CollisionManager.prototype.generateGroups = function (){
	for(var i = 0; i< this.groupList.length; i++){
		this.groups[this.groupList[i]] = this.physics.createCollisionGroup();
	};
}

CollisionManager.prototype.getCollides = function (id){
	var result = [];
	
	for(var i in this.collisionMap[id]){
		result[i] = this.groups[this.collisionMap[id][i]];
	}
	
	return result;
}

CollisionManager.prototype.setCollisionsByClass = function (sprite, class_id, enablePhysics){
	if(enablePhysics){
		this.physics.enable(sprite, this.debug);
	}
	sprite.body.setCollisionGroup(this.groups[class_id]);
	sprite.body.collides(this.getCollides(class_id));
}