function StructuresManager(game, earth){
	this.game = game;
	
	this.earthGroup = earth;
	
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
					"ufo" : function (){this.destroy();},
				},
			},
			bulletNumber : 5,
			price : 10,
		},
		aztec : {
			textureName : "aztec",
			time : 4500,
			bulletOptions : {
				textureName : "basicBullet", 
				collisionGroup : "bullet", 
				collisionCallbacks : {
					"moon" : function (){},
					"ufo" : function (){this.destroy();},
				},
				interval : 1500,
			},
			bulletNumber : 3,
			price : 10,
		},
		babylon : {
			textureName : "babylon",
			time : 5000,
			bulletOptions : {
				textureName : "basicBullet", 
				collisionGroup : "bullet", 
				collisionCallbacks : {
					"moon" : function (){},
					"ufo" : function (){this.destroy();},
				},
				interval : 700,
			},
			bulletNumber : 10,
			price : 10,
		},
	};
	
	this.activeStructure = "aztec";
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