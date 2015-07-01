(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {}
  };

var HuD = Asteroids.HuD = function(game){
  Asteroids.Display.call(this, game);
};

Asteroids.Util.inherits(Asteroids.HuD, Asteroids.Display);

HuD.prototype.draw = function (ctx) {
  ctx.fillStyle = "white";
  ctx.font = 15 + "pt Helvetica";
  ctx.fillText("Shields left: " + this.game.ship.shields +"%", 20, 20);
  ctx.fillText("Wave " + (this.game.NUM_ASTEROIDS - 3), this.DIM_X - 100, 20);
};

})();