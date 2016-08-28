function ResourceManager(game, earthGroup){
	this.resourceAvailable = 20;
	
	this.game = game;
	this.earthGroup = earthGroup;
	
	this.structureRequirements = {
		"pyramid" : 10,
	};
	
	this.textureNames = {
		"pyramid" : "pyramid",
	};
}
ResourceManager.prototype.buildStructure = function (name, angle){
	if(this.structureRequirements[name] <= this.resourceAvailable){
		this.resourceAvailable -= this.structureRequirements[name];
		this.earthGroup.addStructure(angle, this.textureNames[name]);
		return true;
	}
	else{
		return false;
	}
};