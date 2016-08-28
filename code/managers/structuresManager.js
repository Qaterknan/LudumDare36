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
		},
		aztek : {
			textureName : "aztec",
			time : 4500,
		},
	};
}
StructuresManager.prototype.build = function (structure){
	
	structure.alpha = 0.5;
	structure.buildingDone = false;
	console.log(this.structures[structure.buildingClass].time);
	this.timer.add(this.structures[structure.buildingClass].time, function(){
		structure.alpha = 1.0;
		structure.buildingDone = true;
		this.timer.stop();
	}, this);
	
	this.timer.start();
}