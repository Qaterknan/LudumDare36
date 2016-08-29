function ResourceManager(game){
	this.resourceAvailable = 30;
	
	this.game = game;
}
ResourceManager.prototype.buildStructure = function (name){
	if(this.game.structuresManager.structures[name].price <= this.resourceAvailable){
		this.resourceAvailable -= this.game.structuresManager.structures[name].price;
		return true;
	}
	else{
		return false;
	}
};