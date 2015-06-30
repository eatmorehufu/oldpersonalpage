(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var util = Asteroids.Util = {};

util.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function (){};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

util.randomVec = function(length) {
  var x = Math.random()*2 - 1;
  var y = Math.random()*2 - 1;
  // length == sqrt((x * degree)^2 + (y* degree)^2)
  var mult = length / Math.sqrt(x * x + y * y);
  return [Math.floor(x * mult), Math.floor(y * mult)];
};

util.maxSpeed = function(speedX, speedY) {
  var speedLimit = 7;
  if ((speedLimit * speedLimit) < ((speedX * speedX) + (speedY * speedY))) {
    return this.maxSpeed(speedX * 0.9, speedY * 0.9);
  };
  return [speedX, speedY];
};


})();
