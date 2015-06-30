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

  GameView.prototype.levelUp = function(level) {
    window.clearInterval(this.interval);
    var gameView = this;
    this.ctx.fillStyle = "white";
    this.ctx.font = 96 + "pt Helvetica";
    this.ctx.fillText("Level Up!", 20, 250)
    this.game = new Asteroids.Game(canvasEl, level + 1, this);
    window.setTimeout(function(){
      gameView.start();
    }, 5000);
  }

  })();
