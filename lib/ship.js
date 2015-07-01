(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var Ship = Asteroids.Ship = function(obj){
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: Ship.COLOR,
    radius: Ship.RADIUS,
    pos: obj.game.randomPosition(),
    vel: Ship.VEL,
    magnitude: 0
  });
};

Ship.RADIUS = 10;
Ship.COLOR = "#F00";
Ship.VEL = [0,0];
//
// Ship.sprite = new Image();
// Ship.sprite.src = 'assets/ship.gif';

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

Ship.prototype.relocate = function () {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
};

// Ship.prototype.draw = function () {
//   ctx.drawImage(Asteroids.sprite, 0, 0, 60, 60, this.pos[0], this.pos[1], 60, 60);
// };

Ship.prototype.power = function(impulse) {
  var nextVel = [
    (this.vel[0] * this.magnitude + impulse[0]),
    (this.vel[1] * this.magnitude + impulse[1])
  ];
  var newSpeed = Asteroids.Util.getMagnitude(nextVel);
  var newVel = Asteroids.Util.normalizeVec(nextVel);
  this.vel[0] = newVel[0];
  this.vel[1] = newVel[1];
  if (newSpeed > 10) {
    this.magnitude = 10;
  } else{
    this.magnitude = newSpeed;
  };
};

Ship.prototype.fireBullet = function (vec) {
  var testX = (this.vel[0] * this.magnitude) + (vec[0] * 10);
  var testY = (this.vel[1] * this.magnitude) + (vec[1] * 10);
  var bulletSpeed = 10;

  var bullet = new Asteroids.Bullet({
    pos: this.pos,
    vel: Asteroids.Util.normalizeVec([testX, testY]),
    magnitude: bulletSpeed,
    game: this.game
  });
  var game = this.game;
  game.bullets.push(bullet);
  window.setTimeout(function(){
    if (game.bullets.indexOf(bullet) !== -1) {
      game.remove(bullet);
    };
  }, 2000);
  if(this.game.bullets.length > 6){
    this.game.bullets.shift();
  };
};

})();
