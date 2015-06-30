(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

Asteroids.Asteroid = function(obj) {
  var COLOR = "#ccc";
  var RADIUS = 40;
  this.image = obj.game.image;
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    color: COLOR,
    radius: obj.radius || RADIUS,
    pos: obj.pos,
    vel: Asteroids.Util.randomVec(2)
  });
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroids.Asteroid.prototype.draw = function(ctx) {
  ctx.drawImage(this.game.image, 0,0, 48, 51, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
}

})();
