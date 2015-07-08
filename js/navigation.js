(function () {
  if (typeof Navigation === "undefined") {
    window.Navigation = {};
  }

  var NavBar = Navigation.NavBar = function ($el) {
    this.$el = $el
    this.bindClicks();
  }

  NavBar.prototype.bindClicks = function() {
    this.$el.on("click", "a", this.scrollTo.bind(this));
  }

  NavBar.prototype.scrollTo = function (event) {
    event.preventDefault();
    console.log("Clicked on " + $(event.currentTarget).data("nav"));
  }


})();
