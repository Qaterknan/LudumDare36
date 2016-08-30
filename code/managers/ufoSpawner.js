function UFOSpawner(game){
	
	this.game = game;
	
	this.timer = new Phaser.Timer(this.game, false);
	this.game.time.add(this.timer);
	
	this.levels = {
		// LEVEL 1
		level_1 : {
			waves : {
				5000 : [
					"tyranid:X:10",
					"hatak:X:2"
				],
				15000 : [
					"tyranid:X:5",
				],
			},
			total : 17,
			spawnAreas : {
				5000 : {
					x : [
						{
							min : 350,
							max : 450,
						}
					],
					y : [
						{
							min : 100,
							max : 200,
						},
						{
							min : -200,
							max : -100
						}
					],
				},
				15000 : {
					x : [
						{
							min : 350,
							max : 450,
						}
					],
					y : [
						{
							min : 100,
							max : 200,
						},
						{
							min : -200,
							max : -100
						}
					],
				},
			},
		},
		// LEVEL 2
	};
	
	this.currentLevel = false;
	
	this.remainingTotal = 0;
}
UFOSpawner.prototype.decode = function (str){
	if(str.includes(":X:")){
		var arr = str.split(":X:");
		return [arr[0], parseInt(arr[1])];
	}
	else
		return [str, 1];
}
UFOSpawner.prototype.spawnWave = function (time){
	var codes = this.levels[this.currentLevel].waves[time];
	var spawnAreas = this.levels[this.currentLevel].spawnAreas[time];
	var spawnArray, xArea, yArea,x,y;
	for(var i in codes){
		spawnArray = this.decode(codes[i]);
		for(var i = 0; i < spawnArray[1]; i++){
			xArea = this.game.rnd.pick(spawnAreas.x);
			yArea = this.game.rnd.pick(spawnAreas.y);
			
			x = this.game.rnd.between(xArea.min, xArea.max);
			y = this.game.rnd.between(yArea.min, yArea.max);
			this.spawn(spawnArray[0], x,y);
		}
	}
}

UFOSpawner.prototype.spawn = function (type, x,y){
	if(type == "tyranid"){
		this.game.world.addChild(new Tyranid(this.game, x,y,true));
	}
}

UFOSpawner.prototype.startLevel = function(name){
	if(this.levels[name]){
		this.remainingTotal = this.levels[name].total;
		
		for(var i in this.levels[name].waves){
			this.timer.add(parseInt(i), function (){this.spawnWave(i+"");}, this);
		}
		
		this.timer.start();
	}
}