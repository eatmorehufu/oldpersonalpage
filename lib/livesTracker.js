(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {}
  };

var LivesTracker = Asteroids.LivesTracker = function(game){
  this.lives = game.lives;
  Asteroids.Display.call.bind(this, game);
};

Asteroids.Util.inherits(Asteroids.LivesTracker, Asteroids.Display);

LivesTracker.prototype.draw = function (ctx) {
  ctx.fillStyle = "white";
  ctx.font = 15 + "pt Helvetica";
  ctx.fillText("Lives left:" + this.lives, 20, 20);
};

})();
