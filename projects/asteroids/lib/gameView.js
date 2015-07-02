(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(ctx, canvasEl){
    this.game = new Asteroids.Game(canvasEl, 1, this);
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.interval = window.setInterval(this.game.render.bind(this.game, this.ctx), 20);
  };

  })();
