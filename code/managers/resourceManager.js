function ResourceManager(game){
	this.resourceAvailable = 0;
	
	this.game = game;
}
ResourceManager.prototype.payStructure = function (name){
	if(this.game.structuresManager.structures[name].price <= this.resourceAvailable){
		this.resourceAvailable -= this.game.structuresManager.structures[name].price;
		this.game.guiManager.updateText("resourcesText", this.resourceAvailable);
		return true;
	}
	else{
		return false;
	}
};

ResourceManager.prototype.levelParse = function (options){
	this.resourceAvailable = options.resourceAvailable + 100;
}