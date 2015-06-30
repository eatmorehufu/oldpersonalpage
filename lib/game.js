(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function(canvasEl) {
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = 4;
  this.addAsteroids();
  this.ship = new Asteroids.Ship({game: this});
  this.bullets = [];
};

Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this
    }));
  };
};

Game.prototype.randomPosition = function() {
  return [(Math.random() * this.DIM_X), (Math.random() * this.DIM_Y)];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(piece) {
    piece.draw(ctx);
  });
};

Game.prototype.moveObjects = function(){
  this.allObjects().forEach(function(piece) {
    piece.move();
  });
};

Game.prototype.render = function(ctx){
  this.step();
  this.draw(ctx);
  this.getMovement();
  this.getShooting();
  this.addFriction();
};

Game.prototype.addFriction = function (){
  this.ship.vel[0] *= 0.98;
  this.ship.vel[1] *= 0.98;
};

Game.prototype.getMovement = function() {
  var game = this;
  var thrust = 2;
  if (key.isPressed('up') && !key.isPressed('down')) {
    game.ship.power([0, thrust * -1]);
  };
  if (key.isPressed('down') && !key.isPressed('up')) {
    game.ship.power([0, thrust]);
  };
  if (key.isPressed('left') && !key.isPressed('right')) {
    game.ship.power([-1 * thrust, 0]);
  };
  if (key.isPressed('right') && !key.isPressed('left')) {
    { game.ship.power([thrust, 0]) };
  };
};

Game.prototype.getShooting = function() {
  var shootVector = [0,0]
  var game = this;
  if (game.bulletTime === true) {
    if (key.isPressed('a')) {
      shootVector[0] -= 1;
    };
    if (key.isPressed('w')) {
      shootVector[1] -= 1;
    };
    if (key.isPressed('s')) {
      shootVector[1] += 1;
    };
    if (key.isPressed('d')) {
      shootVector[0] += 1;
    };
    if (shootVector[0] !== 0 || shootVector[1] !== 0) {
      this.bulletTime = false;
      this.ship.fireBullet(shootVector);
    };
  };
};

Game.prototype.resetBullets = function () {
  this.bulletTime = true;
}


Game.prototype.wrap = function(pos) {
  var wrapX = pos[0];
  var wrapY = pos[1];
  if(wrapX > this.DIM_X){
    wrapX -= this.DIM_X;
  };
  if(wrapX < 0) {
    wrapX += this.DIM_X;
  };
  if(wrapY > this.DIM_Y){
    wrapY -= this.DIM_Y;
  };
  if(wrapY < 0){
    wrapY += this.DIM_Y;
  };
  return [wrapX, wrapY]
};

Game.prototype.checkCollisions = function() {
  var allObjs = this.allObjects();
  for (var i = 0; i < allObjs.length - 1; i++ ) {
    for (var j = i + 1; j < allObjs.length; j++) {
      if (allObjs[i].isCollidedWith(allObjs[j])) {
        if (
          (allObjs[i] instanceof Asteroids.Ship && allObjs[j] instanceof Asteroids.Asteroid) ||
          (allObjs[j] instanceof Asteroids.Ship && allObjs[i] instanceof Asteroids.Asteroid)
        ) {
          this.ship.relocate();
        };
        if (this.bulletHitsAsteroid(allObjs[i], allObjs[j])){
          this.remove(allObjs[i]);
          this.remove(allObjs[j]);
        };
        if (
          allObjs[i] instanceof Asteroids.Asteroid &&
          allObjs[j] instanceof Asteroids.Asteroid
        ) {
          allObjs[i].vel = Asteroids.Util.randomVec(2);
          allObjs[j].vel = Asteroids.Util.randomVec(2);
        };
      };
    };
  };

};

Game.prototype.bulletHitsAsteroid = function(obj1, obj2) {
  if (
    (obj1 instanceof Asteroids.Asteroid && obj2 instanceof Asteroids.Bullet) ||
    (obj2 instanceof Asteroids.Asteroid && obj1 instanceof Asteroids.Bullet)
  ) {
      return true;
    } else {
      return false;
    };
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  var game = this;
  if(obj instanceof Asteroids.Asteroid) {
    if (obj.radius > 10) {
      for (i = 0; i < 2; i++) {
        game.asteroids.push(new Asteroids.Asteroid({
          pos: obj.pos,
          radius: obj.radius / 2,
          game: obj.game
        }));
      };
    };
    game.asteroids.splice(game.asteroids.indexOf(obj), 1)
  };
  if (obj instanceof Asteroids.Bullet) {
    game.bullets.splice(game.bullets.indexOf(obj), 1);
  };
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

Game.prototype.maxSpeed = function(speedX, speedY) {
  var speedLimit = 7;
  if ((speedLimit * speedLimit) < ((speedX * speedX) + (speedY * speedY))) {
    return this.maxSpeed(speedX * 0.9, speedY * 0.9);
  };
  return [speedX, speedY];
};


})();
