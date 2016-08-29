function StructuresManager(game){
	this.game = game;
	
	this.timer = new Phaser.Timer(this.game, false);
	this.game.time.add(this.timer);
	
	this.structures = {
		pyramid : {
			textureName : "pyramida",
			time : 3000,
			bulletOptions : {
				textureName : "basicBullet", 
				collisionGroup : "bullet", 
				collisionCallbacks : {
					"moon" : function (){},
					"ufo" : function (){},
				},
				size : {
					width : 8,
					height : 8,
				},
			},
			bulletNumber : 5,
			price : 10,
			available : true,
		},
		aztec : {
			textureName : "aztec",
			time : 4500,
			bulletOptions : {
				textureName : "basicBullet", 
				collisionGroup : "bullet", 
				collisionCallbacks : {
					"moon" : function (){},
					"ufo" : function (){},
				},
				interval : 1500,
			},
			bulletNumber : 3,
			price : 10,
			available : true,
		},
		babylon : {
			textureName : "babylon",
			time : 5000,
			bulletOptions : {
				textureName : "basicBullet", 
				collisionGroup : "bullet", 
				collisionCallbacks : {
					"moon" : function (){},
					"ufo" : function (){},
				},
				interval : 700,
			},
			bulletNumber : 10,
			price : 10,
			available : false,
		},
	};
	
	this.activeStructure = "pyramid";
}
StructuresManager.prototype.build = function (structure){
	
	structure.alpha = 0.5;
	structure.buildingDone = false;
	
	this.timer.add(this.structures[structure.buildingClass].time, function(){
		structure.alpha = 1.0;
		structure.buildingDone = true;
	}, this);
	
	this.timer.start();
}