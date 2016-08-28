function ParticleEmitter (game, name, position, _particleOptions){
	Phaser.Group.call(this, game, null, name, false, true, Phaser.Physics.P2JS);
	
	this.x = position.x === undefined ? 0 : position.x;
	this.y = position.y === undefined ? 0 : position.y;
	
	var particleOptions = _particleOptions === undefined ? {} : _particleOptions;
	
	this.particleCollisionGroup = particleOptions.collisionGroup === undefined ? this.game.physics.p2.createCollisionGroup() : particleOptions.collisionGroup;
	
	this.collides = particleOptions.collides === undefined ? [] : particleOptions.collides;
	
	this.particleTextureName = particleOptions.textureName === undefined ? "" : particleOptions.textureName;
	
	this.particleSize = particleOptions.size === undefined ? {width : 32, height : 32} : particleOptions.size;
	
	this.particleInitialVelocity = particleOptions.velocity === undefined ? {x : 0, y : 0} : particleOptions.velocity
	
	this.particleLifespan = particleOptions.lifespan === undefined ? 5000 : particleOptions.lifespan;
	
	this.collisionCallback = particleOptions.collisionCallback === undefined ? function (){console.log("collision");} : particleOptions.collisionCallback;
	
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

ParticleEmitter.prototype.emitParticle = function (eX,eY){
	/// Pokud nejsou souřadnice, použít souřadnice emitteru
	var x = eX === undefined ? this.x : eX;
	var y = eY === undefined ? this.y : eY;
	/// Nová particle
	/// Sprite vlastnosti
	var p = new Phaser.Particle(this.game, x, y, this.particleTextureName);
	
	p.width = this.particleSize.width + (this.randomizer.size === undefined ? 0 : this.game.rnd.between(this.randomizer.size.low, this.randomizer.size.high));
	p.height = this.particleSize.height + (this.randomizer.size === undefined ? 0 : this.game.rnd.between(this.randomizer.size.low, this.randomizer.size.high));
	
	p.lifespan = this.particleLifespan + (this.randomizer.lifespan === undefined ? 0 : this.game.rnd.between(this.randomizer.lifespan.low, this.randomizer.lifespan.high));
	/// Physics vlastnosti
	this.add(p);
	
	p.body.offset.x = -x;
	p.body.offset.y = -y;
	
	p.body.velocity.x = this.particleInitialVelocity.x + (this.randomizer.velocity === undefined ? 0 : this.game.rnd.between(this.randomizer.velocity.x.low, this.randomizer.velocity.x.high));
	p.body.velocity.y = this.particleInitialVelocity.y + (this.randomizer.velocity === undefined ? 0 : this.game.rnd.between(this.randomizer.velocity.y.low, this.randomizer.velocity.y.high));
	
	p.body.setCollisionGroup(this.particleCollisionGroup);
	p.body.collides(this.collides, this.collisionCallback);
	
	p.body.debug = true;
	
	p.events.onKilled.add(function(){this.destroy();}, p);
}

ParticleEmitter.prototype.insertIntoDefault = function (object, changingObject){
	for(var prop in object){
		if(object[prop] instanceof Object){
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
		if(n > 0){
			this.emitParticle();
			this.emittingTimer.repeat(this.emitInterval, n-1, function(){this.emitParticle();}, this);
		}
	}
	this.emittingTimer.start();
	
}

ParticleEmitter.prototype.stopStream = function(){
	
	this.emittingTimer.stop();
	
}