function ParticleEmitter (game, name, position, _particleOptions){
	Phaser.Group.call(this, game, null, name, false, true, Phaser.Physics.P2JS);
	
	this.x = position.x === undefined ? 0 : position.x;
	this.y = position.y === undefined ? 0 : position.y;
	
	var particleOptions = _particleOptions === undefined ? {} : _particleOptions;
	
	this.options = {};
	
	this.options.collisionGroup = particleOptions.collisionGroup === undefined ? this.game.physics.p2.createCollisionGroup() : particleOptions.collisionGroup;
	
	this.options.collides = particleOptions.collides === undefined ? [] : particleOptions.collides;
	
	this.options.textureName = particleOptions.textureName === undefined ? "" : particleOptions.textureName;
	
	this.options.size = particleOptions.size === undefined ? {width : 32, height : 32} : particleOptions.size;
	
	this.options.initialVelocity = particleOptions.velocity === undefined ? {x : 0, y : 0} : particleOptions.velocity
	
	this.options.lifespan = particleOptions.lifespan === undefined ? 5000 : particleOptions.lifespan;
	
	this.options.callback = particleOptions.collisionCallback === undefined ? function (){console.log("collision");} : particleOptions.collisionCallback;
	
	this.emitInterval = particleOptions.interval === undefined ? 100 : particleOptions.interval;
	
	this.emittingTimer = new Phaser.Timer(this.game, false);
	this.game.time.add(this.emittingTimer);
	
	this.randomizer = {
		size : {
			low : 0,
			high : 0,
		},
		lifespan : {
			low : 0,
			high : 0,
		},
		velocity : {
			x : {
				low : 0,
				high : 0,
			},
			y : {
				low : 0,
				high : 0,
			},
		},
	};
	
	this.insertIntoDefault(particleOptions.randomizer, this.randomizer);
}
ParticleEmitter.prototype = Object.create( Phaser.Group.prototype );

ParticleEmitter.prototype.emitParticle = function (eX,eY, rewriteOptions){
	/// Specifické vlastnosti při daném volání
	var optionsBuffer = {};
	this.insertIntoDefault(this.options, optionsBuffer);
	this.insertIntoDefault(rewriteOptions, this.options);
	
	/// Pokud nejsou souřadnice, použít souřadnice emitteru
	var x = eX === undefined ? this.x : eX;
	var y = eY === undefined ? this.y : eY;
	/// Je třeba přidávat rovnou do světa, aby byli nezávislé
	if(this.parent){
		x = x + this.parent.world.x;
		y = y + this.parent.world.y;
	}
	
	/// Nová particle
	/// Sprite vlastnosti
	var p = new Phaser.Particle(this.game, x, y, this.options.textureName);
	
	p.width = this.options.size.width + (this.randomizer.size === undefined ? 0 : this.game.rnd.between(this.randomizer.size.low, this.randomizer.size.high));
	p.height = this.options.size.height + (this.randomizer.size === undefined ? 0 : this.game.rnd.between(this.randomizer.size.low, this.randomizer.size.high));
	
	p.lifespan = this.options.lifespan + (this.randomizer.lifespan === undefined ? 0 : this.game.rnd.between(this.randomizer.lifespan.low, this.randomizer.lifespan.high));
	/// Physics vlastnosti
	this.game.world.addChild(p);
	
	this.game.physics.p2.enable(p);
	
	p.body.velocity.x = this.options.initialVelocity.x + (this.randomizer.velocity === undefined ? 0 : this.game.rnd.between(this.randomizer.velocity.x.low, this.randomizer.velocity.x.high));
	p.body.velocity.y = this.options.initialVelocity.y + (this.randomizer.velocity === undefined ? 0 : this.game.rnd.between(this.randomizer.velocity.y.low, this.randomizer.velocity.y.high));
	
	p.body.setCollisionGroup(this.game.collisionManager.groups[this.options.collisionGroup]);
	var collisionGroups = this.game.collisionManager.makeCollides(this.options.collides);
	p.body.collides(collisionGroups);
	
	for(var i in collisionGroups){
		p.body.createGroupCallback(collisionGroups[i], this.options.callback, p);
	}
	
	p.body.debug = true;
	
	p.events.onKilled.add(function(){this.destroy();}, p);
	
	this.options = optionsBuffer;
}

ParticleEmitter.prototype.insertIntoDefault = function (object, changingObject){
	for(var prop in object){
		if(object[prop] instanceof Object && !(object[prop] instanceof Function || object[prop] instanceof Array)){
			if(changingObject[prop] === undefined)
				changingObject[prop] = {};
			this.insertIntoDefault(object[prop], changingObject[prop]);
		}
		else{
			changingObject[prop] = object[prop];
		}
	}
}

ParticleEmitter.prototype.explode = function (n){
	for(var i = 0; i < n; i++){
		this.emitParticle();
	}
}

ParticleEmitter.prototype.startStream = function(n){
	if(n === undefined){
		this.emitParticle();
		this.emittingTimer.loop(this.emitInterval, function(){this.emitParticle();}, this);
	}
	else{
		this.emitParticle();
		if(n > 1){
			this.emittingTimer.repeat(this.emitInterval, n-1, function(){this.emitParticle();}, this);
		}
	}
	this.emittingTimer.start();
	
}

ParticleEmitter.prototype.stopStream = function(){
	
	this.emittingTimer.stop();
	
}