function CollisionManager (physics){
	
	this.physics = physics;
	
	this.debug = true;
	
	this.groupList = [
		"ufo",
		"moon",
		"moonFlail",
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
			"moonFlail",
			"earth",
			"bullet",
			"laser"
		],
		moon : [
			"bullet",
			"other"
		],
		moonFlail : [
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
			"moonFlail",
		],
		laser : [
			"ufo"
		],
		other : [
			"moon",
			"moonFlail",
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

CollisionManager.prototype.setCollisionCallbacks = function (sprite, classObject){
	for(var i in classObject){
		sprite.body.createGroupCallback(this.groups[i], classObject[i], sprite);
	}
}