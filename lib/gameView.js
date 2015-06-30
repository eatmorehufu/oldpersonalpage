(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(ctx, canvasEl, image){
    this.game = new Asteroids.Game(canvasEl, image);
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.interval = window.setInterval(this.game.render.bind(this.game, this.ctx), 20);
  };

  })();
