function ResourceManager(game){
	this.resourceAvailable = 10;
	
	this.game = game;
	
	this.structureRequirements = {
		"pyramid" : 10,
	};
}
ResourceManager.prototype.buildStructure = function (name){
	if(this.structureRequirements[name] <= this.resourceAvailable){
		this.resourceAvailable -= this.structureRequirements[name];
		return true;
	}
	else{
		return false;
	}
};